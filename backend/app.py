from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from datetime import datetime

app = Flask(__name__, static_folder="../frontend/public", static_url_path="/")
CORS(app)

# Load data with error handling
def load_data():
    try:
        prices = pd.read_csv('data/BrentOilPrices.csv')
        prices['Date'] = pd.to_datetime(prices['Date'], format='mixed', dayfirst=False)
        prices = prices.sort_values('Date').set_index('Date')
        prices['Price'] = prices['Price'].interpolate(method='time')
        prices['Log_Return'] = prices['Price'].pct_change().dropna()
        prices = prices.dropna(subset=['Price'])
        prices['Volatility'] = prices['Log_Return'].rolling(window=30).std() * (252 ** 0.5)  # Annualized
    except Exception as e:
        prices = pd.DataFrame()
    
    try:
        change_points = pd.read_csv('data/change_points.csv')
        change_points['tau_date'] = pd.to_datetime(change_points['tau_date'])
    except Exception as e:
        change_points = pd.DataFrame()
    
    try:
        events = pd.read_csv('data/events.csv')
        events['Date'] = pd.to_datetime(events['Date'], format='%d-%m-%Y')
    except Exception as e:
        events = pd.DataFrame()
    
    try:
        energy = pd.read_csv('data/energy_consumption.csv')
        energy['YYYYMM'] = energy['YYYYMM'].astype(str).str.strip()
        energy = energy[energy['YYYYMM'].str.match(r'^\d{6}$')]
        energy['Date'] = pd.to_datetime(energy['YYYYMM'], format='%Y%m', errors='coerce')
        energy = energy.dropna(subset=['Date'])
        energy = energy[energy['MSN'] == 'TXACBUS']
    except Exception as e:
        energy = pd.DataFrame()
    
    try:
        trade = pd.read_csv('data/petroleum_trade.csv')
        trade['YYYYMM'] = trade['YYYYMM'].astype(str).str.strip()
        trade = trade[trade['YYYYMM'].str.match(r'^\d{6}$')]
        trade['Date'] = pd.to_datetime(trade['YYYYMM'], format='%Y%m', errors='coerce')
        trade = trade.dropna(subset=['Date'])
        trade['Value'] = pd.to_numeric(trade['Value'], errors='coerce')
        trade = trade[trade['MSN'] == 'PAIMPAG']
    except Exception as e:
        trade = pd.DataFrame()
    
    return prices, change_points, events, energy, trade

prices, change_points, events, energy, trade = load_data()

@app.route('/')
def serve_react():
    return app.send_static_file('index.html')

@app.route('/api/prices')
def get_prices():
    if prices.empty:
        return jsonify({'error': 'Price data unavailable'}), 500
    df = prices.reset_index()[['Date', 'Price', 'Volatility']]
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/change_points')
def get_change_points():
    if change_points.empty:
        return jsonify({'error': 'Change points data unavailable'}), 500
    df = change_points[['tau_date', 'mu_1', 'mu_2', 'price_change_pct', 'event', 'category']]
    df = df.rename(columns={'tau_date': 'Date'})
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/events')
def get_events():
    if events.empty:
        return jsonify({'error': 'Events data unavailable'}), 500
    df = events[['Date', 'Event Description', 'Category', 'Source']]
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/energy')
def get_energy():
    if energy.empty:
        return jsonify({'error': 'Energy data unavailable'}), 500
    df = energy.reset_index()[['Date', 'Value']]
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/trade')
def get_trade():
    if trade.empty:
        return jsonify({'error': 'Trade data unavailable'}), 500
    df = trade.reset_index()[['Date', 'Value']]
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)