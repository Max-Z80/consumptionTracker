import { countDaysBetween } from "./time";

/**
 * Get parsed data for the chart
 * @returns {Object} parsed data. Empty object otherwise
 */
export function getParsedData(rawData) {
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

  function getConsumptionData(sortedData) {
    return sortedData
      .filter((item) => item.m3)
      .map((item, index, array) => {
        if (index === 0) {
          return {};
        }

        return {
          x: new Date(item.date),
          y: parseInt(array[index].m3, 10) - parseInt(array[index - 1].m3, 10),
        };
      });
  }

  const sortedData = sortByDate(rawData);

  if (rawData) {
    parsed.datasets = [
      {
        label: "m3",
        fill: false,
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
        pointStyle: "rect",
        pointRadius: 6,
      },
      {
        label: "consumption (since last reading)",
        fill: false,
        data: getConsumptionData(sortedData),
        yAxisID: "consumption",
        backgroundColor: "rgba(91,138,240,0.3)",
        borderColor: "rgba(91,138,240,0.3)",
      },
    ];
  }

  return parsed;
}

export function getOptions() {
  return {
    legend: {
      display: false,
    },

    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
          },
        },
      ],
      yAxes: [
        {
          id: "m3",
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "left",
          scaleLabel: {
            display: true,
            labelString: "water counter [m3]",
          },
          ticks: {
            beginAtZero: true,
          },
        },
        {
          id: "note",
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          ticks: {
            beginAtZero: true,
            max: 1,
          },
        },
        {
          id: "consumption",
          type: "linear",
          display: true,
          position: "right",
          scaleLabel: {
            display: true,
            labelString: "water consumption [m3]",
            fontColor: "rgba(91,138,240,0.8)",
          },
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dsIndex = tooltipItem.datasetIndex;
          let axisLabel = data.datasets[dsIndex].label || "";

          if (axisLabel) {
            axisLabel += ": ";
          }

          if (data.datasets[dsIndex].label === "note") {
            const pointLabel =
              data.datasets[dsIndex].data[tooltipItem.index].label || "";
            axisLabel += pointLabel;
          } else if (
            data.datasets[dsIndex].label === "consumption (since last reading)"
          ) {
            const consoSinceLastReading =
              data.datasets[dsIndex].data[tooltipItem.index].y;
            axisLabel += consoSinceLastReading;

            axisLabel += " m3; daily: ";
            const dayCountSinceLastReading = countDaysBetween(
              data.datasets[0].data[tooltipItem.index - 1].x,
              data.datasets[0].data[tooltipItem.index].x
            );
            const dailyConso = Math.round(
              (consoSinceLastReading / dayCountSinceLastReading) * 1000
            );
            debugger;
            axisLabel += dailyConso;
            axisLabel += " L";
          } else {
            const pointLabel =
              data.datasets[dsIndex].data[tooltipItem.index].y || "";
            axisLabel += pointLabel;
          }
          return axisLabel;
        },
      },
    },
  };
}
