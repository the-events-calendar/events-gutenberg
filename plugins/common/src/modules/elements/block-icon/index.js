/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { TEC } from '@moderntribe/common/icons';
import './style.pcss';

const Icon = ( props ) => {
	const ChildIcon = props.icon
	return (
		<div className="tribe-editor__icons__container tribe-editor__icons--tec">
			<ChildIcon />
		</div>
	)
};

Icon.defaultProps = {
	icon: TEC
}

export default Icon