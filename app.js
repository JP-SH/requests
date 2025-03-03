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
const firstReq = new XMLHttpRequest();
firstReq.addEventListener('load', function() {
	console.log('FIRST REQUEST WORKED!!!');
	const data = JSON.parse(this.responseText);
	const filmURL = data.results[0].films[0];
	const filmReq = new XMLHttpRequest();
	filmReq.addEventListener('load', function() {
		console.log('SECOND REQUEST WORKED!!!');
		const filmData = JSON.parse(this.responseText);
		console.log(filmData.title);
	});
	filmReq.addEventListener('error', function(e) {
		console.log('ERROR!!', e);
	});
	filmReq.open('GET', filmURL);
	filmReq.send();
});
firstReq.addEventListener('error', (e) => {
	console.log('ERROR!!!!!!');
});
firstReq.open('GET', 'https://swapi.co/api/planets/');
firstReq.send();
console.log('Request Sent!');
