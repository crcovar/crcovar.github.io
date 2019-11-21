/* version: 0.1.0 */

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
	// product list name
	let list_name = document.querySelector('.product-list h2:first-of-type').innerText.toLowerCase();
	
	// get product list
	let items = [];
	document.querySelectorAll('.product-list ul:not(#ulSearch) li').forEach((li, i) => {
		let item = li.innerText.split('USD $');
		let name = item[0].trim();
		let price = parseFloat(item[1]);

		items.push({ name, price, list_name, list_position: i+1 });
	});
	
	if (items.length > 0) {
		gtag('event', 'view_item_list', { items });
	}
}

docReady(main);
