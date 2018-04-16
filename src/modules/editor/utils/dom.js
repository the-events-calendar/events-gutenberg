/**
 * Utility to search the parent of a node looking from the current node Up to the highest node on the DOM Tree
 *
 * @param node
 * @param callback A callback executed on every iteration, it should return a boolean to test against if is the correct node.
 * @returns {boolean}
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