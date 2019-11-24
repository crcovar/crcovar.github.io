/* version: 0.5.0*/
import { tagProductListItems } from './product-lists.js';
import { tagProductDetail } from './product-detail.js';

function docReady(fn) {
	// see if DOM is already available
	if (document.readyState === 'complete' || document.readyState === 'interactive') {
		// call on next available tick
		setTimeout(fn, 1);
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function main() {
	// product list view
	if (document.querySelector('.product-list')) {
		tagProductListItems();
	}

	// product detail view
	if (document.querySelector('.product_view')) {
		tagProductDetail();
	}
}

docReady(main);
