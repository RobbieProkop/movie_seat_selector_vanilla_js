//main app.js
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

//functions

//save movie price and index
const setMovieData = (index, price) => {
  localStorage.setItem("selectedMovieIndex", index);
  localStorage.setItem("selectedMoviePrice", price);
};

// update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Copy selected seats into an array
  // Map through that array
  // Return new arr of index
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //set to localstorage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  const totalPrice = ticketPrice * selectedSeatsCount;
  count.innerText = selectedSeatsCount;
  total.innerText = totalPrice;

  return totalPrice;
};

//get data from Loacal Storage & populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (!selectedSeats || !selectedSeats.length > 0) {
    return;
  }
  // change colour of selected seats from LS
  seats.forEach((seat, index) => {
    if (selectedSeats.indexOf(index) > -1) {
      seat.classList.add("selected");
    }
  });

  // grab movie from LS
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex) movieSelect.selectedIndex = selectedMovieIndex;

  // grab prices from LS
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
  if (selectedMoviePrice) ticketPrice = selectedMoviePrice;
};

//Add Event Listeners
populateUI();

//on Dom load
document.addEventListener("DOMContentLoaded", () => {
  localStorage.getItem("selectedSeats");
});
//seat selection
container.addEventListener("click", (e) => {
  const seat = e.target.classList;
  if (seat.contains("seat") && !seat.contains("occupied")) {
    seat.toggle("selected");
  }

  updateSelectedCount();
});

//Movie Select
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  //save to Local Storage
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//initial count and total
updateSelectedCount();
