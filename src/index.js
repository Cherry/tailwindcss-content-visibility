'use strict';
const plugin = require('tailwindcss/plugin');

const contentVisibility = plugin(function({ matchUtilities, theme }) {
	matchUtilities(
		{
			'content-visibility': (value) => {
				return {
					'content-visibility': value,
				};
			},
		},
		{
			values: theme('contentVisibility'),
		},
	);
	matchUtilities(
		{
			'contain-intrinsic-size': (value) => {
				return {
					'contain-intrinsic-size': value,
				};
			},
		},
		{
			values: theme('containIntrinsicSize'),
		},
	);
}, {
	theme: {
		contentVisibility: {
			auto: 'auto',
			hidden: 'hidden',
			visible: 'visible',
		},
	},
});

module.exports = contentVisibility;
