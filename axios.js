// axios has built in features which allows to not have to write logic to make catch run as we did with fetch. Also we dont have to parse it into json like we do for fetch
// axios.get('https://swapi.co/api/planets/')
// .then((res) => {
//   console.log(res.data);
// })
// .catch((err) => {
//   console.log('IN CATCH CALLBACK');
//   console.log(err);
// })

// axios chained
// axios.get('https://swapi.co/api/planets/')
// .then(({data}) => {
//   console.log(data);
//   for (let planet of data.results) {
//     console.log(planet.name);
//   }
//   return axios.get(data.next)
// })
// .then(({data}) => {
//   console.log(data);
//   for (let planet of data.results) {
//     console.log(planet.name);
//   }
// }).catch(er => {
//   console.log("ERROR!!!");
// })

const fetchNextPlanets= (url = 'https://swapi.co/api/planets/') => {
  return axios.get(url);
}
const printPlanets = ({data}) => {
  console.log(data);
  for (let planet of data.results) {
    console.log(planet.name);
  }
  return Promise.resolve(data.next);
}


fetchNextPlanets()
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .catch((err) => {
    console.log('ERROR!');
  })
