//create a function to intergrate google places autocomplete then places in maps url autocomplete search

function placesSearch() {
  const search = document.getElementById('search');
  const autocomplete = new google.maps.places.Autocomplete(search);

  const active = document.getElementsByClassName("active");
  //when submit is clicked do below
  document.getElementById('submit').addEventListener('click', function() {
      //change class of items to show new view
      if(search.value === ""){
        alert('Please Enter A Location');
      }else {
        while (active.length) {
          active[0].classList.remove("active");
        }
        initMap();
      }
    });

  //when current-loc is clicked do this
  document.getElementById('current-loc').addEventListener('click', function() {
    //change class of items to show new view
    while (active.length) {
      active[0].classList.remove("active");
    }
    initMap();
    getGeolocation(map);
  });
}
//add event listeners on all clicks on main page to transform nav
var elements = document.querySelectorAll(".a, .b");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function() {
    console.log("clicked");
  });
}

//code from googles api site
//https://developers.google.com/maps/documentation/javascript/adding-a-google-map

//create a variable for the map
let map;

//create all the markers that will be on the map
let markers = [];

//below function grabs users current location
let lat = 0;
let lng = 0;
let currentLat = 0;
let currentLng = 0;
function getGeolocation(map) {
  let infoWindow = new google.maps.InfoWindow;
  // geolocation.
  if (navigator.geolocation) {
    console.log('location!')
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        currentLat = pos.lat;
        console.log(pos);
        currentLng = pos.lng;
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      // map.setCenter({lat: currentLat, lng: currentLng});

      let currentMarker = new google.maps.Marker({
        position: pos,
        map: map
      });

      if(currentLat && currentLng){
        let search = document.getElementById('search');
        search.innerHTML = 'Current Location'
        // search.innerHTML = 'Current Location';
        sendToServer({ lat: currentLat, lng: currentLng })
        //set variable to lat & lng
        newLat = currentLat;
        newLng = currentLng;
      }
      // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      // var beachMarker = new google.maps.Marker({
      //   position: {lat: -33.890, lng: 151.274},
      //   map: map,
      //   icon: image
      // });
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
//getGeolocation error handler
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  console.log('error');
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

//initiate the map
let uluru= {lat, lng} || {lat: currentLat, lng: currentLng};
function initMap(){
 map = new google.maps.Map(document.getElementById('map'), {
   zoom: 14,
   center: uluru
 });

 // getGeolocation(map);

 let geocoder = new google.maps.Geocoder();
   codeAddress(geocoder, map);

}

//use geocoder to grab lat and long of search
function codeAddress(geocoder, resultsMap) {
let address = document.getElementById('search').value;
if(address !== ""){
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
      map.setCenter({ lat, lng });
       if(lat && lng){
         sendToServer({ lat, lng })
         //set variable to lat & lng
         newLat = lat;
         newLng = lng;
       }

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
}

// function that we use to send our location to BE sendToServer
// and give us back all the bathrooms around us
function sendToServer(obj){
 deleteMarkers();
 console.log('sending to server my location: ',obj);

 axios({
   method: 'POST',
   url: '/bathrooms/api',
   data: obj
 })
 .then(res => {
console.log(res);
   // this is where we call the callback that drops the pins in the map
   addBathMarker(res.data.bathrooms, res.data.user);
   addSearchItems(res.data.bathrooms);
 })
 .catch(err => console.error(err));
}


//ADD MARKER OF NEARBY bathrooms
function addBathMarker(res, user){
  //below we create a terinary condition to check if user is null
 res.forEach((elem) => {
   let bathLat = elem.latitude;
   let bathLng = elem.longitude;
   let bathPos = {lat: bathLat , lng: bathLng};

   //set the content for the map
   let contentString = `<div>
                          <b>${elem.name}</b>
                        </div>
                        <div>
                          ${elem.street}<br>
                          ${elem.city}, ${elem.state}<br>
                        </div>
                        <div id = "window icons">
                          ${elem.accessible}
                          ${elem.unisex}
                        </div>

                        ${user ?
                          `<form method="POST" action="/bathrooms">
                            <input type="hidden" name="name" value="${elem.name}"/>
                            <input type="hidden" name="street" value="${elem.street}"/>
                            <input type="hidden" name="city" value="${elem.city}" />
                            <input type="hidden" name="state" value="${elem.state}" />
                            <input type="hidden" name="accessible" value="${elem.accessible}" />
                            <input type="hidden" name="unisex" value="${elem.unisex}" />
                            <input type="hidden" name="directions" value="${elem.directions}" />
                            <input type="hidden" name="price" value="TRUE" />
                            <input type="hidden" name="comment" value="${elem.comment}" />
                            <input type="hidden" name="latitude" value="${elem.latitude}" />
                            <input type="hidden" name="longitude" value="${elem.longitude}" />
                            <input type="hidden" name="country" value="${elem.country}" />
                            <input type="hidden" name="distance" value="${elem.distance}" />
                            <input type="submit" value="submit" />
                          </form>` :
                          ""
                        }
                        `;

  //create an info window for each marker
   let bathWindow = new google.maps.InfoWindow({
     content: contentString,
     maxWidth: 200
   });
//initialize and create a new marker
  let newMarker = new google.maps.Marker({
    position: bathPos,
    map: map
  });
  markers.push(newMarker);
  newMarker.addListener('click',
    function(){
      bathWindow.open(map, newMarker);
    })
  });
}


function addSearchItems(res){
  let item = document.getElementById('list');
  console.log(item);
  res.forEach((elem) => {
    let div = document.createElement('div');
    div.className = 'lists';
    let h1 = document.createElement('H1');
    let p = document.createElement('p');
    let name = document.createTextNode(`${elem.name}`);
    let location = document.createTextNode(`${elem.street}, ${elem.city},
    ${elem.state}`);
    let accessible = document.createTextNode(`${elem.accessible}`);
    let distance = document.createTextNode(`${elem.distance}`);
    h1.appendChild(name);
    div.appendChild(h1);
    item.appendChild(div);
  })
}


// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  markers.forEach(function(marker){ marker.setMap(null)});
  markers = [];
}
