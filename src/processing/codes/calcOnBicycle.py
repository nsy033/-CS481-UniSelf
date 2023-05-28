import pandas as pd
from datetime import timedelta, datetime

absentUsers = ["P1512", "P1513", "P1524",
               "P3004", "P3006", "P3008", "P3009", "P3010", "P3014", "P3020", "P3023",
               "P0720", "P0724", "P0726"]
users = {
    "USER1": ["P07" + str("%02d" % i) for i in range(1, 17)],
    "USER2": ["P15" + str("%02d" % i) for i in range(1, 19)],
    "USER3": ["P30" + str("%02d" % i) for i in range(1, 25)],
    "USER4": ["P07" + str("%02d" % i) for i in range(17, 30)],
    "USER5": ["P15" + str("%02d" % i) for i in range(19, 26)],
}
date700s = [
    # 2019/05/08 - #2019/05/14
        5572736000,
        5573600000,
        5574464000,
        5575328000,
        5576192000,
        5577056000,
        5577920000,
    ]
date1500s = [
    # 2019/05/16 - #2019/05/22
        5579648000,
        5580512000,
        5581376000,
        5582240000,
        5583104000,
        5583968000,
        5584832000
    ]
date3000s = [
    # 2019/04/30 - #2019/05/06
        5565824000,
        5566688000,
        5567552000,
        5568416000,
        5569280000,
        5570144000,
        5571008000
]
dates = {
    "USER1": date700s, "USER2": date1500s, "USER3" : date3000s, "USER4" : date700s, "USER5" : date1500s
}

# resultDF = pd.DataFrame()

# for i in range(1, 6):
#     uID = "USER" + str(i)
#     users[uID] = list(filter(lambda pNum: pNum not in absentUsers, users[uID]))
#     print("For making USER", i, ", extracting participants", users[uID])

#     print("Merge into one dataframe ...")
#     for user in users[uID]:
#         for date in dates[uID]:
#             print("Start for " + user + " on " + str(date))
#             df = pd.read_csv(
#                 "src/processing/dataset/%s/PhysicalActivityEventEntity-%d.csv" % (user, date)
#             )

#             if df.empty:
#                 daily_on_bicycle_time = 0
#             else:
#                 df["userID"] = user
#                 df["datetime"] = pd.to_datetime(df["timestamp"], unit="ms")
#                 df["datetime"] = pd.DatetimeIndex(df["datetime"]) + timedelta(hours=9)

#                 # print("Get the type with the highest confidence for each unique timestamp...")
#                 df = df.loc[df.groupby(['timestamp', 'userID'], sort=False)['confidence'].idxmax()][['timestamp', 'confidence', 'type', 'userID']]

#                 clear_df = df

#                 # clear_df.to_csv("src/processing/csvs/calcOnBicycle_test.csv", mode="w")
#                 clear_df["date"] = pd.to_datetime(clear_df["timestamp"], unit="ms")

#                 # print("Iter data to find activity time ranges and duration ...")
#                 start_timestemp = clear_df.loc[0]['timestamp']
#                 start_date = clear_df.loc[0]['date']
#                 temp_type = clear_df.loc[0]['type']
#                 last_timestamp = clear_df.loc[0]['timestamp']
#                 last_date = clear_df.loc[0]['date']

#                 activity_gap_df = pd.DataFrame(columns=['start_timestamp', 'last_timestamp', 'start_date', 'last_date', 'type', 'gap'])

#                 for index, row in clear_df[1:].iterrows():
#                     if temp_type == row['type']:
#                         last_timestamp = row['timestamp']
#                         last_date = row['date']
#                     else:
#                         gap = last_timestamp - start_timestemp
#                         temp = {'start_timestamp': str(start_timestemp), 'last_timestamp': str(last_timestamp), 'start_date': start_date, 'last_date': last_date, 'type': temp_type, 'gap': (last_date - start_date).total_seconds()}
#                         activity_gap_df = activity_gap_df._append(temp, ignore_index=True)
#                         start_timestemp = row['timestamp']
#                         start_date = row['date']
#                         temp_type = row["type"]
#                         last_timestamp = row['timestamp']
#                         last_date = row['date']

#                 # print("Drop the non-continuous date ...")
#                 filtered_df = activity_gap_df[(activity_gap_df['type'] == 'ON_BICYCLE') & (activity_gap_df['gap'] != 0)]

#                 # print("Calculate time for ON_BICYCLE activity...")
#                 daily_on_bicycle_time = filtered_df['gap'].sum(axis=0)

#             result_temp = {'userID': uID, 'date': clear_df["date"][0].date(), 'bicycleTime': daily_on_bicycle_time}
#             resultDF = resultDF._append(result_temp, ignore_index=True)

# print(resultDF)

finalDF = pd.DataFrame()
resultDF = pd.read_csv("src/processing/csvs/calcOnBicycle.csv")

resultDF["date__origin"] = resultDF["date"]

resultDF.loc[resultDF['userID'] == 'USER5', 'userID'] = 'USER4'

merged_csv = pd.DataFrame()
dateMax = -1
for i in range(1, 6):
    uID = "USER" + str(i)
    oneUsers = resultDF.loc[resultDF["userID"] == uID]
    if dateMax == -1:
        dateMax = oneUsers["date__origin"].max()
    print(pd.to_datetime(dateMax), oneUsers.shape[0] - 1)
    oneUsers["date"]= pd.date_range(
        pd.to_datetime(dateMax) - timedelta(days=oneUsers.shape[0] - 1),
        pd.to_datetime(dateMax),
        freq="D",
    )
    oneUsers = oneUsers.loc[oneUsers["date"] >= pd.to_datetime('2019-01-26')]
    merged_csv = pd.concat([merged_csv, oneUsers], axis=0)

merged_csv = merged_csv.groupby(['userID', 'date']).sum().reset_index().loc[:, ['userID', 'date', 'bicycleTime']]
merged_csv['bicycleTime'] = merged_csv['bicycleTime'].round().astype(int)
print("Save the result file ...")
merged_csv.to_csv("src/processing/csvs/calcOnBicycle_final.csv", mode="w")

print("Done")