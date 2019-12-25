function removeFromCartClickHandler(item) {
	let cartStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
	cartStorage = cartStorage.filter(i => i.name !== item.name);
	sessionStorage.setItem('cart', JSON.stringify(cartStorage));
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
			price: parseFloat(columns[2].innerText.replace('USD $', '')),
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

	// tag it
	if (items.length > 0) {
		gtag('event', 'begin_checkout', { items, checkout_option: 'viewed cart' });
	}
}
