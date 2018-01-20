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
                    placeholder: "Alternativ",
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
                    placeholder: "Alternativ",
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
                    placeholder: "Alternativ",
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
                    placeholder: "Alternativ",
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

const DEFAULT_POLL_IDS = [
    ["section-1-title", "initial.section_title"],
    
    ["section-1-sub-title-1", "initial.sub_title_1"],
    ["section-1-sub-title-2", "initial.sub_title_2"],
    ["section-1-sub-title-3", "initial.sub_title_3"],
    ["section-1-value-1", "initial.value_1"],
    ["section-1-value-2", "initial.value_2"],
    ["section-1-value-3", "initial.value_3"],

    ["section-2-title", "details.section_title"],

    ["section-2-sub-title-1", "details.0.sub_title"],
    ["section-2-select-1-option-0", "details.0.option.placeholder"],
    ["section-2-select-1-option-1", "details.0.option.selected"],
    ["section-2-text-1", "details.0.info.placeholder"],

    ["section-2-sub-title-2", "details.1.sub_title"],
    ["section-2-select-2-option-0", "details.1.option.placeholder"],
    ["section-2-select-2-option-1", "details.1.option.selected"],
    ["section-2-text-2", "details.1.info.placeholder"],

    ["section-2-sub-title-3", "details.2.sub_title"],
    ["section-2-select-3-option-0", "details.2.option.placeholder"],
    ["section-2-select-3-option-1", "details.2.option.selected"],
    ["section-2-text-3", "details.2.info.placeholder"],

    ["section-2-sub-title-4", "details.3.sub_title"],
    ["section-2-select-4-option-0", "details.3.option.placeholder"],
    ["section-2-select-4-option-1", "details.3.option.selected"],
    ["section-2-text-4", "details.3.info.placeholder"],
];

// Regular variables
var pollCount = 0;

var createdPoll = DEFAULT_POLL_STRUCTURE.poll;

var currentPoll                 = {};
var fetchedPoll                 = {};
var insertedCreatePollData      = {};
var insertedCreatePollStructure = {};

var fetchedPolls        = [];
var submittedPolls      = [];
var nonSubmittedPolls   = [];

var createdPollData = [
    [createdPoll.initial.section_title],
    [createdPoll.initial.sub_title_1],
    [createdPoll.initial.sub_title_2],
    [createdPoll.initial.sub_title_3],
    [createdPoll.initial.value_1],
    [createdPoll.initial.value_2],
    [createdPoll.initial.value_3],
    [createdPoll.details.section_title],

    [createdPoll.details[0].sub_title],
    [createdPoll.details[0].option.placeholder, "text"],
    [createdPoll.details[0].option.placeholder, "placeholder"],
    [createdPoll.details[0].info.placeholder],

    [createdPoll.details[1].sub_title],
    [createdPoll.details[1].option.placeholder, "text"],
    [createdPoll.details[1].option.placeholder, "placeholder"],
    [createdPoll.details[1].info.placeholder],

    [createdPoll.details[2].sub_title],
    [createdPoll.details[2].option.placeholder, "text"],
    [createdPoll.details[2].option.placeholder, "placeholder"],
    [createdPoll.details[2].info.placeholder],

    [createdPoll.details[3].sub_title],
    [createdPoll.details[3].option.placeholder, "text"],
    [createdPoll.details[3].option.placeholder, "placeholder"],
    [createdPoll.details[3].info.placeholder],
];

var currentPollData = createdPollData;
