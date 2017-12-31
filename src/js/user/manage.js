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
function fetchUsers(token, callback) {
    // Data variable to return
    let data = null;

    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    params.keys     = ["token", "fetch"];
    params.values   = [token, true];

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
            fetchedUsersData = result["data"];

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
function changeUserType(currentToken, userId, usertype, value) {
    // Data variable to return
    let data = null;
     
    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    params.keys     = ["token", "status", "status_val", "user_id"];
    params.values   = [currentToken, usertype, value, userId];

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
function editUser(name, email, password, token) {
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
        // Sub parameters
        let subParams = {};

        subParams.keys     = ["first_name", "last_name", "email", "password"];
        subParams.values   = [names[0], names[1], email, password];

        // Adds the sub params to the main params
        params.keys     = ["token", "col_data"];
        params.values   = [token, JSON.stringify(subParams)];
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