import pandas as pd
import plotly.express as px
from datetime import timedelta, datetime

print("Read csv files ...")
routines = ["calories", "wakeUpTimes", "UVExposureTimes", "studyTimes"]

print("Merge into one dataframe ...")
mergedDF = pd.read_csv("../csvs/%sFinal.csv" % (routines[0]))
mergedDF = mergedDF.drop(labels="Unnamed: 0", axis=1)
for routine in routines[1:]:
    df = pd.read_csv("../csvs/%sFinal.csv" % (routine))
    df = df.drop(labels="Unnamed: 0", axis=1)

    mergedDF = pd.merge(mergedDF, df, how="inner", on=["userID", "date"])

mergedDF = mergedDF[["userID", "date", "CaloriesToday", "wakeUpTime", "UVExposureTime", "studyTime"]]
print("Save the result file ...")
mergedDF.to_csv("../csvs/routineResults.csv", mode="w")
mergedDF.set_index("date").to_json(
    "../../routineInfos/routineResults.json", orient="index"
)

print("Done")
