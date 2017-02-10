Handlebars.registerHelper('isGlass', function(block) {
  if (this.product.name == "Glass") {
    return <
  } else {
    return block.inverse(this);
  }
});
