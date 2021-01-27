Water consumption is a web app which enables you to monitor your water consumption by time.

# Features
- add / edit water readings from your water counter


# Backend
THe backend is part of the project and is stored in the folder `backend`

# Data structure
Data is stored under the form of a CSV file. No DB dependency needed.

The file `vonsumption.csv contains:
first line: the csv header 
next lines: entry. THere must be a date and either a m3 or note or both

```
date;m3;note
2020-12-18;100;
2020-12-19;200;set max shower time to 10min
2021-01-15;250;
```
