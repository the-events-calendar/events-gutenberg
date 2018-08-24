/**
 * External Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import eventsRecurring from '@moderntribe/events-pro/blocks/event-recurring';
import eventsRecurringAdd from '@moderntribe/events-pro/blocks/event-recurring-add';
import eventsException from '@moderntribe/events-pro/blocks/event-exception';
import eventsExceptionAdd from '@moderntribe/events-pro/blocks/event-exception-add';
import { initStore } from '@moderntribe/events-pro/data';

const blocks = [
	eventsRecurring,
	eventsRecurringAdd,
	eventsException,
	eventsExceptionAdd,
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

