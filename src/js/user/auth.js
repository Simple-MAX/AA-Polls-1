/****************************************************
*                                                   *
*                 BluDay - user.js                  *
*                                                   *
*         Developed by : Bachir Bouchemla           *
*                                                   *
*      Date of development : Late October 2017      *
*                                                   *
*   Copyrights @ MicroAA Labs | BluDay | botprizm   *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

var url = "";

// Attempts to authenticate the user and executes a final action
function loginUser() {
    // Gets the appropriate elements and it's values
    const email   = document.getElementById("login-email").value;
    const pass    = document.getElementById("login-pass").value;

    /* Creates a string and executes the createUrlParams function
     * and returns a string output which is valid for URL requests.
     * This passes some desired key names and values in separate arrays
     */
    var urlParams = createUrlParams(["email", "password"], [email, pass]);

    // A constant url link with a type of string, to prevent updates
    url = `${apiUrl}${endpoint.user}${urlParams}`;

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    var result = execAjaxRequest(url);

    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful and successfully authenticated, else
        if (result["success"]) {
            /* Assign a global variable to the "data" object,
            * given from the current, finished request output
            */
            userData = result["data"];

            // Test sequence (not relevant)
            const value = "Welcome Mr." + userData["last_name"];

            document.getElementById("status-test").innerHTML = value;
        } else {
            // TODO
        }
    } else if (typeof result == "string") {
        // TODO
    }
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