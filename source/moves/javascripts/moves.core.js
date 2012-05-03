var moves = M = { dom : {}};

//set device
moves.device = ($(window).width() > 767) ? 'tablet' : 'mobile';
$(document.body).addClass(moves.device+'-device');

console.log(moves.device)

moves.opts = {};

// =====================
// = Class constructor =
// =====================
var Class = function(){ 
    
  var that = this,
      args = arguments,
      parent = (args[0] instanceof Class) ? args[0] : null,
      opts = (args[0] instanceof Class != true ) ? args[0] || {} : args[1] || {};
  
  // called when invoked as a constructor with "new" for create instances
  var klass = function(){
     console.log('Class constructor invoked!!!');
     var inst_this = this,
         inst_arguments = arguments,
         initHandler = function(){
           if (!inst_this.already_instanciated) inst_this.init.apply(inst_this, inst_arguments);
         },
         t;
     
     this.already_instanciated = false;
     
     inst_this.before_init.apply(inst_this, inst_arguments);
     
     if (that.isReady) {
       initHandler();
      }else{
       t = setInterval(function(){
         if (that.isReady) {
           initHandler();
           clearInterval(t);
         }
       }, 800);
     }
     
  };
  
  this.isReady = false;
  this.callbacks_queue = [];
  
  if (yepnope && opts.dependencies && opts.dependencies.length > 0){
    for (var i = opts.dependencies.length - 1; i >= 0; i--){
      console.log('DEPENDENCIE N:', i);
      if (!opts.dependencies[i].test || !opts.dependencies[i].callback ) return;
      var completeCallback = opts.dependencies[i].callback || function(){};
      opts.dependencies[i].callback = function(){
        console.log('managing callback in Klass', this, that.callbacks_queue.length);
        that.isReady = true;
        for (var i = that.callbacks_queue.length - 1; i >= 0; i--){
          console.log(callbacks_queue[i].valueOf());
          that.callbacks_queue[i].apply(that, args);
        };//end for
        that.callbacks_queue = [];
        completeCallback();
      };//end callback fn
      
    };//end for
    
    yepnope(opts.dependencies);

  }else{
    console.log('init without yepnope');
    // this.init.apply(this, args);
    this.isReady = true;
  }
  
  
  
  klass.ready = function(callback){
    if (!callback && typeof callback != 'function') return this;
    if (that.isReady) {
      callback.apply(that, arguments);
    }else{
      that.callbacks_queue.push( callback )
    }
    return that;
  }
  
  
  // inheritance from parent Class
  // Change klass' prototype 
  if (parent && parent instanceof Class) {
    var subclass = function() { };
    subclass.prototype = parent.prototype; 
    klass.prototype = new subclass;  
  }
 
  
  //called when Class isReady (when all dependencies are loaded and executed)
  klass.prototype.init = function(){}; 
  //called when klass is instancied before all dependencies are loaded, if exists.
  klass.prototype.before_init = function(){};
  // Shortcut to access prototype 
  klass.fn = klass.prototype;
  // defaults
  klass.defaults = {};
  klass.dependencies = [];
  klass.polyfill_dependencies = [];
  
  // Adding a proxy function 
  klass.proxy = function(func){ 
    var self = this; 
    return(function(){
      return func.apply(self, arguments);
    });
  }
  
  // Add the function on instances too 
  klass.fn.proxy = klass.proxy;
  
  // Shortcut to access class 
  klass.fn.parent = klass;
  
  
  // Adding class properties 
  klass.extend = function(obj){
    var extended = obj.extended;
    for(var i in obj) {
      klass[i] = obj[i];
    }
    if (extended) extended(klass);
  }
  
  // Adding instance properti
  klass.include = function(obj){ 
    var included = obj.included; 
    for(var i in obj){
      klass.fn[i] = obj[i];
    }
    if (included) included(klass);
  };
  
  return klass;
};