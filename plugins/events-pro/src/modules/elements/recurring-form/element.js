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

const { KEY_MULTI_DAY, KEY_TYPE } = constants;

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
							isMultiDay={ rule[ KEY_MULTI_DAY ] }
							onRemoveClick={ this.props.removeRule }
							type={ rule[ KEY_TYPE ] }
						/>
					) )
				}
			</section>
		);
	}
}
