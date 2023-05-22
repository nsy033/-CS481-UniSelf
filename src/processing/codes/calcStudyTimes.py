import pandas as pd
import plotly.express as px
from datetime import timedelta, datetime

print("Read csv files ...")
# users = ["P07" + str("%02d" % i) for i in range(1, 17)]

# # 2019/05/08 - #2019/05/14
# dates = [
#     5572736000,
#     5573600000,
#     5574464000,
#     5575328000,
#     5576192000,
#     5577056000,
#     5577920000,
# ]

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

final_csv = pd.DataFrame([])

for i in range(1, 6):
    uID = "USER" + str(i)
    print(uID)
    print("Read csv files ...")
    users = users_dic[uID]
    dates = dates_dic[uID]

    print("Merge into one dataframe ...")
    mergedDF = pd.DataFrame()
    for user in users:
        for date in dates:
            df = pd.read_csv(
                "../dataset/%s/LocationEntity-%d.csv" % (user, date)
            )

            df["userID"] = user
            df["date"] = pd.to_datetime(df["timestamp"], unit="ms")
            df["date"] = pd.DatetimeIndex(df["date"]) + timedelta(hours=9)
            mergedDF = pd.concat([mergedDF, df], axis=0)

    print("Clear data ...")
    # mergedDF = mergedDF.loc[
    #     (1557241200000 <= mergedDF["timestamp"]) & (mergedDF["timestamp"] < 1557846000000)
    # ]

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
    
    ret_csv = pd.DataFrame(columns=["userID", "date", "studyTime"])

    # Specify the latitude and longitude range
    target_latitude = 36.3696
    target_longitude = 127.3625
    latitude_range = 0.001
    longitude_range = 0.001

    # Specify the time range
    start_time = "12:00:00"
    end_time = "18:00:00"

    # Filter the dataframe based on the time range
    filtered_df = mergedDF[
        (mergedDF["date"].dt.time >= pd.to_datetime(start_time).time()) &
        (mergedDF["date"].dt.time <= pd.to_datetime(end_time).time())
    ]

    # Filter the dataframe based on latitude and longitude range
    filtered_df = filtered_df[
        (filtered_df["latitude"].between(target_latitude - latitude_range, target_latitude + latitude_range)) &
        (filtered_df["longitude"].between(target_longitude - longitude_range, target_longitude + longitude_range))
    ]

    # Calculate the total time for each user and date
    grouped_df = filtered_df.groupby(["userID", filtered_df["date"].dt.date]).agg(
        studyTime=("date", lambda x: x.max() - x.min())
    ).reset_index()

    # Rename the column and convert total_time to seconds
    grouped_df["studyTime"] = grouped_df["studyTime"].dt.total_seconds()

    # Add the result to the ret_csv dataframe
    ret_csv = pd.concat([ret_csv, grouped_df[["userID", "date", "studyTime"]]], ignore_index=True)

    ret_csv = ret_csv.reset_index(drop=True)

    full_dates = pd.date_range(start="2019-05-08", end="2019-05-14", freq="D")
    ret_csv["date"] = pd.to_datetime(ret_csv["date"])

    missing_dates = []
    for user in users:
        for date in full_dates:
            if not ret_csv[(ret_csv["userID"] == user) & (ret_csv["date"] == date)].empty:
                continue
            missing_dates.append({"userID": user, "date": date, "studyTime": 0})

    missing_df = pd.DataFrame(missing_dates)
    ret_csv = pd.concat([ret_csv, missing_df], axis=0)

    ret_csv_sorted = ret_csv.sort_values(by=["userID", "date"])
    ret_csv_sorted = ret_csv_sorted.reset_index(drop=True)

    ret_csv_sorted["userID"] = "USER4" if i == 5 else uID
    final_csv = pd.concat([final_csv, ret_csv_sorted], axis=0)

final_csv = final_csv.reset_index(drop=True)

print("Save the result file ...")
final_csv.to_csv("../csvs/studyTimes.csv", mode="w")

print("Done")
