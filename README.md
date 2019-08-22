# lock-background-scroll
prevent body or parent scroll element scroll, just for iOS

## Why lock-background-scroll ?
On iOS, when a `touchmove` event occurs on an element, the scrollable element in the parent responds to the scroll event. We can prevent this behavior by using `event.preventDefault`, but this will cause the internal scrollable area to not scroll. So this project is intended to solve this problem, it is only used in this case, so it does not apply to the PC side (maybe you want the `mousescroll` event will not cause scrolling), it does not handle whether to lock the body, eliminate the scroll bar, etc.

## Install
```shell
npm i lock-background-scroll
```

## Usage
```javascript
import LockBgScroll from 'lock-background-scroll'
// get the target element
let modal = document.querySelector('.modal')
// init LockBgScroll
let lbs = new LockBgScroll(modal).init()
// destroy it when page or component unload
// lbs.destroy()
```
If there are some scrollable children element inside of `.modal` element, add `data-scroll-container` attribute to them
```html
<div class="modal">
  <div class="modal__head"></div>
  <div class="modal__body" data-scroll-container>
    ...
  </div>
</div>
```

## Demo
https://codepen.io/tsai_snick/full/MWgbJGP