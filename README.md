# UniSelf

**CS481 Data Visualization TEAM UniSelf**

| **Name**       | **Student ID** |
| :------------- | :------------- |
| Seungyeon Choi | 20190656       |
| Hanbee Jang    | 20200552       |
| Yumin Cho      | 20200612       |

---

## Contents
- [UniSelf](#uniself)
  - [Contents](#contents)
  - [Description](#description)
    - [Service Intro](#service-intro)
    - [Service Value](#service-value)
  - [Code Organization](#code-organization)
    - [Data Processing](#data-processing)
    - [Feature Implementation](#feature-implementation)
  - [Final Result](#final-result)
    - [Deployed Link](#deployed-link)

---

## Description

### Service Intro

This is a service for **Human *Routine* Visualizer**.

Here, *Routine* means any intended act of repeatedly training at a certain time and period to materialize the future one draw, a promise with oneself to become "better me" in the long run.

### Service Value

Routine Beginners often fail in less than three days, even if they decide to practice their routines with passion and will. We identified the reason as below.
1.  They don't know the proper level of difficulty that suits them yet.
2.  It is hard to imagine how their small daily practices affect them in the long run.
3.  Daily routine practiced alone may not be fun, or may lack adequate motivation.

Most importantly, practicing the daily routine is the process of finding out that

>If I do well, sometimes I don't, and that one day's practice is just one step, and that one day's failure does not mean that the entire routine has failed.

Therefore, the value our service presents is

>Let's be motivated by looking at my daily routines that flow, even if we do well and sometimes we don't.

---

## Code Organization

### Data Processing
```
📦src
 ┣ 📂elements
 ┣ 📂processing
 ┃ ┣ 📂codes
 ┃ ┃ ┣ 📜calcSNSUsage.py
 ┃ ┃ ┣ 📜calcStep.py
 ┃ ┃ ┣ 📜calcStudyTimes.py
 ┃ ┃ ┣ 📜calcUVExposureTimes.py
 ┃ ┃ ┣ 📜calcWakeUpTime.py
 ┃ ┃ ┣ 📜mergeDayRoutines.py
 ┃ ┃ ┣ 📜mergeMorningRoutines.py
 ┃ ┃ ┣ 📜mergeStudyTimes.py
 ┃ ┃ ┗ 📜mergeUVExposureTimes.py
 ┃ ┣ 📂csvs
 ┃ ┃ ┣ 📜SNSUsages.csv
 ┃ ┃ ┣ 📜SNSUsagesFinal.csv
 ┃ ┃ ┣ 📜StudyTimesFinal.csv
 ┃ ┃ ┣ 📜StudyTimes_Final.csv
 ┃ ┃ ┣ 📜UVExposureTimes.csv
 ┃ ┃ ┣ 📜UVExposureTimesFinal.csv
 ┃ ┃ ┣ 📜UVExposureTimes_Final.csv
 ┃ ┃ ┣ 📜dayRoutineResults.csv
 ┃ ┃ ┣ 📜morningRoutineResults.csv
 ┃ ┃ ┣ 📜nightStep.csv
 ┃ ┃ ┣ 📜nightStep_final.csv
 ┃ ┃ ┣ 📜studyTimes.csv
 ┃ ┃ ┣ 📜wakeUpTimes.csv
 ┃ ┃ ┗ 📜wakeUpTimesFinal.csv
 ┃ ┣ 📂dataset
 ┃ ┃ ┣ 📂P0701
 ┃ ┃ ┃ ┣ 📜(csv files of this person)
 ┃ ┃ ┃ ┗ 📜...
 ┃ ┃ ┣ 📂...
 ┃ ┃ ┗ 📂P3041
 ┣ 📂routineInfos
 ┃ ┣ 📜allUsersRoutine.json
 ┃ ┣ 📜companionList.json
 ┃ ┣ 📜dayRoutineResults.json
 ┃ ┣ 📜morningRoutineResults.json
 ┃ ┣ 📜nightRoutineResults.json
 ┗ ┗ 📜routineResults.json
```
- Skill Set: Pandas of Python
- The provided dataset are located at `src/processing/dataset`, which is not shown in github (because of its large file size)
- The python codes for data processing are located at `src/processing/codes`
  - Currently, we have processed total 5 types of routine, so there are basically 5 `calc___.py` files, `___` corresponds to the rough routine name.
  - As we determined to distiguish each 3 different timezone for each day; Morning, Day, and Night, there are `merge___.py` files, to merge all routine related data of each time zone into one file.
- Resulting csv files are stored at `src/processing/csvs`.
- In order to use these processed data in React codes, we also make json files at `src/routineInfos`.
  - The contents are exactly the same as the corresponding csv files, but only format is different.
  - In our service, there are four virtual users, and since there is no information from the actual dataset on what routines they are each practicing and what other users they have added as routine companions, these kinds of information were also arbitrary generated as in `📜allUsersRoutine.json` and `📜companionList.json`.

### Feature Implementation
```
📦src
 ┣ 📂elements
 ┃ ┣ 📂Calendar
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂ComboChecker
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂ComboCheckerBar
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂CompanionAddModal
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂CompanionDeleteModal
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂CompanionHeatmap
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂CompanionPage
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂CompanionProfile
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂CompanionScroll
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂CompanionSearchUnit
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂CreateRoutine
 ┃ ┃ ┣ 📜createButton.js
 ┃ ┃ ┣ 📜createModal.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂DetailGraph
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂DetailGraph_time
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂FlowGraph
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂FlowGraph_time
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂MainPage
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂Navbar
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂RoutineList
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂RoutinePage
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂SubPage
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂TimezoneBtns
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂Waves
 ┃ ┃ ┣ 📜index.js
 ┗ ┗ ┗ 📜style.css
 ```

- Skill Set: React (including React-plotly, React-wavify, React-dom, ...) and Firebase (to deploy)
- This website mainly have page structure as below. All the directories below are inside of `src/elements/___`.
  - Common
    - Related files: `📂Navbar`

  - **Main Page**
    - <img width="1500" alt="MainPage" src="https://github.com/nsy033/CS481_UniSelf/assets/76762181/23e30acc-a0f7-4b26-8b1f-f7feae05cbc1">
    - Related files: `📂MainPage`, `📂Waves`, `📂RoutineList`
  - **Sub Page**, for each timezone
    - <img width="1500" alt="MorningPage" src="https://github.com/nsy033/CS481_UniSelf/assets/76762181/77446212-64b4-42d6-993f-d302035070ab">
    - Related files: `📂SubPage`, `📂Calendar`, `📂ComboChecker`, `📂ComboCheckerBar`, `📂CreateRoutine`
  - **Routine Page**, for each routine
    - <img width="1500" alt="RoutinePage" src="https://github.com/nsy033/CS481_UniSelf/assets/76762181/2f4a8366-09f3-493c-98bf-728f8cc0f3ee">
    - Related files: `📂RoutinePage`, `📂DetailGraph`, `📂DetailGraph_time`, `📂FlowGraph`, `📂FlowGraph_time`
  - **Companion Page**
    - <img width="1500" alt="CompanionPage" src="https://github.com/nsy033/CS481_UniSelf/assets/76762181/e9067e5a-e621-456a-97c9-7d4770995025">
    - Related files: `📂CompanionPage`, `📂CompanionAddModal`, `📂CompanionDeleteModal`, `📂CompanionHeatmap`, `📂CompanionProfile`, `📂CompanionScroll`, `📂CompanionSearchUnit`, `📂TimezoneBtns`
---

## Final Result

### Deployed Link
- https://cs481-uniself.web.app/
- Notice
  - Chrome browser recommended
