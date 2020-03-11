// Main JS COde here.
var width = window.innerWidth/2,
  height = width/2,
  zoom = 2;

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var projection = d3.geo
  .equirectangular()
  .scale(width / 1.89 / Math.PI)
  .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

var graticule = d3.geo.graticule();

var backgroundColors = ["#F7B51E", "#F6C707", "#F69407", "#F6CE07", "#F6BC07"  ];
var randColor = Math.floor(Math.random() * backgroundColors.length);

d3.json("js/world-110m.json", function(error, world) {
  svg
    .style("background-color", "#1d87c5")
    .style("border", "1px solid black")
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
    .attr("fill", "#d7c7ad")
    .attr("stroke", "#766951")
    .attr("d", path);
  svg
    .append("g")
    .attr("class", "graticule")
    .selectAll("path")
    .data(graticule.lines)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("opacity", "0.5");

  //getFutureStationPositions();
  getCurrentStationPosition();
  //setInterval(getCurrentStationPosition, 2000);
});

function drawCurrentLocation(coord) {
  svg
    .append("image")
    .attr("x", coord[0])
    .attr("y", coord[1])
    .attr("href", "img/station.png")
    .attr("height", "50")
    .attr("width", "50")
    
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
      

      /* drawCurrentLocation(
        projection([
          data.positions[0].satlongitude,
          data.positions[0].satlatitude
        ])
      ); */
      
      let coord = projection([data.positions[0].satlongitude, data.positions[0].satlatitude]); 
      console.log(coord);
      svg
      .append("image")
      .attr("x", coord[0])
      .attr("y", coord[1])
      .attr("href", "img/station.png")
      .attr("height", "50")
      .attr("width", "50")
      
      svg.append("line")
        .attr("x1" , coord[0]+20)
        .attr("y1", (coord)[1]+20)
        .attr("x2", coord[0]-10)
        .attr("y2", coord[1]-10)
        .attr("stroke", "red")
        .attr("opacity", "0.5");
        

      });
      getFutureStationPositions()
  }


function getFutureStationPositions() {
  fetch(
    "https://www.n2yo.com/rest/v1/satellite/positions/25544/29.5891833/-98.6270735/0/500/&apiKey=AFQ4CY-H89EGX-EFBHPT-4BII/"
    //"https://api.wheretheiss.at/v1/satellites/25544/tles"
    )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log([data.positions[199].satlongitude, data.positions[199].satlatitude]);
      let coordFuture = projection([data.positions[499].satlongitude, data.positions[499].satlatitude]);
      svg
      .append("image")
      .attr("x", coordFuture[0])
      .attr("y", coordFuture[1])
      .attr("href", "img/station.png")
      .attr("height", "50")
      .attr("width", "50");
      
      
      


    
    });
  }