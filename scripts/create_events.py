import pandas as pd

# Define the event data as a list of dictionaries
events = [
    {'Date': '01-08-1990', 'Event Description': 'Gulf War begins', 'Category': 'Conflict', 'Source': 'https://en.wikipedia.org/wiki/Gulf_War'},
    {'Date': '01-01-1991', 'Event Description': 'Gulf War escalates (Operation Desert Storm)', 'Category': 'Conflict', 'Source': 'https://www.ecb.europa.eu'},
    {'Date': '11-09-2001', 'Event Description': '9/11 terrorist attacks', 'Category': 'Conflict', 'Source': 'https://www.ecb.europa.eu'},
    {'Date': '01-03-2003', 'Event Description': 'Invasion of Iraq', 'Category': 'Conflict', 'Source': 'https://www.ecb.europa.eu'},
    {'Date': '01-07-2008', 'Event Description': 'Global financial crisis (oil price peak)', 'Category': 'Economic Shock', 'Source': 'https://en.wikipedia.org/wiki/Price_of_oil'},
    {'Date': '01-01-2011', 'Event Description': 'Arab Spring and Libyan civil war', 'Category': 'Conflict', 'Source': 'https://www.ecb.europa.eu'},
    {'Date': '01-01-2012', 'Event Description': 'Iran sanctions tightened', 'Category': 'Sanctions', 'Source': 'https://www.nature.com'},
    {'Date': '01-06-2014', 'Event Description': 'Oil glut begins (OPEC overproduction)', 'Category': 'OPEC Policy', 'Source': 'https://en.wikipedia.org/wiki/Price_of_oil'},
    {'Date': '01-11-2014', 'Event Description': 'OPEC maintains production, price war starts', 'Category': 'OPEC Policy', 'Source': 'https://en.wikipedia.org/wiki/Price_of_oil'},
    {'Date': '01-01-2016', 'Event Description': 'OPEC production cut agreement', 'Category': 'OPEC Policy', 'Source': 'https://en.wikipedia.org/wiki/Price_of_oil'},
    {'Date': '01-01-2018', 'Event Description': 'U.S. reimposes Iran sanctions', 'Category': 'Sanctions', 'Source': 'https://en.wikipedia.org/wiki/Price_of_oil'},
    {'Date': '01-01-2019', 'Event Description': 'Venezuela sanctions imposed', 'Category': 'Sanctions', 'Source': 'https://en.wikipedia.org/wiki/Price_of_oil'},
    {'Date': '01-04-2020', 'Event Description': 'OPEC+ production cuts during COVID-19', 'Category': 'OPEC Policy', 'Source': 'https://www.investopedia.com'},
    {'Date': '01-02-2022', 'Event Description': 'Russia invades Ukraine', 'Category': 'Conflict', 'Source': 'https://www.ecb.europa.eu'}
]

# Create a DataFrame
events_df = pd.DataFrame(events)

# Save to CSV
events_df.to_csv('events.csv', index=False)

# Verify the file
print("CSV file 'events.csv' created successfully!")
print(events_df)