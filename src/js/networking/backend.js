/****************************************************
*                                                   *
*               AA-Polls - backend.js               *
*                                                   *
*        Date of development : November 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

/*
{
  "poll_id": "AA-P-123456789",
  "poll": {
    "user_id": "123456789",
    "date": "2017-11-18T22:00:30",
    "general_rate": 0,
    "initial": {
      "group": "nAn",
      "estimation_total": 0,
      "min": 0,
      "max": 0
    },
    "details": {
      "prognosis": {
        "short": {
          option: "nAn",
          info: ""
        }, 
        "long": {
          option: "nAn",
          info: ""
        }
      },
      "influences": {
        rate: 0,
        option: "nAn",
        info: ""
      },
      "actions": {
        rate: 0,
        option: "nAn",
        info: ""
      }
    }
  }
}
*/

// Makes an HTTP request and returns some data from finished request
function request(url, data, method = "GET", async = false) {
    /* Creates a string and executes the createUrlParams function
     * and returns a string output which is valid for URL requests.
     * This passes some desired key names and values in separate arrays
     */
    let urlParams = data != null ? createUrlParams(data.keys, data.values) : "";
    
    /* Executes an AJAX request (Vanilla JS, not jQuery) with the given 
     * url and returns data, function contains optional arguments
     */
    return execAjaxRequest(url + urlParams, method, async);
}

// Creates parameters for a url with key and value arrays
function createUrlParams(keys, values) {
    /* First string needs a question mark after endpoint,
     * to differentiate between the endpoint and paramters
     * example: "http://domain.x/user" --> "?" <-- "param=1"
     */
    var params = "?";

    // Loops through all key array values
    for (let i = 0; i < keys.length; i++) {
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
        if (i != keys.length - 1) params += "&";
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