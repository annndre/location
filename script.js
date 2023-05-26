let userLocationEl = document.querySelector(".user-location");

let mylocationBtnEl = document.querySelector(".myLocationBtn");

mylocationBtnEl.addEventListener("click", function(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(getLocation);

    }
    else{

        userLocationEl.innerText = "The geolocation is not supported in this browser";

    }

});

const getLocation = async (position) => {

    let response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);

    let data = await response.json();
    console.log(data);

    /*
    userLocationEl.innerText = JSON.stringify(data);*/

    /*

    userLocationEl.innerText = `					 ${data.address.state},
    ${data.address.country},
    ${data.address.town},
    ${data.address.village},
    ${data.address.district},
    ${data.address.borough},
    ${data.address.suburb},
    ${data.address.road}`;*/

    const address = data.address;
    let locationString = '';

    if (address.town) {
        locationString += `${address.town},`;
    } else if (address.village) {
        locationString += `${address.village},`;
    } else if (address.city) {
        locationString += `${address.city},`;
    }

    locationString += `
${address.state},
${address.country},
${address.district},
${address.borough},
${address.suburb},
${address.road}`;

    userLocationEl.innerText = locationString.trim();


    const boundingBox = data.boundingbox;
    let boundingBoxString = `
Latitude: ${boundingBox[0]} - ${boundingBox[1]} <br>
Longitude: ${boundingBox[2]} - ${boundingBox[3]}
`;

    userLocationEl.innerHTML = `${locationString.trim()}<br>${boundingBoxString.trim()}`;

};