WhenLoaded.forEach(function (f) {
    console.log(f);
    if (typeof(f) === "function")
      f();
})