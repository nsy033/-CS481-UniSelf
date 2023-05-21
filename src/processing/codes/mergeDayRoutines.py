import pandas as pd

print("Read csv files ...")
routines = ["UVExposureTimes", "studyTimes"]

print("Merge into one dataframe ...")
mergedDF = pd.read_csv("../csvs/%s_Final.csv" % (routines[0]))
mergedDF = mergedDF.drop(labels="Unnamed: 0", axis=1)
# for routine in routines[1:]:
df = pd.read_csv("../csvs/%s_Final.csv" % (routines[1]))
df = df.drop(labels="Unnamed: 0", axis=1)

mergedDF = pd.merge(mergedDF, df, how="inner", on=["userID", "date"])

print(mergedDF)

mergedDF = mergedDF[["userID", "date", "UVExposureTime", "studyTime"]]
print(mergedDF)
print("Save the result file ...")
mergedDF.to_csv("../csvs/dayRoutineResults.csv", mode="w")
mergedDF.to_json(
    "../../routineInfos/dayRoutineResults.json", orient="records"
)

print("Done")