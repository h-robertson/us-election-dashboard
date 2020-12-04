// // Projection colours
const projDict = {
    "SOLID DEMOCRAT": "#124683",
    "LIKELY DEMOCRAT": "#337FD8",
    "LEAN DEMOCRAT": "#8EBDF3",
    "TOSS UP": "#C0C2C5",
    "LEAN REPUBLICAN": "#E79090",
    "LIKELY REPUBLICAN": "#C74343",
    "SOLID REPUBLICAN": "#9C1515",
    "noelectiondem": "#124683",
    "noelectionrep": "#9C1515"
}

var projCol = function (myKey) {
    return projDict[myKey];
};

const resultDict = {
    "D": "#124683",
    "R": "#9C1515",
    "L": "#E5BB25", //L = libertarian
    "E": "#dcdcdc", //E = vacant previously democrat (used for ordering reasons)
    "Q": "#dcdcdc", //Q = vacant previously republican (used for ordering reasons)
    "I": "#dcdcdc",
    "Not yet called": '#dcdcdc',
    "P": '#787878'
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
    "Toss Up",
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

// senate 2020 results legend
const sen20Names = [
    "Democrat", "Republican", "Independent", "Runoff"
]

const sen20Cols = [
    "#124683", "#9C1515", "#dcdcdc", "#787878"
]

// senate legend data
const senResNames = [
    "Democrat", "Independent", "Republican"
]

const senResCols = [
    "#124683", "#dcdcdc", "#9C1515"
]

const senProjCols = [
    "#124683",
    "#337FD8",
    "#8EBDF3",
    "#C0C2C5",
    "#E79090",
    "#C74343",
    "#9C1515"
]

const senProjNames = [
    "Solid Dem",
    "Likely Dem",
    "Lean Dem",
    "Toss Up",
    "Lean Rep",
    "Likely Rep",
    "Solid Rep"
]

// house legend data

// house 2020 results legend
const house20Names = [
    "Democrat", "Republican", "Not yet called", "Runoff"
]

const house20Cols = [
    "#124683", "#9C1515", "#dcdcdc", "#787878"
]

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
    .style('opacity', 0)
    .style('display', 'none')

presidencyProjLeg
    .append('div')
    .attr('class', 'legend-labels  d-flex justify-content-center')
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
    .attr("class", "bar-wrapper d-flex justify-content-center")

var presTooltip = barBase
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style('background-color', '#57747E')
    .attr('class', 'presidency-tooltip')


function sum(a, b) {
    return a + b;
}

// https://www.digitalocean.com/community/tutorials/js-capitalizing-strings
function lowerThenCap(text) {
    return text.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}

// d3.json('/us-election-dashboard/data/ec.json').then(function (d) {
d3.json('data/ec.json').then(function (d) {
    d.sort(function (a, b) {
        return a.margin_2020 < b.margin_2020 ? -1 : a.margin_2020 > b.margin_2020 ? 1 : 0;
    });

    d.reduce((acc, cur) => {
        cur.start = acc;
        return acc + (cur.ecvs);
    }, 0);

    var results20ByState = {};
    d.forEach(el => (results20ByState[el.state] = resultCol(el.party2020)));
    var get20ResultCol = function (myKey) {
        return results20ByState[myKey];
    };

    var projByState = {};
    d.forEach(el => (projByState[el.state] = projCol(el.rating)));
    var getProjCol = function (myKey) {
        return projByState[myKey];
    };

    var results16ByState = {};
    d.forEach(el => (results16ByState[el.state] = resultCol(el.result_2016)));
    var get16ResultCol = function (myKey) {
        return results16ByState[myKey];
    };

    // Adapted from http://jsfiddle.net/aZXRM/
    function highlightSameClass(className) {
        var classto = d3.selectAll(className)
        var otherDivs = d3.selectAll('.state-votes:not(' + className + ")")
        classto.on("mouseover", function (m, d) {
            otherDivs
                .style('opacity', 0.5)

            classto.style("stroke-width", "2px")
                .style('border', '2px solid #EBEBE8')

            presTooltip.transition()
                .duration(200)
                .style("opacity", 0.9);


            $('#pres2020label')[0].classList.contains('active') ?
                (this.tagName == "DIV" ?
                    // bar 2020 projection
                    (presTooltip.html("<b>" + d.state + "</b><br/>" + lowerThenCap(d.rating) + "</br>" + d.ecvs + " electoral vote" + (d.ecvs == 1 ? "" : "s"))) :
                    // map 2020 projection
                    (presTooltip.html("<b>" + d.properties.NAME + "</b><br/>" + lowerThenCap(d.properties.rating) + "</br>" + d.properties.ecvs + " electoral vote" + (d.properties.ecvs == 1 ? "" : "s")))) :
                ($('#pres2016label')[0].classList.contains('active') ?
                    (this.tagName == "DIV" ?
                        // bar 2016
                        (presTooltip.html("<b>" + d.state + "</b><br/>" + (d.result_2016 == "D" ? "Democrat</br>" : "Republican</br>") + "<i>2016 margin:</i> +" + d.margin_2016 + "</br>" + d.ecvs + " electoral vote" + (d.ecvs == 1 ? "" : "s"))) :
                        // map 2016
                        (presTooltip.html("<b>" + d.properties.NAME + "</b><br/>" + (d.properties.result_2016 == "D" ? "Democrat</br>" : "Republican</br>") + "<i>2016 margin:</i> +" + d.properties.margin_2016 + "%</br>" + d.properties.ecvs + " electoral vote" + (d.properties.ecvs == 1 ? "" : "s")))) :
                    (this.tagName == "DIV" ?
                        // bar 2020 results
                        (presTooltip.html("<b>" + d.state + "</b><br/>" + (d.party2020 == "D" ? "Democrat</br>" : "Republican</br>") + "<i>2020 margin:</i> +" + d.absmargin_2020 + "</br>Est. counted: " + d.est_count_display)) :
                        // map 2020 results
                        (presTooltip.html("<b>" + d.properties.NAME + "</b><br/>" + (d.properties.party2020 == "D" ? "Democrat</br>" : "Republican</br>") + "<i>2020 margin:</i> +" + d.properties.absmargin_2020 + "%</br>Est. counted: " + d.properties.est_count_display))));


        });
        classto.on('mouseleave', function () {
            otherDivs
                .style('opacity', 1)
            classto.style("stroke-width", "0.3px")
                .style('border', 'none');

            presTooltip.transition()
                .duration(400)
                .style('opacity', 0)
        });
    }

    var barDiv = barBase
        .append('div')
        .style('height', '40px')
        .attr("class", "state-bars d-flex justify-content-center")

    barDiv
        .selectAll('.state-votes')
        .data(d)
        .enter()
        .append('div')
        .style('height', '40px')
        .style('width', d => (d.ecvs / 538 * 100) + "%")
        .style('background-color', d => (get20ResultCol(d.state)))
        .attr("class", d => `state-votes-${d.state.replace(' ', '-')} state-votes`)


    // Pres Map
    const width = 700
    const height = width * 0.66

    const mapSvg = d3.select('.pres-map')
        .append('svg')
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .attr('class', 'states-map')

    const statesFill = mapSvg
        .append('g')
        .attr('transform', 'translate(10)')

    // d3.json("/us-election-dashboard/data/us-states.json")
    d3.json("data/us-states.json")
        .then(function (us) {

            // Used https://geoman.io/geojson-editor to add circles for congressional districts
            const states = topojson.feature(us, us.objects.states)

            // https://stackoverflow.com/questions/56432468/how-to-combine-key-values-from-a-json-file-to-a-geojson-map-file
            states.features.forEach(val => {
                let {
                    properties
                } = val
                let stateName = val.properties.NAME
                let newProps = d.filter((d => d.state == stateName))
                let newPropsFirst = newProps[0]
                val.properties = {
                    ...properties,
                    ...newPropsFirst
                }
            })

            const proj = d3.geoAlbersUsa().scale(900).translate([350.5, 225])
            const path = d3.geoPath()
                .projection(proj)

            statesFill.selectAll("path")
                .data(states.features)
                .enter()
                .append("path")
                .attr("fill", d => get20ResultCol(d.properties.NAME))
                .attr("stroke", "#EBEBE8")
                .attr("stroke-width", "0.3px")
                .attr("d", path)
                .attr("class", d => `state-votes-${d.properties.NAME.replace(' ', '-')} state-votes`)

            const statesStroke = mapSvg
                .append('g')
                .attr('transform', 'translate(10)')

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

            var stateDivs = $('.state-votes')
            var stateClasses = []
            stateDivs.each(function (index, element) {
                stateClasses.push('.' + element.classList[0])

            })
            stateClasses.forEach(function (e) {
                highlightSameClass(e)
            })

            function reDoTooltips() {

                // timeout delay needed for tooltip linking to be re-done after classes change on toggle button change
                setTimeout(function () {
                    var stateDivs = $('.state-votes')
                    var stateClasses = []
                    stateDivs.each(function (index, element) {
                        stateClasses.push('.' + element.classList[0])

                    })
                    stateClasses.forEach(function (e) {
                        highlightSameClass(e)
                    })
                }, 100);

            }

            $("#pres-toggle :input").on('change', function () {
                var presDatestamp = document.getElementById('pres-datestamp')

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

                    d3.selectAll('.barlabel-2016')
                        .transition()
                        .duration(300)
                        .style('opacity', 0)

                    presDatestamp.innerHTML = `Source: <a
                    href='https://cookpolitical.com/sites/default/files/2020-10/EC%20Ratings.102820.pdf' target='_blank'>
                    Cook
                    Political Electoral College Ratings. Last updated 28 October 2020.</a></div>`

                } else if (this.id == "pres2016") {
                    d.sort(function (a, b) {
                        return a.absmargin_2016 < b.absmargin_2016 ? -1 : a.absmargin_2016 > b.absmargin_2016 ? 1 : 0;
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

                    d3.selectAll('.barlabel-2016')
                        .transition()
                        .duration(300)
                        .style('opacity', 1)

                    presDatestamp.innerHTML = `Source: <a
                        href='https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/' target='_blank'>
                        Federal Election Commission, 2016 election results</a>.</div>`

                } else if (this.id == "presresults2020") {
                    d.sort(function (a, b) {
                        return a.margin_2020 < b.margin_2020 ? -1 : a.margin_2020 > b.margin_2020 ? 1 : 0;
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

                    d3.selectAll('.barlabel-2016')
                        .transition()
                        .duration(300)
                        .style('opacity', 1)

                    presDatestamp.innerHTML = `Source: <a
                        href='https://results.decisiondeskhq.com/' target='_blank'>
                        Decision Desk HQ, 2020 election results</a>. Last updated Tuesday 17 November 2020.</div>`
                }

                statesFill
                    .selectAll("path")
                    .data(states.features)
                    .transition()
                    .duration(300)
                    // .append("path") //path per geoemtry
                    // .attr("stroke", "#EBEBE8")
                    // .attr("stroke-width", "0.3px") //defining the stroke color, in this case black
                    // .attr("d", path)
                    .attr("class", d => `state-votes-${d.properties.NAME.replace(' ', '-')} state-votes`)
                    .attr("fill", d => this.id == "pres2020" ? getProjCol(d.properties.NAME) : (this.id == "pres2016" ? get16ResultCol(d.properties.NAME) : get20ResultCol(d.properties.NAME)))

                barDiv
                    .selectAll('.state-votes')
                    .data(d)
                    .transition()
                    .duration(300)
                    .style('width', d => (d.ecvs / 538 * 100) + "%")
                    .style('background-color', d => this.id == "pres2020" ? getProjCol(d.state) : (this.id == "pres2016" ? get16ResultCol(d.state) : get20ResultCol(d.state)))
                    .attr("class", d => `state-votes-${d.state.replace(' ', '-')} state-votes`)

                reDoTooltips()
            })



        });

    barBase
        .append('div')
        .html('<b>270</b>')
        .attr('class', 'pres-finish-label')

    barBase
        .append('div')
        .style('width', '3px')
        .attr('class', 'pres-finish-line')
        .style('background-color', '#EBEBE8')

    barBase
        .append('div')
        .html("&#8592; Larger Democrat margin")
        .attr('class', 'barlabel-2016 barlabel-clinton')

    barBase
        .append('div')
        .html("Larger Republican margin &#8594;")
        .attr('class', 'barlabel-2016 barlabel-trump')
})


// SENATE ------------------------------------
// Senate legend
var senate20Leg = d3.select('.sen-leg')
    .append('div')
    .attr('class', 'senate-2020-legend')


senate20Leg
    .append('div')
    .attr('class', 'legend-labels  d-flex  justify-content-center')
    .selectAll('div')
    .data(sen20Names)
    .enter()
    .append('div')
    .attr('class', 'legend-label')
    .style('width', "100px")
    .style('height', '15px')
    .text(function (d) {
        return d
    })

senate20Leg
    .append('div')
    .attr('class', 'legend-boxes  d-flex  justify-content-center')
    .selectAll('div')
    .data(sen20Cols)
    .enter()
    .append('div')
    .attr('class', 'legend-box')
    .style('width', "100px")
    .style('height', '15px')
    .style('background-color', function (d) {
        return d
    })

var senateProjLeg = d3.select('.sen-leg')
    .append('div')
    .attr('class', 'senate-projection-legend')
    .style('opacity', 0)
    .style('display', 'none')

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
    .data(senResNames)
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
    .data(senResCols)
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

var senWafWidth = 900
var senWafHeight = 300
var senNumRows = 5

var senWaf = d3.select('.sen-waffle')
    .append('div')
    .attr('class', 'sen-waffle d-flex justify-content-center')

var senTooltip = senWaf
    .append("div")
    .style("opacity", 0)
    .style('background-color', '#57747E')
    .attr('class', 'senate-tooltip')

var senWafSvg = senWaf
    .append("svg")
    .attr("id", "chart")
    .attr("viewBox", "0 0 " + senWafWidth + " " + senWafHeight)
    .attr("preserveAspectRatio", "xMinYMin")
    .attr("class", "senate-svg")


// d3.json('/us-election-dashboard/data/senate.json').then(function (data) {
d3.json('data/senate.json').then(function (data) {

    data.sort(function (a, b) {
        return a.newParty < b.newParty ? -1 : a.newParty > b.newParty ? 1 : 0;
    })

    var res20ByState = {}

    data.forEach(el => (res20ByState[el.state_unique] = resultCol(el.newParty)));

    var get20Col = function (myKey) {
        return res20ByState[myKey];
    };

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
        .attr("class", d => d.state_unique + " senate-" + d.projection)
        .attr("y", function (d, i) {
            var rowIndex = i % senNumRows
            return rowIndex * 40 + 60
        })
        .attr("x", function (d, i) {
            var colIndex = Math.floor(i / senNumRows)
            return colIndex * 40 + 50
        })
        .style("fill", d => get20Col(d.state_unique))
        // .attr('transform', d => d.projection == "noelectiondem" ? "translate(-40,0)" : (d.projection == "noelectionrep" ? "translate(40,0)" : "translate(0,0)"))
        .on("mouseover", function (m, d) {
            senTooltip.transition()
                .duration(100)
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "#dcdcdc")
                .style("stroke-width", "3px")
            senTooltip
                .html(d.state_unique)

            $('#sen2020label')[0].classList.contains('active') ?
                // 2020 projection
                (senTooltip.html("<b>" + d.state_name + "</b><br/>" + d.rating + "</br><i>Incumbent: </i>" + d.incumbent + "</br>" + (d.challenger ? "<i>Challenger(s): </i>" + d.challenger : ""))) :
                // 2016
                ($('#sen2016label')[0].classList.contains('active') ? ((senTooltip.html("<b>" + d.state_name + "</b><br/>" + (d.held == "D" ? "Democrat" : (d.held == "R" ? "Republican" : "Independent")) + "</br><i>Held by: </i>" + d.held_name))) :
                    // 2020 results
                    (senTooltip.html("<b>" + d.state_name + "</b><br/>" + (d.newParty == "D" ? "Democrat" : (d.newParty == "R" ? "Republican" : (d.newParty == "I" ? "Independent" : "Runoff"))) + "</br>" + (d.newParty == "P" ? "" : "<i>Held by: </i>" + d.newName))))

        })

        .on("mouseout", function (d) {
            senTooltip.transition()
                .duration(300)
                .style('opacity', 0)
            d3.select(this).style("stroke", "none")
        })



    $("#sen-toggle :input").on('change', function () {
        var senDatestamp = document.getElementById('sen-datestamp')

        if (this.id == "sen2020") {
            data.sort(function (a, b) {
                return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
            })

            d3.selectAll('.up-for-election')
                .transition()
                .duration(300)
                .style('opacity', 1)

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

            senate20Leg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')

            senDatestamp.innerHTML = `Source: <a href="https://cookpolitical.com/ratings/senate-race-ratings" target="_blank">
            Cook Political Senate Ratings. Last updated 29 October 2020.</a></div>`

        } else if (this.id == "senCur") {
            data.sort(function (a, b) {
                return a.held < b.held ? -1 : a.held > b.held ? 1 : 0;
            })

            d3.selectAll('.up-for-election')
                .transition()
                .duration(300)
                .style('opacity', 0)

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

            senate20Leg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')


            senDatestamp.innerHTML = `Source: <a
            href='https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/' target='_blank'>
            Federal Election Commission, 2018 election results</a>.</div>`

        } else if (this.id == "senresults2020") {
            data.sort(function (a, b) {
                return a.newParty < b.newParty ? -1 : a.newParty > b.newParty ? 1 : 0;
            })

            d3.selectAll('.up-for-election')
                .transition()
                .duration(300)
                .style('opacity', 0)

            senate20Leg
                .transition()
                .duration(300)
                .style('opacity', 1)
                .style('display', 'block')

            senateProjLeg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')

            senateCurLeg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')


            senDatestamp.innerHTML = `Source: <a
            href='https://results.decisiondeskhq.com/' target='_blank'>
            Decision Desk HQ, 2020 election results</a>. Last updated Tuesday 17 November 2020.</div>`

        }

        senWafSvg
            .selectAll("rect")
            .data(data)
            .transition()
            .duration(300)
            .attr("y", function (d, i) {
                var rowIndex = i % senNumRows
                return rowIndex * 40 + 60
            })
            .attr("x", function (d, i) {
                var colIndex = Math.floor(i / senNumRows)
                return colIndex * 40 + 50
            })
            .attr('transform', d => this.id == "sen2020" ? (d.projection == "noelectiondem" ? "translate(-40,0)" : (d.projection == "noelectionrep" ? "translate(40,0)" : "translate(0,0)")) :
                'translate(0,0)')
            .style("fill", d => this.id == "sen2020" ? getProjCol(d.state_unique) : (this.id == "senCur" ? getCurCol(d.state_unique) : get20Col(d.state_unique)))
    })

    senWafSvg
        .append('rect')
        .attr('x', '35.5%')
        .attr('y', '17%')
        .attr('width', '292px')
        .attr('height', '210px')
        .style('stroke', '#EBEBE8')
        .style('stroke-width', '4px')
        .style('fill', 'none')
        .attr('class', 'up-for-election up-box')
        .style('opacity', 0)

    senWafSvg
        .append('text')
        .attr('x', window.innerWidth <= 991 ? "33.7%" : "41%")
        .attr('y', window.innerWidth <= 991 ? "98%" : "96%")
        .text('35 seats up for election')
        .attr('font-size', window.innerWidth <= 991 ? "2em" : "1.2em")
        .style('fill', '#EBEBE8')
        .attr('class', 'up-for-election up-label')
        .style('opacity', 0)


    senWafSvg
        .append('text')
        .attr('x', '47.5%')
        .attr('y', '9.8%')
        .text('50')
        .style('fill', '#EBEBE8')
        .attr('class', 'finish-label')

    senWafSvg
        .append('line')
        .attr('x1', '49.5%')
        .attr('x2', '49.5%')
        .attr('y1', '12%')
        .attr('y2', '87%')
        .style('stroke-width', "4px")
        .style('stroke', '#EBEBE8')
})


// HOUSE ------------------------------------

// House legend
var house20Leg = d3.select('.house-leg')
    .append('div')
    .attr('class', 'house-2020-legend')

house20Leg
    .append('div')
    .attr('class', 'legend-labels  d-flex  justify-content-center')
    .selectAll('div')
    .data(house20Names)
    .enter()
    .append('div')
    .attr('class', 'legend-label')
    .style('width', "100px")
    .style('height', '15px')
    .text(function (d) {
        return d
    })

house20Leg
    .append('div')
    .attr('class', 'legend-boxes  d-flex  justify-content-center')
    .selectAll('div')
    .data(house20Cols)
    .enter()
    .append('div')
    .attr('class', 'legend-box')
    .style('width', "100px")
    .style('height', '15px')
    .style('background-color', function (d) {
        return d
    })

var houseProjLeg = d3.select('.house-leg')
    .append('div')
    .attr('class', 'house-projection-legend')
    .style('opacity', 0)
    .style('display', 'none')


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

var houseWafWidth = 800
var houseWafHeight = 280
var houseNumRows = 10

var houseWaf = d3.select('.house-waff')
    .append('div')
    .attr('class', 'house-waffle d-flex justify-content-center')

var houseTooltip = houseWaf
    .append("div")
    .style("opacity", 0)
    .style("position", "absolute")
    .style('background-color', '#57747E')
    .attr('class', 'house-tooltip')

var houseWafSvg = houseWaf
    .append("svg")
    .attr("id", "chart")
    .attr("viewBox", "0 0 " + houseWafWidth + " " + houseWafHeight)
    .attr("preserveAspectRatio", "xMinYMin")
    .attr("class", "house-svg")

// d3.json("/us-election-dashboard/data/house.json").then(function (data) {
d3.json("data/house.json").then(function (data) {

    data.sort(function (a, b) {
        return a.newParty < b.newParty ? -1 : a.newParty > b.newParty ? 1 : 0;
    })

    console.log(data)

    var res20ByState = {}

    data.forEach(el => (res20ByState[el.seat] = resultCol(el.newParty)));

    var get20ResultCol = function (myKey) {
        return res20ByState[myKey];
    };

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
            return rowIndex * 18 + 60
        })
        .attr("x", function (d, i) {
            var colIndex = Math.floor(i / houseNumRows)
            return colIndex * 18
        })
        .style("fill", d => get20ResultCol(d.seat))
        .on("mouseover", function (m, d) {
            houseTooltip.transition()
                .duration(100)
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "#dcdcdc")
                .style("stroke-width", "1.5px")

            $('#house2020label')[0].classList.contains('active') ?
                // 2020 projection
                (houseTooltip.html("<b>" + d.seat + "</b><br/>" + lowerThenCap(d.rating.replace('_', ' ')) + "</br><i>Incumbent: </i>" + d.name)) :
                // 2016
                ($('#house2016label')[0].classList.contains('active') ?
                    (houseTooltip.html("<b>" + d.seat + "</b><br/>" + (d.held == "D" ? "Democrat" : (d.held == "R" ? "Republican" : (d.held == "L" ? "Libertarian" : "Vacant"))) + (d.held_name ? ("</br><i>Held by: </i>" + d.held_name) : ""))) :
                    // 2020 results
                    (houseTooltip.html("<b>" + d.seat + "</b><br/>" + (d.newParty == "D" ? "Democrat" : (d.newParty == "R" ? "Republican" : (d.newParty == "P" ? "Runoff" : "Not yet called"))) + (d.newParty == "D" ? ("</br><i>Held by: </i>" + d.newName) : (d.newParty == "R" ? ("</br><i>Held by: </i>" + d.newName) : "")))))

        })

        .on("mouseout", function (d) {
            houseTooltip.transition()
                .duration(300)
                .style('opacity', 0)
            d3.select(this).style("stroke", "none")
        })

    $("#house-toggle :input").on('change', function () {
        var houseDatestamp = document.getElementById('house-datestamp')

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

            house20Leg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')

            houseDatestamp.innerHTML = `Source: <a href="https://cookpolitical.com/ratings/house-race-ratings"
            target="_blank"> Cook Political House Ratings. Last updated 21 October 2020.</a>`

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

            house20Leg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')

            houseDatestamp.innerHTML = `Source: <a
            href='https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/' target='_blank'>
            Federal Election Commission, 2018 election results</a>.</div>`


        } else if (this.id == "houseresults2020") {

            data.sort(function (a, b) {
                return a.newParty < b.newParty ? -1 : a.newParty > b.newParty ? 1 : 0;
            })

            house20Leg
                .transition()
                .duration(300)
                .style('opacity', 1)
                .style('display', 'block')

            houseProjLeg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')

            houseCurLeg
                .transition()
                .duration(300)
                .style('opacity', 0)
                .style('display', 'none')

            houseDatestamp.innerHTML = `Source: <a
                href='https://results.decisiondeskhq.com/' target='_blank'>
                Decision Desk HQ, 2020 election results</a>. Last updated Tuesday 17 November 2020.</div>`
        }

        houseWafSvg
            .selectAll("rect")
            .data(data)
            .transition()
            .duration(300)
            .attr("y", function (d, i) {
                var rowIndex = i % houseNumRows
                return rowIndex * 18 + 60
            })
            .attr("x", function (d, i) {
                var colIndex = Math.floor(i / houseNumRows)
                return colIndex * 18
            })
            .style("fill", d => this.id == "house2020" ? getProjCol(d.seat) : (this.id == "houseCur" ? getCurCol(d.seat) : get20ResultCol(d.seat)))
    })


    houseWafSvg
        .append('text')
        .attr('x', '46.4%')
        .attr('y', '11%')
        .text('218')
        .style('fill', '#EBEBE8')
        .attr('class', 'finish-label')

    houseWafSvg
        .append('line')
        .attr('x1', '49.3%')
        .attr('x2', '49.3%')
        .attr('y1', '14%')
        .attr('y2', '72.6%')
        .style('stroke-width', "4px")
        .style('stroke', '#EBEBE8')

    houseWafSvg
        .append('line')
        .attr('x1', '46.8%')
        .attr('x2', '49.5%')
        .attr('y1', '72.2%')
        .attr('y2', '72.2%')
        .style('stroke-width', "4px")
        .style('stroke', '#EBEBE8')

    houseWafSvg
        .append('line')
        .attr('x1', '47%')
        .attr('x2', '47%')
        .attr('y1', '72.2%')
        .attr('y2', '92%')
        .style('stroke-width', "4px")
        .style('stroke', '#EBEBE8')
})