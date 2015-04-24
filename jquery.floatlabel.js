(function(scope, $) {
  'use strict';

  $.fn.floatlabel = function(options) {
    // Extend the default options with given options.
    options = $.extend({
      prefix: '',
      focus: 'focus',
      active: 'active',
      has_content: 'has-content',
    }, options);

    function triggerChange($element) {
      $element.trigger('floatlabel-change', {
        focus: $element.hasClass(options.prefix + options.focus),
        active: $element.hasClass(options.prefix + options.active),
        has_content: $element.hasClass(options.prefix + options.has_content),
      });
    }

    // Run through the elements.
    return this.each(function() {
      var
      	$container = $(this),
        $input = $('input', this);

      $input
        .bind('focus.floatlabel', function () {
          // We always want the focus and active class on when the element is
          // in focus.
          $container
            .addClass(options.prefix + options.focus)
            .addClass(options.prefix + options.active);
          triggerChange($container);
        })

        .bind('blur.floatlabel', function () {
          if (!hasContent($input)) {
            $container.removeClass(options.prefix + options.active);
          }

          $container.removeClass(options.prefix + options.focus);
          triggerChange($container);
      	})

      	.bind('change.floatlabel keyup.floatlabel blur.floatlabel keydown.floatlabel', function () {
        	if (hasContent($input)) {
            if (!$container.hasClass(options.prefix + options.has_content)) {
              $container.addClass(options.prefix + options.has_content);
              triggerChange($container);
            }
          } else {
            if ($container.hasClass(options.prefix + options.has_content)) {
          		$container.removeClass(options.prefix + options.has_content);
              triggerChange($container);
            }
          }
      	})
        .triggerHandler('blur.floatlabel');
    });
  };

  function hasContent($element) {
    return $element.val() !== '';
  }
})(this, jQuery);
