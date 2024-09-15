const google_api_key = "AIzaSyB9Q3ocLVeLh1mGJiO9LcjMmapgSNWwLYI";
/*
    Returns Longtitude and Latitude as floats, otherwise, [0, 0] on error
*/
async function getDataFromNameHelper(name, location) {
  try {
    const place = name + location; // Example of a place and city in one string
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      place
    )}&key=${google_api_key}`;

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
  val = await getDataFromNameHelper(name, place);
  // YOU START HAVING ACCESS TO VAL HERE, NOWHERE ELSE
  console.log(val);
}

getDataFromName("Sunnyvale Middle School", "SUNNYVALE CA"); // Call the async function
