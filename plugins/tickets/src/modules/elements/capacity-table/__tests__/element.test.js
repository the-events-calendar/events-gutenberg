/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { CapacityTable } from '@moderntribe/tickets/elements';

describe( '<CapacityTable />', () => {
	test( 'title property', () => {
		const component = renderer.create( <CapacityTable title="Modern Tribe" /> );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'shared property', () => {
		const component = renderer.create(
			<CapacityTable
				title="Modern Tribe"
				shared={ [
					{ name: 'Early Bird', quantity: 10 },
					{ name: 'Balcony', quantity: 20 },
				] }
				total={ 30 }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'shared input', () => {
		const onChange = jest.fn();
		const mounted = mount(
			<CapacityTable
				title="Modern Tribe"
				shared={ [
					{ name: 'Early Bird', quantity: 10 },
					{ name: 'Balcony', quantity: 20 },
				] }
				onSharedCapacityChange={ onChange }
			/>,
		);
		mounted.find( 'input' ).simulate( 'change' );
		expect( onChange ).toBeCalled();
		expect( onChange ).toBeCalledWith( '30' );
	} );

	test( 'independent property', () => {
		const component = renderer.create(
			<CapacityTable
				title="Modern Tribe"
				independent={ [
					{ name: 'Floor', quantity: 25 },
					{ name: 'VIP', quantity: 45 },
				] }
				total={ 70 }
			/>,
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
