function originalFunction(x) {
  return x * 2;
}

// Create a proxy that wraps the original function
const proxiedFunction = new Proxy(originalFunction, {
  apply: function(target, thisArg, argumentsList) {
      console.log(`Intercepting call to function with arguments: ${argumentsList}`);
      // Modify the arguments before passing them to the original function
      const modifiedArgs = argumentsList.map(arg => arg + 1);
      // Call the original function with modified arguments
      return target.apply(thisArg, modifiedArgs);
  }
});

// Call the proxied function
console.log(proxiedFunction(2)); // Output: Intercepting call to function with arguments: 2
                               // 6