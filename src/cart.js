export function tagCart() {
	let cartRows = [...document.querySelectorAll('.shopping-cart #dvCart tr')];
	let items = cartRows.map(row => {
		columns = row.getElementsByTagName('td');
		return { name: columns[1].trim() };
	});
}
