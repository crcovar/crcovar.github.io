function removeFromCartClickHandler(item) {}

export function tagCart() {
	let cartStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
	let cartRows = [...document.querySelectorAll('.shopping-cart #dvCart tr')];
	let items = cartRows.map(row => {
		if (!row.id.startsWith('CartrowItems')) {
			return;
		}

		columns = row.getElementsByTagName('td');

		let item = {
			name: columns[1].innerText.trim(),
			price: parseFloat(columns[2].innerText.replace('USD $', '')),
			quantity: parseInt(columns[3].querySelector('.qty input').value),
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

	// tag it
	if (items.length > 0) {
		gtag('event', 'begin_checkout', { items, checkout_option: 'viewed cart' });
	}
}
