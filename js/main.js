// Main JS COde here.
var width = 960,
  height = 480,
  zoom = 1;

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var projection = d3.geo
  .equirectangular()
  .scale(153)
  .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

var graticule = d3.geo.graticule();

var lat;
var lon;
let x;
let latRad;
let mercN;
let y;

var userLon;

d3.json("js/world-110m.json", function(error, world) {
  svg
    .append("g")
    .attr("class", "land")
    .selectAll("path")
    .data([topojson.object(world, world.objects.land)])
    .enter()
    .append("path")
    .attr("d", path);
  svg
    .append("g")
    .attr("class", "boundary")
    .selectAll("boundary")
    .data([topojson.object(world, world.objects.countries)])
    .enter()
    .append("path")
    .attr("d", path);
  svg
    .append("g")
    .attr("class", "graticule")
    .selectAll("path")
    .data(graticule.lines)
    .enter()
    .append("path")
    .attr("d", path);

  getFutureStationPositions();
  getCurrentStationPosition();
});

function drawCurrentLocation(coord) {
  svg
    .append("circle")
    .attr("cx", coord[0])
    .attr("cy", coord[1])
    .attr("r", 10)
    .style("z-index", 1)
    .attr("fill", "yellow");
}

function drawFuturePath(coordArray) {
  // loop to get x, y of lat and long coordinates from the api

  svg
    .selectAll("circle")
    .data(coordArray)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => {
      return d[0];
    })
    .attr("cy", (d, i) => {
      return d[1];
    })
    .attr("r", 5)
    .style("z-index", 2)
    .attr("fill", "red")
    .text("z");
}

function getCurrentStationPosition() {
  console.log("Getting Station");
  fetch(
    "https://www.n2yo.com/rest/v1/satellite/positions/25544/29.5891833/-98.6270735/0/1/&apiKey=AFQ4CY-H89EGX-EFBHPT-4BII"
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      

      drawCurrentLocation(
        projection([
          data.positions[0].satlatitude,
          data.positions[0].satlongitude
        ])
      );

      //console.log(mercator(data.positions[0].satlatitude, data.positions[0].satlongitude ))
    });
}

function getFutureStationPositions() {
  fetch(
    // "https://www.n2yo.com/rest/v1/satellite/positions/25544/29.5891833/-98.6270735/0/300/&apiKey=AFQ4CY-H89EGX-EFBHPT-4BII/"
    "https://api.wheretheiss.at/v1/satellites/25544/tles"
    )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);

      let arr = [];
      /* data.forEach((element) => {
              
               //console.log(element.satlatitude);
               
               arr.push(mercator(element.satlatitude, element.satlongitude)
               );
              
              drawFuturePath(arr);
        
        }); */
      //console.log(arr)
     
      let iss = new Satellite(data.tle_timestamp, data.id, data.name, data.header, data.tle1, data.tle2);


    
    });

}

class Satellite {
    constructor(timeStamp, satId, satName,  header, tle1, tle2 ){
        this.timeStamp = timeStamp;
        this.satId = satId;
        this.satName = satName;
        this.satHeader = header;
        this.tle1 = tle1;
        this.tle2 = tle2;
    }
    
getId = ()=>{
    if(this.satId){
        return this.satId;
    }else {
        return "No ID Found";
    }

getTimeStamp = ()
}

}

