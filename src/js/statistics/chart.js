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
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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