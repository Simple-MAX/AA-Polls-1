/****************************************************
*                                                   *
*               BluDay - backend.js                 *
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
    var url = API_PATH + "user.php" + urlParams;

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

            /* Test sequence (not relevant)
            const value = "Welcome Mr." + userData["last_name"];

            document.getElementById("status").innerHTML = value;

            showView(3, false, true);
            */
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

// Creates parameters for a url with key and value arrays
function createUrlParams(keys, values) {
    /* First string needs a question mark after endpoint,
     * to differentiate between the endpoint and paramters
     * example: "http://domain.x/user" --> "?" <-- "param=1"
     */
    var params = "?";

    // Loops through all key array values
    for (let i = 0; i < key.length; i++) {
        /* Checks whether the specified index value in values array
         * is empty or not, if it is, assign it to "0" instead
         */
        let value = values[i] != "" ? values[i] : "0";

        // Same process for the key value
        let key = keys[i] != "" ? keys[i] : "nAn";

        // Adds the current key value, an equals character and the key value value.
        params += key + "=" + value;

        /* If the current index is not the last, add an ampersand for
         * mulitple parameters which might be given or not
         */
        if (i != key.length - 1) params += "&";
    }

    // Finally returns the result as a string
    return params;
}

/* AJAX function to execute either asynchronous or synchronous requests.
 * Some arguments are predefined and is considered optional.
 */
function execAjaxRequest(url, method = "GET", async = false) {
    /* Defines an empty object variable to store the request output in.
     * If failed occurs, this variable becomes a string variable with an error message
     */
    var data;

    // Creates a new XMLHttpRequest object or instance
    var request = new XMLHttpRequest();

    // Defines the state change function for the request instance
    request.onreadystatechange = function() {
        // If the request executed properly with an endpoint output, else
        if (request.readyState == 4 && request.status == 200)
            data = JSON.parse(request.responseText);
        else
            data = "Error: couldn't fetch data";
    }

    // Specifies the request method, domain url and async option (critical)
    request.open(method, url, async);

    // Executes the request at last
    request.send();

    // Returns the data
    return data;
}