//main app.js
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

//functions
// update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Copy selected seats into an array
  // Mapp through that array
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
  ticketPrice = +e.target.value;
  updateSelectedCount();
});
