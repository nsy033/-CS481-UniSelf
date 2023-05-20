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
            "../dataset/%s/LocationEntity-%d.csv" % (user, date)
        )

        df["userID"] = user
        df["date"] = pd.to_datetime(df["timestamp"], unit="ms")
        df["date"] = pd.DatetimeIndex(df["date"]) + timedelta(hours=9)
        mergedDF = pd.concat([mergedDF, df], axis=0)

print("Clear data ...")
mergedDF = mergedDF.loc[
    (1557241200000 <= mergedDF["timestamp"]) & (mergedDF["timestamp"] < 1557846000000)
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

print("Save the result file ...")
ret_csv_sorted.to_csv("../csvs/studyTimes.csv", mode="w")

print("Done")
