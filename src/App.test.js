import { screen, render, act, fireEvent } from "@testing-library/react";
import App from "./App";
import api from "./api";
import { defaults } from "react-chartjs-2";

jest.mock("./history");
defaults.global.animation = false;
defaults.global.responsive = false;

test("renders a canvas with a chart", async () => {
  const mockedData = [
    { date: "2020-12-18", m3: 100 },
    { date: "2020-12-20", m3: 110 }
  ];

  const mockedGetValue = mockDataRequest(mockedData);

  const { container } = render(<App />);

  await act(async () => {
    await mockedGetValue;
  });
  const canvas = container.querySelector("canvas");
  expect(canvas.toDataURL()).toMatchSnapshot();
});

test("renders a title", async () => {
  const mockedData = [];
  const mockedGetValue = mockDataRequest(mockedData);
  const { getByText } = render(<App />);
  await act(async () => {
    await mockedGetValue;
  });
  const title = getByText("Water consumption");
  expect(title.getAttribute("style")).toMatch(/text-align: center/);
});

test("user adds a new value", async () => {
  const mockedData = [];
  const mockedGetValue = mockDataRequest(mockedData);
  const { container, getByText, getByLabelText } = render(<App />);
  await act(async () => {
    await mockedGetValue;
  });

  const addButton = getByText(/[aA]dd/);
  fireEvent(addButton, new MouseEvent("click", { bubbles: true }));

  const panel = container.querySelector("#formCard");
  expect(panel).not.toBeNull();

  fireEvent.change(getByLabelText("Date"), { target: { value: "2000-01-01" } });
  fireEvent.change(getByLabelText(/^m/), {
    target: { value: "999" }
  });

  const addValuePromise = new Promise((resolve, reject) => {
    resolve([]);
  });
  const mockedAddValue = jest.fn().mockImplementation(() => addValuePromise);
  api.add = mockedAddValue;
  const sendButton = getByText(/[Ss]end/);
  fireEvent.click(sendButton);
  await act(async () => {
    await addValuePromise;
  });

  expect(mockedAddValue).toHaveBeenCalledTimes(1);
  expect(mockedAddValue).toHaveBeenCalledWith("date=2000-01-01&m3=999");
});

test.only("user edits a value", async () => {
  const chart = require("react-chartjs-2").Chart;

  const mockedData = [
    { date: "2020-12-18", m3: 100 },
    { date: "2020-12-20", m3: 110 }
  ];

  const mockedGetValue = mockDataRequest(mockedData);

  const { getByText } = render(<App />);

  await act(async () => {
    await mockedGetValue;
  });

  const chartInstance = chart.instances[Object.keys(chart.instances)[0]];
  const element = chartInstance.getDatasetMeta(0).data[0];
  //console.log(element._model);
  act(() => {
    clickElement(chartInstance, 0, 0);
  });
  getByText("Edit");
});
/**
 * Mock the Get data request
 * @param {Array} data fake data as provided by the server
 * @returns {fn} mocked axios call
 */
function mockDataRequest(data) {
  const mockedGetValue = jest.fn(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          data: data
        });
      })
  );
  api.get = mockedGetValue;
  return mockedGetValue;
}

function clickElement(chart, datasetIndex, index) {
  var node = document.querySelector("canvas");

  // test
  //   node.addEventListener("click", function(e) {
  //     console.log(e);
  //     console.log("e.clientX vaut: %s", e.clientX);
  //     console.log("e.clientY vaut: %s", e.clientY);
  //     console.log("e.pageX vaut: %s", e.pageX);
  //     console.log("e.pageY vaut: %s", e.pageY);
  //     console.log("e.screenX vaut: %s", e.screenX);
  //     console.log("e.screenY vaut: %s", e.screenY);
  //     console.log("e.offsetX vaut: %s", e.offsetX);
  //     console.log("e.offsetY vaut: %s", e.offsetY);
  //   });
  //end test
  //var node = chart.canvas;
  var rect = node.getBoundingClientRect();
  //  console.log("react");
  //  console.log(rect);
  var el = chart.getDatasetMeta(datasetIndex).data[index];
  console.log("el");
  console.log(el);
  var point = resolveElementPoint(el);
  //console.log("point");
  //console.log(point);
  //console.log(rect);
  var event = new MouseEvent("click", {
    //clientX: rect.left + point.x,
    //clientX: 0 + point.x,
    clientX: 59.16,
    //clientY: rect.top + point.y,
    //clientY: 0 + point.y,
    clientY: 24.47,
    cancelable: true,
    bubbles: true,
    view: window
  });

  node.dispatchEvent(event);
}

function resolveElementPoint(el) {
  var point = { x: 0, y: 0 };
  if (el) {
    if (typeof el.getCenterPoint === "function") {
      point = el.getCenterPoint();
    } else if (el.x !== undefined && el.y !== undefined) {
      point = el;
    } else if (
      el._model &&
      el._model.x !== undefined &&
      el._model.y !== undefined
    ) {
      point = el._model;
    }
  }
  return point;
}
