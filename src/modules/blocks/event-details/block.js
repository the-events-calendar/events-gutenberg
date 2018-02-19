/**
 * External dependencies
 */
import moment from 'moment';
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import {
	Dropdown
} from '@wordpress/components';
import { RichText, PlainText } from '@wordpress/blocks'
import { select } from '@wordpress/data'
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	TermsList,
	OrganizerForm,
	DateTime,
} from 'elements'

/**
 * Module Code
 */

class MetaGroup extends Component {
	static defaultProps = { className: '', children: null }

	constructor() {
		super( ...arguments );
	}

	render() {
		const { groupKey, className, children } = this.props;

		return (
			<div
				className={ `tribe-editor-meta-group tribe-editor-meta-group-${groupKey} ${className}` }
				key={ groupKey }
			>
				{ children }
			</div>
		)
	}
}

class EventDetails extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { attributes, setAttributes, focus, setFocus } = this.props;

		const content = (
			<div key="event-details-box" className="tribe-editor-block tribe-editor-events-details">
				<MetaGroup groupKey='event-details'>
					<RichText
						tagName="h3"
						className="tribe-events-single-section-title"
						value={ attributes.detailsTitle }
						onChange={ ( nextContent ) => {
							if ( ! nextContent ) {
								nextContent = __( 'Details', 'the-events-calendar' );
							}

							setAttributes( {
								detailsTitle: nextContent
							} );
						} }
						focus={ focus && 'detailsTitle' === focus.editable ? focus : undefined }
						onFocus={ ( focusValue ) => setFocus( { editable: 'detailsTitle', ...focusValue } ) }
						placeholder={ __( 'Details', 'the-events-calendar' ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					/>

					<DateTime
						changeDatetime={ date => setAttributes( { startDate: date } ) }
						datetime={ attributes.startDate }
						label={ __( 'Start: ', 'the-events-calendar' ) }
					/>

					<DateTime
						changeDatetime={ date => setAttributes( { endDate: date } ) }
						datetime={ attributes.endDate }
						label={ __( 'End: ', 'the-events-calendar' ) }
					/>

					<div>
						<strong>Website: </strong>
						<PlainText
							id="tribe-event-url"
							value={ attributes.eventUrl }
							placeholder={ __( 'Write event website here…', 'the-events-calendar' ) }
							onChange={ ( nextContent ) => {
								setAttributes( {
									eventUrl: nextContent
								} );
							} }
						/>
					</div>

					<TermsList
						slug="tribe_events_cat"
						label={ __( 'Event Category:', 'the-events-calendar' ) }
					/>

					<TermsList
						slug="tags"
						label={ __( 'Event Tags:', 'the-events-calendar' ) }
					/>
				</MetaGroup>
				<MetaGroup groupKey='organizer'>
					<RichText
						tagName="h3"
						className="tribe-events-single-section-title"
						value={ attributes.organizerTitle }
						onChange={ ( nextContent ) => {
							setAttributes( {
								organizerTitle: nextContent
							} );
						} }
						focus={ focus && 'organizerTitle' === focus.editable ? focus : undefined }
						onFocus={ ( focusValue ) => setFocus( { editable: 'organizerTitle', ...focusValue } ) }
						placeholder={ __( 'Organizer', 'the-events-calendar' ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					/>
					<Dropdown
						className="tribe-editor-organizer-dropdown"
						position="bottom center"
						contentClassName="tribe-editor-dropdown__dialog"
						renderToggle={ ( { onToggle, isOpen } ) => (
							<button
								type="button"
								className="button-secondary"
								onClick={ onToggle }
								aria-expanded={ isOpen }
							>
								{ __( 'Add Existing', 'the-events-calendar' ) }
							</button>
						) }
						renderContent={ () => ( <OrganizerForm /> ) }
					/>
					<Dropdown
						className="tribe-editor-organizer-dropdown"
						position="bottom center"
						contentClassName="tribe-editor-dropdown__dialog"
						renderToggle={ ( { onToggle, isOpen } ) => (
							<button
								type="button"
								className="button-secondary"
								onClick={ onToggle }
								aria-expanded={ isOpen }
							>
								{ __( 'Create', 'the-events-calendar' ) }
							</button>
						) }
						renderContent={ () => ( <OrganizerForm /> ) }
					/>
				</MetaGroup>
			</div>
		)

		return content
	}
}

export default EventDetails;
