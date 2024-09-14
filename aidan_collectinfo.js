const city = "Baltimore"; // Replace with the desired city
const apiKeyCharities = "pk_live_f87a789027667373a4a7d519fd830f89"; // Replace with your actual API key

let charities = [];

// Function to get charities
function getCharities() {
  return charities;
}

// Function to fetch charity data from API
async function getData(search) {
  const url = `https://partners.every.org/v0.2/search/${search}?apiKey=${apiKeyCharities}&take=50`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    charities = json.nonprofits;

    // Clear existing markers before adding new ones
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    for (let i = 0; i < charities.length; i++) {
      const coords = await getDataFromName(charities[i].name, charities[i].locationAddress);
      if (charities[i].websiteUrl) {
        L.marker(coords).addTo(map)
        .bindPopup(`
          <div class="popup-content">
            <h4 class="popup-title">${charities[i].name}</h4>
            <a href="${`https://www.every.org/${charities[i].ein}#donate` || '#'}" class="popup-link" target="_blank">Donate Now</a><br>
            <a href="//${charities[i].websiteUrl}" class="popup-link" target="_blank">Website</a> 
          </div>
        `)
        .on("mouseover", function () {
          this.openPopup();
        })
      } else {
        L.marker(coords).addTo(map)
        .bindPopup(`
          <div class="popup-content">
            <h4 class="popup-title">${charities[i].name}</h4>
            <a href="${`https://www.every.org/${charities[i].ein}#donate` || '#'}" class="popup-link" target="_blank">Donate Link</a><br>
            No website found
          </div>
        `)
        .on("mouseover", function () {
          this.openPopup();
        })
      }


    }
  } catch (error) {
    console.error(error.message);
  }
}

// Function to handle search form submission
function onSearch(event) {
  event.preventDefault();
  let input = document.getElementById("search-input").value;
  if (input !== "") {
    getData(input);
  }
  document.getElementById("search-input").value = "";
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

const google_api_key = "AIzaSyB9Q3ocLVeLh1mGJiO9LcjMmapgSNWwLYI";

// Function to fetch coordinates from Google Maps API
async function getDataFromNameHelper(name, location) {
  try {
    const place = name + ' ' + location; // Example of a place and city in one string
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${google_api_key}`;

    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return [location.lat, location.lng];
    } else {
      console.error("Geocoding failed:", data.status);
      return [0, 0];
    }
  } catch (error) {
    console.log(error);
    return [0, 0];
  }
}

async function getDataFromName(name, place) {
  return await getDataFromNameHelper(name, place);
}


