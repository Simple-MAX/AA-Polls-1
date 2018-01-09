/****************************************************
*                                                   *
*              AA-Polls - statistics.js             *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

/* Fetches relevant and requested polls in
 * string format and parses it with JSON.parse(),
 * then loops through and fetches the lowest value
 */
function getStatsMin() { }

/* Fetches relevant and requested polls in
 * string format and parses it with JSON.parse(),
 * then loops through and fetches the highest value
 */
function getStatsMax() { }

/* Fetches relevant and requested polls in
 * string format and parses it with JSON.parse(),
 * then loops through and fetches the "estimation_total" value
 */
function getStatsAverage() { }

// Renders a chart using the Chart.js library with given stats
function renderStatistics(canvasId, stats = DEFAULT_STATS) {
    let finalMin        = stats.Chart.Min, 
        finalMax        = stats.Chart.Max, 
        finalAvarage    = stats.Chart.Average;

    if (finalMin > 0) finalMin = getStatsMin();
    if (finalMax > 0) finalMax = getStatsMax();
    
    if (finalAvarage > 0) finalAvarage = getStatsAverage();

    let canvas = getElement(canvasId);

    let context = canvas.getContext("2d");

    const options = {
        type: 'line',
        data: {
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: "transparent",
                borderColor: "red",
                borderWidth: 1
            }, {
                label: '# of Votes',
                data: [2, 19, 15, 5, 10, 3],
                backgroundColor: "transparent",
                borderColor: "blue",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    };

    let myChart = new Chart(context, options);
}