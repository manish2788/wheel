class TaskScheduler {
  #taskQueue = {
    microTasks : [],
    macroTasks : []
  };
  schedule(taskFn, priority, isMicroTask) {
    const data = {"priority":priority, "callback" : taskFn}
    this.#taskQueue[isMicroTask ? 'microTasks' : 'macroTasks'].push(data);
  }
  executeTaskQueue(taskQueue) {
    taskQueue.forEach(task => {      
      task.callback();
    });
  }
  run() {
    this.#taskQueue.microTasks.sort((a,b) => b.priority - a.priority);
    this.#taskQueue.macroTasks.sort((a,b) => b.priority - a.priority);
    this.executeTaskQueue(this.#taskQueue.microTasks);
    this.executeTaskQueue(this.#taskQueue.macroTasks);
  }
}




const scheduler = new TaskScheduler();

scheduler.schedule(() => {
  setTimeout(()=> {
    console.log("Task A")
  }, 3*1000);
}, 5, true);   // high priority microtask
scheduler.schedule(() => console.log("Task B"), 1, false);  // low priority macrotask
scheduler.schedule(() => {
  Promise.resolve().then(() => {
    setTimeout(()=> {
      console.log("Task C")
    }, 3*1000);
  });
}, 3, true);   // medium microtask
scheduler.schedule(() => console.log("Task D"), 2, false);  // medium macrotask

scheduler.run();

// Expected Output
// Task A
// Task C
// Task D
// Task B
