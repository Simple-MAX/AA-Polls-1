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

// Regular variables
var currentUserData;

// Attempts to authenticate the user and executes a final action
function loginUser(email = "", password = "", token = "", callback) {
    // Creates a new array for possible parameters
    let params = {  };
    
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
    let result = request(`${API_URL}${endpoint.user}`, params);

    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful and successfully authenticated, else
        if (result["success"] && result["data"] != null) {
            /* Assign a global variable to the "data" object,
             * given from the current, finished request output
             */
            currentUserData = result["data"];

            // If current token is not stored, replace the existing one
            if (getToken() != currentUserData["token"])
                setToken(userData["token"]);

            // Call a custom and passed callback function
            callback(userData["token"]);
        } else logOut();
    } else if (typeof result == "string") alert("Authentication failed");

    // Return fetched data
    return null;
}

// Token based authentication
function tokenAuthentication(token, callback) {
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

    redirectToPage("login.html");
}