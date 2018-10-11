/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ExceptionField } from '@moderntribe/events-pro/elements';

export default class ExceptionForm extends PureComponent {
	static propTypes = {
		exceptions: PropTypes.arrayOf( PropTypes.shape( {} ) ),
		removeException: PropTypes.func.isRequired,
	}

	static defaultProps = {
		exceptions: [],
	}

	render() {
		return (
			<section>
				{
					this.props.exceptions.map( exception => (
						<ExceptionField { ...exception } onRemoveClick={ this.props.removeException } />
					) )
				}
			</section>
		);
	}
}