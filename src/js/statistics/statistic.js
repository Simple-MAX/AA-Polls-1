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

// Display statistics on canvas chart
function showStatistics() {
    renderChart("chart-canvas");
}

// Inserts fetched groups to group picker
function insertFetchedGroups() {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Gets the group and chart type picker element
    let groupPicker     = getElement("group-picker");
    let chartTypePicker = getElement("chart-type-picker");

    // Terminate if group picker is null
    if (groupPicker == null || chartTypePicker == null) 
        return;

    // Removes all options in chart type picker
    removeChildren("chart-type-picker");

    // Loops through each group
    for (let i = 0; i < fetchedGroups.length; i++) {
        // Creates a new option element
        let option = createElement("option");
        
        // Sets option value to poll id
        option.innerHTML = option.value = fetchedGroups[i].id;

        // Appends option to user polls picker
        groupPicker.add(option);
    }

    // Adds on change listener to select element
    addListener("group-picker", () => selectGroup(), "change");

    // Loops through all chart types
    for (let i = 0; i < PollChartTypes.length; i++) {
        // Creates a new option element
        let option = createElement("option");

        // Used to shorten code
        let value = PollChartTypes[i].text;
        
        // Sets option value to poll id
        option.innerHTML = option.value = value;

        // Appends option to user polls picker
        chartTypePicker.add(option);
    }

    // Adds on change listener to select element
    addListener("chart-type-picker", () => selectChartType(), "change");
}

// Selects a specified group and tampers with values
function selectGroup() {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Gets the group picker element
    let groupPicker = getElement("group-picker");

    // Terminate if picker is null
    if (groupPicker == null) return;

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
                    if (element.value == fetchedGroups[i].id) {
                        // Sets group target with matched id
                        groupTarget = fetchedGroups[i];

                        // Terminates sub function
                        return;
                    }

                    // Proceed with last step if not found
                    if (i == fetchedGroups.length - 1) {
                        // Set exit to true if group id was not found
                        if (element.value != fetchedGroups[i].id)
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

    // Terminate if dates length is less than one
    if (pollDates.length < 1) return;

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

        startOption.value   = startOption.innerHTML;
        endOption.value     = endOption.innerHTML;

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

    // Date picker listener function
    let func = () => showStatistics();

    // Adds listeners to date pickers
    addListener("stat-start-date", func, "change");
    addListener("stat-end-date", func, "change");

    // Render date filter container if not visible
    getElement("date-filter").style.display = "block";

    // Re renders the actual chart
    showStatistics();
}

// Selects a chart type depending on option
function selectChartType() {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Gets the chart type picker element
    let chartTypePicker = getElement("chart-type-picker");

    // Terminate if picker is null
    if (chartTypePicker == null) return;

    console.log(chartType);
}