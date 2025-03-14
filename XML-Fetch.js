// XML request
// const firstReq = new XMLHttpRequest();
// firstReq.addEventListener('load', function() {
//   console.log("IT WORKED!");
//   const data = JSON.parse(this.responseText);
//   console.log(data);
//   for(let planet of data.results) {
//     console.log(planet.name);
//   }
// });
// firstReq.addEventListener('error', () => {
//   console.log("ERROR!!!");
// });
// firstReq.open('GET', "https://swapi.co/api/planets/");
// firstReq.send();

// the same code as above but nested as some of the arrays had links to another page such as movie titles. So you have to next another XML request in the first one
// const firstReq = new XMLHttpRequest();
// firstReq.addEventListener('load', function() {
// 	console.log('FIRST REQUEST WORKED!!!');
// 	const data = JSON.parse(this.responseText);
// 	const filmURL = data.results[0].films[0];
// 	const filmReq = new XMLHttpRequest();
// 	filmReq.addEventListener('load', function() {
// 		console.log('SECOND REQUEST WORKED!!!');
// 		const filmData = JSON.parse(this.responseText);
// 		console.log(filmData.title);
// 	});
// 	filmReq.addEventListener('error', function(e) {
// 		console.log('ERROR!!', e);
// 	});
// 	filmReq.open('GET', filmURL);
// 	filmReq.send();
// });
// firstReq.addEventListener('error', (e) => {
// 	console.log('ERROR!!!!!!');
// });
// firstReq.open('GET', 'https://swapi.co/api/planets/');
// firstReq.send();
// console.log('Request Sent!');


// same code as above but written using fetch
// fetch('https://swapi.co/api/planets/').then((response) => {
//   if (!response.ok)
//     throw new Error(`Status Code Error: ${response.status}`);
//   response.json().then((data) => {
//     for(let planet of data.results) {
//       console.log(planet.name);
//     }
//   })
// })
// .catch((err) => {
//   console.log('SOMETHING WENT WRONG');
//   console.log(err);
// });

// nested fetch
// fetch('https://swapi.co/api/planets/').then((response) => {
//   if (!response.ok)
//     throw new Error(`Status Code Error: ${response.status}`);

//   return response.json()
// })
// .then((data) => {
//   const filmURL = data.results[0].films[0];
//   return fetch(filmURL);
// })
// .then((response) => {
//   if (!response.ok)
//     throw new Error(`Status Code Error: ${response.status}`);

//   return response.json()
// })
// .then((data) => {
//   console.log('FETCHED FIRST FILM, based off of the first planet');
//   console.log(data.title);
// })
// .catch((err) => {
//   console.log('SOMETHING WENT WRONG');
//   console.log(err);
// });


// same code as above but getting the next set of planets from the link to the second page
// fetch('https://swapi.co/api/planets/').then((response) => {
//   if (!response.ok)
//     throw new Error(`Status Code Error: ${response.status}`);

//   return response.json()
// })
// .then((data) => {
//   console.log('FETCHED ALL PLANETS (first 10');
//   for(let planet of data.results) {
//     console.log(planet.name);
//   }
//   const nextURL = data.next
//   return fetch(nextURL);
// })
// .then((response) => {
//   if (!response.ok)
//     throw new Error(`Status Code Error: ${response.status}`);

//   return response.json()
// })
// .then((data) => {
//   console.log('Fectched Next 10 planets');
//   for(let planet of data.results) {
//     console.log(planet.name);
//   }
// })
// .catch((err) => {
//   console.log('SOMETHING WENT WRONG');
//   console.log(err);
// });


// same code as above but refactored
const checkStatusAndParse = (response) => {
  if (!response.ok)
    throw new Error(`Status Code Error: ${response.status}`);

  return response.json()
};

const printPlanets = (data) => {
  console.log('Loaded 10 more planets');
  for(let planet of data.results) {
    console.log(planet.name);
  }
  return Promise.resolve(data.next);
}

const fetchNextPlanets = (url = 'https://swapi.co/api/planets/') => {
  return fetch(url);
}

fetch()
.then(checkStatusAndParse)
.then(printPlanets)
.then(fetchNextPlanets)
.then(checkStatusAndParse)
.then(printPlanets)
.catch((err) => {
  console.log('SOMETHING WENT WRONG');
  console.log(err);
});
