# jQuery-floatlabel
Demo: http://codepen.io/BirkAndMe/pen/gbVEKL/
(demo not working in chrome at the moment, but the actual plugin is)

## Usage
Simply call the floatlabel() function on a jQuery element
```javascript
$(function () {
  $('.form-element').floatlabel()
});
```

Now you can use the 2 floatlabel classes to style the elements:
```css
.form-element {
  /* The normal state. */
}
.form-element.focus {
  /* The element is in focus. */
}
.form-element.has-content {
  /* The element has content. */
}
```

### Handling changes in JavaScript
An event will be triggered when a floatlabel element changes state.

```javascript
$(function () {
  $('.form-element').floatlabel()
    .on('floatlabel-change', function (evt, states) {
      /* Do whatever here, depending on the states. */
    });
});
```
