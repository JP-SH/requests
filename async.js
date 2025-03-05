function add(x,y) {
  return new Promise((resolve, reject) => {
    if(typeof x !== 'number' || typeof y !== 'number') {
      reject('X and Y must be numbers');
    } else {
      resolve(x + y);
    }
  })
}

add(5, 4)
.then((res) => {
  console.log('Answer is:', res);
})
.catch((err) => {
  console.log('Rejected because:', err);
})
