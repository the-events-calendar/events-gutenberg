import { registerBlockType } from "@wordpress/blocks";
import eventDetails from  'blocks/event-details';
import eventVenue from  'blocks/event-venue';
import eventSubtitle from  'blocks/event-subtitle';
import eventLinks from  'blocks/event-links';
import './style.pcss';

export default [
	eventDetails,
	eventVenue,
	eventSubtitle,
	eventLinks
];

this.default.forEach( block => {
	const blockName = `tribe/${block.id}`;
	registerBlockType( blockName, block );
} );
