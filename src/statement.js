var participate = document.getElementById("participate");
participate.addEventListener("click", (e) => {
	e.preventDefault();
	const dbRef = firebase.database().ref().child('next-coffee/participants');
	dbRef.push(firebase.auth().currentUser.displayName);
	alert('Obrigado! Você está participando do próximo café!');
});

function isParticipating(){
	const dbRef = firebase.database().ref().child('next-coffee/participants');
	const name = firebase.auth().currentUser.displayName;			
	dbRef.once('value', _ => {
		const values = _.val();
		const participants = Object.keys(values).map(k => values[k]);
		if (participants.indexOf(name) > -1) {
			var participate = document.getElementById("participate");
			participate.innerText = "Você está participando!";
		}
	});
}

function showNextCoffee() {
	const dbRef = firebase.database().ref().child('next-coffee');			
	dbRef.on('value', snap => {
		let cost = document.getElementById('cost');
		let expectedPrice = document.getElementById('cost');
		isParticipating();
	});
}

function clearTable(table) {
	let tbody = table.getElementsByTagName("tbody")[0];			
	let rows = tbody.children.length;
	for (let i = 0; i < rows; i++) {
		let row = tbody.children[i];
		tbody.deleteRow(row);
	};				
}

function createRowOnTable(table, ...columnValues) {
	var tbody = table.getElementsByTagName("tbody")[0];
	var tr = document.createElement('tr');
	columnValues.forEach(columnValue => {
		var td = document.createElement('td');
		td.innerText = columnValue || "";
		tr.appendChild(td);
	});
	tbody.appendChild(tr);
}

function loadBalance(displayName) {
	const usernode ='statement/' + displayName;	
	var dbRef = firebase.database().ref().child(usernode);
	let statement = document.getElementById('statement');
	dbRef.on('value', snap => {
		let balance = 0;
		clearTable(statement);
		snap.forEach(_ => {
			var val = _.val();
			createRowOnTable(statement, val.date.replace('-', '/'), val.value.toFixed(2), val.description);					
			balance += _.val().value;
		});
		let balanceElement = document.getElementById('balance');
		balanceElement.innerText = "R$ " + balance.toFixed(2);
	});
}