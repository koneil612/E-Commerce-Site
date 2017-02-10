Handlebars.registerHelper("if", function("product.name", name) {
  if (product.name === "16oz Glass") {
    res.json("You have a mug yay");
  } else {
    res.json("no mug");
  }
});
