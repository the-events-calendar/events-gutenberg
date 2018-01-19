import { __ } from '@wordpress/i18n'
import { createElement, Component, renderToString } from '@wordpress/element';

import DateTimeRange from 'element/datetime-range';

class EventDetails extends Component {
	render() {
		const { focus } = this.props;

		return (
			<div className="tribe-editor-block-wrap">
				<DateTimeRange />
			</div>
		);
	}
}

export default {
	id: 'event-details',
	title: __( 'Event Details', 'the-events-calendar' ),
	description: __( 'Configuration for the Event', 'the-events-calendar' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'the-events-calendar', 'tribe' ],

	useOnce: true,

	attributes: {
	},

	// The "edit" property must be a valid function.
	edit: function( props ) {
		return <EventDetails />;
	},

	// The "save" property must be specified and must be a valid function.
	save: function( props ) {
		return null;
	}
};