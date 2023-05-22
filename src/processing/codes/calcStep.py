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

resultDF = pd.DataFrame()

mergedDF = pd.DataFrame()
for i in range(1, 6):
    uID = "USER" + str(i)
    users[uID] = list(filter(lambda pNum: pNum not in absentUsers, users[uID]))
    print("For making USER", i, ", extracting participants", users[uID])

    print("Merge into one dataframe ...")
    for user in users[uID]:
        for date in dates[uID]:
            df = pd.read_csv(
                "src/processing/dataset/%s/Pedometer-%d.csv" % (user, date)
            )

            df["userID"] = user
            df["datetime"] = pd.to_datetime(df["timestamp"], unit="ms")
            df["datetime"] = pd.DatetimeIndex(df["datetime"]) + timedelta(hours=9)
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

            print("update: ", prev_date, date, mergedDF.iloc[i-1]["datetime"], lastStep, firstStep)

            # 이미 있는 데이터면 덮어쓰기
            if (((ret_csv['userID'] == mergedDF.iloc[i-1]["userID"]) & (ret_csv['date'] == prev_date)).any()):
                ret_csv.loc[(ret_csv['userID'] == mergedDF.iloc[i-1]["userID"]) & (ret_csv['date'] == prev_date), ['totalStep']] = totalStep

            else:
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
    ret_csv.to_csv(f"src/processing/csvs/nightStep_{uID}.csv", mode="w")

    print("Done")

    incomplete_df = pd.read_csv(f'src/processing/csvs/nightStep_{uID}.csv')
    print(incomplete_df)

    min_date = incomplete_df.min().date
    max_date = incomplete_df.max().date

    min_date = datetime.strptime(min_date, "%Y-%m-%d").date()
    max_date = datetime.strptime(max_date, "%Y-%m-%d").date()

    date_list = [datetime.strftime(min_date + timedelta(days=x), "%Y-%m-%d") for x in range(len(dates))]

    dateMax = incomplete_df["date"].max()

    incomplete_df["date"]= pd.date_range(
            pd.to_datetime(dateMax) - timedelta(days=incomplete_df.shape[0] - 1),
            pd.to_datetime(dateMax),
            freq="D",
        )

    incomplete_df = incomplete_df.loc[incomplete_df["date"] >= "2019-01-26"].reset_index()
    incomplete_df["userID"] = uID
    incomplete_df = incomplete_df[["userID", "date", "totalStep"]]

    resultDF = pd.concat([resultDF, incomplete_df], axis=0)
    print(incomplete_df)
    print(resultDF)

resultDF.to_csv("src/processing/csvs/nightStep_final.csv", mode="w")