/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import Bar from './../bar';

describe( '<Bar />', () => {
	test( 'render null on default values', () => {
		const component = renderer.create( <Bar /> );
		expect( component.toJSON() ).toBe( null );
	} );

	test( 'render null on zero values', () => {
		const component = renderer.create( <Bar total={ 0 } value={ 0 } /> );
		expect( component.toJSON() ).toBe( null );
	} );

	test( 'render percentage as inline style', () => {
		const component = shallow( <Bar value={ 33 } total={ 100 } /> );
		const span = component.get( 0 );
		const { style } = span.props;
		expect( style ).toEqual( { width: '33%' } );
	} );

	test( 'render percentage with custom class name', () => {
		const component = renderer.create( <Bar value={ 45 } total={ 100 } className="jest-test" /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
