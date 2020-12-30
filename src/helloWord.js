export function sayHello() {
  return "not mocked version";
}

const helloWord = {
  sayHello: sayHello
};

export default helloWord;
