export const url = {
  test:
    process.env.NODE_ENV === "development"
      ? "https://jsonplaceholder.typicode.com"
      : "https://jsonplaceholder.typicode.com"
};

console.log("this app is test Service", `${process.env.NODE_ENV.substr(0, 2)}`);
