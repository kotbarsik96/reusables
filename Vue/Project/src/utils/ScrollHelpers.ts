import { Browser } from "@/utils/Browser";

export class ScrollHelper {
  /** здесь указываются элементы, которым нужно выставлять padding-right при скрытии скролла у body */
  static getScrollPaddingElems() {
    return [document.body]
  }

  static setBodyScroll() {
    document.body.classList.remove('_no-scroll')

    this.getScrollPaddingElems().forEach((el) => {
      if (!el) return
      ;(el as HTMLElement).style.removeProperty('padding-right')
    })
  }

  static hideBodyScroll() {
    const scrollbarWidth = this.getScrollbarWidth()
    const paddingRight = document.body.classList.contains('_firefox')
      ? `${scrollbarWidth}px`
      : 'var(--scrollbar-with-space)'
    if (!Browser.isMobile()) {
      this.getScrollPaddingElems().forEach((el) => {
        if (!el) return
        ;(el as HTMLElement).style.paddingRight = paddingRight
      })
    }
    document.body.classList.add('_no-scroll')
  }

  static getScrollbarWidth() {
    const outer = document.createElement('div')
    outer.style.cssText = `
      position: absolute;
      overflow: scroll;
      z-index: -999;
      top: -100vh;
      left: -100vw;
    `
    outer.classList.add('_scroll-element')

    document.body.appendChild(outer)

    const inner = document.createElement('div')
    outer.appendChild(inner)

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

    outer.parentNode?.removeChild(outer)

    return scrollbarWidth
  }
}
