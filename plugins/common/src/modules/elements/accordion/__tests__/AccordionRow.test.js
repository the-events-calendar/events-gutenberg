/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import {
	default as AccordionRow,
	getHeaderAttrs,
	getContentAttrs,
} from '@moderntribe/common/elements/accordion/AccordionRow';

let row;

describe( 'Accordion Row Element', () => {
	beforeEach( () => {
		row = {
			content: "this is a content",
			contentClassName: "content-class",
			contentId: "content-id-1",
			header: "this is header",
			headerClassName: "header-class",
			headerId: "header-id-1",
			isActive: true,
			onClick: jest.fn(),
			onClose: jest.fn(),
			onOpen: jest.fn(),
		};
	} );

	describe( 'AccordionRow', () => {
		it( 'renders an accordion row', () => {
			const component = renderer.create( <AccordionRow row={ row } /> );
			expect( component.toJSON() ).toMatchSnapshot();
		} );

		it( 'renders an accordion row with inactive state', () => {
			row.isActive = false;
			const component = renderer.create( <AccordionRow row={ row } /> );
			expect( component.toJSON() ).toMatchSnapshot();
		} );

		it( 'executes onClick handler', () => {
			const component = mount( <AccordionRow row={ row } /> );
			component.find( 'button' ).simulate( 'click' );
			expect( row.onClick ).toHaveBeenCalled();
			expect( row.onClick ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'executes onClose handler', ( done ) => {
			const component = mount( <AccordionRow row={ row } /> );
			component.find( 'button' ).simulate( 'click' );
			setTimeout( () => {
				expect( row.onClose ).toHaveBeenCalled();
				expect( row.onClose ).toHaveBeenCalledTimes( 1 );
				expect( row.onClick ).toHaveBeenCalled();
				expect( row.onClick ).toHaveBeenCalledTimes( 1 );
				done();
			}, 250 );
		} );

		it( 'executes onOpen handler', ( done ) => {
			row.isActive = false;
			const component = mount( <AccordionRow row={ row } /> );
			component.find( 'button' ).simulate( 'click' );
			setTimeout( () => {
				expect( row.onOpen ).toHaveBeenCalled();
				expect( row.onOpen ).toHaveBeenCalledTimes( 1 );
				expect( row.onClick ).toHaveBeenCalled();
				expect( row.onClick ).toHaveBeenCalledTimes( 1 );
				done();
			}, 250 );
		} );
	} );

	describe( 'getHeaderAttrs', () => {
		it( 'returns header attributes with active state', () => {
			const attributes = getHeaderAttrs( row );
			expect( attributes ).toMatchSnapshot();
		} );

		it( 'returns header attributes with inactive state', () => {
			row.isActive = false;
			const attributes = getHeaderAttrs( row );
			expect( attributes ).toMatchSnapshot();
		} );
	} );

	describe( 'getContentAttrs', () => {
		it( 'returns content attributes with active state', () => {
			const attributes = getContentAttrs( row );
			expect( attributes ).toMatchSnapshot();
		} );

		it( 'returns content attributes with inactive state', () => {
			row.isActive = false;
			const attributes = getContentAttrs( row );
			expect( attributes ).toMatchSnapshot();
		} );
	} );
} );
