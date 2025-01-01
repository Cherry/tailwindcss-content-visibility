import { ESLint } from 'eslint';
import { format } from 'prettier';
import * as tailwindPrettierPlugin from 'prettier-plugin-tailwindcss';
import { expect, it } from 'vitest';

/* Test prettier and eslint plugins, to ensure classnames are recognised and ordered correctly */
it('prettier', async () => {
	const formatted = await format('<div class="bg-white p-4 dark:bg-black some-unknown-class content-visibility-auto contain-intrinsic-size-[0px_120px]"></div>', {
		parser: 'html',
		plugins: [tailwindPrettierPlugin],
		tailwindConfig: './tests/tailwind.config.js',
	});
	expect(formatted).toMatchInlineSnapshot(`
		"<div
		  class="some-unknown-class bg-white p-4 content-visibility-auto contain-intrinsic-size-[0px_120px] dark:bg-black"
		></div>
		"
	`);
});

it('eslint', async () => {
	const eslint = new ESLint({
		useEslintrc: false,
		baseConfig: {
			extends: ['eslint:recommended', 'plugin:tailwindcss/recommended'],
			plugins: ['tailwindcss'],
			parser: '@angular-eslint/template-parser',
			rules: {
				'tailwindcss/classnames-order': 'error',
				'tailwindcss/no-custom-classname': 'warn',
			},
			settings: {
				tailwindcss: {
					config: './tests/tailwind.config.js',
				},
			},
		},
	});

	const results = await eslint.lintText('<div class="bg-white p-4 dark:bg-black some-unknown-class content-visibility-auto contain-intrinsic-size-[0px_120px]"></div>', {
		filePath: 'test.html',
	});
	expect(results[0].messages).toHaveLength(2);
	expect(results[0].messages[0].severity).toBe(2);
	expect(results[0].messages[0].ruleId).toBe('tailwindcss/classnames-order');
	expect(results[0].messages[1].severity).toBe(1);
	expect(results[0].messages[1].ruleId).toBe('tailwindcss/no-custom-classname');

	// ensure correct order no longer triggers incorrect order rule
	const results2 = await eslint.lintText('<div class="some-unknown-class bg-white p-4 content-visibility-auto contain-intrinsic-size-[0px_120px] dark:bg-black"></div>', {
		filePath: 'test.html',
	});
	expect(results2[0].messages).toHaveLength(1);
	expect(results2[0].messages[0].severity).toBe(1);
	expect(results2[0].messages[0].ruleId).toBe('tailwindcss/no-custom-classname');
});
