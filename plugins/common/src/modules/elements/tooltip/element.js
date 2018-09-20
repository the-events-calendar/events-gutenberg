/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { Tooltip as WpTooltip } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/elements';

class Tooltip extends PureComponent {
	static defaultProps = {
		position: 'top right',
		text: '',
	};

	static propTypes = {
		label: PropTypes.node,
		labelClassName: PropTypes.string,
		position: PropTypes.oneOf( [
			'top left',
			'top center',
			'top right',
			'bottom left',
			'bottom center',
			'bottom right',
		] ),
		text: PropTypes.string,
	};

	render() {
		const { label, labelClassName, position, text } = this.props;

		return (
			<WpTooltip text={ text } position={ position }>
				<Button
					aria-label={ text }
					className={ classNames( 'tribe-editor__tooltip-label', labelClassName ) }
				>
					{ label }
				</Button>
			</WpTooltip>
		);
	}
}

export default Tooltip;
