import test from "ava"
import {css} from "../lib/nyght-stylis"

const expected = `:host p{color:red;width:500px;border:1px solid #000;}`

test("that it works!", t => {
	const color = "red"
	const csstext = css`
		p {
			color: ${color};
			width: 500px;
			border: 1px solid #000;
		}
	`

	t.is(csstext.cssText, expected)
})
