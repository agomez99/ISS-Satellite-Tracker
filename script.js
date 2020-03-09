$(document).ready(function(){

  mapboxgl.accessToken = 'pk.eyJ1IjoiYWdvbWV6OTkiLCJhIjoiY2s3Z3hvM3liMDNiZDNkcXYweDg4bDJwZSJ9.VvHNy9uxad8mrzriZk5org';
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 0.001
  });

  // Create a GeoJSON source with an empty lineString.
  var geojson = {
      'type': 'FeatureCollection',
      'features': [
          {
              'type': 'Feature',
              'geometry': {
                  'type': 'LineString',
                  'coordinates': [[-48.08350579,0.34640553]]
                  
              }
          }
      ]
  };

  var speedFactor = 30; // number of frames per longitude degree
  var startTime = 1583556519;
  var progress = 1583556818- 1583556519; // progress = timestamp - startTime
  var resetTime = false; // indicator of whether time reset is needed for the animation

  map.on('load', function() {
      map.addSource('line', {
          'type': 'geojson',
          'data': geojson
      });

      // add the line which will be modified in the animation
      map.addLayer({
          'id': 'line-animation',
          'type': 'line',
          'source': 'line',
          'layout': {
              'line-cap': 'round',
              'line-join': 'round'
          },
          'paint': {
              'line-color': 'blue',
              'line-width': 5,
              'line-opacity': 0.8
          }
      });

      startTime = performance.now();
      animateLine();



      // reset startTime and progress once the tab loses or gains focus
      // requestAnimationFrame also pauses on hidden tabs by default
      document.addEventListener('visibilitychange', function() {
          resetTime = false;//true
      });

      // animated in a circle as a sine wave along the map.
      function animateLine(timestamp) {
          if (resetTime) {
              // resume previous progress
              startTime = performance.now() - progress;
              resetTime = false;
          } else {
              progress = timestamp - startTime;
          }

          // restart if it finishes a loop
          if (progress > speedFactor * 360) {
              //startTime = timestamp;
              //geojson.features[0].geometry.coordinates = [];
          } else {
              var x = progress / speedFactor;
              // draw a sine wave with some math.
              var y = Math.sin((x * Math.PI) / 90) * 40;
              // append new coordinates to the lineString
              geojson.features[0].geometry.coordinates.push([x, y]);
              // then update the map
              map.getSource('line').setData(geojson);
          }
          // Request the next frame of the animation.
          //animation = requestAnimationFrame(animateLine);
      }
  });
//--------------------------Everything above to be deleted for D3 Map--------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//LAST FIVE DAYS APOD
var space = "https://api.nasa.gov/planetary/apod?api_key=CScJj85NGTPLG7hllUbm393T3rjnQO8ke11aHB2m&start_date=2020-03-03&end_date=2020-03-08"
//TODAY APOD
var space2 = "https://api.nasa.gov/planetary/apod?api_key=CScJj85NGTPLG7hllUbm393T3rjnQO8ke11aHB2m"
//ISS Future positions
var cords = "https://www.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/300/&apiKey=AFQ4CY-H89EGX-EFBHPT-4BII"

$.ajax({
    url: space2,
    method: "GET"
  }).then(function(response) {
    $("#spaceTitle").html(response.title);
    $("#Sdate").html(response.date);
    $("#info").html(response.explanation);
    $("#spaceImg").attr("src",response.url);
  });


//LAST FIVE DAYS APOD
var space = "https://api.nasa.gov/planetary/apod?api_key=CScJj85NGTPLG7hllUbm393T3rjnQO8ke11aHB2m&start_date=2020-03-02&end_date=2020-03-02"

var cords = "https://www.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/300/&apiKey=AFQ4CY-H89EGX-EFBHPT-4BII"



$.ajax({
    url: space,
    method: "GET"
  }).then(function(response) {
    // create a element
    console.log(response[0]);
    // add this element to the body
    $("#spaceTitle").html(response[0].title);
    $("#Sdate").html(response[0].date);
     $("#info").html(response[0].explanation);
    $("#spaceImg").attr("src",response[0].url);

    
  });




  $.ajax({
    url: cords,
    method: "GET"
  }).then(function(response) {


	$("#satName").html("Satelite Name: " + response.info.satname);

    for (i in response.positions) {
    y = response.positions[i].satlatitude;
    x = response.positions[i].satlongitude;
//$("#stat1").html("latitude: " + y);
//$("#stat2").html("longitude: "+x);


}
var times = response.positions[0].timestamp;
var ts = times;
var ts_ms = ts * 1000;
var date_ob = new Date(ts_ms);
var year = date_ob.getFullYear();
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var date = ("0" + date_ob.getDate()).slice(-2);
var hours = ("0" + date_ob.getHours()).slice(-2);
var minutes = ("0" + date_ob.getMinutes()).slice(-2);
var seconds = ("0" + date_ob.getSeconds()).slice(-2);

$("#timeStamp").html("time stamp "  + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
  });
})



    // create a element
    //console.log(response.positions[0].satlatitude);
    // add this element to the body
    $("#stat1").html("latitude " + response.positions[0].satlatitude);
    $("#stat2").html("longitude " + response.positions[0].satlongitude);


    
  });





})

