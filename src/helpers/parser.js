/**
 * Parse data for the chart
 * @returns {Object} parsed data. Empty object otherwise
 */
function parseChartData(rawData) {
  if (!rawData) {
    return {};
  }

  const parsed = {};

  function sortByDate(rawData) {
    return rawData.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return 1;
      }
      if (new Date(a.date) < new Date(b.date)) {
        return -1;
      }
      return 0;
    });
  }

  function getM3Data(sortedData) {
    return sortedData
      .filter((item) => item.m3)
      .map((item) => {
        return {
          x: new Date(item.date),
          y: parseInt(item.m3, 10),
        };
      });
  }

  function getNotesData(sortedData) {
    return sortedData
      .filter((item) => item.note)
      .map((item) => {
        return {
          x: new Date(item.date),
          y: 1,
          label: item.note,
        };
      });
  }

  const sortedData = sortByDate(rawData);

  if (rawData) {
    parsed.datasets = [
      {
        label: "m3",
        data: getM3Data(sortedData),
        yAxisID: "m3",
      },
      {
        label: "note",
        data: getNotesData(sortedData),
        yAxisID: "note",
        type: "scatter",

        pointBackgroundColor: "#b87427",
        pointBorderColor: "#b87427",
        pointStyle: "star",
      },
    ];
  }

  return parsed;
}

export default parseChartData;
