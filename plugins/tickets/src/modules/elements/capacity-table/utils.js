import identity from 'lodash/identity';

export const toLabel = ( items = [] ) => {
	const label = items.filter( identity ).join( ', ' );
	return label.length ? ` ( ${ label } ) ` : '';
}
