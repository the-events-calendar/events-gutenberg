/**
 * External dependencies
 */
import { get } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { withAPIData } = wp.components;
const { Component } = wp.element;
const { decodeEntities } = wp.utils;


class OrganizerForm extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return [
			<div
				className="tribe-organizer-form"
				key='tribe-organizer-form'
			>
				<h3 key="tribe-organizer-form-title">{ __( 'Create Organizer' ) }</h3>
				<p className='description'>{ __( 'The e-mail address will be obfuscated on your site to avoid it getting harvested by spammers.', 'the-events-calendar' ) }</p>
				<dl>
					<dt>{ __( 'Name:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='organizer[name]'
							ref={ ( input ) => this.input = input }
						/>
					</dd>
					<dt>{ __( 'Phone:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='organizer[phone]'
							ref={ ( input ) => this.input = input }
						/>
					</dd>
					<dt>{ __( 'Website:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='organizer[website]'
							ref={ ( input ) => this.input = input }
						/>
					</dd>
					<dt>{ __( 'Email:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='organizer[email]'
							ref={ ( input ) => this.input = input }
						/>
					</dd>
				</dl>
				<button
					type="button"
					className="button-secondary"
				>
					{ __( 'Create Organizer', 'the-events-calendar' ) }
				</button>
			</div>,
		];
	};
}

const applyWithAPIData = withAPIData( ( props ) => {
	const query = stringify( {
		per_page: 100,
		orderby: 'menu_order',
		order: 'asc',
		_fields: [ 'id', 'parent', 'title' ],
	} );
	return {
		pages: `/wp/v2/pages?${ query }`,
	};
} );

export default OrganizerForm;