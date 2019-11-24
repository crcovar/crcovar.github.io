/* version: 0.4.0 */

function docReady(fn) {
	// see if DOM is already available
	if (document.readyState === 'complete' || document.readyState === 'interactive') {
		// call on next available tick
		setTimeout(fn, 1);
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function tagProductListItems() {
	// product list name
	let list_name = document.querySelector('.product-list h2:first-of-type').innerText.toLowerCase();

	function selectContentClickHandler(item) {
		gtag('event', 'select_content', {
			content_type: 'product',
			items: [item],
		});
	}

	function buildItemList(listItems) {
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
	// get product list
	let items = buildItemList([...document.querySelectorAll('.product-list #ulAllProduct li')]);
	if (items.length === 0) {
		// not on a product list page so check for main page list
		items = buildItemList([...document.querySelectorAll('.product-list ul:not(#ulSearch) li')]);
	}

	if (items.length > 0) {
		gtag('event', 'view_item_list', { items });
	}
}

function tagProductDetail() {
	let item = {
		name: document.querySelector('.product_view .pro_detail h2').innerText.trim(),
		price: parseFloat(document.querySelector('.product_view .pro_detail .price').innerText.replace('USD $', '')),
	};

	[...document.querySelectorAll('.product_view .pro_content li')].forEach(li => {
		if (li.children.length > 1 && li.children[0].innerText.toLowerCase() === 'publisher') {
			item.brand = li.children[1].innerText.trim();
		}
		if (li.children.length > 1 && li.children[0].innerText.toLowerCase() === 'category') {
			item.category = li.children[1].innerText.trim();
		}
	});

	function addToCartClickHandler(item) {
		let quantity = parseInt(document.querySelector('.product_view .qty_sec .qty #TotalItem').value);
		gtag('event', 'add_to_cart', { items: [{ ...item, quantity }] });
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

function main() {
	if (document.querySelector('.product-list')) {
		tagProductListItems();
	}

	// product detail view
	if (document.querySelector('.product_view')) {
		tagProductDetail();
	}
}

docReady(main);
