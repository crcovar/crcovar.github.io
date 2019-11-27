export function tagProductDetail() {
	let item = {
		name: document.querySelector('.product_view .pro_detail h2').innerText.trim(),
		price: parseFloat(document.querySelector('.product_view .pro_detail .price').innerText.replace('USD $', '')),
	};

	// get item from storage, add extra info if they match
	let itemClicked = JSON.parse(sessionStorage.getItem('item-clicked'));
	if (itemClicked.name === item.name);
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

		//add item to cart storage, creating it if needed
		if (!sessionStorage.getItem('cart')) {
			sessionStorage.setItem('cart', '[]');
		}
		let cartStorage = JSON.parse(sessionStorage.getItem('cart'));
		cartStorage.push(item);
		sessionStorage.setItem('cart', JSON.stringify(cartStorage));

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
