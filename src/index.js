let x, y;
const uri = "http://localhost:3000/movies";
fetch(uri)
  .then((response) => response.json())
  .then((data) => {
    console.log("success");

    iterateData(data);
    renderClickedData(data[0]);
    x = data[0];
  });

function iterateData(arrJSON) {
  arrJSON.forEach((el) => renderMoviesList(el));
}

function renderMoviesList(obj) {
  let movieListEl = document.createElement("img");
  movieListEl.src = obj.image;
  movieListEl.addEventListener("click", () => {
    x = obj;
    console.log(x);
    renderClickedData(x);
  });
  document.getElementById("movie-list").appendChild(movieListEl);
  // movieListEl.id = `click-${obj.id}`;
  // document.getElementById("movie-list").appendChild(movieListEl);

  // document.getElementById(`click-${obj.id}`).addEventListener("click", () => {
  //   console.log("clicked", obj.id);

  // });
}

function renderClickedData(x) {
  let watchBtn = document.getElementById("watched");
  watchBtn.textContent = x.watched ? "watched" : "unwatched";
  document.getElementById("title").textContent = x.title;
  document.getElementById("detail-image").src = x.image;
  // console.log(x.image);
  document.getElementById("year-released").textContent = x.release_year;
  document.getElementById("description").textContent = x.description;
  document.getElementById("amount").textContent = x.blood_amount;

  ////////////////////////////////////////////////////////////////
  //watch btn
}
document.getElementById("watched").addEventListener("click", () => {
  ///??
  console.log(x);
  x.watched = !x.watched;
  document.getElementById("watched").textContent = x.watched
    ? "watched"
    : "unwatched";
});
document.getElementById("blood-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = parseInt(document.getElementById("blood-amount").value);
  x.blood_amount += inputValue;
  console.log(x.blood_amount);
  document.getElementById("amount").textContent = x.blood_amount;
});
