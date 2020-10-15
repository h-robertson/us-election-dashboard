// // Projection colours
// const projCols = {
//     "Solid Dem": "#124683",
//     "Likely Dem": "#337FD8",
//     "Lean Dem": "#8EBDF3",
//     "Toss-up": "#C0C2C5",
//     "Lean Rep": "#E79090",
//     "Likely Rep": "#C74343",
//     "Soild Rep": "#9C1515"
// }

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
    "Soild Rep"
]


// Main party colours
const partyCols = {
    "D": "#124683",
    "R": "#124683"
}

// Presidency legend
var presidencyLeg = d3.select('.presidency')
    .append('div')
    .attr('class', 'row')
    .append('div')
    .attr('class', 'presidency-legend col-sm-12')

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


// Senate legend
var senateLeg = d3.select('.senate')
    .append('div')
    .attr('class', 'row')
    .append('div')
    .attr('class', 'presidency-legend col-sm-12')

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