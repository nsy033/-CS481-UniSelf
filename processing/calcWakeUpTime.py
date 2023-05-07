import pandas as pd
import plotly.express as px
from datetime import timedelta, datetime

print("Read csv files ...")
users = ['P0701', 'P0702', 'P0703']

# 2019/05/08 - #2019/05/14
dates = [5572736000, 5573600000, 5574464000,
         5575328000, 5576192000, 5577056000, 5577920000]

print("Merge into one dataframe ...")
mergedDF = pd.DataFrame()
for user in users:
    for date in dates:
        df = pd.read_csv(
            './processing/dataset/%s/PhysicalActivityEventEntity-%d.csv' % (user, date))

        df['userID'] = user
        df['datetime'] = pd.to_datetime(df['timestamp'], unit='ms')
        df['datetime'] = pd.DatetimeIndex(
            df['datetime']) + timedelta(hours=9)
        mergedDF = pd.concat([mergedDF, df], axis=0)

mergedDF = mergedDF[mergedDF['type'] == 'ON_FOOT']

print("Locate the first ON_FOOT event for each date ...")
ret_csv = pd.DataFrame(columns=['userID', 'date', 'wakeUpTime'])
for idx, row in mergedDF.iterrows():
    user = row['userID']
    date = row['datetime'].date()
    if (ret_csv[ret_csv['userID'] == user]['date'] == date).any():
        continue
    wakeUpTime = row['datetime'].time()
    if wakeUpTime < datetime.strptime('06:00', '%H:%M').time():
        continue

    # print(user, date, wakeUpTime)
    new_row = pd.DataFrame(
        {'userID': [user], 'date': [date], 'wakeUpTime': [wakeUpTime]})
    ret_csv = pd.concat([ret_csv, new_row], axis=0)

ret_csv = ret_csv.reset_index(drop=True)

print("Save the result file ...")
ret_csv.to_csv("./processing/wakeUpTimes.csv", mode='w')

print("Done")
