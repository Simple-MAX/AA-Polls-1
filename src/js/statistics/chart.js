/****************************************************
*                                                   *
*                AA-Polls - chart.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Renders a chart using the Chart.js library with given stats
function renderStatistics(canvasId, stats = DEFAULT_STATS) {
    // Creates local variables of given stats
    let finalMin        = stats.Chart.Min, 
        finalMax        = stats.Chart.Max, 
        finalAvarage    = stats.Chart.Average;

    // Gets the chart canvas element
    let canvas = getElement(canvasId);

    // Gets the context of the canvas element
    let context = canvas.getContext("2d");

    // Creates options and inserts chart data
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

    // Renders the actual chart with options
    let myChart = new Chart(context, options);
}