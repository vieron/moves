// MARKUP:
//
//<div class="layout-content-section">   <---- this class required
//  <div data-role="header">
//  </div>
//  <div data-role="header">
//  </div>
//  <div data-role="content">   <--- data-role="content" is resized
//      <ul>
//        <li></li>
//        <li></li>
//    </div><!-- .content -->
//  </div>
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
  
  
  M.Layout = new Class(opts);
  
  M.Layout.defaults = {
    onresize : function(){
      console.log('REFRESHHHH!!! SCROLLSSS', $('.scroll'));
      var that = this;
      $('.scroll').each(function(index){
        that.isCroll_instances[index].refresh();
      });
    }
  }
    
  M.Layout.include({
    before_init : function(element, options){
      this.options = $.extend( {}, M.Layout.defaults , options);
      this.element = element;
      this.isCroll_instances = [];    
      
      $(window).on('resize', $.proxy(this.resize, this));
      console.log('init', this.element)
      
      // for scrollabes
      /*
        TODO dry
      */
      this.adjust();
      
    },
    init : function(element, options){
      var that = this;
      this.adjust();
      $('.scroll').each(function(index){
        that.isCroll_instances.push( ( new iScroll( $(this)[0] , { scrollbarClass: 'scroll' }) ) );
      })

      // this.resize();
    },
    
    adjust : function(){
      var hh = this.element.find('[data-role="header"]').first() || 0;
      var fh = this.element.find('[data-role="footer"]').last() || 0;
      
      this.viewport_calculated_height = parseInt($(window).height()-hh.height()-fh.height());
      
      // this.element.find('[data-role="content"]').first().css('height', this.viewport_calculated_height);
      
      var children_heights = [], that = this;
      this.element.find('.layout-content-section').each(function(index){
        var ch = 0,
            $childrens_not_content = $(this).children().not('[data-role="content"]'),
            $scrolls = $(this).find('.scroll');
        $childrens_not_content.each(function(){
          ch = ch+$(this).height();
        });
        children_heights[index] = parseInt(that.viewport_calculated_height-ch)
        $(this).css({
          height : children_heights[index],
          // overflow: 'hidden'
        })
        $scrolls.css('max-height', children_heights[index]/$scrolls.length );
      });
      
      this.page_sections_content_heights = children_heights;
      
      return this;
    },
    
    resize : function(){
      this.adjust();
      this.options.onresize.call(this);
      console.log('resize');
    }
  });
  
})($, window, document);