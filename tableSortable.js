var sortableTables = document.querySelectorAll('table.sortable');
[].forEach.call(sortableTables, (table, tableKey) => {
	[].forEach.call(table.tHead.rows[0].cells, (cell, cellKey) => {
		if(cell.dataset.nonsortable != 'true'){
			cell.setAttribute('onclick', 'sortTable('+ tableKey + ',' + cellKey + ')');
		}
	});
});

function sortTable(table, column){
	[].forEach.call(sortableTables[table].tHead.rows[0].cells, (cell, cellKey) => {
		if(cellKey != column){
			cell.classList.remove('order-field', 'order-asc', 'order-desc');
			delete cell.dataset.order;
		}
	});
	var cell = sortableTables[table].tHead.rows[0].cells[column];
	cell.classList.add('order-field');
	var order = (cell.dataset.order == undefined) ? 'desc' : cell.dataset.order;
	cell.classList.remove('order-' + order);
	order = (order == 'asc') ? 'desc' : 'asc';
	cell.classList.add('order-' + order);
	
	[].slice.call(sortableTables[table].tBodies[0].rows).sort((a, b) => {
		var isNum = sortableTables[table].tHead.rows[0].cells[column].dataset.isnum;
		var aVal = (order == 'asc') ? getValue(a.cells[column], isNum) : getValue(b.cells[column], isNum);
		var bVal = (order == 'asc') ? getValue(b.cells[column], isNum) : getValue(a.cells[column], isNum);
		return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
	}).forEach((row, index) => {
		sortableTables[table].tBodies[0].appendChild(row);
	});
	cell.dataset.order = order;
}

function getValue(cell, isNum){
	return (cell.dataset.value != undefined) ? cell.dataset.value : (isNum == 'true') ? parseInt(cell.textContent) : cell.textContent;
}