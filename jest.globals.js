/**
 * External dependencies
 */
import React from 'react';
import $ from 'jquery';

global.jQuery = $;
global.$ = $;
global.wp = {
	element: React,
};

class LocalStorageMock {
	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getItem( key ) {
		return this.store[ key ];
	}

	setItem( key, value ) {
		this.store[ key ] = value.toString();
	}

	removeItem( key ) {
		delete this.store[ key ];
	}
}

global.localStorage = new LocalStorageMock;