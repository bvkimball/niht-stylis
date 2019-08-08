# Niht Stylis

> A css template literal using stylis as a preprocessor

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Uses [Stylis](https://stylis.js.org/) underneath, so issues regarding styles should be opened over [there](https://github.com/thysultan/stylis.js/issues).

Shamelessly _adapted_ code from [lit-element](https://lit-element.polymer-project.org/) as can bee seen [here](https://github.com/polymer/lit-element/blob/master/src/lib/css-tag.ts)

## Highlights

- Easy to use

## Install

```
$ npm install --save @niht/stylis
```

## Usage

```javascript
import { html } from "https://unpkg.com/@niht/stylis"

const color = true ? "green" : "red"
const template = css`
  p {
    color: ${color};
    width: 500px;
    border: 1px solid #000;
  }
`
console.log(template.cssText) // valid string css, preprocessed by stylis
console.log(template.stylesheet) // CSSStylesheet to be used by DocumentOrShadowRoot.adoptedStyleSheets
```

## Questions

What is adoptedStyleSheets? [look here](https://developers.google.com/web/updates/2019/02/constructable-stylesheets)

- Browser Support: 😖 (polyfills might help)
