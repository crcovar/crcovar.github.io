function selectContentClickHandler(item) {
	gtag('event', 'select_content', {
		content_type: 'product',
		items: [item],
	});
}

function buildItemList(list_name, listItems) {
	return listItems.map((li, index) => {
		let nameAndPrice = li.innerText.split('USD $');
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
