var middleware = new Middleware();

middleware.use(function (next) {
    var self = this;
    setTimeout (function() {
        self.hook1 = "Hook 1";
        console. log ("Running Hook 1"); console. log (new Date() - start);
        next();
    }, 1*1000)
});


middleware.use(function (next) {
    var self = this;
    setTimeout(function() {
        self.hook2 = "Hook 2";
        console. log (new Date() - start);
        next();
    },1*1000);
})

var start = new Date();
middleware.go(function() {
    console. log(this.hook1); // true
    console. log (this.hook2); // true
    console. log (new Date() - start); // around 20
})

class Middleware {
  constructor() {
    this.taskQueue = [];
    this.callback = undefined;
  }
  use(fn) {
    this.taskQueue.push(fn.bind(this, this.next));
  }
  go(fn) {
    this.callback = this.callback ? this.callback : fn;
    if(this.taskQueue.length === 0) {
      this.callback();
    }
    else {
      let currentTask = this.taskQueue.shift();
      currentTask.call(this);
    }
  }
  next() {
    this.go(this.callback);
  }
}