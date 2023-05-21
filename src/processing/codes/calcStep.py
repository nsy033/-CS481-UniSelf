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
    "USER1": date700s, 
    "USER2": date1500s, "USER3" : date3000s, "USER4" : date700s, "USER5" : date1500s
}

# print("Start to merge into one dataframe ...")

# mergedDF = pd.DataFrame()
# for i in range(1, 6):
# # for i in range(2, 6):
#     uID = "USER" + str(i)
#     users[uID] = list(filter(lambda pNum: pNum not in absentUsers, users[uID]))
#     print("For making USER", i, ", extracting participants", users[uID])

#     print("Merge into one dataframe ...")
#     for user in users[uID]:
#         for date in dates[uID]:
#             df = pd.read_csv(
#                 "src/processing/dataset/%s/Pedometer-%d.csv" % (user, date)
#             )

#             df["userID"] = user
#             df["datetime"] = pd.to_datetime(df["timestamp"], unit="ms")
#             df["datetime"] = pd.DatetimeIndex(df["datetime"]) + timedelta(hours=9) # KST

#             # df = df.sort_values(by=['timestamp'])
#             mergedDF = pd.concat([mergedDF, df], axis=0)

# print("Separate date and time ...")
# mergedDF['date'] = mergedDF['datetime'].dt.date
# mergedDF['time'] = mergedDF['datetime'].dt.time

# print("Filter time ...")
# mergedDF = mergedDF.loc[:, ['timestamp', 'datetime', 'date', 'time', 'userID', 'TotalSteps']]
# mergedDF = mergedDF[(mergedDF["time"] >= pd.to_datetime('18:00:00').time()) & (mergedDF["time"] <= pd.to_datetime('23:59:59').time())]

# print("Drop duplicates ...")
# mergedDF = mergedDF.drop_duplicates(subset=['userID', 'date', 'TotalSteps'])

# print("Filter date ...")
# new_csv = pd.DataFrame()
# for idx, row in mergedDF.iterrows():
#     if not((
#         (row["userID"][1:3] == '07') & (1557241200000 <= row["timestamp"]) & (row["timestamp"] < 1557846000000))
#         | ((row["userID"][1:3] == '15') & (1557932400000 <= row["timestamp"]) & (row["timestamp"] < 1558537200000))
#         | ((row["userID"][1:3] == '30') & (1556550000000 <= row["timestamp"]) & (row["timestamp"] < 1557154800000))
#     ):
#         continue

#     new_row = pd.DataFrame(
#         {"timestamp": [row["timestamp"]], "datetime": [row["datetime"]], "date": [row["date"]], "time": [row["time"]], 
#          "userID": [row["userID"]], "TotalSteps": [row["TotalSteps"]]}
#     )
#     new_csv = pd.concat([new_csv, new_row], axis=0)

#     print(row["userID"], row["timestamp"])


# print("Save the result file ...")
# new_csv.to_csv("src/processing/csvs/nightStep3.csv", mode="w")
# print("Done for making original data processing")

# # --------------------------------------------------- #
# #                  uID PROCESSING                     #
# # --------------------------------------------------- #

# ret_csv = pd.read_csv("src/processing/csvs/nightStep3.csv")
# # mergedDF = mergedDF.drop_duplicates(subset=['userID', 'date', 'time', 'TotalSteps', 'StepsToday'])

# print("Modify date and uID values ...")
# ret_csv["userID__origin"] = ret_csv["userID"]
# ret_csv["date__origin"] = ret_csv["date"]

# print("Get TotalStep during 18:00 - 24:00 ... ")
# # ret_csv = pd.DataFrame(columns=["userID", "date", "totalStep"])

# # USER5를 USER4로 merge
# for idx, row in ret_csv.iterrows():
#     for i in range(1, 6):
#         uID = "USER" + str(i)
#         if row["userID"] in users[uID]:
#             ret_csv["userID"][idx] = "USER4" if i == 5 else uID
#             break


# print("Save the uID processed file ...")
# ret_csv.to_csv("src/processing/csvs/nightStep_uIDprocessed.csv", mode="w")
# print("Done Saving ...")

# --------------------------------------------------- #
#                  DATE GENERATING                    #
# --------------------------------------------------- #

uid_csv = pd.read_csv("src/processing/csvs/nightStep_uIDprocessed.csv")

final_csv = pd.DataFrame()

dateMax = -1

for i in range(1, 6):
    uID = "USER" + str(i)
    oneUsers = ret_csv.loc[ret_csv["userID"] == uID]
    
    if dateMax == -1:
        dateMax = oneUsers["date__origin"].max()

    oneUsers["date"]= pd.date_range(
        pd.to_datetime(dateMax) - timedelta(days=oneUsers.shape[0] - 1),
        pd.to_datetime(dateMax),
        freq="D",
    )
    oneUsers = oneUsers.loc[oneUsers["date"] >= pd.to_datetime('2019-01-26')]
    final_csv = pd.concat([final_csv, oneUsers], axis=0)

print("Save the date generated file ...")
final_csv.to_csv("src/processing/csvs/nightStep_dateGenerated.csv", mode="w")
print("Done Saving ...")

# # --------------------------------------------------- #
# #                  DATA PROCESSING                    #
# # --------------------------------------------------- #

# ret_csv = pd.read_csv("src/processing/csvs/nightStep_uIDprocessed.csv")

# ret_csv["datetime"] = pd.to_datetime(ret_csv["timestamp"], unit="ms")

# ret_csv['date'] = ret_csv['datetime'].dt.date
# ret_csv['time'] = ret_csv['datetime'].dt.time

# firstStep = 0
# lastStep = 0
# prev_date = ret_csv.iloc[0]["date"]

# final_csv = pd.DataFrame()

# for i, (idx, row) in enumerate(ret_csv.iterrows()):
#     user = row["userID"]
#     date = row["date"]

#     if firstStep == 0 and row["time"] > datetime.strptime("18:00", "%H:%M").time():
#         firstStep = row["TotalSteps"]

#     if prev_date != date and i >= 1:
#         if ret_csv.iloc[i-1]["time"] > datetime.strptime("18:00", "%H:%M").time():
#             lastStep = ret_csv.iloc[i-1]["TotalSteps"]

#         totalStep = lastStep - firstStep

#         # print("before update: ", prev_date, date, ret_csv.iloc[i-1]["datetime"], lastStep, firstStep)

#         # 1인분용
#         new_row = pd.DataFrame(
#             {"userID": [ret_csv.iloc[i-1]["userID"]], "date": [prev_date], "totalStep": [totalStep]}
#         )
#         final_csv = pd.concat([final_csv, new_row], axis=0)

#         # # 4인분용
#         # final_csv.loc[(final_csv["userID"]==ret_csv.iloc[i-1]["userID"]) & (final_csv["date"]==prev_date), 'totalStep'] = totalStep

#         # reset and initialize
#         firstStep = 0
#         lastStep = 0
#         prev_date = date
#         continue
    
#     # last row of the dataframe
#     if i == len(ret_csv) - 1:
#         print("Add last row ...")
#         if row["time"] > datetime.strptime("18:00", "%H:%M").time():
#             lastStep = row["TotalSteps"]
#         totalStep = lastStep - firstStep

#         # 1인분용
#         new_row = pd.DataFrame(
#             {"userID": [user], "date": [date], "totalStep": [totalStep]}
#         )
#         final_csv = pd.concat([final_csv, new_row], axis=0)

#         # # 4인분용
#         # final_csv.loc[(final_csv["userID"]==user) & (final_csv["date"]==date), 'totalStep'] = totalStep

# final_csv = final_csv.reset_index(drop=True)


# print("Save the result file ...")
# final_csv.to_csv("src/processing/csvs/nightStepFinal2.csv", mode="w")

# print("Done")
