/**
 * External dependencies
 */
import React from 'react';
import { unescape } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import { Placeholder, Spinner, withAPIData } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
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
		};
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
		return `tribe-editor__terms__list tribe-terms__list-level-${ level } ${ className }`;
	}

	renderTermName( term ) {
		if ( ! term.name ) {
			return __( '(Untitled)', 'events-gutenberg' );
		}

		return unescape( term.name ).trim();
	}

	renderTermList() {
		const terms = this.getTerms( null );

		return (
			<ul className={ this.getTermListClassName( 0 ) }>
				{ terms.map( ( term, index ) => {
					this.renderTermListItem( term, index + 1 === terms.length, 0 );
				} ) }
			</ul>
		);
	}

	renderTermListItem( term, isLast, level ) {
		const childTerms = this.getTerms( term.id );
		const separator = ! isLast ? (
			<span>
				{ this.props.termSeparator }
				{ ' ' }
			</span>
		) : null;

		return (
			<li key={ term.id }>
				<a href={ term.link } target="_blank">
					{ this.renderTermName( term ) }
				</a>
				{ separator }
			</li>
		);
	}

	renderEmpty() {
		const { renderEmpty, slug } = this.props;
		const key = `tribe-terms-${ slug }`;
		if ( ! renderEmpty ) {
			return null;
		}

		return [
			<div key={ key } className="tribe-editor__terms tribe-editor--empty">
				{ this.renderLabel() }
				{ renderEmpty }
			</div>,
		];
	}

	renderLabel() {
		const label = (
			<strong className="tribe-editor__details__label" key="terms-label">
				{ this.props.label }
				{ ' ' }
			</strong>
		);

		return label;
	}

	render() {
		const { attributes, focus, setAttributes, slug } = this.props;
		const terms = this.getTerms();
		const key = `tribe-terms-${ slug }`;

		if ( this.props.terms.isLoading ) {
			return [
				<div key={ key } className="tribe-editor__terms">
					{ this.renderLabel() }
					<Spinner key="terms-spinner" />
				</div>,
			];
		} else if ( ! terms.length ) {
			return this.renderEmpty();
		}

		return [
			<div key={ key } className="tribe-editor__terms">
				{ this.renderLabel() }
				<div key="terms" className={ this.props.className }>
					{ this.renderTermList() }
				</div>
			</div>,
		];
	}
}

TaxonomiesElement.defaultProps = {
	termSeparator: __( ', ', 'events-gutenberg' ),
	className: '',
};

const applySelect = withSelect( ( select, props ) => {
	return {
		terms: select( 'core/editor' ).getEditedPostAttribute( props.slug ),
	};
} );

const applyWithAPIData = withAPIData( ( props ) => {
	const { slug, terms } = props;
	const args = {
		per_page: 100,
		orderby: 'count',
		order: 'desc',
	};

	if ( ! terms || ! terms.length ) {
		return {
			terms: [],
		};
	}

	args.include = terms;

	const query = stringify( args );

	return {
		terms: `/wp/v2/${ slug }?${ query }`,
	};
} );

export default compose(
	applySelect,
	applyWithAPIData,
)( TaxonomiesElement );
