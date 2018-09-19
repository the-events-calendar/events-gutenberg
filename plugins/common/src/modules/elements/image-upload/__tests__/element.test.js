/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import ImageUpload, {
	renderImageUploadButton
} from '@moderntribe/common/elements/image-upload/element';

jest.mock( '@wordpress/editor', () => ( {
	MediaUpload: () => ( <button>Media Upload</button> ),
} ) );

describe( 'renderImageUploadButton', () => {
	it( 'render the button', () => {
		const open = jest.fn();
		const component = renderer.create( renderImageUploadButton( 'label' )( { open } ) );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'executes the open action when the mediaUpload is fired', () => {
		const open = jest.fn();
		const component = mount( renderImageUploadButton( 'label' )( { open } ) );
		component.find( 'button' ).simulate( 'click' );
		expect( open ).toHaveBeenCalled();
		expect( open ).toHaveBeenCalledTimes( 1 );
	} );
} );

describe( 'ImageUpload', () => {
	const onSelect = jest.fn();

	afterEach( () => {
		onSelect.mockClear();
	} );

	it( 'render the component', () => {
		const component = renderer.create(
			<ImageUpload onSelect={ onSelect } />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'render with custom title', () => {
		const component = renderer.create(
			<ImageUpload onSelect={ onSelect } title="Modern Tribe" />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'render with custom description', () => {
		const component = renderer.create(
			<ImageUpload onSelect={ onSelect} description="The Next Generation of Digital Agency" />
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
