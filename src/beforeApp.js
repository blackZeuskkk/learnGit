// this is before func
// this func can do somethings before init

function isPromise(func) {
  return func && typeof func.then === "function";
}

function before(func) {
  if (process && process.env !== "production") {
  // if (true) {
    // dev
    if (isPromise(func)) {
      // promise then do something
    } else {
      // before()
      console.log("before");
      // not async
      func();
    }
  } else {
  }
}
