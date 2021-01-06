import helloWord from "./helloWord";

jest.mock("./helloWord");

describe("helloWord", () => {
  it.skip("test mocking", () => {
    // //const test = jest.createMockFromModule("./helloWord").default;
    // //test.sayHello = () => "coucou";
    // console.log(helloWord);
    // console.log(helloWord.sayHello());
  });
});
