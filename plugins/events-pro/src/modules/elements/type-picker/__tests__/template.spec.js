/**
 * External Dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';
import TypePicker from '../template';

describe( 'TypePicker', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<TypePicker
				className="test-class"
				onChange={ jest.fn() }
				selected={ options.RECURRENCE_TYPE_RULES_OPTIONS[ 4 ] }
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
