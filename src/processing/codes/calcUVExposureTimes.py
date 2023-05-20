import pandas as pd
import plotly.express as px
from datetime import timedelta, datetime

print("Read csv files ...")
users = ["P07" + str("%02d" % i) for i in range(1, 17)]

# 2019/05/08 - #2019/05/14
dates = [
    5572736000,
    5573600000,
    5574464000,
    5575328000,
    5576192000,
    5577056000,
    5577920000,
]

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
mergedDF = mergedDF.loc[
    (1557241200000 <= mergedDF["timestamp"]) & (mergedDF["timestamp"] < 1557846000000)
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

print("Save the result file ...")
ret_csv_sorted.to_csv("../csvs/UVExposureTimes.csv", mode="w")

print("Done")
