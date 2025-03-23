class Example {
  constructor() {
    this.value = 42;
    return { differentValue: 100 }; // This replaces the instance
  }
}

const ex = new Example();
console.log(ex); // { differentValue: 100 } - NOT an Example instance