/**
 * External dependencies
 */
import React from 'react';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { MultiDayCheckbox } from '@moderntribe/events-pro/elements';

describe( 'Multi Day Checkbox Element', () => {
	it( 'renders multi day checkbox', () => {
		const component = renderer.create(
			<MultiDayCheckbox
				checked={ true }
				className="test-class"
				onChange={ noop }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
