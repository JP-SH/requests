function add(x,y) {
  return new Promise((resolve, reject) => {
    if(typeof x !== 'number' || typeof y !== 'number') {
      reject('X and Y must be numbers');
    } else {
      resolve(x + y);
    }
  })
}

how to write the same code as above with asynch
async function add(x,y) {
  if(typeof x !== 'number' || typeof y !== 'number') {
    throw 'X and Y must be numbers!';
  }
  return s + y;
}

add(5, 4)
.then((res) => {
  console.log('Answer is:', res);
})
.catch((err) => {
  console.log('Rejected because:', err);
})

await
function getPlanets() {
  return axios.get('https://swapi.co/api/planets/');
}

getPlanets().then((res) => {
  console.log(res.data);
})

// rather than having to write a then for when the promise is resolved 'await' makes javascript wait untill the promise is resolved and then moves onto the next line. It bascially replaces '.then'.
  // also 'await' only works in async functions
// async function getPlanets() {
//   const res = await axios.get('https://swapi.co/api/planets/');
//   console.log(res.data);
//   // ^this line only runs after the previous line is complete (the axios promise is resolved) because we used 'await'
// }


// same code as above but using 'try & catch" to handle errors
// async function getPlanets() {
//   try {
//     const res = await axios.get('https://swapi.co/api/planets/');
//     console.log(res.data);
//   } catch (err) {
//     console.log('In catch', err);
//   }
// }

// getPlanets();

// refactoring moving button
const moveX = (element, amount, delay) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      const bodyBoundary = document.body.clientWidth;
      const elRight = element.getBoundingClientRect().right;
      const currLeft = element.getBoundingClientRect().left;
      if (elRight + amount > bodyBoundary) {
        reject({bodyBoundary, elRight, amount})
      }
      else {
        element.style.transform = `translateX(${currLeft + amount}px)`;
        resolve();
      }
    }, delay);
  })
};

const btn = document.querySelector('button');

// moveX(btn, 300, 1000)
// .then(() => moveX(btn, 300, 1000))
// .then(() => moveX(btn, 300, 1000))
// .then(() => moveX(btn, 300, 1000))
// .then(() => moveX(btn, 300, 1000))
// .then(() => moveX(btn, 300, 1000))
// .catch(({bodyBoundary, elRight, amount}) => {
//   console.log(`Body is ${bodyBoundary}px wide`);
//   console.log(`Element is at ${elRight}px, ${amount}px is too large!`);
// });

async function animateRight(el, amt) {
  await moveX(el, amt, 1000);
  await moveX(el, amt, 1000);
  await moveX(el, amt, 1000);
  await moveX(el, amt, 1000);
  await moveX(el, amt, 1000);
  await moveX(el, amt, 1000);
}

animateRight(btn, 100).catch((err) => {
  console.log('NO MORE ROOM!');
  animateRight(btn, -100);
})

// SEQUENTIAL REQUESTS!
async function get3PokemonSequential() {
	const poke1 = await axios.get('https://pokeapi.co/api/v2/pokemon/1');
	const poke2 = await axios.get('https://pokeapi.co/api/v2/pokemon/2');
	const poke3 = await axios.get('https://pokeapi.co/api/v2/pokemon/3');
	console.log(poke1.data);
	console.log(poke2.data);
	console.log(poke3.data);
}

// PARALLEL REQUESTS!
async function get3Pokemon() {
	const prom1 = axios.get('https://pokeapi.co/api/v2/pokemon/1');
	const prom2 = axios.get('https://pokeapi.co/api/v2/pokemon/2');
	const prom3 = axios.get('https://pokeapi.co/api/v2/pokemon/3');
	const poke1 = await prom1;
	const poke2 = await prom2;
	const poke3 = await prom3;
	console.log(poke1.data);
	console.log(poke2.data);
	console.log(poke3.data);
}

// a refactored wait to write the above code
async function get3Pokemon() {
	const prom1 = axios.get('https://pokeapi.co/api/v2/pokemon/1');
	const prom2 = axios.get('https://pokeapi.co/api/v2/pokemon/2');
	const prom3 = axios.get('https://pokeapi.co/api/v2/pokemon/3');
	const results = Promise.all([prom1, prom2, prom3]);
  printPokemon(results);
}

function printPokemon(results) {
  for (let pokemon of results) {
    console.log(pokemon.data.name);
  }
}

// *******************************************
// A better demonstration of the difference...
// *******************************************
function changeBodyColor(color, delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			document.body.style.backgroundColor = color;
			resolve();
		}, delay);
	});
}

// IN SEQUENCE
async function lightShow() {
	await changeBodyColor('teal', 1000);
	await changeBodyColor('pink', 1000);
	await changeBodyColor('indigo', 1000);
	await changeBodyColor('violet', 1000);
}
// IN PARALLEL...
// Everything is "sent off" at the same time
// async function lightShow() {
// 	const p1 = changeBodyColor('teal', 1000);
// 	const p2 = changeBodyColor('pink', 1000);
// 	const p3 = changeBodyColor('indigo', 1000);
// 	const p4 = changeBodyColor('violet', 1000);
// 	await p1;
// 	await p2;
// 	await p3;
// 	await p4;
// }

lightShow();
