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
        df = pd.read_csv("../dataset/%s/Calories-%d.csv" % (user, date))

        df["userID"] = user
        df["datetime"] = pd.to_datetime(df["timestamp"], unit="ms")
        df["datetime"] = pd.DatetimeIndex(df["datetime"]) + timedelta(hours=9)
        df["date"] = pd.to_datetime(df["datetime"]).dt.date
        mergedDF = pd.concat([mergedDF, df], axis=0)

print("Clear data ...")
mergedDF = mergedDF.loc[
    (1557241200000 <= mergedDF["timestamp"]) & (mergedDF["timestamp"] < 1557846000000)
]

print("Find the final calories value for each date ...")
mergedDF.drop("timestamp", axis=1, inplace=True)
mergedDF.drop("Calories", axis=1, inplace=True)
mergedDF.drop("datetime", axis=1, inplace=True)

mergedDF = mergedDF.groupby(["userID", "date"]).max().reset_index()

print("Save the result file ...")
mergedDF.to_csv("../csvs/calories.csv", mode="w")

print("Done")
