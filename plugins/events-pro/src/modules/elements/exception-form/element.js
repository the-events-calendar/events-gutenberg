/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ExceptionField } from '@moderntribe/events-pro/elements';

export default class ExceptionForm extends PureComponent {
	static propTypes = {
		exceptions: PropTypes.arrayOf( PropTypes.shape( {} ) ),
	}

	static defaultProps = {
		exceptions: [],
	}

	render() {
		console.warn( this.props.exceptions );
		return (
			<section className="tribe-events-pro-recurring-block">
				{
					this.props.exceptions.map( exception => (
						<ExceptionField { ...exception } />
					) )
				}
			</section>
		);
	}
}
