import React from 'react';
import renderer from 'react-test-renderer';
import OnDayOfWeek from '../template';

describe( 'OnDayOfWeek', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<OnDayOfWeek
				className="test-class"
				sundayChecked={ false }
				mondayChecked={ false }
				tuesdayChecked={ false }
				wednesdayChecked={ false }
				thursdayChecked={ false }
				fridayChecked={ false }
				saturdayChecked={ false }
				onDayChange={ jest.fn() }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
