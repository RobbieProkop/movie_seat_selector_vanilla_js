//main app.js
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const ticketPrice = +movieSelect.value;

//functions
// update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const selectedSeatsCount = selectedSeats.length;

  const totalPrice = movieSelect.value * selectedSeatsCount;
  count.innerText = selectedSeatsCount;
  total.innerText = totalPrice;

  return totalPrice;
};

//Add Event Listeners

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
  console.log(movieSelect.value);
});
