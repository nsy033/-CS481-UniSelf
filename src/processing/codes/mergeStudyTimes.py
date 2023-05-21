import pandas as pd
import plotly.express as px
from datetime import timedelta, datetime

# print("Read csv files ...")
# df = pd.read_csv("../csvs/StudyTimes.csv")

# print("Modify date and uID values ...")
# df["userID__origin"] = df["userID"]
# df["userID"] = df["userID"][0]
# df["date__origin"] = df["date"]
# df["date"] = pd.date_range(
#     pd.to_datetime(df["date__origin"].max()) - timedelta(days=df.shape[0] - 1),
#     pd.to_datetime(df["date__origin"].max()),
#     freq="D",
# )

# df = df.drop(labels="Unnamed: 0", axis=1)

# print("Save the result file ...")
# df.to_csv("../csvs/StudyTimesFinal.csv", mode="w")

# print("Done")

print("Read csv files ...")
df = pd.read_csv("../csvs/StudyTimes.csv")

date_ranges = {
    "USER1": (pd.to_datetime("2019-01-26"), pd.to_datetime("2019-05-14")),
    "USER2": (pd.to_datetime("2019-01-26"), pd.to_datetime("2019-05-14")),
    "USER3": (pd.to_datetime("2019-01-26"), pd.to_datetime("2019-05-14")),
    "USER4": (pd.to_datetime("2019-01-26"), pd.to_datetime("2019-05-14"))
}

df['date'] = pd.to_datetime(df['date'])

final_csv = pd.DataFrame([])

for user, date_range in date_ranges.items():
    start_date, end_date = date_range
    user_df = df[df['userID'] == user]
    user_dates = pd.date_range(start=start_date, end=end_date, freq="D")

    user_dates = pd.Series(user_dates[:109])

    user_df.loc[user_df['userID'] == user, 'date'] = user_dates
    print(user_df)
    final_csv = pd.concat([final_csv, user_df], axis=0)

# Filter out empty values for USER1
final_csv = final_csv[~((final_csv['userID'] == 'USER1') & (final_csv['date'].isnull()))]

print("Save the result file ...")
final_csv.to_csv("../csvs/StudyTimesFinal.csv", mode="w")

print("Done")
