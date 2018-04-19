/**
 * Utility to search the parent of a node looking from the current node Up to the highest
 * node on the DOM Tree
 *
 * @param {DOMElement} node - The DOM node where the search starts
 * @param {function} callback - Is executed on every iteration, it should return a boolean
 * @returns {boolean} Returns tre if the callback returns true with any of the parents.
 */
export function searchParent( node, callback ) {
	let found = false;
	let testNode = node;
	do {
		if ( testNode ) {
			found = callback( testNode );
		}
		testNode = ! found && testNode && testNode.parentElement ? testNode.parentElement : null;
	} while ( testNode );

	return found;
}
