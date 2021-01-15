//import { screen, act, fireEvent } from "@testing-library/react";
import App from "./App";
import api from "./api";
import { defaults } from "react-chartjs-2";
import sinon from "sinon";
//import { render } from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import React from "react";
import { use, expect } from "chai";

import { matchSnapshot } from "chai-karma-snapshot";

use(matchSnapshot);
//jest.mock("./history");
defaults.global.animation = false;
defaults.global.responsive = false;

describe("App.js", () => {
  var mockedGet;
  var mockedAdd;

  afterEach(() => {
    mockedGet && mockedGet.restore();
    mockedAdd && mockedAdd.restore();
  });

  it("renders a canvas with a chart", async () => {
    const response = {
      data: [
        { date: "2020-12-18", m3: 100 },
        { date: "2020-12-20", m3: 110 }
      ]
    };
    mockedGet = sinon.stub(api, "get");
    mockedGet.resolves(response);
    const { container } = await render(<App />);

    const canvas = container.querySelector("canvas");
    expect(canvas.toDataURL()).to.matchSnapshot();
  });

  it("renders a title and the Get request is successfull", async () => {
    const mockedData = {
      data: [
        { date: "2020-12-18", m3: 100 },
        { date: "2020-12-20", m3: 110 }
      ]
    };
    mockedGet = sinon.stub(api, "get");
    mockedGet.resolves(mockedData);
    const { getByText } = await render(<App />);

    const title = getByText("Water consumption");
    expect(title.getAttribute("style")).match(/text-align: center/);
  });

  it("renders a title and the Get request fails", async () => {
    mockedGet = sinon.stub(api, "get");
    mockedGet.rejects();
    const { getByText } = await render(<App />);

    const title = getByText("Water consumption");
    expect(title.getAttribute("style")).match(/text-align: center/);
  });

  it("user adds a new value", async () => {
    const mockedData = { data: [] };
    mockedGet = sinon.stub(api, "get");
    mockedGet.resolves(mockedData);
    const { container, getByText, getByLabelText } = await render(<App />);
    mockedGet.restore();

    const addButton = getByText(/[aA]dd/);
    fireEvent(addButton, new MouseEvent("click", { bubbles: true }));

    const panel = container.querySelector("#formCard");
    expect(panel).to.exist;

    fireEvent.change(getByLabelText("Date"), {
      target: { value: "2000-01-01" }
    });
    fireEvent.change(getByLabelText(/^m/), {
      target: { value: "999" }
    });

    const mockedAdd = sinon.stub(api, "add");
    mockedAdd.resolves();

    mockedGet = sinon.stub(api, "get");
    mockedGet.resolves({ data: [{ date: "2000-01-01", m3: 999 }] });

    const sendButton = getByText(/[Ss]end/);
    await act(async () => {
      fireEvent.click(sendButton);
    });

    sinon.assert.calledOnce(mockedAdd);
    sinon.assert.calledWith(mockedAdd, "date=2000-01-01&m3=999");

    const canvas = document.querySelector("canvas");
    expect(canvas.toDataURL()).matchSnapshot();
  });

  it("user edits a value", async () => {
    const chart = require("react-chartjs-2").Chart;

    const mockedData = {
      data: [
        { date: "2020-12-18", m3: 100 },
        { date: "2020-12-20", m3: 110 }
      ]
    };

    mockedGet = sinon.stub(api, "get");
    mockedGet.resolves(mockedData);

    const { getByText } = await render(<App />);
    const chartInstance = chart.instances[Object.keys(chart.instances)[0]];

    await act(async () => {
      clickElement(chartInstance, 0, 0);
    });
    getByText("Edit");
  });
});

function clickElement(chart, datasetIndex, index) {
  const node = chart.canvas;
  const rect = node.getBoundingClientRect();
  const el = chart.getDatasetMeta(datasetIndex).data[index];
  const point = resolveElementPoint(el);

  const event = new MouseEvent("click", {
    clientX: rect.left + point.x,
    clientY: rect.top + point.y,
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
