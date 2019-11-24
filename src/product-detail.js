export function tagProductDetail() {
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
