/*
Copyright (c) 2019 Fight or Flight Comics, LLC.

This file is part of Each.

Each is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Each is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Each.  If not, see <https://www.gnu.org/licenses/>.
*/
import { currencyString } from './config';

function removeFromCartClickHandler(item) {
	let cartStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
	cartStorage = cartStorage.filter(i => i.name !== item.name);
	sessionStorage.setItem('cart', JSON.stringify(cartStorage));
}

function startCheckoutClickHandler(items) {
	if (!sessionStorage.getItem('shipping')) {
		return;
	}
	const shipping = sessionStorage.getItem('shipping');
	const tax = sessionStorage.getItem('tax');
	// tag it
	if (items.length > 0) {
		gtag('event', 'begin_checkout', {
			items,
			shipping,
			tax,
			value: items.reduce((v, i) => (i.price ? v + i.price * i.quantity : v), 0.0),
		});
	}
}

function changeQuantityHandler(name) {
	let cartStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];

	cartStorage.forEach(item => {
		if (item.name !== name) {
			return;
		}
		item.quantity = parseInt(this.value);
	});

	sessionStorage.setItem('cart', JSON.stringify(cartStorage));
}

function freightChangeHandler() {
	let shipping = 0.0;
	let shippingEl = document.getElementById('spnShipRate');
	if (shippingEl) {
		shipping = parseFloat(shippingEl.innerText.replace(currencyString));
	}
	sessionStorage.setItem('shipping', shipping);
}

function saveTax() {
	let tax = parseFloat(document.getElementById('spnSaleTax').innerText);
	sessionStorage.setItem('tax', tax);
}

export function tagCart() {
	let cartStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];

	let cartRows = [...document.querySelectorAll('.shopping-cart #dvCart tr')];
	let items = cartRows.map(row => {
		if (!row.id.startsWith('CartrowItems')) {
			return;
		}

		columns = row.getElementsByTagName('td');

		let name = columns[1].innerText.trim();
		let quantityEl = columns[3].querySelector('.qty input');
		quantityEl.addEventListener('change', event => changeQuantityHandler(name));

		let item = {
			name,
			price: parseFloat(columns[2].innerText.replace(currencyString, '')),
			quantity: parseInt(quantityEl.value),
		};

		if (cartStorage.some(c => c.name === item.name)) {
			// item is in cartStorage
			let itemFromStorage = cartStorage.filter(c => c.name === item.name)[0];
			item = Object.assign({}, itemFromStorage, item);
		}

		const removeFromCartBtn = row.querySelector('.delete_item');
		removeFromCartBtn.addEventListener('click', () => removeFromCartClickHandler(item));

		return item;
	});

	sessionStorage.setItem('cart', JSON.stringify(items));

	document.getElementById('btnProceed').addEventListener('click', () => {
		saveTax();
		startCheckoutClickHandler(items);
	});
}

document.getElementsByName('freightgrp').forEach(input => {
	input.addEventListener('change', () => freightChangeHandler());
});
