import pandas as pd

print("Read csv files ...")
routines = ["wakeUpTimes", "SNSUsages"]

print("Merge into one dataframe ...")
mergedDF = pd.read_csv("../csvs/%sFinal.csv" % (routines[0]))
mergedDF = mergedDF.drop(labels="Unnamed: 0", axis=1)
for routine in routines[1:]:
    df = pd.read_csv("../csvs/%sFinal.csv" % (routine))
    df = df.drop(labels="Unnamed: 0", axis=1)

    mergedDF = pd.merge(mergedDF, df, how="inner", on=["userID", "date"])

mergedDF = mergedDF[["userID", "date", "totalTimeForeground", "wakeUpTime"]]
print(mergedDF)
print("Save the result file ...")
mergedDF.to_csv("../csvs/morningRoutineResults.csv", mode="w")
mergedDF.to_json(
    "../../routineInfos/morningRoutineResults.json", orient="records"
)

print("Done")
