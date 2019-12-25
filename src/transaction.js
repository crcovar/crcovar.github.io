function getTransactionId() {
	let span = document.querySelector('.payment_msg span:last-of-type');
	if (span && /^Your transaction id : .*$/.test(span.innerText)) {
		return span.innerText.split(':')[1].trim();
	}
	return `error${Date.now()}`;
}
export function tagTransaction() {
	const items = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
	const shipping = sessionStorage.getItem('shipping') ? sessionStorage.getItem('shipping') : 0.0;
	const tax = sessionStorage.getItem('tax');

	let purchase = {
		transaction_id: getTransactionId(),
		items,
		shipping,
		tax,
		value: items.reduce((value, item) => (item.price ? value + item.price * item.quantity : value), 0),
	};

	gtag('event', 'purchase', purchase);
}
