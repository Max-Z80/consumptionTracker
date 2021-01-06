//var React = require("react");
import React from "react";
import ReactDOM from "react-dom";
import sinon from "sinon";
import api from "./api";
// import Promise from "promise";
// require("promise/lib/rejection-tracking").enable();
const bluebird = require("bluebird");
//var TestUtils = require("react/lib/ReactTestUtils");
//I like using the Test Utils, but you can just use the DOM API instead.

var TestUtils = require("react-dom/test-utils"); // ES5 with npm

var expect = require("expect.js");
var App = require("./App").default; //my root-test lives in components/__tests__/, so this is how I require in my components.

describe("root", function() {
  it("renders without problems", function(done) {
    // sinon.stub(api, "get").resolves({
    //   data: [
    //     { date: "2020-12-18", m3: 100 },
    //     { date: "2020-12-20", m3: 110 }
    //   ]
    // });
    const getPromise = bluebird.Promise.reject(new Error());
    sinon.stub(api, "get").callsFake(() => getPromise);
    const body = document.querySelector("body");
    const container = document.createElement("div");
    body.append(container);
    TestUtils.act(() => {
      ReactDOM.render(<App />, container);
    });

    console.log(document.querySelector("canvas"));
    expect(document.querySelector("canvas")).to.be.ok();

    done();
  });
});
