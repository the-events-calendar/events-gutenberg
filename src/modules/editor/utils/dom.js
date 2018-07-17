/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * Utility to search the parent of a node looking from the current node Up to the highest
 * node on the DOM Tree
 *
 * @param {(DOMElement|object)} node - The DOM node where the search starts
 * @param {function} callback - Is executed on every iteration, it should return a boolean
 * @returns {boolean} Returns tre if the callback returns true with any of the parents.
 */
export function searchParent( node = {}, callback = noop ) {
	let found = false;
	let testNode = node;
	do {
		if ( testNode ) {
			found = callback( testNode );
		}
		const nextNode = testNode && testNode.parentNode ? testNode.parentNode : null;
		testNode = isRootNode( nextNode ) ? null : nextNode;
	} while ( ! found && testNode !== null );

	return found;
}

/**
 * Test if a node is the same as the root element or the base node of the document.
 *
 * @param {Element} node A Document Node
 * @returns {boolean} true if node is the root Node Document
 */
export function isRootNode( node ) {
	return node === window.top.document;
}
