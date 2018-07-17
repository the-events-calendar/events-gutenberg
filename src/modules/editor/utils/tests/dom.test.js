/**
 * Internal dependencies
 */
import {
	isRootNode,
	searchParent,
} from './../dom';

describe( 'Tests for dom.js', () => {
	test( 'Test for searchParent', () => {
		expect( searchParent( null ) ).toBeFalsy();
		const treeWithNode = {
			parentNode: {
				value: 10,
				parentNode: {
					value: 20,
				},
			},
		};

		const callback = jest.fn( ( node ) => node.value === 20 );
		const result = searchParent( treeWithNode, callback );
		expect( callback ).toBeCalled();
		expect( callback ).toBeCalledWith( { value: 20 } );
		expect( result ).toBeTruthy();

		const treeWithoutNode = {
			parentNode: {
				parentNode: {
					parentNode: {
						top: {
							document: 'global',
						},
					},
				},
			},
		};

		expect( searchParent( treeWithoutNode ) ).toBeFalsy();
	} );

	test( 'Test for isRootNode', () => {
		expect( isRootNode( null ) ).toBeFalsy();
		expect( isRootNode( 'text' ) ).toBeFalsy();
		expect( isRootNode( window.document.body ) ).toBeFalsy();
		expect( isRootNode( window.document ) ).toBeTruthy();
	} );
} );
