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
	document.querySelectorAll('.product-list ul:not(#ulSearch) li').forEach(li => {
		let name = li.innerText.substring(0, li.innerText.indexOf('USD $')).trim();
		let price = li.innerText.substring(li.innerText.indexOf('USD $')).trim();

		items.push({ name, price, list_name });
	});
	
	if (items.length > 0) {
		gtag('event', 'view_item_list', { items });
	}
}

docReady(main);
