// this is before func
// this func can do somethings before init

function isPromise(func) {
  return func && typeof func.then === "function";
}

function before(func) {
<<<<<<< HEAD
  if (process && process.env !== "production") {
    // if (true) {
=======
  // if (process && process.env !== "production") {
  if (true) {
>>>>>>> 29dd776e54c52492e4fce1c5fd998a5582b162b5
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
