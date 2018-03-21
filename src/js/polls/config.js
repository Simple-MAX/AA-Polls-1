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
        info_text: "",
        info_text_2: "",
        group_id: "AA-G-0",
        general_rate: 5,
        initial: {
            section_title: "Assessment",
            sub_title_1: "Group",
            sub_title_2: "Lowest value",
            sub_title_3: "Highest value",
            value_1: 5,
            value_2: 0,
            value_3: 10
        },
        details: {
            section_title: "Detailed",
            0: {
                sub_title: "Short-term forecast",
                option: {
                    placeholder: "Alternative",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Further forecast",
                    text: ""
                }
            }, 
            1: {
                sub_title: "Long-term forecast",
                option: {
                    placeholder: "Alternative",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Further forecast",
                    text: ""
                }
            },
            2: {
                sub_title: "Influencing factors",
                rate: 1,
                option: {
                    placeholder: "Alternative",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Further forecast",
                    text: ""
                }
            },
            3: {
                sub_title: "Measures",
                option: {
                    placeholder: "Alternative",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Further forecast",
                    text: ""
                }
            },
            4: {
                sub_title: "Influencing factors",
                rate: 1,
                option: {
                    placeholder: "Alternative",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Further forecast",
                    text: ""
                }
            },
            5: {
                sub_title: "Influencing factors",
                rate: 1,
                option: {
                    placeholder: "Alternative",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Further forecast",
                    text: ""
                }
            },
            6: {
                sub_title: "Influencing factors",
                rate: 1,
                option: {
                    placeholder: "Alternative",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Further forecast",
                    text: ""
                }
            },
            7: {
                sub_title: "Influencing factors",
                rate: 1,
                option: {
                    placeholder: "Alternative",
                    selected: "",
                    values: []
                },
                info: {
                    placeholder: "Further forecast",
                    text: ""
                }
            },
        }
    }
};

const DEFAULT_POLL_IDS = [
    ["info-text", "info_text"],
    ["info-text-2", "info_text_2"],

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

    ["section-2-sub-title-5", "details.4.sub_title"],
    ["section-2-select-5-option-0", "details.4.option.placeholder"],
    ["section-2-select-5-option-1", "details.4.option.selected"],
    ["section-2-text-5", "details.4.info.placeholder"],

    ["section-2-sub-title-6", "details.5.sub_title"],
    ["section-2-select-6-option-0", "details.5.option.placeholder"],
    ["section-2-select-6-option-1", "details.5.option.selected"],
    ["section-2-text-6", "details.5.info.placeholder"],

    ["section-2-sub-title-7", "details.6.sub_title"],
    ["section-2-select-7-option-0", "details.6.option.placeholder"],
    ["section-2-select-7-option-1", "details.6.option.selected"],
    ["section-2-text-7", "details.6.info.placeholder"],

    ["section-2-sub-title-8", "details.7.sub_title"],
    ["section-2-select-8-option-0", "details.7.option.placeholder"],
    ["section-2-select-8-option-1", "details.7.option.selected"],
    ["section-2-text-8", "details.7.info.placeholder"],
];

// Regular variables
var pollCount = 0;

var createdPoll = DEFAULT_POLL_STRUCTURE.poll;

var currentPoll                 = {};
var fetchedPoll                 = {};
var insertedCreatePollData      = {};
var insertedCreatePollStructure = {};

var modifiedIds         = [];
var fetchedPolls        = [];
var submittedPolls      = [];
var nonSubmittedPolls   = [];
var groupSubmittedPolls = [];

var createdPollData = [
    [createdPoll.info_text, "text"],
    [createdPoll.info_text_2, "text"],

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

    [createdPoll.details[4].sub_title],
    [createdPoll.details[4].option.placeholder, "text"],
    [createdPoll.details[4].option.placeholder, "placeholder"],
    [createdPoll.details[4].info.placeholder],

    [createdPoll.details[5].sub_title],
    [createdPoll.details[5].option.placeholder, "text"],
    [createdPoll.details[5].option.placeholder, "placeholder"],
    [createdPoll.details[5].info.placeholder],

    [createdPoll.details[6].sub_title],
    [createdPoll.details[6].option.placeholder, "text"],
    [createdPoll.details[6].option.placeholder, "placeholder"],
    [createdPoll.details[6].info.placeholder],

    [createdPoll.details[7].sub_title],
    [createdPoll.details[7].option.placeholder, "text"],
    [createdPoll.details[7].option.placeholder, "placeholder"],
    [createdPoll.details[7].info.placeholder],
];

var currentPollData = createdPollData;

