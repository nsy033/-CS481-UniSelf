import pandas as pd
from datetime import timedelta

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


# mergedDF = pd.DataFrame()
# for i in range(1, 6):
#     uID = "USER" + str(i)
#     users[uID] = list(filter(lambda pNum: pNum not in absentUsers, users[uID]))
#     print("For making USER", i, ", extracting participants", users[uID])

#     print("Merge into one dataframe ...")
#     for user in users[uID]:
#         for date in dates[uID]:
#             df = pd.read_csv(
#                 "../dataset/%s/AppUsageStatEntity-%d.csv" % (user, date)
#             )

#             df["userID"] = user
#             df["datetime"] = pd.to_datetime(df["timestamp"], unit="ms")
#             df["datetime"] = pd.DatetimeIndex(df["datetime"]) + timedelta(hours=9)
#             mergedDF = pd.concat([mergedDF, df], axis=0)


# print("Filter 카카오톡 or Instagram events ...")
# mergedDF = mergedDF.loc[:, ['timestamp', 'name', 'totalTimeForeground', 'userID', 'datetime']]
# mergedDF = mergedDF[(mergedDF["name"] == "카카오톡") | (mergedDF["name"] == "Instagram")]

# print("Filter proper date and time ...")
# mergedDF['date'] = mergedDF['datetime'].dt.date
# mergedDF['time'] = mergedDF['datetime'].dt.time

# print("Drop duplicates ...")
# mergedDF = mergedDF.drop_duplicates(subset=['userID', 'date', 'name', 'totalTimeForeground'])

# ret_csv = pd.DataFrame()
# for idx, row in mergedDF.iterrows():
#     if not((
#         (row["userID"][1:3] == '07') & (1557241200000 <= row["timestamp"]) & (row["timestamp"] < 1557846000000))
#         | ((row["userID"][1:3] == '15') & (1557932400000 <= row["timestamp"]) & (row["timestamp"] < 1558537200000))
#         | ((row["userID"][1:3] == '30') & (1556550000000 <= row["timestamp"]) & (row["timestamp"] < 1557154800000))
#     ):
#         continue
#     if not ((pd.to_datetime('6:00:00').time() <= row["time"]) & (row["time"] <= pd.to_datetime('12:00:00').time())):
#         continue

#     new_row = pd.DataFrame(
#         {"timestamp": [row["timestamp"]], "datetime": [row["datetime"]], "date": [row["date"]], "time": [row["time"]], 
#          "userID": [row["userID"]], "appName": [row["name"]], "totalTimeForeground": [row["totalTimeForeground"]]}
#     )
#     ret_csv = pd.concat([ret_csv, new_row], axis=0)

# print("Save the result file ...")
# ret_csv.to_csv("../csvs/SNSUsages.csv", mode="w")

# print("Done for making original data processing")


ret_csv = pd.read_csv("../csvs/SNSUsages.csv")

print("Modify date and uID values ...")
ret_csv["userID__origin"] = ret_csv["userID"]
ret_csv["date__origin"] = ret_csv["date"]

for idx, row in ret_csv.iterrows():
    for i in range(1, 6):
        uID = "USER" + str(i)
        if row["userID"] in users[uID]:
            ret_csv["userID"][idx] = "USER4" if i == 5 else uID
            break
print(ret_csv)

merged_csv = pd.DataFrame()
dateMax = -1
for i in range(1, 6):
    uID = "USER" + str(i)
    oneUsers = ret_csv.loc[ret_csv["userID"] == uID]
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

merged_csv = merged_csv.groupby(['userID', 'date']).sum().reset_index().loc[:, ['userID', 'date', 'totalTimeForeground']]

print("Save the result file ...")
merged_csv.to_csv("../csvs/SNSUsagesFinal.csv", mode="w")

print("Done")