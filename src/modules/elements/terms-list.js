/**
 * External dependencies
 */
import moment from 'moment';
import { connect } from 'react-redux';
import { times, unescape, get } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import { Placeholder, Spinner, withAPIData } from '@wordpress/components';
import { query } from '@wordpress/data'
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */


/**
 * Module Code
 */

class TaxonomiesElement extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			terms: null,
		}
	}

	getTerms( parentId = null ) {
		if ( ! this.props.terms ) {
			return [];
		}

		const terms = this.props.terms.data;
		if ( ! terms || ! terms.length ) {
			return [];
		}

		if ( parentId === null ) {
			return terms;
		}

		return terms.filter( term => term.parent === parentId );
	}

	getTermListClassName( level ) {
		const { className } = this.props;
		return `tribe-terms__list tribe-terms__list-level-${ level } ${ className }`;
	}

	renderTermName( term ) {
		if ( ! term.name ) {
			return __( '(Untitled)', 'the-events-calendar' );
		}

		return unescape( term.name ).trim();
	}

	renderTermList() {
		const terms = this.getTerms( null );

		return (
			<ul className={ this.getTermListClassName( 0 ) }>
				{ terms.map( ( term, index ) => this.renderTermListItem( term, index + 1 === terms.length, 0 ) ) }
			</ul>
		);
	}

	renderTermListItem( term, isLast, level ) {
		const childTerms = this.getTerms( term.id );
		const separator = ! isLast ? <span>{ this.props.termSeparator } </span> : '';

		return (
			<li key={ term.id }>
				<a href={ term.link } target="_blank">{ this.renderTermName( term ) }</a>
				{ separator }
			</li>
		);
	}

	render() {
		const { attributes, focus, setAttributes, slug } = this.props;
		const terms = this.getTerms();
		const label = <strong className='tribe-detail-label' key='terms-label'>{ this.props.label } </strong>;
		const key   = `tribe-terms-${slug}`;

		if ( this.props.terms.isLoading ) {
			return [
				<div key={ key } className="tribe-terms__block">
					{ label }
					<Spinner key='terms-spinner' />
				</div>
			];
		} else if ( ! terms.length ) {
			return null;
		}

		return [
			<div key={ key } className="tribe-terms__block">
				{ label }
				<div key="terms" className={ this.props.className }>
					{ this.renderTermList() }
				</div>
			</div>
		];
	}
}

TaxonomiesElement.defaultProps = {
	termSeparator: __( ', ', 'the-events-calendar' ),
	className: '',
};

const applyQuery = query( ( select, props ) => {
	return {
		terms: select( 'core/editor' ).getEditedPostAttribute( props.slug ),
	}
} );

const applyWithAPIData = withAPIData( ( props ) => {
	const { slug, terms } = props;
	const query = stringify( {
		per_page: 100,
		orderby: 'count',
		order: 'desc',
		include: terms,
		// _fields: [ 'id', 'name' ],
	} );
	return {
		terms: `/wp/v2/${slug}?${ query }`,
	};
} );

export default compose(
	applyQuery,
	applyWithAPIData,
)( TaxonomiesElement );
