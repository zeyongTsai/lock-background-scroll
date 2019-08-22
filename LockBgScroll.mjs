/**
 * lock element's parent background element (mostly body element) scroll when touchmove and scroll event fire on element
 * @param {Element} elm target element (mostly modal root element)
 * @returns {LockBgScroll} call it's init method to make this work and destroy method to remove event listener and elements reference
 */
function LockBgScroll (elm) {
  this.el = elm
  this.__start = 0
  this.init = function () {
    let __touchstartListener = this.__touchstartListener()
    let __touchmoveListener = this.__touchmoveListener()
    this.el.addEventListener('touchstart', __touchstartListener, { passive: false })
    this.el.addEventListener('touchmove', __touchmoveListener, { passive: false })
    this.destroy = function () {
      this.el.removeEventListener('touchstart', __touchstartListener)
      this.el.removeEventListener('touchmove', __touchmoveListener)
      this.el = null
    }
    return this
  }
  this.__touchstartListener = function () {
    let that = this
    return function (event) {
      that.__start = event.touches[0].clientY
    }
  }
  this.__touchmoveListener = function () {
    let that = this
    return function (event) {
      let target = event.srcElement
      let child = target.scrollParent === undefined ? findScrollParent(target, that.el) : target.scrollParent
      if (child) {
        let y = event.touches[0].clientY
        let direction = y - that.__start
        console.log('direction', direction)
        if (direction > 0 && child.scrollTop === 0) {
          console.log('top prevent')
          preventDefault(event)
        } else if (direction < 0 && child.scrollTop + child.clientHeight === child.scrollHeight) {
          console.log('bottom prevent')
          preventDefault(event)
        }
      } else {
        console.log('modal prevent')
        preventDefault(event)
      }
    }

    function preventDefault (event) {
      if (event.cancelable) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  }
  this.destroy = null
}

/**
 * find element's parent scroll element until root element include element itself
 * @param {Element} elm target element
 * @param {Element} rootElm root element
 * @returns {Element} parent element
 */
function findScrollParent (elm, rootElm) {
  let parent = elm
  while (parent) {
    // if element has data attribute scroll-container
    if (parent.dataset.scrollContainer === '') {
      elm.scrollParent = parent
      return elm.scrollParent
    // if element.scrollParent is en Element
    } else if (parent.scrollParent) {
      elm.scrollParent = parent.scrollParent
      return elm.scrollParent
    }
    if (parent === rootElm) {
      elm.scrollParent = null
      return elm.scrollParent
    }
    parent = parent.parentNode
  }
}

export default LockBgScroll