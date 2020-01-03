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

function selectContentClickHandler(item) {
	// store item for detail view
	localStorage.setItem('item-clicked', JSON.stringify(item));
	// fire event
	gtag('event', 'select_content', {
		content_type: 'product',
		items: [item],
	});
}

function buildItemList(list_name, listItems) {
	return listItems.map((li, index) => {
		let nameAndPrice = li.innerText.split(currencyString);
		let name = nameAndPrice[0].trim();
		let price = parseFloat(nameAndPrice[1]);

		let item = { name, price, list_name, list_position: index + 1 };

		li.querySelectorAll('a').forEach(a => {
			a.addEventListener('click', () => selectContentClickHandler(item));
		});

		return item;
	});
}

export function tagProductListItems() {
	// product list name
	let list_name = document.querySelector('.product-list h2:first-of-type').innerText.toLowerCase();

	// get product list
	let items = buildItemList(list_name, [...document.querySelectorAll('.product-list #ulAllProduct li')]);
	if (items.length === 0) {
		// not on a product list page so check for main page list
		items = buildItemList(list_name, [...document.querySelectorAll('.product-list ul:not(#ulSearch) li')]);
	}
	if (items.length > 0) {
		gtag('event', 'view_item_list', { items });
	}
}
