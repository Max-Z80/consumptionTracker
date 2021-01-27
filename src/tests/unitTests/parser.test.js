import chai from "chai";
import { getParsedData } from "../../helpers/chartHelper";
require("it-each")({ testPerIteration: true });
const resource = require("./resources/parser.resource");
const expect = chai.expect;

describe("parseChartDataUnitTest", () => {
  it.each(resource, "", ["description"], function (element, next) {
    expect(getParsedData(element.input).datasets[0].data).to.deep.equal(
      element.expectedM3Data
    );
    expect(getParsedData(element.input).datasets[1].data).to.deep.equal(
      element.expectedNoteData
    );
    expect(getParsedData(element.input).datasets[2].data).to.deep.equal(
      element.expectedConsumptionData
    );

    next();
  });
});
