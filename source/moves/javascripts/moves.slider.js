// MARKUP:
//
//<div class="slider">   <---- this class required
// <ul>
//   <li></li>
//   <li></li>
//   <li></li>
// </ul>
//</div>





;(function($, window, document, undefined ){
  
  var opts = {
    dependencies : [{
        test : typeof iScroll ,
        yep : '/moves/javascripts/libs/iscroll.js',
        callback : function(){
          console.log('loaded iScroll');
        }
    }]
  };
  
  M.Slider = new Class(opts);
  
  
  M.Slider.defaults = {
    onresize : function(){},
    iScroll : {
      scrollbarClass : 'scroll',
      snap: true,
    	momentum: false,
    	hScrollbar: false,
    	vScrollbar: false,
    	scrollV : false,
    	onScrollEnd : function(){
    	  this.M_Slider.pager_items.removeClass('active').eq(this.currPageX).addClass('active');
      }
    }
  };
  
    
    
  M.Slider.include({
    before_init : function(element, options){
      var that = this;
      this.options = $.extend( {}, M.Slider.defaults , options);
      this.element = element;
      this.slides = element.find('ul > li');
      this.slides_length = this.slides.length;
      
      $(window).on('resize', $.proxy(this.resize, this));
      console.log('init', this.element)
      
      this.createNextPrevNav();
      this.createPager();
      this.setSlidesWidths();
    },
    
    init : function(element, options){
      this.iScroll = new iScroll( this.element[0] , this.options.iScroll);
      this.iScroll.M_Slider = this;
      console.log('iScroll', this.iScroll);
    },
    
    setSlidesWidths : function(){
      this.element.find('ul > li').css('width', this.element.width());
    },
    
    createPager : function(){
      var onClickHandler = function(e){
            console.log(e);
            this.goTo( $(e.target).attr('href').replace('#', '') );
            return false;
          },
          nav = '';
          
      for (var i=0; i < this.slides_length; i++) {
        nav = nav+'<a href="#'+i+'">'+i+'</a>';
      };
      
      this.pager = $('<nav class="slider-pager" />').html(nav).appendTo(this.element);
      this.pager_items = this.pager.find('a');
      this.pager_items.first().addClass('active');
      this.pager.on('tap', 'a', $.proxy(onClickHandler, this));
      return this.pager;
    },
    
    createNextPrevNav : function(){
      var that = this,
          nav = '<a href="#prev" class="slider-arrow slider-arrow-prev" data-increment="-1">Prev</a>';
          nav += '<a href="#next" class="slider-arrow slider-arrow-next" data-increment="+1">Next</a>';
        
      this.nav = $('<nav class="slider-nav" />').html(nav).appendTo(this.element);
      
      this.nav.on('tap', 'a', function(){
        var n = parseInt(that.iScroll.currPageX) + parseInt($(this).attr('data-increment'));
        that.goTo(n);
      });
      
      return this.nav;
    },
    
    goTo : function(n){
      this.iScroll.scrollToPage(n, 0, 800);
    },
    
    resize : function(){
      this.setSlidesWidths();
      this.iScroll.refresh();
      this.options.onresize.call(this, this.viewport_calculated_height, this.page_sections_content_heights);
      console.log('resize');
    }
    
  });
  
})($, window, document);