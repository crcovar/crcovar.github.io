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
function getTransactionId() {
	let span = document.querySelector('.payment_msg span:last-of-type');
	if (span && /^Your transaction id : .*$/.test(span.innerText)) {
		return span.innerText.split(':')[1].trim();
	}
	return `error${Date.now()}`;
}
export function tagTransaction() {
	const items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	const shipping = localStorage.getItem('shipping') ? localStorage.getItem('shipping') : 0.0;
	const tax = localStorage.getItem('tax');

	let purchase = {
		transaction_id: getTransactionId(),
		items,
		shipping,
		tax,
		value: items.reduce((value, item) => (item.price ? value + item.price * item.quantity : value), 0),
	};

	gtag('event', 'purchase', purchase);
}
