/**
 * External Dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal Dependencies
 */
import PluginBlockHooks from '@moderntribe/common/components/plugin-block-hooks';

jest.mock( '@wordpress/editor', () => ( {
	InnerBlocks: 'InnerBlocks',
} ) );

describe( 'PluginBlockHooks', () => {
	let props;
	beforeEach( () => {
		props = {
			plugins: [ 'events', 'events-pro' ],
			pluginTemplates: {
				'events': [
					[ 'tribe/event-datetime', {}],
				],
				'events-pro': [
					[ 'tribe/event-pro-recurring', {}],
					[ 'tribe/event-pro-exclusion', {}],
				],
			},
		};
	} );

	test( 'should match snapshot', () => {
		const component = renderer.create(
			<PluginBlockHooks { ...props } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
	test( 'should only render events templates', () => {
		props.plugins.pop();
		const component = renderer.create(
			<PluginBlockHooks { ...props } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
	test( 'should only render events-pro templates', () => {
		props.plugins.unshift();
		const component = renderer.create(
			<PluginBlockHooks { ...props } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
