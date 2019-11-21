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
	// get product list
	let items = [];
	document.querySelectorAll('.product-list ul:not(#ulSearch) li').forEach(li => {
		let name = li.innerText.substring(0, li.innerText.indexOf('$')).trim();
		let price = li.innerText.substring(li.innerText.indexOf('$')).trim();

		items.push({ name, price, list_name: 'Test' });
	});

	gtag('event', 'view_item_list', {
		items,
	});
}

docReady(main);
