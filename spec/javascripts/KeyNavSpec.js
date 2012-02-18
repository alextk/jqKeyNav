describe("KeyNav", function() {

  it("it should init only specified handlers", function() {
    var keyNav = $.keyNav({enter: function(){ }, esc: function(){}});
    expect(Object.keys(keyNav.handlers).length).toEqual(2);
    expect(keyNav.handlers.enter).toBeFunction();
    expect(keyNav.handlers.esc).toBeFunction();
  });

  describe('$.keyNav()', function(){

    var input1Triggers;
    var input1;

    beforeEach(function() {
      loadFixtures('my-fixtures.html');

      input1Triggers = {};

      input1 = $('#div1 input');
      expect(input1).toExist();

      input1.keyNav({
        enter: function(){
          input1Triggers.enter = true;
        },
        any: function(){
          input1Triggers.any = true;
        }
      });

      input1.focus(function(){}); //so data('events') won't be nil
    });

    it('it should bind keydown event handler to input1', function(){
      expect(input1.data('events').keydown.length).toEqual(1);
    });

    it('it should remove keydown event handler to when destroyed', function(){
      input1.keyNav('destroy');
      expect(input1.data('events').keydown).toBeUndefined();
      expect(input1.data('keyNav')).toBeUndefined();
    });

    it('it should remove keydown event handler to when unbound', function(){
      input1.keyNav('unbind');
      expect(input1.data('events').keydown).toBeUndefined();
      expect(input1.data('keyNav')).toBeDefined();
    });

    it('it should not rebind keydown event handler more than once', function(){
      input1.keyNav('bind');
      expect(input1.data('events').keydown.length).toEqual(1);
    });

    it('it should invoke enter handler when enter key pressed', function(){
      input1.trigger($.extend(new jQuery.Event('keydown'), {which: 13}));
      expect(input1Triggers.enter).toBeTruthy();
    });

    it('it should invoke any handler when enter key pressed', function(){
      input1.trigger($.extend(new jQuery.Event('keydown'), {which: 13}));
      expect(input1Triggers.any).toBeTruthy();
    });

    it('it should invoke any handler when tab key pressed', function(){
      input1.trigger($.extend(new jQuery.Event('keydown'), {which: 9}));
      expect(input1Triggers.any).toBeTruthy();
    });

  });

});