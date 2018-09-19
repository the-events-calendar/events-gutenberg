/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import HeaderImage, { renderMediaUpload } from '@moderntribe/tickets/elements/header-image/element';

jest.mock( '@wordpress/editor', () => ( {
	MediaUpload: () => ( <button>Media Upload</button> ),
} ) );

describe( 'renderMediaUpload', () => {
	it( 'render the button', () => {
		const open = jest.fn();
		const component = renderer.create( renderMediaUpload( { open } ) );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'executes the open action when the mediaUpload is fired', () => {
		const open = jest.fn();
		const component = mount( renderMediaUpload( { open } ) );
		component.find( 'button' ).simulate( 'click' );
		expect( open ).toHaveBeenCalled();
		expect( open ).toHaveBeenCalledTimes( 1 );
	} );
} );

describe( 'HeaderImage', () => {
	const onSelect = jest.fn();

	afterEach( () => {
		onSelect.mockClear();
	} );

	it( 'render the component', () => {
		const component = renderer.create(
			<HeaderImage onSelect={ onSelect } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'render with custom title', () => {
		const component = renderer.create(
			<HeaderImage onSelect={ onSelect } title="Modern Tribe" />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'render with custom description', () => {
		const component = renderer.create(
			<HeaderImage onSelect={ onSelect} description="The Next Generation of Digital Agency" />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'render image if provided', () => {
		const image = {
			height: 400,
			width: 600,
			url: 'http://gutenberg.local/wp-content/uploads/2018/08/belize-2468-1024x680.jpg',
			orientation: 'landscape',
		}
		const component = renderer.create(
			<HeaderImage image={ image } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
