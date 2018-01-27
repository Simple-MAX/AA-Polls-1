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

        // Set first element as selected value
        if (i == 0) option.setAttribute("selected", "");

        // Appends option to user polls picker
        groupPicker.add(option);
    }
}