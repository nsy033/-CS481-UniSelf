import pandas as pd
import plotly.express as px
from datetime import timedelta, datetime

print("Read csv files ...")
df = pd.read_csv("../csvs/UVExposureTimes.csv")

print("Modify date and uID values ...")
df["userID__origin"] = df["userID"]
df["userID"] = df["userID"][0]
df["date__origin"] = df["date"]
df["date"] = pd.date_range(
    pd.to_datetime(df["date__origin"].max()) - timedelta(days=df.shape[0] - 1),
    pd.to_datetime(df["date__origin"].max()),
    freq="D",
)

df = df.drop(labels="Unnamed: 0", axis=1)

print("Save the result file ...")
df.to_csv("../csvs/UVExposureTimesFinal.csv", mode="w")

print("Done")
