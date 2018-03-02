/**
 * External dependencies
 */
import { get, isFunction } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
import {
	Spinner,
	Placeholder,
	withAPIData
} from '@wordpress/components';


class OrganizerForm extends Component {
	static defaultProps = {
		postType: 'tribe_organizer',
	};

	constructor() {
		super( ...arguments );
		this.updateOrganizer = this.updateOrganizer.bind( this );
		this.onSubmit = this.onSubmit.bind( this );

		this.state = {
			title: null,
			phone: '',
			website: '',
			email: '',
			organizer: null,
		}
	}

	isCreating() {
		if ( ! this.state.organizer ) {
			return false;
		}

		if ( ! isFunction( this.state.organizer.state ) ) {
			return false;
		}

		return 'pending' === this.state.organizer.state()
	}

	onSubmit() {
		const {
			title,
			phone,
			website,
			email,
		} = this.state;

		this.updateOrganizer( {
			title: title,
			// For now every Organizer goes are publish
			status: 'publish',
			meta: {
				_OrganizerEmail: email,
				_OrganizerPhone: phone,
				_OrganizerWebsite: website,
			}
		} );
	}

	updateOrganizer( toSend ) {
		const organizerModel = wp.api.getPostTypeModel( this.props.postType )
		const organizer = new organizerModel( toSend ).save();

		// Set the organizer state
		this.setState( { organizer: organizer } );

		organizer.done( ( newPost ) => {
			if ( ! newPost.id ) {
				console.warning( 'Invalid creation of organizer:', newPost )
			}

			this.props.addOrganizer( newPost.id );
			this.props.onClose();
		} ).fail( ( err ) => {
			console.log( err );
		} );
	}

	render() {
		if ( this.isCreating() ) {
			return [
				<div
					className="tribe-organizer-form"
					key='tribe-organizer-form'
				>
					<Placeholder key="placeholder">
						<Spinner />
					</Placeholder>
				</div>
			];
		}

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
							onChange={ ( next ) => this.setState( { title: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'Phone:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='organizer[phone]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { phone: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'Website:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='organizer[website]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { website: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'Email:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='organizer[email]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { email: next.target.value } ) }
						/>
					</dd>
				</dl>
				<button
					type="button"
					className="button-secondary"
					onClick={ this.onSubmit }
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