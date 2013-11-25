$(function() {
	
    $.fn.drags = function(opt) {

        opt = $.extend({cursor:"move"}, opt);
		var drgoff = this.offset().top;
        var $el = this;
        

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            var $drag = $(this).addClass('draggable');
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
				max_margin = $drag.parent().height() - drg_h + drgoff,
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
				var top_margin = e.pageY + pos_y - drg_h;
				if (top_margin>drgoff)
				{top_margin=drgoff}
				if (top_margin<max_margin)
				{top_margin=max_margin;}
              $('.draggable').offset({
                    top:top_margin
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
                $(this).removeClass('draggable');
            
        });

    }
$('.cvr').drags();
});
