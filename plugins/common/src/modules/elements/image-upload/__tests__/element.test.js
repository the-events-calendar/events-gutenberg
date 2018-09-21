/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import ImageUpload, {
	renderImageUploadButton,
	renderImage,
} from '@moderntribe/common/elements/image-upload/element';

jest.mock( '@wordpress/editor', () => ( {
	MediaUpload: () => ( <button>Media Upload</button> ),
} ) );

jest.mock( '@moderntribe/common/icons', () => ( {
	Close: () => <span>icon</span>,
} ) );

describe( 'renderImageUploadButton', () => {
	const open = jest.fn();

	afterEach( () => {
		open.mockClear();
	} );

	it( 'renders the button', () => {
		const component = renderer.create( renderImageUploadButton( 'label' )( { open } ) );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'executes the open action when the mediaUpload is fired', () => {
		const component = mount( renderImageUploadButton( 'label' )( { open } ) );
		component.find( 'button' ).simulate( 'click' );
		expect( open ).toHaveBeenCalled();
		expect( open ).toHaveBeenCalledTimes( 1 );
	} );
} );

describe( 'renderImage', () => {
	const onRemove = jest.fn();

	afterEach( () => {
		onRemove.mockClear();
	} );

	it( 'renders the image and button', () => {
		const component = renderer.create( renderImage( 'test-alt', 'test-src', onRemove ) );
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'executes onRemove on click', () => {
		const component = mount( renderImage( 'test-alt', 'test-src', onRemove ) );
		component.find( 'button' ).simulate( 'click' );
		expect( onRemove ).toHaveBeenCalled();
		expect( onRemove ).toHaveBeenCalledTimes( 1 );
	} );
} );

describe( 'ImageUpload', () => {
	const onRemove = jest.fn();
	const onSelect = jest.fn();

	afterEach( () => {
		onRemove.mockClear();
		onSelect.mockClear();
	} );

	it( 'renders the component', () => {
		const component = renderer.create(
			<ImageUpload
				onSelect={ onSelect }
				onRemove={ onRemove }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders with title', () => {
		const component = renderer.create(
			<ImageUpload
				onSelect={ onSelect }
				onRemove={ onRemove }
				title="Modern Tribe"
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders with description', () => {
		const component = renderer.create(
			<ImageUpload
				onSelect={ onSelect}
				onRemove={ onRemove }
				description="The Next Generation of Digital Agency"
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders with class', () => {
		const component = renderer.create(
			<ImageUpload
				onSelect={ onSelect }
				onRemove={ onRemove }
				className="test-class"
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	it( 'renders uploaded image', () => {
		const component = renderer.create(
			<ImageUpload
				onSelect={ onSelect }
				onRemove={ onRemove }
				imageSrc="test-src"
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
