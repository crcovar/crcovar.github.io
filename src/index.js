import { tagProductListItems } from './product-lists.js';
import { tagProductDetail } from './product-detail.js';
import { tagCart } from './cart.js';

document.body.innerHTML = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5LQHD3H"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->${document.body.innerHTML}`;

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

	// shopping cart
	if (document.querySelector('.shopping-cart')) {
		tagCart();
	}
}

docReady(main);
