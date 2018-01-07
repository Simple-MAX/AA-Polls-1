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
const POLL_API_URL = `${API_URL}${Endpoint.Poll}`;

const DEFAULT_POLL_STRUCTURE = {
    poll: {
        group_id: "AA-G-0",
        general_rate: 0,
        group_id: "",
        initial: {
            section_title: "Bedömning",
            sub_title_1: "Grupp",
            sub_title_2: "Lägsta värde",
            sub_title_3: "Högsta värde",
            value_1: "AA-G-0",
            value_2: 0,
            value_3: 10
        },
        details: {
            section_title: "Detaljerat",
            0: {
                sub_title: "Prognos på kort sikt",
                option: {
                    placeholder: "Prognosalternativ",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Ytterligare prognos",
                    text: ""
                }
            }, 
            1: {
                sub_title: "Prognos på lång sikt",
                option: {
                    placeholder: "Prognosalternativ",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Ytterligare prognos",
                    text: ""
                }
            },
            2: {
                sub_title: "Påverkandefaktorer",
                rate: 0,
                option: {
                    placeholder: "Påverkansalternativ",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Ytterligare prognos",
                    text: ""
                }
            },
            3: {
                sub_title: "Åtgärder",
                rate: 0,
                option: {
                    placeholder: "Åtgärdsalternativ",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Ytterligare prognos",
                    text: ""
                }
            }
        }
    }
};

const DEFAULT_POLL = DEFAULT_POLL_STRUCTURE.poll;

const SUB_SECTION_LENGTH = Object.keys(DEFAULT_POLL).length - 1;

const DEFAULT_POLL_IDS = [
    "section-1-title",

    "section-1-sub-title-1",
    "section-1-sub-title-2",
    "section-1-sub-title-3",
    "section-1-value-1",
    "section-1-value-2",
    "section-1-value-3",

    "section-2-title",

    "section-2-sub-title-1",
    "section-2-select-1-option-0",
    "section-2-select-1-option-placeholder",
    "section-2-text-1",

    "section-2-sub-title-2",
    "section-2-select-2-option-0",
    "section-2-select-2-option-placeholder",
    "section-2-text-2",

    "section-2-sub-title-3",
    "section-2-select-3-option-0",
    "section-2-select-3-option-placeholder",
    "section-2-text-3",

    "section-2-sub-title-4",
    "section-2-select-4-option-0",
    "section-2-select-4-option-placeholder",
    "section-2-text-4",
];

const DEFAULT_POLL_DATA = [
    [DEFAULT_POLL.initial.section_title],
    [DEFAULT_POLL.initial.sub_title_1],
    [DEFAULT_POLL.initial.sub_title_2],
    [DEFAULT_POLL.initial.sub_title_3],
    [DEFAULT_POLL.initial.value_1],
    [DEFAULT_POLL.initial.value_2],
    [DEFAULT_POLL.initial.value_3],
    [DEFAULT_POLL.details.section_title],

    [DEFAULT_POLL.details[0].sub_title],
    [DEFAULT_POLL.details[0].option.placeholder, "text"],
    [DEFAULT_POLL.details[0].option.placeholder, "placeholder"],
    [DEFAULT_POLL.details[0].info.placeholder],

    [DEFAULT_POLL.details[1].sub_title],
    [DEFAULT_POLL.details[1].option.placeholder, "text"],
    [DEFAULT_POLL.details[1].option.placeholder, "placeholder"],
    [DEFAULT_POLL.details[1].info.placeholder],

    [DEFAULT_POLL.details[2].sub_title],
    [DEFAULT_POLL.details[2].option.placeholder, "text"],
    [DEFAULT_POLL.details[2].option.placeholder, "placeholder"],
    [DEFAULT_POLL.details[2].info.placeholder],

    [DEFAULT_POLL.details[3].sub_title],
    [DEFAULT_POLL.details[3].option.placeholder, "text"],
    [DEFAULT_POLL.details[3].option.placeholder, "placeholder"],
    [DEFAULT_POLL.details[3].info.placeholder],
];

// Regular variables
var fetchedPolls;

var pollCount = 0;

var createdPollData = DEFAULT_POLL_DATA; 
var createdPoll     = DEFAULT_POLL;

var insertedCreatePollData;
var insertedCreatePollStructure;

var fetchedPoll;