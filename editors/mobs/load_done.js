WhenLoaded.forEach(function (f) {
    if (typeof(f) === "function")
      f();
})