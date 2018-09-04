/**
 * External dependencies
 */
import renderer from 'react-test-renderer';
import React from 'react';

/**
 * Internal dependencies
 */
import { withStore } from '@moderntribe/common/hoc';

jest.mock( '@moderntribe/events/data', () => ( {
	getStore() {
		return {};
	},
} ) );

describe( 'HOC - With Store', () => {
	it( 'Should add the store property', () => {
		const Block = ( props ) => <div { ...props } />;
		const Wrapper = withStore()( Block );
		const component = renderer.create( <Wrapper /> );
		expect( component.toJSON() ).toMatchSnapshot();

		const instance = component.root;
		expect( instance ).not.toBe( null );
		expect( instance.findByType( Block ).props ).toEqual( { store: {} } );
	} );
} );

