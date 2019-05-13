fetch(
  "https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,phone,dob"
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
  modalCreate(data);
}
function modalCreate(data) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(function(element, index) {
    element.addEventListener("click", e => {
      modalView(data, index);
    });
  });
}
// Exits out of modal view
function modalExitButton() {
  document.querySelector(".modal-container").outerHTML = "";
}

// Creates the modal view with data
function modalView(data, index) {
  console.log(index);
  let dateOfBirth = data.results[index].dob.date;
  let dateSubString = dateOfBirth.slice(0, -10);
  let dateArry = dateSubString.split("-");
  let modal = document.createElement("div");
  modal.classList.add("modal-container");
  modal.innerHTML += `<div class="modal">
      <button onclick="modalExitButton()" type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="
            ${data.results[index].picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${
            data.results[index].name.first
          } ${data.results[index].name.last}</h3>
          <p class="modal-text">
            ${data.results[index].email}
          </p>
          <p class="modal-text cap">
            ${data.results[index].location.city}
          </p>
          <hr>
          <p class="modal-text">${data.results[index].phone}</p>
          <p class="modal-text">${data.results[index].location.street}, ${
    data.results[index].location.city
  }, ${data.results[index].location.state} ${
    data.results[index].location.postcode
  }</p>
          <p class="modal-text">Birthday: ${dateArry[1]}/${dateArry[2]}/${
    dateArry[0]
  }</p>
  </div>
      <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>`;
  document.body.append(modal);

  //next button
  const nextButton = document.getElementById("modal-next");
  nextButton.addEventListener("click", () => {
    document
      .querySelector("#gallery")
      .nextElementSibling.nextElementSibling.remove();
    if (index < 11) {
      index = index + 1;
      modalView(data, index);
    } else {
      index = 0;
      modalView(data, index);
    }
  });
  //previous
  const previousButton = document.getElementById("modal-prev");
  previousButton.addEventListener("click", () => {
    document
      .querySelector("#gallery")
      .nextElementSibling.nextElementSibling.remove();
    if (index > 0) {
      index = index - 1;
      modalView(data, index);
    } else {
      index = 11;
      modalView(data, index);
    }
  });
}
