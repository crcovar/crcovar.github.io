export function tagCart() {
	let cartStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
	let cartRows = [...document.querySelectorAll('.shopping-cart #dvCart tr')];
	let items = cartRows.map(row => {
		columns = row.getElementsByTagName('td');
		return { name: columns[1].trim() };
	});
}
