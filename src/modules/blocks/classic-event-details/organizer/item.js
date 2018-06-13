/**
 * External dependencies
 */
import React from 'react';

/**
 * Wordpress dependencies
 */
import { compose } from '@wordpress/element';

/**
 * Import internal dependencies
 */
import { POST_TYPE } from 'data/organizers';
import withRequest from 'editor/hoc/with-request';
import { Loading } from 'elements';
import { Actions, Name } from './index';

const Item = ( { id, data = {}, isLoading, onRemoveOrganizer } ) => {

	if ( isLoading ) {
		return <li><Loading className="tribe-editor__spinner--item" /></li>;
	}

	return (
		<li>
			<Name { ...data } />
			<Actions id={ id } onRemoveOrganizer={ onRemoveOrganizer } />
		</li>
	);
};

export default compose( [
	withRequest( ( props ) => {
		return {
			path: `/wp/v2/${ POST_TYPE }/${ props.id }`,
		};
	} ),
] )( Item );

