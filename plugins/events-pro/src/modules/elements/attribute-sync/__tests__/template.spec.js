import React from 'react';
import renderer from 'react-test-renderer';
import AttributeSync from '../template';

describe( 'AttributeSync', () => {
	test( 'should match snapshot', () => {
		const component = renderer.create(
			<AttributeSync
				clientId="1"
				initialize={ jest.fn() }
				cancel={ jest.fn() }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should call initialize and cancel functions', () => {
		const initialize = jest.fn();
		const cancel = jest.fn();
		const component = mount(
			<AttributeSync
				clientId="1"
				initialize={ initialize }
				cancel={ cancel }
			/>
		);
		expect( initialize ).toHaveBeenCalled();
		expect( initialize ).toHaveBeenCalledTimes( 1 );
		component.unmount();
		expect( cancel ).toHaveBeenCalled();
		expect( cancel ).toHaveBeenCalledTimes( 1 );
	} );
} );
