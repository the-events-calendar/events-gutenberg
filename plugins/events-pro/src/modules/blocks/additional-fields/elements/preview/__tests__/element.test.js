/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Preview from '../element';

describe( '<Preview>', () => {
	test( 'default params', () => {
		const component = renderer.create(
			<Preview name={ 'Modern Tribe' }>
				The Next Generation of Digital Agency
			</Preview>,
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
