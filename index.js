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

var projCol = function (myKey) {
    return projDict[myKey];
};

const resultDict = {
    "D": "#124683",
    "R": "#9C1515",
    "L": "#E5BB25", //L = libertarian
    "E": "#dcdcdc", //E = vacant previously democrat (used for ordering reasons)
    "Q": "#dcdcdc" //Q = vacant previously republican (used for ordering reasons)
}

var resultCol = function (myKey) {
    return resultDict[myKey];
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
const resNames = [
    "Democrat",
    "Republican"
]

const resCols = [
    "#124683",
    "#9C1515"
]

// senate legend data
const senProjCols = [
    "#EBEBE8",
    "#124683",
    "#337FD8",
    "#8EBDF3",
    "#C0C2C5",
    "#E79090",
    "#C74343",
    "#9C1515"
]

const senProjNames = [
    "No election",
    "Solid Dem",
    "Likely Dem",
    "Lean Dem",
    "Toss-up",
    "Lean Rep",
    "Likely Rep",
    "Solid Rep"
]

// house legend data
const houseCurCols = [
    "#124683",
    "#9C1515",
    "#E5BB25",
    "#dcdcdc",
]

const houseCurNames = [
    "Democrat", "Republican", "Libertarian", "Vacant"
]


// PRESIDENCY ------------------------------------
// Presidency legend
var presidencyProjLeg = d3.select('.pres-leg')
    .append('div')
    .attr('class', 'presidency-projection-legend')

presidencyProjLeg
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

presidencyProjLeg
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

var presidencyResLeg = d3.select('.pres-leg')
    .append('div')
    .attr('class', 'presidency-2016-legend')
    .style('opacity', 0)
    .style('display', 'none')

presidencyResLeg
    .append('div')
    .attr('class', 'legend-labels  d-flex  justify-content-center')
    .selectAll('div')
    .data(resNames)
    .enter()
    .append('div')
    .attr('class', 'legend-label')
    .style('width', "100px")
    .style('height', '15px')
    .text(function (d) {
        return d
    })

presidencyResLeg
    .append('div')
    .attr('class', 'legend-boxes  d-flex  justify-content-center')
    .selectAll('div')
    .data(resCols)
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
    .attr("class", "d-flex justify-content-center")

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

    var projByState = {};
    d.forEach(el => (projByState[el.state] = projCol(el.rating)));
    var getProjCol = function (myKey) {
        return projByState[myKey];
    };

    var resultsByState = {};
    d.forEach(el => (resultsByState[el.state] = resultCol(el.result_2016)));
    var getResultCol = function (myKey) {
        return resultsByState[myKey];
    };

    // http://jsfiddle.net/aZXRM/
    function highlightSameClass(className) {
        var classto = d3.selectAll(className)
        var otherDivs = d3.selectAll('.state-votes:not(' + className + ")")
        classto.on("mouseover", function () {
            otherDivs
                // .transition()
                // .duration(10)
                .style('opacity', 0.5)

            classto.style("stroke-width", "2px")
                .style('border', '2px solid #EBEBE8')
        })
        classto.on('mouseleave', function () {
            otherDivs
                // .transition()
                // .duration(10)
                .style('opacity', 1)
            classto.style("stroke-width", "0.3px")
                .style('border', 'none');
        });
    }

    var barDiv = barBase
        .append('div')
        .style('height', '40px')
        .style("width", "75vw")
        .attr("class", "state-bars d-flex justify-content-center")

    barDiv
        .selectAll('.state-votes')
        .data(d)
        .enter()
        .append('div')
        .style('height', '40px')
        .style('width', d => (d.ecvs / 538 * 100) + "%")
        .style('background-color', d => (getProjCol(d.state)))
        // .on("mouseover", function (d) {
        //     presTooltip.transition()
        //         .duration(200)
        //         .style("opacity", 0.9);
        //     presTooltip.html(d.state + "<br/>" + d.ecvs + " electoral vote" + (d.ecvs == 1 ? "" : "s"))

        // })
        // .on("mouseout", function (d) {
        //     presTooltip.transition()
        //         .duration(400)
        //         .style('opacity', 0)
        // })
        .attr("class", d => `state-votes-${d.state.replace(' ', '-')} state-votes`)



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

    const statesFill = mapSvg
        .append('g')

    d3.json("data/us-states.json")
        .then(function (us) {

            // Used https://geoman.io/geojson-editor to add circles for congressional districts
            const states = topojson.feature(us, us.objects.states)

            const proj = d3.geoAlbersUsa().scale(900).translate([350.5, 225])
            const path = d3.geoPath()
                .projection(proj)

            statesFill.selectAll("path") //this week using paths instead of "rects" to create bar charts
                .data(states.features) //using .features to bind the data this time. GeoJSON that is an object that has two features, features are what we actually want to access the array of objects
                .enter() //this then propogates into our group
                .append("path") //path per geoemtry
                .attr("fill", d => getProjCol(d.properties.NAME)) //then applying a fill color. can be hex colors or actual colors
                .attr("stroke", "#EBEBE8")
                .attr("stroke-width", "0.3px") //defining the stroke color, in this case black
                .attr("d", path)
                .attr("class", d => `state-votes-${d.properties.NAME.replace(' ', '-')} state-votes`)

            const statesStroke = mapSvg
                .append('g')

            statesStroke.selectAll("path") //this week using paths instead of "rects" to create bar charts
                .data(states.features) //using .features to bind the data this time. GeoJSON that is an object that has two features, features are what we actually want to access the array of objects
                .enter() //this then propogates into our group
                .append("path") //path per geoemtry
                .attr("fill", '#ffffff')
                .style('fill-opacity', 0)
                .style('stroke-opacity', 1)
                //then applying a fill color. can be hex colors or actual colors
                .attr("stroke", "#EBEBE8")
                .attr("stroke-width", "0.3px") //defining the stroke color, in this case black
                .attr("d", path)
                .attr("class", d => `state-votes-${d.properties.NAME.replace(' ', '-')} state-votes`)



            $("#pres-toggle :input").on('change', function () {

                if (this.id == "pres2020") {
                    d.sort(function (a, b) {
                        return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
                    });

                    d.reduce((acc, cur) => {
                        cur.start = acc;
                        return acc + (cur.ecvs);
                    }, 0);

                    presidencyProjLeg
                        .transition()
                        .duration(300)
                        .style('opacity', 1)
                        .style('display', 'block')

                    presidencyResLeg
                        .transition()
                        .duration(300)
                        .style('opacity', 0)
                        .style('display', 'none')

                } else if (this.id == "pres2016") {
                    d.sort(function (a, b) {
                        return a.result_2016 < b.result_2016 ? -1 : a.result_2016 > b.result_2016 ? 1 : 0;
                    });

                    d.reduce((acc, cur) => {
                        cur.start = acc;
                        return acc + (cur.ecvs);
                    }, 0);

                    presidencyResLeg
                        .transition()
                        .duration(300)
                        .style('opacity', 1)
                        .style('display', 'block')

                    presidencyProjLeg
                        .transition()
                        .duration(300)
                        .style('opacity', 0)
                        .style('display', 'none')
                }



                statesFill.selectAll("path")
                    .transition()
                    .duration(300)
                    .attr("fill", d => this.id == "pres2020" ? getProjCol(d.properties.NAME) : getResultCol(d.properties.NAME))

                barDiv
                    .selectAll('.state-votes')
                    .data(d)
                    .transition()
                    .duration(300)
                    .style('width', d => (d.ecvs / 538 * 100) + "%")
                    .style('background-color', d => this.id == "pres2020" ? getProjCol(d.state) : getResultCol(d.state))

            })
            var stateDivs = $('.state-votes')
            var stateClasses = []
            stateDivs.each(function (index, element) {
                stateClasses.push('.' + element.classList[0])

            })
            stateClasses.forEach(function (e) {
                highlightSameClass(e)
            })
        });

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


})


// SENATE ------------------------------------
// Senate legend
var senateProjLeg = d3.select('.sen-leg')
    .append('div')
    .attr('class', 'senate-projection-legend')

senateProjLeg
    .append('div')
    .attr('class', 'legend-labels  d-flex  justify-content-center')
    .selectAll('div')
    .data(senProjNames)
    .enter()
    .append('div')
    .attr('class', 'legend-label')
    .style('width', "100px")
    .style('height', '15px')
    .text(function (d) {
        return d
    })

senateProjLeg
    .append('div')
    .attr('class', 'legend-boxes  d-flex  justify-content-center')
    .selectAll('div')
    .data(senProjCols)
    .enter()
    .append('div')
    .attr('class', 'legend-box')
    .style('width', "100px")
    .style('height', '15px')
    .style('background-color', function (d) {
        return d
    })

var senateCurLeg = d3.select('.sen-leg')
    .append('div')
    .attr('class', 'senate-current-legend')
    .style('opacity', 0)
    .style('display', 'none')

senateCurLeg
    .append('div')
    .attr('class', 'legend-labels  d-flex  justify-content-center')
    .selectAll('div')
    .data(resNames)
    .enter()
    .append('div')
    .attr('class', 'legend-label')
    .style('width', "100px")
    .style('height', '15px')
    .text(function (d) {
        return d
    })

senateCurLeg
    .append('div')
    .attr('class', 'legend-boxes  d-flex  justify-content-center')
    .selectAll('div')
    .data(resCols)
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
var wafHeight = 200
var senNumRows = 5

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

    var projByState = {}

    data.forEach(el => (projByState[el.state_unique] = projCol(el.projection.replace('_', ' '))));

    var getProjCol = function (myKey) {
        return projByState[myKey];
    };

    var curByState = {}

    data.forEach(el => (curByState[el.state_unique] = resultCol(el.held)));

    var getCurCol = function (myKey) {
        return curByState[myKey];
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
            var rowIndex = i % senNumRows
            return rowIndex * 40
        })
        .attr("x", function (d, i) {
            var colIndex = Math.floor(i / senNumRows)
            return colIndex * 40
        })
        .style("fill", d => getProjCol(d.state_unique))
        .on("mouseover", function (d) {
            senTooltip.transition()
                .duration(100)
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "#dcdcdc")
                .style("stroke-width", "3px")
            senTooltip
                .html(d.state_unique)
            // console.log(d) //can't access data?? 'd' here = mouseevent not data...
        })

        .on("mouseout", function (d) {
            senTooltip.transition()
                .duration(300)
                .style('opacity', 0)
            d3.select(this).style("stroke", "none")
        })

    $("#sen-toggle :input").on('change', function () {
        if (this.id == "sen2020") {
            data.sort(function (a, b) {
                return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
            })

            senateProjLeg
                .transition()
                .duration(300)
                .style('opacity', 1)
                .style('display', 'block')

            senateCurLeg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')

        } else if (this.id == "senCur") {
            data.sort(function (a, b) {
                return a.held < b.held ? -1 : a.held > b.held ? 1 : 0;
            })

            senateCurLeg
                .transition()
                .duration(300)
                .style('opacity', 1)
                .style('display', 'block')

            senateProjLeg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')
        }

        senWafSvg
            .selectAll("rect")
            .data(data)
            .transition()
            .duration(300)
            .attr("y", function (d, i) {
                var rowIndex = i % senNumRows
                return rowIndex * 40
            })
            .attr("x", function (d, i) {
                var colIndex = Math.floor(i / senNumRows)
                return colIndex * 40
            })
            .style("fill", d => this.id == "sen2020" ? getProjCol(d.state_unique) : getCurCol(d.state_unique))
    })

    senWaf
        .append('div')
        .html('<b>50</b>')
        .style('position', 'absolute')
        .style('font-size', '1.2em')
        .style('left', '48.6%')
        .style('top', '72px')

    senWaf
        .append('div')
        .style('height', "220px")
        .style('width', '2px')
        .style('background-color', '#EBEBE8')
        .style('position', 'absolute')
        .style('left', '49.5%')
        .style('top', '100px')
})



// HOUSE ------------------------------------

// House legend
var houseProjLeg = d3.select('.house-leg')
    .append('div')
    .attr('class', 'house-projection-legend')

houseProjLeg
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

houseProjLeg
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

var houseCurLeg = d3.select('.house-leg')
    .append('div')
    .attr('class', 'house-current-legend')
    .style('opacity', 0)
    .style('display', 'none')

houseCurLeg
    .append('div')
    .attr('class', 'legend-labels  d-flex  justify-content-center')
    .selectAll('div')
    .data(houseCurNames)
    .enter()
    .append('div')
    .attr('class', 'legend-label')
    .style('width', "100px")
    .style('height', '15px')
    .text(function (d) {
        return d
    })

houseCurLeg
    .append('div')
    .attr('class', 'legend-boxes  d-flex  justify-content-center')
    .selectAll('div')
    .data(houseCurCols)
    .enter()
    .append('div')
    .attr('class', 'legend-box')
    .style('width', "100px")
    .style('height', '15px')
    .style('background-color', function (d) {
        return d
    })




var houseNumRows = 10

var houseWaf = d3.select('.house-graphics')
    .append('div')
    .attr('class', 'house-waffle d-flex justify-content-center')

var houseTooltip = houseWaf
    .append("div")
    .attr("class", "house-tooltip")
    .style("opacity", 0)

var houseWafSvg = houseWaf
    .append("svg")
    .attr("id", "chart")
    .attr("width", wafWidth)
    .attr("height", wafHeight)
    .attr("viewBox", "0 0 " + wafWidth + " " + wafHeight)
    .attr("preserveAspectRatio", "xMinYMin")

d3.json('/data/house.json').then(function (data) {

    var projByState = {}

    data.forEach(el => (projByState[el.seat] = projCol(el.rating.replace('_', ' '))));

    var getProjCol = function (myKey) {
        return projByState[myKey];
    };

    var curByState = {}

    data.forEach(el => (curByState[el.seat] = resultCol(el.held)));

    var getCurCol = function (myKey) {
        return curByState[myKey];
    }

    houseWafSvg
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 14)
        .attr("height", 14)
        .attr("class", d => d.seat)
        .attr("y", function (d, i) {
            var rowIndex = i % houseNumRows
            return rowIndex * 18
        })
        .attr("x", function (d, i) {
            var colIndex = Math.floor(i / houseNumRows)
            return colIndex * 18
        })
        .style("fill", d => getProjCol(d.seat))
        .on("mouseover", function (d) {
            senTooltip.transition()
                .duration(100)
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "#dcdcdc")
                .style("stroke-width", "1.5px")
            senTooltip
                .html(d.seat)
            // console.log(d) //can't access data?? 'd' here = mouseevent not data...
        })

        .on("mouseout", function (d) {
            houseTooltip.transition()
                .duration(300)
                .style('opacity', 0)
            d3.select(this).style("stroke", "none")
        })

    $("#house-toggle :input").on('change', function () {
        if (this.id == "house2020") {
            data.sort(function (a, b) {
                return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
            })
            houseProjLeg
                .transition()
                .duration(300)
                .style('opacity', 1)
                .style('display', 'block')

            houseCurLeg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')

        } else if (this.id == "houseCur") {
            data.sort(function (a, b) {
                return a.held < b.held ? -1 : a.held > b.held ? 1 : 0;
            })

            houseCurLeg
                .transition()
                .duration(300)
                .style('opacity', 1)
                .style('display', 'block')

            houseProjLeg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')
        }

        houseWafSvg
            .selectAll("rect")
            .data(data)
            .transition()
            .duration(300)
            .attr("y", function (d, i) {
                var rowIndex = i % houseNumRows
                return rowIndex * 18
            })
            .attr("x", function (d, i) {
                var colIndex = Math.floor(i / houseNumRows)
                return colIndex * 18
            })
            .style("fill", d => this.id == "house2020" ? getProjCol(d.seat) : getCurCol(d.seat))
    })

    houseWaf
        .append('div')
        .html('<b>218</b>')
        .style('position', 'absolute')
        .style('font-size', '1.2em')
        .style('left', '48%')
        .style('top', '70px')

    houseWaf
        .append('div')
        .style('height', "45.7%")
        .style('width', '2px')
        .style('background-color', '#EBEBE8')
        .style('position', 'absolute')
        .style('left', '49.4%')
        .style('top', '31%')

    houseWaf
        .append('div')
        .style('height', "2px")
        .style('width', '1.6%')
        .style('background-color', '#EBEBE8')
        .style('position', 'absolute')
        .style('left', '47.9%')
        .style('top', '76%')

    houseWaf
        .append('div')
        .style('height', "20%")
        .style('width', '2px')
        .style('background-color', '#EBEBE8')
        .style('position', 'absolute')
        .style('left', '47.9%')
        .style('top', '76%')

})