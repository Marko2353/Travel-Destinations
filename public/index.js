const homeDisplay = document.querySelector('.home');


fetch('http://localhost:8000/api/destinations').then(response => {
    return response.json()
  })
  .then(data => {
    data.map(element => {
      const destinationItem = `<div class="container">
      <h3><a href="index-edit.html">` + element.title + `</a></h3>
      <p>` + element.location + `</p>
      <p>` + element.country + `</p>
      <p>` + element.dateFrom.toString().slice(0, 10) + `</p>
      <p>` + element.dateTo.toString().slice(0, 10) + `</p>
      <p>` + element.description + `</p>
      <p>` + element.photo + `</p>
      <p>` + element._id + `</p>
      </div>`
      homeDisplay.insertAdjacentHTML("beforeend", destinationItem);
    });
  })
  .catch(err => console.log(err))


