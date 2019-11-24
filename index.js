/* version: 0.2.0 */

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
	if (document.querySelector('.product-list')) {
		// product list name
		let list_name = document.querySelector('.product-list h2:first-of-type').innerText.toLowerCase();

		function buildItemList(listItems) {
			return listItems.map((li, index) => {
				let item = li.innerText.split('USD $');
				let name = item[0].trim();
				let price = parseFloat(item[1]);

				return { name, price, list_name, list_position: index + 1 };
			});
		}
		// get product list
		let items = [];
		let items = buildItemList([...document.querySelectorAll('.product-list #ulAllProduct li')]);
		if (items.length === 0) {
			items = buildItemList([...document.querySelectorAll('.product-list ul:not(#ulSearch) li)]);
		}

		if (items.length > 0) {
			gtag('event', 'view_item_list', { items });
		}
	}

	// product detail view
	if (document.querySelector('.product_view')) {
		let item = {
			name: document.querySelector('.product_view .pro_detail h2').innerText.trim(),
			price: parseFloat(
				document.querySelector('.product_view .pro_detail .price').innerText.replace('USD $', ''),
			),
		};

		[...document.querySelectorAll('.product_view .pro_content li')].forEach(li => {
			if (li.children.length > 1 && li.children[0].innerText.toLowerCase() === 'publisher') {
				item.brand = li.children[1].innerText.trim();
			}
			if (li.children.length > 1 && li.children[0].innerText.toLowerCase() === 'category') {
				item.category = li.children[1].innerText.trim();
			}
		});
		gtag('event', 'view_item', { items: [item] });
	}
}

docReady(main);
