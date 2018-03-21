/****************************************************
*                                                   *
*                AA-Polls - index.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Default vanilla JS onload function
window.onload = () => initialize();

// Initiatlizes the main function
function initialize() {
    // Closes all popup if present beforehand
    closeAllPopups();

    /* Gets the curernt page name and stores 
     * the value locally in a global variable
     */
    currentPage = getCurrentPage(true, true);

    // Sets up all listeners
    handleListeners(currentPage);

    // Determines whether user is welcome or not
    if (getToken() != "") quickAuth(handleCurrentUser);

    // Proceed if user is not undefined or non-existent
    if (currentUser != null) {
        if (currentUser.token != "") {
            // Generates or creates dynamic tabs
            if (currentPage != Pages.Login)
                loadTabs("tabs-container");


            // Determines what function to run on current page
            switch (currentPage) {
                case Pages.Users:
                    // Proceed if valid user type, else redirect
                    if (userStatus == UserType.SuperUser) {
                        // Loads all users
                        loadUsers();

                        // Loads user table with results
                        loadUserTable();

                        // Format users accordingly
                        insertTableData("user-table", formattedTableUsers);
                    } else redirectToPage(getInitialPage(userStatus));
                    break;
                case Pages.Groups:
                    // Proceed if valid user type, else redirect
                    if (userStatus == UserType.SuperUser || 
                        userStatus == UserType.Admin) {
                        // Loads all users
                        loadUsers();

                        // Fetches and appends groups
                        loadGroups();

                        // Fetches all polls
                        fetchPolls(currentUser.token);

                        // Inserts all and existing group data
                        insertGroupData("groups-container", fetchedGroups);
                    } else redirectToPage(getInitialPage(userStatus));
                    break;
                case Pages.CreatePoll:
                    // Proceed if valid user type, else redirect
                    if (userStatus == UserType.SuperUser || 
                        userStatus == UserType.Admin) {
                        // Fetches and appends groups
                        loadGroups();

                        // Fetches group information for newly created poll
                        loadCreatePollData();
                    } else redirectToPage(getInitialPage(userStatus));
                    break;
                case Pages.Poll:
                    // Remove submit button if user is admin or super user
                    if (userStatus == UserType.SuperUser || 
                        userStatus == UserType.Admin) {
                        // Removes submit button
                        removeElement("submit-poll");

                        // Fetches and appends groups
                        loadGroups();

                        // Attempts to fetch poll templates
                        fetchPolls(currentUser.token);
                    }

                    // Load finished and unfinished polls
                    loadUserPolls();

                    // Loads current and given poll data
                    loadPoll();
                    break;
                case Pages.Statistics:
                    // Proceed if valid user type, else redirect
                    if (userStatus == UserType.SuperUser ||
                        userStatus == UserType.Admin) {
                        // Loads all users
                        loadUsers();
                        
                        // Fetches and appends groups
                        loadGroups();

                        // Inserts all groups to a picker
                        insertFetchedGroups();
                    } else redirectToPage(getInitialPage(userStatus));
                    break;
                case Pages.Home:
                    // Proceed if valid user type, else redirect
                    if (userStatus == UserType.User) {
                        // Load finished and unfinished polls
                        loadUserPolls();

                        // Inserts all and existing user polls data
                        insertUserPollsData("non-submitted-polls", nonSubmittedPolls);
                        insertUserPollsData("submitted-polls", submittedPolls);
                    } else redirectToPage(getInitialPage(userStatus));
                    break;
            }
        }
    }
}

// Returns a boolean value based on the existance of substring
function stringContains(string, value) { return string.includes(value); }

// Gets first param value of url with given key
function getUrlParam(key) { 
    // Gets all user params
    let params = location.search.replace("?", "");

    // Removes all ampersands from parameters
    params = params.split("&");

    // Defines default value
    let value = null;

    // Loops through each parameter
    for (let i = 0; i < params.length; i++) {
        // Gets current parameter
        let parameter = params[i].split("=");

        // Checks if given key exists in parameter
        if (key === parameter[0]) {
            // Sets value to second element
            value = parameter[1];

            // Exits current loop
            break;
        }
    }

    // Returns final value
    return value;
}

// Shows edit user popup with user data
function showEditUser(data) {
    // Terminates if data is invalid
    if (data == null) return;

    // Passed user data declaration
    const currentUserName = `${data.first_name} ${data.last_name}`;

    // Assigns current user values to fields
    getElement("edit-name").value       = currentUserName;
    getElement("edit-email").value      = data.email;
    getElement("edit-token").value      = data.token;

    // Adds reset password popup listener
    addListener("reset-user-option-button", () => showResetUser(data));
    
    // Shows the popup box
    simulateElementClick("show-edit-user");
}

// Shows reset user password popup
function showResetUser(data) {
    // Terminates if data is invalid
    if (data == null) return;

    // Assigns current user values to fields
    getElement("reset-token").value = data.token;

    // Hide edit user box
    simulateElementClick("close-edit");
    
    // Shows the popup box
    simulateElementClick("show-reset-user");
}

// Shows the user poll picker popup
function showChooseUserPoll(data, groupId) {
    // Terminates if data is invalid
    if (data == null) return;

    // Fetches given user submitted polls
    fetchUserPolls(currentUser.token, data.id);

    // Terminate if group was not found
    if (submittedPolls == null || submittedPolls.length <= 0) {
        alert("Användaren har inga besvarade formulär");

        return;
    }

    // Sets invisible input element to user id
    getElement("show-user-polls-user-id").value = data.id;

    // Removes all user 
    removeChildren("user-polls-picker");

    // Gets the user polls picker element
    let userPollsPicker = getElement("user-polls-picker");

    // Terminate if picker is null
    if (userPollsPicker == null) return;

    // Used to check whether options has been added
    let added = false;

    // Adds new options
    for (let i = 0; i < submittedPolls.length; i++) {
        // Proceeds only if group id is valid
        if (groupId == submittedPolls[i].group_id) {
            // Creates a new option element
            let option = createElement("option");

            // Sets option value to poll id
            option.innerHTML = submittedPolls[i].id;

            // Set first element as selected value
            if (i == 0) option.setAttribute("selected", "");

            // Appends option to user polls picker
            userPollsPicker.add(option);

            // Set added to true if false
            if (!added) added = true;
        }
    }

    // Terminates if user picker options is non-existent
    if (!added) {
        alert("Användaren har inga besvarade formulär");

        return;
    } 

    // Shows the popup box
    simulateElementClick("show-user-polls");
}

// Closes all popup boxes and resets fields
function closeAllPopups() {
    // Close buttons
    let closeButtons = [
        "close-add",
        "close-edit",
        "close-reset",
        "close-add-group",
        "close-edit-group-users",
        "close-user-polls",
        "close-info"
    ];

    // Fields to be resetted
    let resetFields = [
        "add-name",
        "add-email",
        "add-pass",
        "add-pass-conf",
        "edit-name",
        "edit-email",
        "edit-token",
        "reset-token",
        "reset-pass",
        "add-group-title",
        "edit-users-group-id",
    ];

    // Loops through field ids and resets them
    for (let i = 0; i < resetFields.length; i++) {
        // Gets the element
        let element = getElement(resetFields[i]);

        // Proceed if element exists
        if (element != null && element.value != "") 
            element.value = "";
    }

    // Simulates a click on each button
    for (let j = 0; j < closeButtons.length; j++) {
        // Gets the element
        let element = getElement(closeButtons[j]);

        // Proceed if element exists
        if (element != null && element.value != "")
            simulateElementClick(closeButtons[j]);
    }
}

/* (Temporarily unavailable)

// Loads constant valued scripts with specific options
function loadScripts() {
    /* Loops through all scripts from an array
     * and initializes given script at given index
     * with a true or false stated deferred option
     * /
    for (let i = 0; i < SCRIPT_PATHS.length; i++) {
        // Deferred boolean statement, default value is false
        let deferred = false;

        // Only if "DEFERRED_SCRIPTS" is greater than zero.
        if (DEFERRED_SCRIPTS.length > 0) {
            // Loops through constant deferred scripts
            for (let j = 0; j < DEFERRED_SCRIPTS; j++) {
                // Checks whether current script is deferred or not
                if (SCRIPT_PATHS[i] == DEFERRED_SCRIPTS[j] && 
                    DEFERRED_SCRIPTS[j] != null)
                    deferred = true;
            }
        }

        // Adds the script to the page
        include(SCRIPT_PATHS[i], deferred);
    }
}

/* Includes a specified script to the current webpage,
 * which can be accessed globally and locally
 * /
function include(uri, deferred = false) {
    // Creates a new script element, with mandatory options
    let script = document.createElement("script");

    // Default options
    script.src      = uri;
    script.type     = "text/javascript";
    script.defer    = deferred;

    // Appends the newly created element to the head element
    document.head.appendChild(script);
}

*/