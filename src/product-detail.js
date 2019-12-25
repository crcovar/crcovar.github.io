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
export function tagProductDetail() {
	let item = {
		name: document.querySelector('.product_view .pro_detail h2').innerText.trim(),
		price: parseFloat(document.querySelector('.product_view .pro_detail .price').innerText.replace('USD $', '')),
	};

	// get item from storage, add extra info if they match
	let itemClicked = sessionStorage.getItem('item-clicked') ? JSON.parse(sessionStorage.getItem('item-clicked')) : {};
	if (itemClicked.name && itemClicked.name === item.name);
	item = Object.assign({}, itemClicked, item);

	// add brand (publisher) and category details
	[...document.querySelectorAll('.product_view .pro_content li')].forEach(li => {
		if (li.children.length > 1 && li.children[0].innerText.toLowerCase() === 'publisher') {
			item.brand = li.children[1].innerText.trim();
		}
		if (li.children.length > 1 && li.children[0].innerText.toLowerCase() === 'category') {
			item.category = li.children[1].innerText.trim();
		}
	});

	function addToCartClickHandler(item) {
		item.quantity = parseInt(document.querySelector('.product_view .qty_sec .qty #TotalItem').value);

		// save to storage
		let cartStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
		cartStorage.push(item);
		sessionStorage.setItem('cart', JSON.stringify(cartStorage));

		// tag event
		gtag('event', 'add_to_cart', { items: [item] });
	}
	// and click handler for add to cart
	if (document.querySelector('.product_view .qty_sec .qty #TotalItem')) {
		// finding a quantity input means we have stock
		if (document.querySelector('.product_view .qty_sec .addcart')) {
			let addToCartButton = document.querySelector('.product_view .qty_sec .addcart');
			addToCartButton.addEventListener('click', () => addToCartClickHandler(item));
		}
	}

	// send event for view_item
	gtag('event', 'view_item', { items: [item] });
}
