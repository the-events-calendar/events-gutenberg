/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ExceptionField } from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';

const { KEY_TYPE } = constants;

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
					this.props.exceptions.map( ( exception, i ) => (
						<ExceptionField
							key={ i }
							index={ i }
							onRemoveClick={ this.props.removeException }
							type={ exception[ KEY_TYPE ] }
						/>
					) )
				}
			</section>
		);
	}
}
