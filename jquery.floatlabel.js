/*jshint jquery: true, forin:false, browser:true, indent:2, trailing:true, unused:false */
(function(scope, $) {
  'use strict';

  $.fn.floatlabel = function(options) {
    // Extend the default options with given options.
    options = $.extend({
      prefix: '',
      focus: 'focus',
      has_content: 'has-content',
    }, options);

    // A wrapper function, that triggers that specific elements "float-change"
    // event.
    function triggerChange($element) {
      $element.trigger('floatlabel-change', {
        focus: $element.hasClass(options.prefix + options.focus),
        has_content: $element.hasClass(options.prefix + options.has_content),
      });
    }

    // Iterate through the given elements.
    return this.each(function() {
      var
      	$container = $(this),
        $input = $('input, select', this);

      // Setup all the events on the input field.
      $input
        // Always add the FOCUS class when the element is in focus.
        .bind('focus.floatlabel', function () {
          $container
            .addClass(options.prefix + options.focus);
          triggerChange($container);
        })

        // On blur remove the FOCUS class no matter what.
        // class if there's any content.
        .bind('blur.floatlabel', function () {
          $container.removeClass(options.prefix + options.focus);
          triggerChange($container);
      	})

        // Update the HAS_CONTENT class depending on if there's any content in
        // the element.
      	.bind('change.floatlabel keyup.floatlabel blur.floatlabel keydown.floatlabel', function () {
        	if ($input.val() !== '') {
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

        // By triggering the blur event, it will set the correct classes when
        // the function is run.
        .triggerHandler('blur.floatlabel');
    });
  };
})(this, jQuery);
