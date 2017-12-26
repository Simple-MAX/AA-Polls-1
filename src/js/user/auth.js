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

// Attempts to authenticate the user and executes a final action
function loginUser(email = "", password = "", token = "", callback) {
    /* Creates a string and executes the createUrlParams function
     * and returns a string output which is valid for URL requests.
     * This passes some desired key names and values in separate arrays
     */
    var urlParams = "";
    
    if (email != "" && password != "") {
        // Gets the appropriate elements and it's values
        const credentials = [
            document.getElementById(email).value,
            document.getElementById(password).value
        ];

        // Parses parameters for url correctly
        urlParams = createUrlParams(["email", "password"], credentials);
    } else if (token != "") {
        // Set token as url parameter
        urlParams = createUrlParams(["token"], [token]);
    }

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    var result = execAjaxRequest(`${API_URL}${endpoint.user}${urlParams}`);

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
            let userData = result["data"];

            // If current token is not stored, replace the existing one
            if (getToken() != userData["token"])
                setToken(userData["token"]);

            // Redirect user to the main site or panel
            //callback();
        } else logOut();
    } else if (typeof result == "string") alert("Authentication failed");
}

// Token based authentication
function tokenAuthentication(token, callback) {
    loginUser("", "", token, callback);
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