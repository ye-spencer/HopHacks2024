const city = "Baltimore"; // Replace with the desired city
const apiKey = "pk_live_f87a789027667373a4a7d519fd830f89"; // Replace with your actual API key

async function getData(search) {
  const url = `https://partners.every.org/v0.2/search/${search}?apiKey=${apiKey}&take=50`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const charities = json.nonprofits;
    for (let i = 0; i < charities.length; i++) {
      console.log(charities[i]);
    }
    thing(charities);
  } catch (error) {
    console.error(error.message);
  }
}

function thing(charities) {}

function onSearch(event) {
  event.preventDefault();
  let input = document.getElementById("search-form").value;
  if (input !== "") {
    getData(input);
  }
  document.getElementById("search-form").value = "";
}

// Creating map options
var mapOptions = {
  center: [39.2904, -76.6122],
  zoom: 10,
};

// Creating a map object
var map = new L.map("map", mapOptions);

// Creating a Layer object
var layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);

// Adding layer to the map
map.addLayer(layer);

// Creating a marker object and adding it to the map
var marker = new L.marker([39.2904, -76.6122], {
  title: "You are here",
}).addTo(map);

// var marker2 = new L.marker([36.7783, 119.4179], {
//   title: "California",
// }).addTo(map);
