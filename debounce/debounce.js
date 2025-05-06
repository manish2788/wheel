function debounce(callback, delay) {
  let timer;
  return () => {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, delay);
  }
}

const demoButton =  document.getElementById("debounce");
const content = document.getElementById("content");

let count = 0;

const clickHandler = () => {
  count++;
  console.log(this.caption);
  content.innerText = this.caption + count;
}

const obj = {
  caption: "Current Count",
  handler : function() {
    count++;
    console.log(this.caption);
    content.innerText = this.caption + count;
  }
}

// obj.handler();
const debouncedFn = debounce(obj.handler, 2*1000);
debouncedFn();
// demoButton.addEventListener('click', debouncedFn);