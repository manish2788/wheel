class MyPromise {
  constructor(callback) {
    this.result = undefined;
    this.state = "pending";
    this.thenables = [];
    callback(this.resolve.bind(this), this.reject.bind(this));
  }
  then(fn) {
    this.thenables.push(fn);
    return this;
  }
  resolve(val) {    
    this.result = val;
    let storedValue = val;
    this.state === "fulfilled";
    this.thenables.forEach(fn => {
      console.log("------", this.result);
      storedValue = fn(storedValue);
    });
  }
  reject(val) {
    throw new Error(val);
  }
}


function testTimeout() {
  const promiseObject = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      const time = new Date().getTime();
      if(time%2 === 0) {
        resolve("Even!!")
      }
      else {
        resolve("Odd!!");
      }
    }, 3*1000)
  });
  return promiseObject;
}

async function demo() {
  const p1 = testTimeout();
  p1.then(result => {
    console.log(`Result : ${result}`);
    return result+"OM...."
  }).then(result => {
    console.log(`-Result : ${result}`);
  });
}
demo();