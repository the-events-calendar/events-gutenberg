/**
 * External dependencies
 */
import React from 'react';
import { compose } from 'redux';
import { unescape } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Spinner, withAPIData } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.pcss';

class TaxonomiesElement extends Component {
	constructor() {
		super( ...arguments );
	}

	getTerms = ( parentId = null ) => {
		const { terms } = this.props;
		
		if ( ! terms || ! terms.length ) {
			return [];
		}

		if ( parentId === null ) {
			return terms;
		}

		return terms.filter( ( term ) => term.parent === parentId );
	}

	getTermListClassName = ( level ) => (
		`tribe-editor__terms__list tribe-editor__terms__list--level-${ level }`
	);

	getTermListItemClassName = ( level ) => (
		`tribe-editor__terms__list-item tribe-editor__terms__list-item--level-${ level }`
	);

	renderTermName = ( term ) => {
		if ( ! term.name ) {
			return __( '(Untitled)', 'events-gutenberg' );
		}

		return unescape( term.name ).trim();
	}

	renderTermList() {
		const terms = this.getTerms( null );

		return (
			<ul className={ this.getTermListClassName( 0 ) }>
				{ terms.map( ( term, index ) => (
					this.renderTermListItem( term, index + 1 === terms.length, 0 )
				) ) }
			</ul>
		);
	}

	renderTermListItem = ( term, isLast ) => {
		const separator = ! isLast ? (
			<span>
				{ this.props.termSeparator }
			</span>
		) : null;

		return (
			<li key={ term.id } className={ this.getTermListItemClassName( 0 ) }>
				<a
					href={ term.link }
					target="_blank"
					rel="noopener noreferrer"
					className="tribe-editor__terms__list-item-link"
				>
					{ this.renderTermName( term ) }
				</a>
				{ separator }
			</li>
		);
	}

	renderEmpty = () => {
		const { renderEmpty, slug } = this.props;
		const key = `tribe-terms-${ slug }`;
		if ( ! renderEmpty ) {
			return null;
		}

		return [
			<div key={ key } className="tribe-editor__terms tribe-editor__terms--empty">
				{ this.renderLabel() }
				{ renderEmpty }
			</div>,
		];
	}

	renderLabel = () => {
		const label = (
			<strong className="tribe-editor__terms__label" key="terms-label">
				{ this.props.label }
				{ ' ' }
			</strong>
		);

		return label;
	}

	render() {
		const { className, slug } = this.props;
		const terms = this.getTerms();
		const key = `tribe-terms-${ slug }`;

		if ( this.props.isRequesting ) {
			return [
				<div key={ key } className={ `tribe-editor__terms ${ className }` }>
					{ this.renderLabel() }
					<Spinner key="terms-spinner" />
				</div>,
			];
		} else if ( ! terms.length ) {
			return this.renderEmpty();
		}

		return [
			<div key={ key } className={ `tribe-editor__terms ${ className }` }>
				{ this.renderLabel() }
				<div key="terms" className="tribe-editor__terms__list-wrapper">
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
	const { getEntityRecords } = select( 'core' );
	const { isResolving } = select( 'core/data' );
	const { slug } = props;
	// post_tags are stored as 'tags' in the editor attributes
	const attributeName = slug === 'post_tag' ? 'tags' : slug;
	const ids = select( 'core/editor' ).getEditedPostAttribute( attributeName );

	if ( ! ids || ids.length === 0 ) {
		return { terms: [], isRequesting: false };
	}

	const query = {
		orderby: 'count',
		order: 'desc',
		include: ids,
	}

	return {
		terms: getEntityRecords( 'taxonomy', slug, query ),
		isRequesting: isResolving( 'core', 'getEntityRecords', [ 'taxonomy', slug, query ] ),
	};
} );

export default compose(
	applySelect,
)( TaxonomiesElement );
