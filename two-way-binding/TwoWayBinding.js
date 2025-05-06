class TwoWayBinding {
  constructor() {
    this.observedFields = null;
    this.init();
  }
  init() {
    this.observedFields = document.querySelectorAll('[data-bind]');
  }
}

const twoWay = new TwoWayBinding();