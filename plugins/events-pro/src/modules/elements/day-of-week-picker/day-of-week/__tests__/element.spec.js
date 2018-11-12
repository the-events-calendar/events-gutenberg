/**
 * External dependencies
 */
import React from 'react';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import DayOfWeek from '../element';

describe( 'Day Of Week Element', () => {
	it( 'renders day of week', () => {
		const component = renderer.create(
			<DayOfWeek
				checked={ true }
				className="test-class"
				label="F"
				labelTitle="Friday"
				onChange={ noop }
				value="friday"
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
