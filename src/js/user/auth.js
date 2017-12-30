/****************************************************
*                                                   *
*                 AA-Polls - auth.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Attempts to authenticate the user and executes a final action
function loginUser(email = "", password = "", token = "", callback = null) {
    // Data variable to return
    let data;

    // Creates a new array for possible parameters
    let params = {};
    
    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    if (email != "" && password != "") {
        params.keys     = ["email", "password"];
        params.values   = [email, password];
    } else if (token != "") {
        params.keys     = ["token"];
        params.values   = [token];
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
            /* Assign a global variable to the "data" object,
             * given from the current, finished request output
             */
            currentUserData = result["data"];

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
    } else if (typeof result == "string") alert("Authentication failed");

    // Return fetched data
    return data;
}

// Token based authentication
function tokenAuthentication(token, callback) {
    /* Terminate authentication before 
     * hand if token is empty
     */
    if (token == "") return;

    // Returns user data
    return loginUser("", "", token, callback);
}

// Registers the given user, returns result data
function registerUser(email, pass) {
    // Gets the appropriate elements and it's values
    var email   = document.getElementById("login-email").value;
    var pass    = document.getElementById("login-pass").value;
}

// Sends a reset mail link to an existing user
function resetUser(email) {
    // Gets the appropriate elements and it's values
    var email = document.getElementById("login-email").value;
}

// Removes existing token and redirects user to login site
function logOut() {
    setToken("");

    redirectToPage("login");
}