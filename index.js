// // Projection colours
const projDict = {
    "SOLID DEMOCRAT": "#124683",
    "LIKELY DEMOCRAT": "#337FD8",
    "LEAN DEMOCRAT": "#8EBDF3",
    "TOSS UP": "#C0C2C5",
    "LEAN REPUBLICAN": "#E79090",
    "LIKELY REPUBLICAN": "#C74343",
    "SOLID REPUBLICAN": "#9C1515",
    "noelectiondem": "#EBEBE8",
    "noelectionrep": "#EBEBE8"
}

var getCol = function (myKey) {
    return projDict[myKey];
};

const projCols = [
    "#124683",
    "#337FD8",
    "#8EBDF3",
    "#C0C2C5",
    "#E79090",
    "#C74343",
    "#9C1515"
]

const projNames = [
    "Solid Dem",
    "Likely Dem",
    "Lean Dem",
    "Toss-up",
    "Lean Rep",
    "Likely Rep",
    "Solid Rep"
]


// Main party colours
const partyCols = {
    "D": "#124683",
    "R": "#124683"
}


// PRESIDENCY ------------------------------------
// Presidency legend
var presidencyLeg = d3.select('.pres-leg')

presidencyLeg
    .append('div')
    .attr('class', 'legend-labels  d-flex  justify-content-center')
    .selectAll('div')
    .data(projNames)
    .enter()
    .append('div')
    .attr('class', 'legend-label')
    .style('width', "100px")
    .style('height', '15px')
    .text(function (d) {
        return d
    })

presidencyLeg
    .append('div')
    .attr('class', 'legend-boxes  d-flex  justify-content-center')
    .selectAll('div')
    .data(projCols)
    .enter()
    .append('div')
    .attr('class', 'legend-box')
    .style('width', "100px")
    .style('height', '15px')
    .style('background-color', function (d) {
        return d
    })

// Pres bar
const barBase = d3.select('.pres-bar')
    .append('div')
    .style('height', '40px')
    .style("width", "75vw")
    .style('background-color', '#dcdcdc')
    .attr("class", "d-flex justify-content-center")

barBase
    .append('div')
    .html('<b>270 to win</b>')
    .style('position', 'absolute')
    .style('left', '46%')
    .style('top', '74px')

barBase
    .append('div')
    .style('height', '80px')
    .style('width', '2px')
    .style('background-color', '#EBEBE8')
    .style('position', 'absolute')
    .style('left', '50%')
    .style('top', '100px')


var presTooltip = barBase
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("top", "10%")
    .style("left", "3%")

function sum(a, b) {
    return a + b;
}


d3.json('/data/ec.json').then(function (d) {

    d.reduce((acc, cur) => {
        cur.start = acc;
        return acc + (cur.ecvs);
    }, 0);

    d.forEach(function (el) {
        barBase
            .append('div')
            .style('height', '40px')
            .style('width', (el.ecvs / 538 * 100) + "%")
            .style('background-color', getCol(el.rating))
            .on("mouseover", function () {
                d3.select(this).style("border", "1px solid #EBEBE8");
                presTooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                presTooltip.html(el.state + "<br/>" + el.ecvs + " electoral vote" + (el.ecvs == 1 ? "" : "s"))

            })
            .on("mouseout", function (d) {
                d3.select(this).style("border", "none");
                presTooltip.transition()
                    .duration(400)
                    .style('opacity', 0)
            })
            .attr("class", "state-votes")
    })


    // Pres Map
    const width = 700
    const height = width * 0.66

    const mapSvg = d3.select('.pres-map')
        .append('svg')
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .attr('class', 'states-map')


    mapSvg
        .attr('width', width)
        .attr('height', height)

    const g = mapSvg
        .append('g')

    var colourByState = {};


    d.forEach(el => (colourByState[el.state] = getCol(el.rating)));

    var getStateCol = function (myKey) {
        return colourByState[myKey];
    };

    d3.json("data/counties-10m.json")
        .then(function (us) {


            const states = topojson.feature(us, us.objects.states)




            // console.log(colourByState)
            const proj = d3.geoAlbersUsa().scale(900).translate([350.5, 225])
            const path = d3.geoPath()
                .projection(proj)

            g.selectAll("path") //this week using paths instead of "rects" to create bar charts
                .data(states.features) //using .features to bind the data this time. GeoJSON that is an object that has two features, features are what we actually want to access the array of objects
                .enter() //this then propogates into our group
                .append("path") //path per geoemtry
                .attr("fill", d => getStateCol(d.properties.name)) //then applying a fill color. can be hex colors or actual colors
                .attr("stroke", "#EBEBE8")
                .attr("stroke-width", "0.3px") //defining the stroke color, in this case black
                .attr("d", path)
                .on("mouseover", function () {
                    d3.select(this).style("stroke-width", "2px"); //stroke behind other polygons?
                })
                .on("mouseout", function (d) {
                    d3.select(this).style("stroke-width", "0.3px");
                })
        });
})


// SENATE ------------------------------------
// Senate legend
var senateLeg = d3.select('.sen-leg')

senateLeg
    .append('div')
    .attr('class', 'legend-labels  d-flex  justify-content-center')
    .selectAll('div')
    .data(projNames)
    .enter()
    .append('div')
    .attr('class', 'legend-label')
    .style('width', "100px")
    .style('height', '15px')
    .text(function (d) {
        return d
    })

senateLeg
    .append('div')
    .attr('class', 'legend-boxes  d-flex  justify-content-center')
    .selectAll('div')
    .data(projCols)
    .enter()
    .append('div')
    .attr('class', 'legend-box')
    .style('width', "100px")
    .style('height', '15px')
    .style('background-color', function (d) {
        return d
    })

// Senate waffle chart
// Waffle chart example: https://bl.ocks.org/JulienAssouline/b98116bb991e13beb5418c45a2e64a14

var wafWidth = 800
var wafHeight = 400
var numRows = 5

var senWaf = d3.select('.sen-graphics')
    .append('div')
    .attr('class', 'sen-waffle d-flex justify-content-center')

var senTooltip = senWaf
    .append("div")
    .attr("class", "sen-tooltip")
    .style("opacity", 0)

var senWafSvg = senWaf
    .append("svg")
    .attr("id", "chart")
    .attr("width", wafWidth)
    .attr("height", wafHeight)
    .attr("viewBox", "0 0 " + wafWidth + " " + wafHeight)
    .attr("preserveAspectRatio", "xMinYMin")



d3.json('/data/senate.json').then(function (data) {

    var colourByState = {}

    data.forEach(el => (colourByState[el.state_unique] = getCol(el.projection.replace('_', ' '))));

    var getStateCol = function (myKey) {
        return colourByState[myKey];
    };

    senWafSvg
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 32)
        .attr("height", 32)
        .attr("class", d => d.state_unique)
        .attr("y", function (d, i) {
            var rowIndex = i % numRows
            return rowIndex * 40
        })
        .attr("x", function (d, i) {
            var colIndex = Math.floor(i / numRows)
            return colIndex * 40
        })
        .attr("r", 6)
        .style("fill", d => getStateCol(d.state_unique))
        .on("mouseover", function (d) {
            senTooltip.transition()
                .duration(100)
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "#dcdcdc")
                .style("stroke-width", "3px")
            senTooltip
                .html(d.state_unique)
            console.log(d) //can't access data?? 'd' here = mouseevent not data...
        })

        .on("mouseout", function (d) {
            senTooltip.transition()
                .duration(300)
                .style('opacity', 0)
            d3.select(this).style("stroke", "none")
        })

    // var senCurrent = document.getElementById('senCur')
    //     .onclick(function () {
    //     })
})



// HOUSE ------------------------------------