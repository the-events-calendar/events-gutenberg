/**
 * External dependencies
 */
import renderer from 'react-test-renderer';
import React from 'react';

// Prevent to load a mocked version of lodash
jest.unmock( 'lodash' );
const lodash = require.requireActual( 'lodash' );

/**
 * Internal dependencies
 */
import { DateInput } from '@moderntribe/events/elements';

describe( 'DateInput element', () => {
	it( 'Should render the input', () => {
		const component = renderer.create( <DateInput /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'Should render the before child on the input', () => {
		const component = renderer.create(
			<DateInput before={ <span>Before the input</span> } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'Should render the after child on the input', () => {
		const component = renderer.create(
			<DateInput after={ <span>After the input</span> } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'Should render the before and after child', () => {
		const component = renderer.create(
			<DateInput
				before={ <span>Before the input</span> }
				after={ <span>After the input</span> }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'Should trigger the change on the input field', () => {
		const onChange = jest.fn();
		const component = (
			<DateInput
				onChange={ onChange }
				value="Modern Tribe"
			/>
		);
		const mounted = mount( component );
		const render = renderer.create( component );
		mounted.find( 'input' ).simulate( 'change' );

		expect( render.toJSON() ).toMatchSnapshot();
		expect( onChange ).toHaveBeenCalled();
		expect( onChange ).toHaveBeenCalledWith( 'Modern Tribe' );
	} );

	it( 'Should trigger the setDateTime callback', () => {
		const setDateTime = jest.fn();
		lodash.debounce = ( callback ) => jest.fn( ( ...args ) => callback( ...args ) );
		const component = (
			<DateInput
				setDateTime={ setDateTime }
				value="17 August 2018 - 19 August 2018"
			/>
		);
		const mounted = mount( component );
		const render = renderer.create( component );
		mounted.find( 'input' ).simulate( 'change' );

		const expected = {
			end: '2018-08-19 12:00:00',
			start: '2018-08-17 12:00:00',
		};
		expect( render.toJSON() ).toMatchSnapshot();
		expect( setDateTime ).toHaveBeenCalled();
		expect( setDateTime ).toHaveBeenCalledWith( expected );
	} );
} );
