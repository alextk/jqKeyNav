beforeEach(function() {
  this.addMatchers({
    toBeFunction: function() {
      return $.isFunction(this.actual);
    }
  })
});
