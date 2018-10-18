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
		editException: PropTypes.func.isRequired,
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
							editException={ this.props.editException }
							{ ...exception }
						/>
					) )
				}
			</section>
		);
	}
}
