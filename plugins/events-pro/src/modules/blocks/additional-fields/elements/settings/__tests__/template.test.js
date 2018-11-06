/**
 * Internal dependencies
 */
import React from 'react';
import Settings from '../template';

describe( '<Settings>', () => {
	test( 'no link is provided', () => {
		const component = renderer.create(
			<Settings name={ 'Additional Fields' } />,
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'link is provided', () => {
		const component = renderer.create(
			<Settings
				name={ 'Additional Fields' }
				settingsLink="http://guti.local/wp-admin/edit.php?page=tribe-common&tab=additional-fields&post_type=tribe_events"
			/>,
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'link is provided with before', () => {
		const component = renderer.create(
			<Settings
				name={ 'Additional Fields' }
				settingsLink="http://guti.local/wp-admin/edit.php?page=tribe-common&tab=additional-fields&post_type=tribe_events"
				before={ <span>Before</span> }
			/>,
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'link is provided with after', () => {
		const component = renderer.create(
			<Settings
				name={ 'Additional Fields' }
				settingsLink="http://guti.local/wp-admin/edit.php?page=tribe-common&tab=additional-fields&post_type=tribe_events"
				after={ <span>after</span> }
			/>,
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
