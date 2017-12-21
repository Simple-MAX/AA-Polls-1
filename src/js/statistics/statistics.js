/****************************************************
*                                                   *
*              BluDay - statistics.js               *
*                                                   *
*         Developed by : Bachir Bouchemla           *
*                                                   *
*     Date of development : Late December 2017      *
*                                                   *
*   Copyrights @ MicroAA Labs | BluDay | botprizm   *
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

function renderStatistics(
    canvasId, 
    stats   = { min: 0, max: 0, average: 0 }, 
    date    = { from: "", to: "" }
) {
    let finalMin        = stats.min, 
        finalMax        = stats.max, 
        finalAvarage    = stats.average;

    if (finalMin > 0)
        finalMin = getStatsMin();

    if (finalMax > 0)
        finalMax = getStatsMax();
    
    if (finalAvarage > 0)
        finalAvarage = getStatsAverage();

    canvas = getElement(canvasId);

    if (canvas == null) return;

    context = canvas.getContext("2d");

    /*
    var chart = new Chart(context, {
        type: "line",
        dataset: [{

        }],
        options: {

        }
    });*/

    var myChart = new Chart(context, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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
    });
}