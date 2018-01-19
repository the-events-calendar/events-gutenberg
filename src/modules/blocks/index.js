
import { registerBlockType } from "@wordpress/blocks";
import eventDetails from  'blocks/event-details';

export default [
	eventDetails
];

this.default.forEach(block => {
	const blockName = `tribe/${block.id}`;
	registerBlockType( blockName, block );
});
