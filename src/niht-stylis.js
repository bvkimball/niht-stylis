import stylis from "stylis"

export const supportsAdoptingStyleSheets = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype

const constructionToken = Symbol("stylis-css-result")
const cssCache = new Map()

function checksum(str) {
  let hash = 5381
  let i = str.length
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }

  return hash >>> 0
}

export class CSSResult {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.")
    }

    // Check if we have already compiled
    const key = checksum(cssText)
    this.cssText = cssCache.has(key) ? cssCache.get(key) : stylis(":host", cssText)
    cssCache.set(key, this.cssText)
  }

  // Note, this is a getter so that it's lazy. In practice, this means
  // Stylesheets are not created until the first element instance is made.
  get styleSheet() {
    if (this._styleSheet === undefined) {
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet()
        this._styleSheet.replaceSync(this.cssText)
      } else {
        this._styleSheet = null
      }
    }

    return this._styleSheet
  }

  toString() {
    return this.cssText
  }
}

const textFromCSSResult = value => {
  if (value instanceof CSSResult) {
    return value.cssText
  }

  return value
}

export const css = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0])
  return new CSSResult(cssText, constructionToken)
}
