

function createFunctionRegistry() {
  const registry = {};
  return {
    registerFunction(name, fn) {
      if (typeof fn !== "function") {
        throw new Error("registered function not");
      }
      registry[name] = fn;
    },
    executeFunction(name, args = [], context = null) {
      if (!registry[name]) {
        throw new Error("function  not registered");
      }
      return registry[name].apply(context, args);
    },
    map(name, dataArray) {
      if (!registry[name]) {
        throw new Error(`function ${name} is not registered`);
      }
      return dataArray.filter((item) => registry[name](item));
    },
    reduce(name, dataArray, initialValue) {
      if (!registry[name]) {
        throw new Error(`function ${name} is not registered`);
      }
      return dataArray.reduce(
        (acc, item) => registry[name](acc, item),
        initialValue
      );
    },
    async executeFunctionAsync(name, args = [], delay = 0) {
      if (!registry[name]) {
        throw new Error(`function ${name} is not registered`);
      }
      return new Promise((resolve) => {
        setTimeout(() => resolve(registry[name](...args)), delay);
      });
    },
    exportRegistry() {
      return JSON.stringify(Object.keys(registry));
    },
  };
}
const registry = createFunctionRegistry();
registry.registerFunction("double", (x) => x * 2);
console.log(registry.executeFunction("double", [5]));


registry.executeFunctionAsync("double", [4], 2000).then(console.log);

