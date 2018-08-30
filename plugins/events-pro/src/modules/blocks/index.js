/**
 * External Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import recurringEntry from '@moderntribe/events-pro/blocks/recurring-entry';
import eventsRecurring from '@moderntribe/events-pro/blocks/event-recurring';
import eventsException from '@moderntribe/events-pro/blocks/event-exception';
import { initStore } from '@moderntribe/events-pro/data';

const blocks = [
	recurringEntry,
	eventsRecurring,
	eventsException,
];

blocks.forEach( block => {
	const blockName = `tribe/${ block.id }`;
	registerBlockType( blockName, block );
} );

// Initialize AFTER blocks are registered
// to avoid plugin shown as available in reducer
// but not having block available for use
initStore();

export default blocks;

