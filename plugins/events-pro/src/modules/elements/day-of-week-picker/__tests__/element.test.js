/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import DayOfWeekPicker from '../element';

describe( 'Day Of Week Picker Element', () => {
	it( 'renders day of week picker', () => {
		const component = renderer.create(
			<DayOfWeekPicker
				className="test-class"
				sundayChecked={ true }
				mondayChecked={ false }
				tuesdayChecked={ true }
				wednesdayChecked={ false }
				thursdayChecked={ true }
				fridayChecked={ false }
				saturdayChecked={ true }
				onSundayChange={ jest.fn() }
				onMondayChange={ jest.fn() }
				onTuesdayChange={ jest.fn() }
				onWednesdayChange={ jest.fn() }
				onThursdayChange={ jest.fn() }
				onFridayChange={ jest.fn() }
				onSaturdayChange={ jest.fn() }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
