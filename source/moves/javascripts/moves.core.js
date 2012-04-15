var moves = M = { dom : {}};


var Class = function(){ 
    
  var that = this,
      args = arguments,
      parent = (args[0] instanceof Class) ? args[0] : null,
      opts = (args[0] instanceof Class != true ) ? args[0] : args[1] || null;
      
  var klass = function(){
     console.log('Class constructor invoked!!!');
     var inst_this = this,
         inst_arguments = arguments,
         initHandler = function(){
           inst_this.init.apply(inst_this, inst_arguments)
         },
         t;
     
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
    var that = this;
    for (var i = opts.dependencies.length - 1; i >= 0; i--){
      console.log('DEPENDENCIE N:', i);
      if (!opts.dependencies[i].test || !opts.dependencies[i].callback ) return;
      var completeCallback = opts.dependencies[i].callback || function(){};
      opts.dependencies[i].callback = function(){
        console.log('managing callback in Klass', this);
        that.isReady = true;
        for (var i = that.callbacks_queue.length - 1; i >= 0; i--){
          that.callbacks_queue[i].apply(that, args);
        };;//end for
        that.callbacks_queue = [];
        completeCallback();
      };//end callback fn
      
    };//end for
    
    yepnope(opts.dependencies);

  }else{
    console.log('init without yepnope')
    // this.init.apply(this, args);
    this.isReady = true;
  }
  
  
  
  this.ready = function(callback){
    if (!callback && typeof callback != 'function') return this;
    
    if (this.isReady) {
      callback.apply(this, arguments);
    }else{
      this.callbacks_queue.push( callback )
    }
    return this;
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