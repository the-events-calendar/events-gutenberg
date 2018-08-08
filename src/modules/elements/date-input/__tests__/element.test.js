/**
 * External dependencies
 */
import renderer from 'react-test-renderer';
import React from 'react';

/**
 * Internal dependencies
 */
import { DateInput } from 'elements';

describe( 'DateInput element', () => {
	test( 'Should render the component', () => {
		const clickMock = jest.fn();
		const setDateMock = jest.fn();
		const component = renderer.create(
			<DateInput
				selected={ true }
				onClickHandler={ clickMock }
				setDateTime={ setDateMock }
			>
				<div>This is the children</div>
			</DateInput>,
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
