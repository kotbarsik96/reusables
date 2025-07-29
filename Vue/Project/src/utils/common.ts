export function getBrowserVersion(userAgent: string | undefined): {
  browser: string | null
  version: number | null
} {
  const browserName =
    userAgent?.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []

  if (/trident/i.test(browserName[0]!)) {
    const rv = /\brv[ :]+(\d+)/g.exec(userAgent!) || []
    return { browser: 'IE', version: +'rv[1]' }
  }

  const version = browserName[2] ? +browserName[2] : null
  const browser = browserName[1] ? browserName[1] : null

  return { browser, version }
}

export function debounce(fn: Function, wait: number) {
  let timer: ReturnType<typeof setTimeout>
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
