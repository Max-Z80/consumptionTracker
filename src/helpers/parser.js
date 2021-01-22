/**
 * Parse data for the chart
 * @returns {Object} parsed data. Empty object otherwise
 */
function parseChartData(rawData) {
  const parsed = {};

  if (rawData) {
    parsed.datasets = [
      {
        label: "m3",
        data: rawData
          .sort((a, b) => {
            if (new Date(a.date) > new Date(b.date)) {
              return 1;
            }
            if (new Date(a.date) < new Date(b.date)) {
              return -1;
            }
            return 0;
          })
          .map((item) => ({
            x: new Date(item.date),
            y: parseInt(item.m3, 10),
          })),
      },
    ];
  }

  return parsed;
}

export default parseChartData;
