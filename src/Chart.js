import { useHistory } from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from "moment";

function Chart(props) {
  const history = useHistory();
  let data = {};

  if (props.data) {
    data = {
      datasets: [
        {
          label: "m3",
          data: props.data
            .sort((a, b) => {
              if (new Date(a.date) > new Date(b.date)) {
                return 1;
              }
              if (new Date(a.date) < new Date(b.date)) {
                return -1;
              }
              return 0;
            })
            .map(item => ({
              x: new Date(item.date),
              y: parseInt(item.m3, 10)
            }))
        }
      ]
    };
  }

  const options = {
    legend: {
      display: false
    },

    scales: {
      xAxes: [
        {
          type: "time"
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "water counter [m3]"
          },

          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  function onClickHandler(elements) {
    console.log("chart was clicked");
    console.log("elements vaut");
    console.log(elements);
    if (elements && elements[0]) {
      const { _datasetIndex, _index } = elements[0];
      const { x, y } = elements[0]._chart.data.datasets[_datasetIndex].data[
        _index
      ];
      const date = moment(x).format("YYYY-MM-DD");
      const m3 = y;

      history.push(
        "/edit?" +
          new URLSearchParams([
            ["date", date],
            ["m3", m3]
          ]).toString()
      );
    }
  }

  return (
    <Line data={data} options={options} onElementsClick={onClickHandler} />
  );
}

export default Chart;
