fetch(
  "https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    createUser(myJson);
  });

function createUser(data) {
  data.results.forEach(element => {
    document.getElementById("gallery").innerHTML += `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="
        ${element.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${element.name.first} ${
      element.name.last
    }</h3>
        <p class="card-text">${element.email}</p>
        <p class="card-text cap">${element.location.city}</p>
    </div>
    </div>`;
  });
}
