/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { RecurringField } from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';

export default class RecurringForm extends PureComponent {
	static propTypes = {
		rules: PropTypes.arrayOf( PropTypes.shape( {} ) ),
		removeRule: PropTypes.func.isRequired,
	}

	static defaultProps = {
		rules: [],
	}

	render() {
		return (
			<section>
				{
					this.props.rules.map( ( rule, i ) => (
						<RecurringField
							key={ i }
							index={ i }
							isMultiDay={ rule[ constants.KEY_MULTI_DAY ] }
							onRemoveClick={ this.props.removeRule }
						/>
					) )
				}
			</section>
		);
	}
}
