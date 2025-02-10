function setClickAway(el, callback, except = []) {
  document.addEventListener('click', onClick)

  function onClick(event) {
    if (except.some((el) => el.contains(event.target))) return
    if (!el.contains(event.target)) callback(event)
  }
}

class Header {
  openClassName = '--open-menu'

  constructor(el) {
    this.el = el
    this.openButtonEl = this.el.querySelector('[data-child="open"]')
    this.closeButtonEl = this.el.querySelector('[data-child="close"]')
    this.menuBodyEl = this.el.querySelector('[data-child="menu-body"]')

    this.openButtonEl.addEventListener('click', this.openMenu.bind(this))
    this.closeButtonEl.addEventListener('click', this.closeMenu.bind(this))

    setClickAway(this.menuBodyEl, this.closeMenu.bind(this), [
      this.openButtonEl,
    ])
  }
  toggleMenu() {
    this.el.classList.contains(this.openClassName)
      ? this.closeMenu()
      : this.openMenu()
  }
  closeMenu() {
    this.el.classList.remove(this.openClassName)
  }
  openMenu() {
    this.el.classList.add(this.openClassName)
  }
}

init()

function init() {
  document
    .querySelectorAll('[data-el="header"]')
    .forEach((el) => new Header(el))
}
