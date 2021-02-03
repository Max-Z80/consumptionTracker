`consumptionTracker` is a web app which enables you to monitor your consumption by time.

# Features
- add / edit readings


# Backend
The backend is part of the project and is stored in the folder `backend`

# Data structure
Data is stored under the form of a CSV file. No DB dependency needed.

The file `consumption.csv contains:
first line: the csv header 
next lines: entry. There must be a date, then either a reading or a note or both

```
date;m3;note
2020-12-18;100;
2020-12-19;200;set max shower time to 10min
2021-01-15;250;
```
