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
    if (currentUserData != null) {
        if (currentUserData.token != "") {
            // Determines what function to run on current page
            switch (currentPage) {
                case Pages.Users:
                    // Loads user table with results
                    loadUserTable();
                    break;
            }
        }
    }
}

// Handles listeners for elements
function handleListeners(currentPage) {
    // Declares listener according to current page
    let currentListener;

    // Adds listener to elements for different pages
    switch (currentPage) {
        case Pages.Login:
            currentListener = Listeners.Pages.Login;
            break;
        case Pages.Users:
            currentListener = Listeners.Pages.Users;
            break;
    }

    // Adds listener and function to element
    for (let i = 0; i < currentListener.Elements.length; i++) {
        // Declare and assign current listener type
        let type = currentListener.Type[i];

        // Assign alternative value if not assigned
        if (type == null || type == undefined) type = "click";

        // Adds listener at last
        addListener(currentListener.Elements[i], currentListener.Functions[i], type);
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

// Handles the user by storing token and redirecting to the panel
function handleCurrentUser(result) {
    // Gets current page name
    const currentPage = getCurrentPage(true, true);

    // If data was successfully fetched from endpoint, else log out
    if (result != null) {
        if (result.success && result.data != null) {
            /* Determines what sequence to to choose and execute,
            * depending on url location and current page
            */
            if (currentPage == Pages.Login) {
                // Store current token with the newer one
                if (getToken() != currentUserData.token)
                    setToken(currentUserData.token)

                // If token is not null, redirect user
                redirectToPage(INITIAL_PANEL_PAGE);
            }
        } else logOut();
    } else logOut();
}

// Fetches users, formats data and appends them to users table 
function loadUserTable(callback = null) {
    // Fetches users and stores in a variable
    let users = fetchUsers(currentUserData.token);

    // Declaration of user table data
    let userTableData = [];

    // Column titles for head
    const headTitles = ["Namn", "Email address", "Administratör", "Super användare"];

    // Loops through each user and adds specific keys and values
    for (let i = 0; i < users.data.length; i++) {
        // Constant variable and value for current user in iteration
        const currentUser = users.data[i];

        // Values to append
        let valuesToAppend = [
            {
                values: {
                    value: `${currentUser.first_name} ${currentUser.last_name}`,
                    type: "text",
                    onclick: (id, obj) => editUserListener()
                }
            },
            {
                values: {
                    value: currentUser.email,
                    type: "text",
                    onclick: (id, obj) => editUserListener()
                }
            },
            {
                values: {
                    value: currentUser.admin,
                    type: "checkbox",
                    onclick: (id, obj) => {
                        value = 0;

                        if (getElement(id).checked) value = 1;

                        if (currentUserData.super_user == "1")
                            changeUserType(currentUserData.token, currentUser.id, "Admin", value);
                    }
                }
            },
            {
                values: {
                    value: currentUser.super_user,
                    type: "checkbox",
                    onclick: (id, obj) => {
                        value = 0;

                        if (getElement(id).checked) value = 1;

                        if (currentUserData.super_user == "1")
                            changeUserType(currentUserData.token, currentUser.id, "SuperUser", value);
                    }
                }
            },
        ];

        // Declaration of custom user data object
        const userDataObject = {
            head: i <= 0 ? headTitles : null,
            data: valuesToAppend
        };

        // Add final structure to table data array
        userTableData.push(userDataObject);
    }

    // Return nothing if users is null
    if (users == null) {
        // Make user aware of progress failure
        alert("Kunde inte hämta användare, försök igen.");

        // Exit function
        return;
    }

    // Call a custom and passed callback function
    if (callback != null) {
        /* Creates a cloned callback function and passes
         * fetched data as parameter for external and quick access
         */
        const execCallback = (passedData) => callback(passedData);

        // Executes the cloned function
        execCallback();
    }

    // Format users accordingly
    insertData("user-table", userTableData);
}

// Refreshes and re-renders the user table
function refreshUserTable() {
    // Re-renders table after successful data fetch
    loadUserTable(function() {
        // Resets table
        removeChildren("user-table");
        
        // Resets counters for table (critical)
        resetTableCounters();
    });
}

// Returns a boolean value based on the existance of substring
function stringContains(string, value) { return string.includes(value); }

// Shows a HTML based popup with optional field values
function showPopup(id, fields) {
    if (getElement(id) == null) return;
    
    // If fields data type is array, proceed
    if (typeof fields == "array") {

    }
}

// Adds user based on specific click
function addUserListener() {
    // Used to minimize and shortify this script
    let values = [ 
        getElementValue("add-name"),
        getElementValue("add-email"),
        getElementValue("add-pass"),
        getElementValue("add-pass-conf")
    ];

    // Terminate if password is not the same
    if (values[3] != values[2] || values[0] == "" || values[1] == "") {
        alert("Vänligen fyll i all fält korrekt");

        return;
    }
    
    // Adds login function to this function
    let result = registerUser(values[0], values[1], values[2]);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Re-render actual user table
            refreshUserTable();

            // Hide popup window
            getElement("close-add").click();
        } else alert("Kunde inte lägga till användare");
    } else alert("Vänligen se till att fälten är giltiga");
}

// Edits user based on specific click
function editUserListener() {


    // Shows the popup box
    simulateElementClick("show-edit-user");
}

// Adds login user listener to login button
function loginUserListener() {
    // Used to minimize and shortify this script
    let values = [ 
        getElementValue("email"),
        getElementValue("password") 
    ];
    
    // Adds login function to this function
    loginUser(values[0], values[1], "", (result) => handleCurrentUser(result));
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