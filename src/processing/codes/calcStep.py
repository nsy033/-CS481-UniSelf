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
            "src/processing/dataset/%s/Pedometer-%d.csv" % (user, date)
        )

        df["userID"] = user
        df["datetime"] = pd.to_datetime(df["timestamp"], unit="ms")
        df["datetime"] = pd.DatetimeIndex(df["datetime"]) + timedelta(hours=9) # KST

        df = df.sort_values(by=['timestamp'])

        mergedDF = pd.concat([mergedDF, df], axis=0)

# mergedDF = mergedDF[mergedDF["type"] == "ON_FOOT"]

print("Clear data ...")
mergedDF = mergedDF.loc[
    (1557241200000 <= mergedDF["timestamp"]) & (mergedDF["timestamp"] < 1557846000000)
]

# print("Locate the first ON_FOOT event for each date ...")
print("Get TotalStep during 18:00 - 24:00 ... ")
ret_csv = pd.DataFrame(columns=["userID", "date", "totalStep"])

firstStep = 0
lastStep = 0
prev_date = mergedDF.iloc[0]["datetime"].date()

for i, (idx, row) in enumerate(mergedDF.iterrows()):
    user = row["userID"]
    date = row["datetime"].date()

    # if (ret_csv[ret_csv["userID"] == user]["date"] == date).any():
    #     continue

    if firstStep == 0 and row["datetime"].time() > datetime.strptime("18:00", "%H:%M").time():
        firstStep = row["TotalSteps"]

    if prev_date != date and i >= 1:
        if mergedDF.iloc[i-1]["datetime"].time() > datetime.strptime("18:00", "%H:%M").time():
            lastStep = mergedDF.iloc[i-1]["TotalSteps"]

        totalStep = lastStep - firstStep

        print("before update: ", prev_date, date, mergedDF.iloc[i-1]["datetime"], lastStep, firstStep)

        new_row = pd.DataFrame(
            {"userID": [mergedDF.iloc[i-1]["userID"]], "date": [prev_date], "totalStep": [totalStep]}
        )
        ret_csv = pd.concat([ret_csv, new_row], axis=0)

        # reset and initialize
        firstStep = 0
        lastStep = 0
        prev_date = date
        # print("after update: ", prev_date, date, mergedDF.iloc[i-1]["datetime"], lastStep, firstStep)
        # print("\n")
        continue
    
    # last row of the dataframe
    if i == len(mergedDF) - 1:
        print("Add last row ...")
        if row["datetime"].time() > datetime.strptime("18:00", "%H:%M").time():
            lastStep = row["TotalSteps"]
        totalStep = lastStep - firstStep
        new_row = pd.DataFrame(
            {"userID": [user], "date": [date], "totalStep": [totalStep]}
        )
        ret_csv = pd.concat([ret_csv, new_row], axis=0)


    # firstStep = row["TotalSteps"]
    # time = row["datetime"].time()
    # if time < datetime.strptime("18:00", "%H:%M").time():
    #     continue
    #     # print(user, date, wakeUpTime)

ret_csv = ret_csv.reset_index(drop=True)

print("Save the result file ...")
ret_csv.to_csv("src/processing/csvs/nightStep.csv", mode="w")

print("Done")
