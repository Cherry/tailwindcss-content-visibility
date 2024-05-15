'use strict';
const postcss = require('postcss');

const expected = `
.content-visibility-auto {
    content-visibility: auto
}
.content-visibility-hidden {
    content-visibility: hidden
}
.content-visibility-visible {
    content-visibility: visible
}
.contain-intrinsic-size-\\[0px_120px\\] {
    contain-intrinsic-size: 0px 120px
}
.contain-intrinsic-size-\\[120px_0px\\] {
    contain-intrinsic-size: 120px 0px
}
.contain-intrinsic-size-\\[auto_120px_auto_0px\\] {
    contain-intrinsic-size: auto 120px auto 0px
}
.contain-intrinsic-size-example {
    contain-intrinsic-size: 1px 20px
}
`;

it('test', () => {
	postcss([
		require('tailwindcss')({
			content: [
				{
					raw: `
						content-visibility-auto
						content-visibility-hidden
						content-visibility-visible
						contain-intrinsic-size-[0px_120px]
						contain-intrinsic-size-[120px_0px]
						contain-intrinsic-size-[auto_120px_auto_0px]
						contain-intrinsic-size-example
					`,
				},
			],
			plugins: [require('../')],
			theme: {
				extend: {
					containIntrinsicSize: {
						example: '1px 20px',
					},
				},
			},
		}),
	]).process('@tailwind utilities', {
		from: undefined,
	}).then((result) => {
		expect(result.css).toBe(expected.trim());
	});
});
