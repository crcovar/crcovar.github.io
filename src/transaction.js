function getTransactionId() {
	let span = document.querySelector('.payment_msg span:last-of-type');
	if (span && /^Your transaction id : .*$/.test(span.innerText)) {
		return span.innerText.split(':')[1].trim();
	}
	return `error${Date.now()}`;
}
export function tagTransaction() {
	let items = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];

	let purchase = {
		transaction_id: getTransactionId(),
		items,
		value: items.reduce((value, item) => (item.price ? value + item.price * item.quantity : value), 0),
	};

	gtag('event', 'purchase', purchase);
}
