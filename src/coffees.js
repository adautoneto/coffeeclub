'use strict';

class CoffeeModel {
	constructor(coffee) {
		this.coffee = coffee;
	}

	participate() {
		console.log(this.coffee.name);
	}
}

class CoffeeList {
	fetch() {
		return new Promise( (resolve, reject ) => {
			const dbRef = firebase.database().ref().child('coffees');
			dbRef.on('value', _ => {		
				let values = _.val();
				resolve(values);
			});
		});		
	}	
}

class CoffeeView {
	constructor(coffeeList) {
		coffeeList.fetch()
				  .then( coffees => coffees.forEach(this.render.bind(this)) );
	}

	coffeeTemplate(coffee) {
		return `
			<tr>
				<td><!-- data --> </td>
				<td><!-- foto --></td>
				<td>${coffee.name}</td>
				<td><a class="js-participate" href="#participar">Participar</a></td>
			</tr>
		`;
	}

	render(coffee) {		
		let element = document.createElement('tr');
		element.innerHTML = this.coffeeTemplate(coffee);
		element.querySelector(".js-participate").addEventListener("click", (evt) => new CoffeeModel(coffee).participate() );
		document.querySelector("#coffees tbody").appendChild(element);
	}
}

new CoffeeView(new CoffeeList() );