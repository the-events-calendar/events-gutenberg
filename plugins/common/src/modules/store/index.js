/**
 * Internal dependencies
 */
import configureStore from './configureStore';

const store = configureStore();

export const getStore = () => store;
