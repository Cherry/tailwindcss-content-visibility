import { describe, expect, it } from 'vitest';

import tailwindCssContentVisibilityPlugin from '../';

describe('imports', () => {
	it('esm', () => {
		expect(tailwindCssContentVisibilityPlugin).toBeDefined();
		expect(tailwindCssContentVisibilityPlugin.handler).toBeInstanceOf(Function);
		expect(tailwindCssContentVisibilityPlugin.config).toHaveProperty('theme');
		expect(tailwindCssContentVisibilityPlugin.config?.theme).toHaveProperty('contentVisibility');
	});

	it('cjs', () => {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const tailwindCssContentVisibilityPluginCjs = require('../');
		expect(tailwindCssContentVisibilityPluginCjs).toBeDefined();
		expect(tailwindCssContentVisibilityPluginCjs.handler).toBeInstanceOf(Function);
		expect(tailwindCssContentVisibilityPluginCjs.config).toHaveProperty('theme');
		expect(tailwindCssContentVisibilityPluginCjs.config.theme).toHaveProperty('contentVisibility');
	});
});
