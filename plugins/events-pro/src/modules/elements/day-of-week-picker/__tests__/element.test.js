/**
 * External dependencies
 */
import React from 'react';
import { noop } from 'lodash';

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
				onSundayChange={ noop }
				onMondayChange={ noop }
				onTuesdayChange={ noop }
				onWednesdayChange={ noop }
				onThursdayChange={ noop }
				onFridayChange={ noop }
				onSaturdayChange={ noop }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
