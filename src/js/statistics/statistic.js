/****************************************************
*                                                   *
*              AA-Polls - statistic.js              *
*                                                   *
*         Date of development : January 2018        *
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
function getStatsMin(polls) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;
    
    // TODO
}

/* Fetches relevant and requested polls in
 * string format and parses it with JSON.parse(),
 * then loops through and fetches the highest value
 */
function getStatsMax(polls) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;
    
    // TODO
}

/* Fetches relevant and requested polls in
 * string format and parses it with JSON.parse(),
 * then loops through and fetches the "estimation_total" value
 */
function getStatsAverage(polls) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;
    
    // TODO
}

// Inserts fetched groups to group picker
function insertFetchedGroups() {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Gets the group picker element
    let groupPicker = getElement("group-picker");

    // Terminate if group picker is null
    if (groupPicker == null) return;

    // Loops through each group
    for (let i = 0; i < fetchedGroups.length; i++) {
        // Creates a new option element
        let option = createElement("option");
        
        // Sets option value to poll id
        option.innerHTML = fetchedGroups[i].id;

        // Appends option to user polls picker
        groupPicker.add(option);
    }

    // Creates on change function
    let func = () => selectGroup();

    // Adds on change listener to select element
    addListener("group-picker", func, "change");
}

// Selects a specified group and tampers with values
function selectGroup() {
    // Gets the group picker element
    let groupPicker = getElement("group-picker");

    // Clones group picker variable and converts it to an array
    let options = groupPicker.childNodes;

    // Exit boolean
    let exit = false;

    // Defines group target
    let groupTarget = null;

    // Loops through each element in user polls picker
    options.forEach(function(element) {
        // Checks only for elements with "option" as tag name
        if (element.tagName == "option".toUpperCase()) {
            // Checks whether element is selected or not
            if (element.selected != null && element.selected) {
                /* Loops through each group and checks
                 * whether the selected id exists
                 */
                for (let i = 0; i < fetchedGroups.length; i++) {
                    // Set exit to true if group id was not found
                    if (element.innerHTML == fetchedGroups[i].id) {
                        // Sets group target with matched id
                        groupTarget = fetchedGroups[i];

                        // Terminates sub function
                        return;
                    }

                    // Proceed with last step if not found
                    if (i == fetchedGroups.length - 1) {
                        // Set exit to true if group id was not found
                        if (element.innerHTML != fetchedGroups[i].id)
                            exit = true;
                    }
                }
            }
        }
    });

    // Skip rendering if exit is true
    if (exit || groupTarget == null) return;

    // Poll creation date array from start to end
    let pollDates = [];

    // Pushes all poll dates to pollDates array
    for (let i = 0; i < groupTarget.polls.length; i++)
        pollDates.push(groupTarget.polls[i].date);

    // Sorts all poll dates accordingly
    pollDates.sort(function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    });
    
    // Creates new selected group object
    selectedGroup = {
        group: groupTarget,
        polls: groupTarget.polls,
        submitted_polls: undefined,
        dates: pollDates,
    };

    // Removes all options from date pickers
    removeChildren("stat-start-date");
    removeChildren("stat-end-date");

    // Gets both date pickers
    let startDatePicker = getElement("stat-start-date");
    let endDatePicker   = getElement("stat-end-date");

    // Inserts all dates to both date pickers
    for (let i = 0; i < selectedGroup.dates.length; i++) {
        // Creates a new option element
        let startOption = createElement("option"),
            endOption   = createElement("option");
        
        // Sets option value to poll id
        startOption.innerHTML   = selectedGroup.dates[i];
        endOption.innerHTML     = selectedGroup.dates[i]; 

        /* Sets start option to selected if iteration is first
         * and sets end option to selected if iteration is last
         */
        if (i == selectedGroup.dates.length - 1)
            endOption.setAttribute("selected", "");
        else if (i == 0)
            startOption.setAttribute("selected", "");

        // Appends option to date pickers
        startDatePicker.add(startOption);
        endDatePicker.add(endOption);      
    }

    // Render date filter container if not visible
    getElement("date-filter").style.display = "block";

    // Re renders the actual chart
    renderChart("chart-canvas");
}