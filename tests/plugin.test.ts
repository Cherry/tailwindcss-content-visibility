import postcss from 'postcss';
import tailwind from 'tailwindcss';
import { compile } from 'tailwindcss4';
import { describe, expect, it } from 'vitest';

import tailwindCssContentVisibilityPlugin from '../src';

import type { PluginsConfig } from 'tailwindcss4/plugin';

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

describe('plugin', () => {
	it('test - v3', async () => {
		const results = await postcss([
			tailwind({
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
				plugins: [tailwindCssContentVisibilityPlugin],
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
		});

		expect(results.css).toBe(expected.trim());
	});

	it('test - v4', async () => {
		const results = await compile(`
			@tailwind utilities;
			@theme {
				--contain-intrinsic-size-example: 1px 20px;
			}
			@plugin "./plugin.js";
		`, {
			async loadModule(id, base) {
				return {
					base,
					// Types between v3 and v4 are slightly different
					module: tailwindCssContentVisibilityPlugin as unknown as PluginsConfig,
				};
			},
		});
		const built = results.build([
			'content-visibility-auto',
			'content-visibility-hidden',
			'content-visibility-visible',
			'contain-intrinsic-size-[0px_120px]',
			'contain-intrinsic-size-[120px_0px]',
			'contain-intrinsic-size-[auto_120px_auto_0px]',
			'contain-intrinsic-size-example',
		]);

		expect(built.replace(
			/\/\*! tailwindcss v[\d.]+ \| MIT License \| https:\/\/tailwindcss\.com \*\//,
			'/*! tailwindcss vX.Y.Z | MIT License | https://tailwindcss.com */',
		)).toMatchInlineSnapshot(`
			"/*! tailwindcss vX.Y.Z | MIT License | https://tailwindcss.com */
			.contain-intrinsic-size-\\[0px_120px\\] {
			  contain-intrinsic-size: 0px 120px;
			}
			.contain-intrinsic-size-\\[120px_0px\\] {
			  contain-intrinsic-size: 120px 0px;
			}
			.contain-intrinsic-size-\\[auto_120px_auto_0px\\] {
			  contain-intrinsic-size: auto 120px auto 0px;
			}
			.contain-intrinsic-size-example {
			  contain-intrinsic-size: 1px 20px;
			}
			.content-visibility-auto {
			  content-visibility: auto;
			}
			.content-visibility-hidden {
			  content-visibility: hidden;
			}
			.content-visibility-visible {
			  content-visibility: visible;
			}
			"
		`);
	});
});

