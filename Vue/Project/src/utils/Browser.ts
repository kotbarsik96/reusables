export class Browser {
  static isMobile(): boolean {
    const ua = Browser.getUserAgent()
    const regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|fxios/i
    return ua ? regexp.test(ua) : false
  }

  static isFirefox(): boolean {
    const ua = Browser.getUserAgent()
    const regexp = /firefox|fxios/i
    return ua ? regexp.test(ua) : false
  }

  private static getUserAgent(): string | null {
    let userAgent: string | null = null
    userAgent = navigator.userAgent

    return userAgent
  }
}
