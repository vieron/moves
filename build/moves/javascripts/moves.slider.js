// MARKUP:
//
//<div class="slider">   <---- this class required
// <ul>
//   <li></li>
//   <li></li>
//   <li></li>
// </ul>
//</div>
(function(a,b,c,d){var e={dependencies:[{test:typeof iScroll,yep:"/moves/moves/javascripts/libs/iscroll.js",callback:function(){console.log("loaded iScroll")}}]};M.Slider=new Class(e),M.Slider.defaults={autoplay:!0,autoplayDelay:3e3,autoplayStopAtAction:!0,onresize:function(){},iScroll:{scrollbarClass:"scroll",snap:!0,momentum:!1,hScrollbar:!1,vScrollbar:!1,scrollV:!1,onTouchEnd:function(){this.M_Slider.autoStop()},onScrollEnd:function(){this.M_Slider.pager_items.removeClass("active").eq(this.currPageX).addClass("active")}}},M.Slider.include({before_init:function(c,d){var e=this;this.options=a.extend({},M.Slider.defaults,d),this.element=c,this.slides=c.find("ul > li"),this.slides_length=this.slides.length,a(b).on("resize",a.proxy(this.resize,this)),this.setSlidesWidths().createNextPrevNav().createPager()},init:function(a,b){return this.iScroll=new iScroll(this.element[0],this.options.iScroll),this.iScroll.M_Slider=this,this.options.autoplay&&this.play(),this},setSlidesWidths:function(){return this.element.find("ul > li").css("width",this.element.width()),this},createPager:function(){var b=function(b){return this.autoStop().goTo(a(b.target).attr("href").replace("#","")),!1},c="";for(var d=0;d<this.slides_length;d++)c=c+'<a href="#'+d+'">'+d+"</a>";return this.pager=a('<nav class="slider-pager" />').html(c).appendTo(this.element),this.pager_items=this.pager.find("a"),this.pager_items.first().addClass("active"),this.pager.on("click","a",a.proxy(b,this)),this},createNextPrevNav:function(){var b=this,c='<a href="#prev" class="slider-arrow slider-arrow-prev" data-increment="-1">Prev</a>';return c+='<a href="#next" class="slider-arrow slider-arrow-next" data-increment="+1">Next</a>',this.nav=a('<nav class="slider-nav" />').html(c).appendTo(this.element),this.nav.on("click","a",function(){var c=parseInt(b.iScroll.currPageX)+parseInt(a(this).attr("data-increment"));b.autoStop().goTo(c)}),this},goTo:function(a){a=="next"?a=this.iScroll.currPageX+1:a=="prev"&&(a=this.iScroll.currPageX-1),a>=this.slides_length?a=0:a<0&&(a=this.slides_length),this.iScroll.scrollToPage(a,0,800)},play:function(){var a=this;return this.autoplay_timer=setInterval(function(){a.goTo("next")},this.options.autoplayDelay),this},autoStop:function(){return this.options.autoplayStopAtAction&&this.stop(),this},stop:function(){return this.autoplay_timer&&clearInterval(this.autoplay_timer),this},resize:function(){return this.setSlidesWidths(),this.iScroll.refresh(),this.options.onresize.call(this,this.viewport_calculated_height,this.page_sections_content_heights),this}})})($,window,document);