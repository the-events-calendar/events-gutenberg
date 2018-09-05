/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/elements';

describe( 'Button Element', () => {
	it( 'renders button', () => {
		const component = renderer.create( <Button /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders button with class', () => {
		const component = renderer.create( <Button className="test-class" /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders disabled button', () => {
		const component = renderer.create( <Button isDisabled={ true } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders button with label', () => {
		const component = renderer.create( <Button>Hello</Button> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders button with onClick handler', () => {
		const onClick = jest.fn();
		const component = renderer.create( <Button onClick={ onClick } /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders button with set type', () => {
		const component = renderer.create( <Button type="submit" /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
