/*!
Copyright (c) 2019 Fight or Flight Comics, LLC.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import { tagProductListItems } from './product-lists.js';
import { tagProductDetail } from './product-detail.js';
import { tagCart } from './cart.js';
import { tagTransaction } from './transaction.js';

// let gtm = document.createElement('noscript');
// gtm.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5LQHD3H"
// height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

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
	// Check for cookie, if not found flush local storage and create it
	if (!document.cookie.split(';').filter(item => item.trim().startsWith('each=')).length) {
		localStorage.clear();
		document.cookie = 'each=true';
	}

	if (document.querySelector('.product-list')) {
		// document.body.insertBefore(gtm, document.body.firstChild);
		// product list view
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

	// comleted transaction
	if (window.location.pathname === '/Transaction') {
		tagTransaction();
	}
}

docReady(main);
