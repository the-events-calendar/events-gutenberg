/**
 * External dependencies
 */
import React from 'react';
import { isEmpty } from 'lodash';

/**
 * Wordpress dependencies
 */

/**
 * Import internal dependencies
 */
import { withDetails } from 'editor/hoc';
import { Loading } from 'elements';
import { Actions, Name } from './index';

const Item = ( { id, details = {}, loading, onRemoveOrganizer, ...rest } ) => {
	if ( loading || isEmpty( details ) ) {
		return <li><Loading className="tribe-editor__spinner--item" /></li>;
	}

	return (
		<li>
			<Name { ...details } />
			<Actions id={ id } onRemoveOrganizer={ onRemoveOrganizer } { ...rest } />
		</li>
	);
};

export default withDetails( 'id' )( Item );
