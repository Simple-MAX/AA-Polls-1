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
    let func = function() {
        // Clones group picker variable and converts it to an array
        let options = groupPicker.childNodes;

        // Exit boolean
        let exit = false;

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
                        if (element.innerHTML == fetchedGroups[i].id)
                            return;

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
        if (exit) return;

        // Re renders the actual chart
        renderStatistics("chart-canvas");
    }

    // Adds on change listener to select element
    addListener("group-picker", func, "change");
}