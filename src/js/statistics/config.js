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
        text: "Main graph",
        labels: [
            "Group value",
            "Max value",
            "Minimum value"
        ],
        borderColors: [
            "#00a1ff",
            "#0ace00",
            "#ffe100"
        ]
    },
    {
        value: ChartType.Line,
        text: "Users rate graph",
        labels: [],
        borderColors: []
    },
    {
        value: ChartType.Bar,
        text: "Impact graph",
        labels: [
            "No effect",
            "Little impact",
            "Big impact"
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
    users: null,
    selected_poll: null,
    submitted_polls: null,
    dates: null,
    start_date: null,
    end_date: null,
};

var chartType = ChartType.Line;

var pollChartType = PollChartTypes[0];

var chart;