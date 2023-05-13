import pandas as pd
import plotly.express as px
from datetime import timedelta, datetime

print("Read csv files ...")
df = pd.read_csv("./wakeUpTimes.csv")

print("Modify date and uID values ...")
for idx, row in df.iterrows():
    uID = int(row["userID"][3:]) - 1
    df["date"][idx] = (pd.to_datetime(row["date"]) + timedelta(days=uID * 7)).date()
df["userID"] = df["userID"][0]
df = df.drop(labels='Unnamed: 0', axis=1)

print("Save the result file ...")
df.to_csv("./wakeUpTimesFinal.csv", mode="w")

print("Done")
