// XML request
const firstReq = new XMLHttpRequest();
firstReq.addEventListener('load', function() {
  console.log("IT WORKED!");
  const data = JSON.parse(this.responseText);
  console.log(data);
  for(let planet of data.results) {
    console.log(planet.name);
  }
});
firstReq.addEventListener('error', () => {
  console.log("ERROR!!!");
});
firstReq.open('GET', "https://swapi.co/api/planets/");
firstReq.send();
