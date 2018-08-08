/**
 * External dependencies
 */
import renderer from 'react-test-renderer';
import React from 'react';
import { mount } from 'enzyme';

// Prevent to load a mocked version of lodash
jest.unmock( 'lodash' );
const lodash = require.requireActual( 'lodash' );

/**
 * Internal dependencies
 */
import { DateInput } from 'elements';

describe( 'DateInput element', () => {
	it( 'Should render the children when is not selected', () => {
		const component = renderer.create(
			<DateInput selected={ false }>
				<div>This is the children</div>
			</DateInput>,
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'Should render the input when is selected', () => {
		const component = renderer.create(
			<DateInput selected={ true }>
				<div>This is the children</div>
			</DateInput>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'Should render the before child on the input', () => {
		const component = renderer.create(
			<DateInput
				selected={ true }
				before={ <span>Before the input</span> }
			>
				<div>This is the children</div>
			</DateInput>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'Should render the after child on the input', () => {
		const component = renderer.create(
			<DateInput
				selected={ true }
				after={ <span>After the input</span> }
			>
				<div>This is the children</div>
			</DateInput>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'Should render the before and after child', () => {
		const component = renderer.create(
			<DateInput
				selected={ true }
				before={ <span>Before the input</span> }
				after={ <span>After the input</span> }
			>
				<div>This is the children</div>
			</DateInput>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'Should trigger the change on the input field', () => {
		const onChange = jest.fn();
		const component = (
			<DateInput
				onChange={ onChange }
				selected={ true }
				value="Modern Tribe"
			>
				<div>This is the children</div>
			</DateInput>
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
				selected={ true }
				value="17 August 2018 - 19 August 2018"
			>
				<div>This is the children</div>
			</DateInput>
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
