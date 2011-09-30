/*
* jqKeyNav - jQuery plugin for keyboard navigation events binding
*
* Version: 0.0.1
* Build: 4
* Copyright 2011 Alex Tkachev
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: 30/09/2011 11:52:00
*/

(function($) {

  // quick lookup mapping
  var keyToHandlerMapping = {
    37: "left",
    39: "right",
    38: "up",
    40: "down",
    33: "pageUp",
    34: "pageDown",
    46: "del",
    36: "home",
    35: "end",
    13: "enter",
    27: "esc",
    9 : "tab"
  };
  
  var KeyNavClass = function() {
    this.initialize.apply(this, arguments);
  };

  $.extend(KeyNavClass.prototype, {

    initialize: function(options) {      
      options = options || {};
      
      this.scope = options.context || options.scope || null;
      // select only defined handlers that are functions
      var handlers = {};
      [ 'enter', 'left', 'right', 'up', 'down', 'tab', 'esc', 'pageUp', 'pageDown', 'del', 'home', 'end' ]
                        .select(function(handlerName){ return $.isFunction(options[handlerName]);  })
                        .each(function(handlerName){ handlers[handlerName] = options[handlerName]; });
      this.handlers = handlers;
    },

    relay : function(e){
      var self = e.data.keynav;

      var keyCode = e.which;
      var handlerName = keyToHandlerMapping[keyCode];
      if(handlerName && self.handlers[handlerName]){
        var func = self.handlers[handlerName];
        var scope = self.scope || func;
        if(func.call(scope, e) !== true){ //invoke handler and cancel event unless true is returned
          e.stopEvent();
        }
      }
    },

    bind: function(){
      this.unbind.apply(this, arguments);
      for(var i=0; i<arguments.length; i++){
        var el = arguments[i];
        if(el instanceof jQuery) el.bind('keydown', {keynav: this}, this.relay);
      }
    },

    unbind: function(){
      for(var i=0; i<arguments.length; i++){
        var el = arguments[i];
        if(el instanceof jQuery) el.unbind('keydown', this.relay);
      }
    }
    
  });
  
  $.fn.keyNav = function(options) {
    return this.each(function() {
      var $this = $(this);
      if($.isPlainObject(options)){
        var keyNav = $.keyNav(options);
        if($this.data('keyNav')){ //remove previous keynav and it's binding
          $this.data('keyNav').unbind();
        }

        $this.data('keyNav', keyNav);
        keyNav.bind($this);

      } else if(options == 'bind'){
        $this.data('keyNav').bind($this);
      } else if(options == 'unbind'){
        $this.data('keyNav').unbind($this);
      } else if(options == 'destroy'){
        $this.data('keyNav').unbind($this);
        $this.removeData('keyNav');
      }
    });
  };

  $.keyNav = function(options){
    return new KeyNavClass(options);
  }

})(jQuery);