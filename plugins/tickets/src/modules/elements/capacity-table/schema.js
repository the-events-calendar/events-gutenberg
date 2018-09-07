import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
	PropTypes.shape( {
		name: PropTypes.string,
		quantity: PropTypes.number,
	} ),
)

export const getValues = ( items ) => (
	items.reduce( ( accumulator, item ) => {
		if ( item.name ) {
			accumulator.names.push( item.name );
		}
		if ( 'quantity' in item && ! isNaN( item.quantity ) ) {
			accumulator.total += item.quantity;
		}
		return accumulator;
	}, { names: [], total: 0 } )
)
