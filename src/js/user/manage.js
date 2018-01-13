/****************************************************
*                                                   *
*               AA-Polls - manage.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Registers the given user, returns result data
function registerUser(name, email, password, callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1") return;

    // Data variable to return
    let data = null;
     
    // Creates a new array for possible parameters
    let params = {};

    // Names separated and stored in a constant array
    const names = name.split(" ").slice(0);

    // Terminate if names array is invalid
    if (names.length <= 1)
        if (typeof names[0] != "string" || typeof names[1] != "string")
            return data;

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    if (names[0] != "" && names[1] != "" && email != "" && password != "") {
        params.keys     = ["first_name", "last_name", "email", "password"];
        params.values   = [names[0], names[1], email, password];
    } else return data;

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(USER_API_URL, params, "POST");
    
    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
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

        // Assigns fetched data to data variable
        data = result;
    }

    // Returns final data
    return data;
}

// Attempts to fetch all users based on current user status
function fetchUsers(token, userId = "", callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1") return;

    // Data variable to return
    let data = null;

    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    params.keys     = ["token", "fetch"];
    params.values   = [token, true];

    // Add only if userId is not empty
    if (userId != "") {
        // Add key and value to params
        params.keys.push("user_id");
        params.values.push(userId);
    }

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(USER_API_URL, params);

    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
            // Stores fetched users locally
            fetchedUsers = result["data"];

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

        // Assigns fetched data to data variable
        data = result;
    }

    // Returns final data
    return data;
}

// Change user status to a given user type
function changeUserType(currentToken, userId, userType, value, callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1") return;

    // Data variable to return
    let data = null;
     
    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    params.keys     = ["token", "status", "status_val", "user_id"];
    params.values   = [currentToken, userType, value, userId];

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(USER_API_URL, params, "PUT");
    
    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
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

        // Assigns fetched data to data variable
        data = result;
    }

    // Returns final data
    return data;
}

// Edits user information
function editUser(name, email, token, callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1") return;

    // Data variable to return
    let data = null;
    
    // Creates a new array for possible parameters
    let params = {};

    // Names separated and stored in a constant array
    const names = name.split(" ").slice(0);

    // Terminate if names array is invalid
    if (names.length <= 1)
        if (typeof names[0] != "string" || typeof names[1] != "string")
            return data;

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    if (names[0] != "" && names[1] != "" && email != "") {
        // Sub parameters
        let subParams = JSON.stringify({
            "first_name": names[0],
            "last_name" : names[1],
            "email"     : email
        });

        // Adds the sub params to the main params
        params.keys     = ["token", "col_data"];
        params.values   = [token, subParams];
    } else return data;

    console.log(params);

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(USER_API_URL, params, "PUT");
    
    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
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

        // Assigns fetched data to data variable
        data = result;
    }

    // Returns final data
    return data;
}

// Resets user password
function resetUser(password, userToken, callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1") return;

    // Data variable to return
    let data = null;
    
    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    if (password != "") {
        // Sub parameters
        let subParams = JSON.stringify({ password: password });

        // Adds the sub params to the main params
        params.keys     = ["token", "col_data"];
        params.values   = [userToken, subParams];
    } else return data;

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(USER_API_URL, params, "PUT");
    
    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
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

        // Assigns fetched data to data variable
        data = result;
    }

    // Returns final data
    return data;
}

// Deletes given user
function deleteUser(token, callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1") return;

    // Data variable to return
    let data = null;
    
    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    params.keys     = ["token"];
    params.values   = [token];

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(USER_API_URL, params, "DELETE");

    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
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

        // Assigns fetched data to data variable
        data = result;
    }

    // Returns final data
    return data;
}

// Fetches users, formats data and appends them to users table 
function loadUsers(callback = null) {
    // Call a custom and passed callback function
    if (callback != null) {
        /* Creates a cloned callback function and passes
         * fetched data as parameter for external and quick access
         */
        const execCallback = (passedData) => callback(passedData);

        // Executes the cloned function
        execCallback();
    }

    // Fetches users and stores in a variable
    fetchUsers(currentUser.token);

    // Return nothing if users is null
    if (fetchedUsers == null) {
        // Make user aware of progress failure
        alert("Kunde inte hämta användare, försök igen.");

        // Exit function
        return;
    }
}

// Gets fetched users and creates a table out of the data
function loadUserTable(callback = null) {
    // Call a custom and passed callback function
    if (callback != null) {
        /* Creates a cloned callback function and passes
         * fetched data as parameter for external and quick access
         */
        const execCallback = (passedData) => callback(passedData);

        // Executes the cloned function
        execCallback();
    }

    // Declaration of user table data
    let userTableData = [];
    
    // Column titles for head
    const headTitles = ["Namn", "Email address", "Administratör", "Super användare"];

    // Loops through each user and adds specific keys and values
    for (let i = 0; i < fetchedUsers.length; i++) {
        // Constant variable and value for current user in iteration
        const user       = fetchedUsers[i];
        const userName   = `${user.first_name} ${user.last_name}`;

        // Values to append
        let valuesToAppend = [
            {
                values: {
                    value: userName,
                    type: "text",
                    onclick: (id, e) => showEditUser(fetchedUsers[i])
                }
            },
            {
                values: {
                    value: user.email,
                    type: "text",
                    onclick: (id, e) => showEditUser(fetchedUsers[i])
                }
            },
            {
                values: {
                    value: user.admin,
                    type: "checkbox",
                    onclick: (id, e) => {
                        // Value variable declaration
                        let value = 0;

                        // Set value to one if checked
                        if (getElement(id).checked) value = 1;

                        // Change user type and value
                        changeUserType(currentUser.token, user.id, "Admin", value);
                    }
                }
            },
            {
                values: {
                    value: user.super_user,
                    type: "checkbox",
                    onclick: (id, e) => {
                        // Value variable declaration
                        let value = 0;
                        
                        // Set value to one if checked
                        if (getElement(id).checked) value = 1;

                        // Change user type and value
                        changeUserType(currentUser.token, user.id, "SuperUser", value);
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

    // Adds current table data to global variable
    formattedTableUsers = userTableData;
}

// Refreshes and re-renders the user table
function refreshUserTable(tableId) {
    // Re-renders table after successful data fetch
    loadUsers(function() {
        // Resets table
        removeChildren(tableId);
        
        // Resets counters for table (critical)
        resetTableCounters();
    });

    // Formats formattedUsersTable correctly
    loadUserTable();

    // Format users accordingly
    insertTableData(tableId, formattedTableUsers);
}