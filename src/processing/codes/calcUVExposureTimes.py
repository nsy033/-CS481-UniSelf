# import pandas as pd
# import plotly.express as px
# from datetime import timedelta, datetime

# print("Read csv files ...")
# # users = ["P07" + str("%02d" % i) for i in range(1, 17)]

# # # 2019/05/08 - #2019/05/14
# # dates = [
# #     5572736000,
# #     5573600000,
# #     5574464000,
# #     5575328000,
# #     5576192000,
# #     5577056000,
# #     5577920000,
# # ]

users_dic = {
    "USER1": ["P07" + str("%02d" % i) for i in range(1, 17)],
    # "USER2": ["P15" + str("%02d" % i) for i in range(1, 19)],
    "USER2": ["P15" + str("%02d" % i) for i in range(1, 12)] + ["P15" + str("%02d" % i) for i in range(14, 19)],
    # "USER3": ["P30" + str("%02d" % i) for i in range(1, 25)],
    "USER3": ["P30" + str("%02d" % i) for i in range(1, 4)] + ["P3005"] + ["P30" + str("%02d" % i) for i in range(7, 19)],
    "USER4": ["P07" + str("%02d" % i) for i in range(17, 20)] + ["P07" + str("%02d" % i) for i in range(21, 24)] + ["P07" + str("%02d" % i) for i in range(25, 30)],
    "USER5": ["P15" + str("%02d" % i) for i in range(19, 24)],
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
dates_dic = {
    "USER1": date700s, "USER2": date1500s, "USER3" : date3000s, "USER4" : date700s, "USER5" : date1500s
}

# # ret_csv = pd.read_csv("../csvs/SNSUsages.csv")

# # print("Modify date and uID values ...")
# # ret_csv["userID__origin"] = ret_csv["userID"]
# # ret_csv["date__origin"] = ret_csv["date"]

# # for idx, row in ret_csv.iterrows():
# #     for i in range(1, 6):
# #         uID = "USER" + str(i)
# #         if row["userID"] in users[uID]:
# #             ret_csv["userID"][idx] = "USER4" if i == 5 else uID
# #             break
# # print(ret_csv)

# final_csv = pd.DataFrame([])

# for i in range(1, 6):
#     uID = "USER" + str(i)
#     print(uID)
#     print("Merge into one dataframe ...")
#     mergedDF = pd.DataFrame()
#     for user in users[uID]:
#         for date in dates[uID]:
#             df = pd.read_csv(
#                 "../dataset/%s/UV-%d.csv" % (user, date)
#             )

#             df["userID"] = user
#             df["datetime"] = pd.to_datetime(df["timestamp"], unit="ms")
#             df["datetime"] = pd.DatetimeIndex(df["datetime"]) + timedelta(hours=9)
#             mergedDF = pd.concat([mergedDF, df], axis=0)

#     print("Clear data ...")
#     # 2019-05-08 00:00:00 to 2019-05-15 00:00:00
#     # mergedDF = mergedDF.loc[
#     #     (1557241200000 <= mergedDF["timestamp"]) & (mergedDF["timestamp"] < 1557846000000)
#     # ]

#     # test = pd.to_datetime(1557455392267, unit="ms") + timedelta(hours=9)
#     # print(test)

#     print("Find the time when UVExposureToday first becomes 1 ...")
#     ret_csv = pd.DataFrame(columns=["userID", "date", "UVExposureTime"])

#     for idx, row in mergedDF.iterrows():
#         user = row["userID"]
#         date = row["datetime"].date()
#         if (ret_csv[ret_csv["userID"] == user]["date"] == date).any():
#             continue
#         # UVExposureTime = "24:00:00"
#         if row["UVExposureToday"] == 1:
#             UVExposureTime = row["datetime"].time()
#             new_row = pd.DataFrame(
#             {"userID": [user], "date": [date], "UVExposureTime": [UVExposureTime]}
#             )
#             ret_csv = pd.concat([ret_csv, new_row], axis=0)
#             continue

#     # full_dates = pd.date_range(start="2019-05-08", end="2019-05-14", freq="D")
#     ret_csv["date"] = pd.to_datetime(ret_csv["date"])

#     missing_dates = []
#     for user in users[uID]:
#         for date in dates[uID]:
#             print("date", date)
#             if not ret_csv[(ret_csv["userID"] == user) & (ret_csv["date"] == date)].empty:
#                 continue
#             missing_dates.append({"userID": user, "date": pd.to_datetime(date).date(), "UVExposureTime": "23:59:59"})

#     missing_df = pd.DataFrame(missing_dates)
#     ret_csv = pd.concat([ret_csv, missing_df], axis=0)

#     print(ret_csv)

#     ret_csv_sorted = ret_csv.sort_values(by=["userID", "date"])
#     ret_csv_sorted = ret_csv_sorted.reset_index(drop=True)

#     # ret_csv_sorted = ret_csv.reset_index(drop=True)

#     final_csv = pd.concat([final_csv, ret_csv_sorted])

# print("Save the result file ...")
# final_csv.to_csv("../csvs/UVExposureTimes.csv", mode="w")

# print("Done")


import pandas as pd
import plotly.express as px
from datetime import timedelta, datetime

final_csv = pd.DataFrame([])

for i in range(1, 6):
    uID = "USER" + str(i)
    print(uID)
    print("Read csv files ...")
    # users = ["P07" + str("%02d" % i) for i in range(1, 17)]
    users = users_dic[uID]

    # 2019/05/08 - #2019/05/14
    # dates = [
    #     5572736000,
    #     5573600000,
    #     5574464000,
    #     5575328000,
    #     5576192000,
    #     5577056000,
    #     5577920000,
    # ]
    dates = dates_dic[uID]

    print("Merge into one dataframe ...")
    mergedDF = pd.DataFrame()
    for user in users:
        for date in dates:
            df = pd.read_csv(
                "../dataset/%s/UV-%d.csv" % (user, date)
            )

            df["userID"] = user
            df["datetime"] = pd.to_datetime(df["timestamp"], unit="ms")
            df["datetime"] = pd.DatetimeIndex(df["datetime"]) + timedelta(hours=9)
            mergedDF = pd.concat([mergedDF, df], axis=0)

    print("Clear data ...")
    # 2019-05-08 00:00:00 to 2019-05-15 00:00:00

    if i==1 or i==4:
        mergedDF = mergedDF.loc[
            (1557241200000 <= mergedDF["timestamp"]) & (mergedDF["timestamp"] < 1557846000000)
        ]
    elif i==2 or i==5:
        mergedDF = mergedDF.loc[
            (1557932400000 <= mergedDF["timestamp"]) & (mergedDF["timestamp"] < 1558537200000)
        ]
    else:
        mergedDF = mergedDF.loc[
            (1556550000000 <= mergedDF["timestamp"]) & (mergedDF["timestamp"] < 1557154800000)
        ]

    # test = pd.to_datetime(1557455392267, unit="ms") + timedelta(hours=9)
    # print(test)

    print("Find the time when UVExposureToday first becomes 1 ...")
    ret_csv = pd.DataFrame(columns=["userID", "date", "UVExposureTime"])

    for idx, row in mergedDF.iterrows():
        user = row["userID"]
        date = row["datetime"].date()
        if (ret_csv[ret_csv["userID"] == user]["date"] == date).any():
            continue
        # UVExposureTime = "24:00:00"
        if row["UVExposureToday"] == 1:
            UVExposureTime = row["datetime"].time()
            new_row = pd.DataFrame(
            {"userID": [user], "date": [date], "UVExposureTime": [UVExposureTime]}
            )
            ret_csv = pd.concat([ret_csv, new_row], axis=0)
            continue

    full_dates = pd.date_range(start="2019-05-08", end="2019-05-14", freq="D")
    ret_csv["date"] = pd.to_datetime(ret_csv["date"])

    missing_dates = []
    for user in users:
        for date in full_dates:
            if not ret_csv[(ret_csv["userID"] == user) & (ret_csv["date"] == date)].empty:
                continue
            missing_dates.append({"userID": user, "date": date, "UVExposureTime": "23:59:59"})

    missing_df = pd.DataFrame(missing_dates)
    ret_csv = pd.concat([ret_csv, missing_df], axis=0)

    ret_csv_sorted = ret_csv.sort_values(by=["userID", "date"])
    ret_csv_sorted = ret_csv_sorted.reset_index(drop=True)

    ret_csv_sorted["userID"] = "USER4" if i == 5 else uID
    
    final_csv = pd.concat([final_csv, ret_csv_sorted], axis=0)

final_csv = final_csv.reset_index(drop=True)

print("Save the result file ...")
final_csv.to_csv("../csvs/UVExposureTimes.csv", mode="w")

print("Done")
