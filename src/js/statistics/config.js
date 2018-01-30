/****************************************************
*                                                   *
*                AA-Polls - config.js               *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Constant variables
const ChartType = {
    Bar: "bar",
    Line: "line"
};

const PollChartTypes = [
    {
        value: ChartType.Line,
        text: "Huvudgraf",
        labels: [
            "Medelvärde",
            "Max värde",
            "Min värde"
        ],
        borderColors: [
            "#00a1ff",
            "#0ace00",
            "#ffe100"
        ]
    }, 
    {
        value: ChartType.Bar,
        text: "Påverkningsgraf",
        labels: [
            "0 = ingen påverkan",
            "1 = lite påverkan",
            "2 = stor påverkan"
        ],
        borderColors: [
            "#00a1ff",
            "#0ace00",
            "#ffe100"
        ]
    }
];

// Regular variables
var selectedGroup = {
    group: null,
    polls: null,
    selected_poll: null,
    submitted_polls: null,
    dates: null,
    start_date: null,
    end_date: null,
};

var chartType = ChartType.Line;