/**
 * External Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import recurrence from '@moderntribe/events-pro/blocks/recurrence';
import recurrenceRule from '@moderntribe/events-pro/blocks/recurrence-rule';
import recurrenceException from '@moderntribe/events-pro/blocks/recurrence-exception';
import { initStore } from '@moderntribe/events-pro/data';

const blocks = [
	recurrence,
	recurrenceRule,
	recurrenceException,
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

