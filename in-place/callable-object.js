function originalFunction(x) {
  return x * 2;
}

// Create a callable object that wraps the original function
const callableObject = {
  originalFunction,
  call: function(x) {
      console.log(`Original result: ${this.originalFunction(x)}`);
      // Modify the result after calling the original function
      return this.originalFunction(x) + 10;
  }
};

// Use the callable object like a function
console.log(callableObject.call(5)); // Original result: 10
                                   // 20