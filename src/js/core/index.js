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
window.onload = function() {
    // Initial function in primary sequence
    initialize();
}

// Initiatlizes the main function
function initialize() {
    // Closes all popup if present beforehand
    closeAllPopups();

    // Gets current page name
    const currentPage = getCurrentPage(true, true);

    // Gets stored token
    const token = getToken();

    // Sets up all listeners
    handleListeners(currentPage);

    // Determines whether user is welcome or not
    if (token != "")
        quickAuth((result) => handleCurrentUser(result));
    else if (token == "" && currentPage != Pages.Login)
        redirectToPage(Pages.Login);

    // Proceed if user is not undefined or non-existent
    if (currentUser != null) {
        if (currentUser.token != "") {
            // Determines what function to run on current page
            switch (currentPage) {
                case Pages.Users:
                    // Loads user table with results
                    loadUserTable();
                    break;
                case Pages.Groups:
                    // Fetches and appends groups
                    loadGroups();
                    break;
            }
        }
    }
}

// Token based authentication for quick access
function quickAuth(callback = null) {
    // Gets stored token
    const token = getToken();

    // Terminates if token is empty and returns false for failure
    if (token == "") {
        // Handles and redirects user to login screen
        handleCurrentUser(null);

        // Terminates
        return;
    }

    // Getscurrent page name
    const currentPage = getCurrentPage(true, true);

    // If current token exists, try to authenticate
    let result = tokenAuthentication(token);

    // Call a custom and passed callback function
    if (callback != null) {
        /* Creates a cloned callback function and passes
         * fetched data as parameter for external and quick access
         */
        const execCallback = (passedData) => callback(passedData);

        // Executes the cloned function
        execCallback(result);
    }
}

// Returns a boolean value based on the existance of substring
function stringContains(string, value) { return string.includes(value); }

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

// Closes all popup boxes and resets fields
function closeAllPopups() {
    // Close buttons
    let closeButtons = [
        "close-add",
        "close-edit",
        "close-reset",
        "close-add-group",
        "close-edit-group-users",
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
        "edit-users-group-id"
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