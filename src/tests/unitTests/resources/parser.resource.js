module.exports = [
  {
    description: "1 reading, no note",
    input: [{ date: "2020-12-18", m3: "1" }],
    expectedM3Data: [{ x: new Date("2020-12-18"), y: 1 }],
    expectedNoteData: [],
    expectedConsumptionData: [{}],
  },
  {
    description: "2 readings, no note",
    input: [
      { date: "2020-12-18", m3: "1" },
      { date: "2020-12-19", m3: "3" },
    ],
    expectedM3Data: [
      { x: new Date("2020-12-18"), y: 1 },
      { x: new Date("2020-12-19"), y: 3 },
    ],
    expectedNoteData: [],
    expectedConsumptionData: [{}, { x: new Date("2020-12-19"), y: 2 }],
  },
  {
    description: "3 readings, no note",
    input: [
      { date: "2020-12-18", m3: "1" },
      { date: "2020-12-19", m3: "3" },
      { date: "2020-12-20", m3: "6" },
    ],
    expectedM3Data: [
      { x: new Date("2020-12-18"), y: 1 },
      { x: new Date("2020-12-19"), y: 3 },
      { x: new Date("2020-12-20"), y: 6 },
    ],
    expectedNoteData: [],
    expectedConsumptionData: [
      {},
      { x: new Date("2020-12-19"), y: 2 },
      { x: new Date("2020-12-20"), y: 3 },
    ],
  },
  {
    description: "1 reading, with note",
    input: [{ date: "2020-12-18", m3: "10", note: "some note" }],
    expectedM3Data: [{ x: new Date("2020-12-18"), y: 10 }],
    expectedNoteData: [{ x: new Date("2020-12-18"), y: 1, label: "some note" }],
    expectedConsumptionData: [{}],
  },
  {
    description: "2 readings, 1 note (not independant)",
    input: [
      { date: "2020-12-18", m3: "1" },
      { date: "2020-12-19", m3: "3", note: "some note" },
    ],
    expectedM3Data: [
      { x: new Date("2020-12-18"), y: 1 },
      { x: new Date("2020-12-19"), y: 3 },
    ],
    expectedNoteData: [{ x: new Date("2020-12-19"), y: 1, label: "some note" }],
    expectedConsumptionData: [{}, { x: new Date("2020-12-19"), y: 2 }],
  },
  {
    description: "2 readings, 1 note (independant)",
    input: [
      { date: "2020-12-18", m3: "1" },
      { date: "2020-12-19", m3: "3" },
      { date: "2020-12-20", note: "some note" },
    ],
    expectedM3Data: [
      { x: new Date("2020-12-18"), y: 1 },
      { x: new Date("2020-12-19"), y: 3 },
    ],
    expectedNoteData: [{ x: new Date("2020-12-20"), y: 1, label: "some note" }],
    expectedConsumptionData: [{}, { x: new Date("2020-12-19"), y: 2 }],
  },
];
