//api endpoint //// global scope polluton?
const uri = "http://localhost:3000/movies";
//movie-list-  DOM nodes
const movieListContainer = document.getElementById("movie-list");
// movie info display- DOM nodes
const titleDisplay = document.getElementById("title");
const yearReleasedDisplay = document.getElementById("year-released");
const movieDescriptionDisplay = document.getElementById("description");
const watchedBtn = document.getElementById("watched");
const bloodAmt = document.getElementById("amount");
// blood form - domNodes
const bloodInput = document.getElementById("blood-amount");
const bloodForm = document.getElementById("blood-form");
//////////////////////////////////////////////////////

/////////////////

function initialize(moviesJSONArr) {
  moviesJSONArr.forEach((movieObj) => renderMovieList(movieObj));
}

function renderMovieList(movieObj) {
  //createImageEl
  let movieImgEl = document.createElement("img");
  movieImgEl.id = movieObj.id; // give each IMG an id
  movieImgEl.src = movieObj.image; // set img src to obj.image
  movieListContainer.appendChild(movieImgEl); // add each img el to list
  document.getElementById(movieObj.id).addEventListener("click", () => {
    renderMovieDisplay(movieObj);
  });
}

function renderMovieDisplay(movieObj) {
  ////////////////////////////////////////////////////////////////
  titleDisplay.textContent = movieObj.title;
  yearReleasedDisplay.textContent = movieObj.release_year;
  movieDescriptionDisplay.textContent = movieObj.description;
  watchedBtn.textContent = movieObj.watched ? "watched" : "Unwatched";
  bloodAmt.textContent = movieObj.blood_amount;
  //watch button functionality
  watchedBtn.addEventListener("click", () => {
    movieObj.watched = !movieObj.watched; //toggle watch
    watchedBtn.textContent = movieObj.watched ? "watched" : "Unwatched";

    patchMovieJSON(movieObj);
  });

  bloodForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (isNaN(bloodInput.value)) {
      alert("Please enter a number");
    } else {
      movieObj.blood_amount += parseInt(bloodInput.value);
      bloodAmt.textContent = movieObj.blood_amount;
      patchMovieJSON(movieObj);
    }
  });
}
//fetch requests
//fetch Get request
function getMoviesAPI() {
  fetch(uri)
    .then((resp) => resp.json())
    .then((data) => {
      //iterate through each obj in array
      initialize(data);
      //render first array on load
      renderMovieDisplay(data[0]);
    });
}
//patch request
function patchMovieJSON(movieObj) {
  fetch(`${uri}/${movieObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

getMoviesAPI();
