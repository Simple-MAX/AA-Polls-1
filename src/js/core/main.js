/****************************************************
*                                                   *
*                 BluDay - main.js                  *
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

// Variables
var views;

var currentIndex    = 0;
var previousIndex   = 0;

const MAIN_VIEW_INDEX = 0;

const SCRIPT_PATHS = [
    "networking/backend.js",
    "user/auth.js"
];

const DEFERRED_SCRIPTS = [
    "networking/backend.js"
];

// Vanilla JS default onload function
window.onload = function()
{
    /*
    // Appends different views to an array
    views = [
        document.getElementById("login-view"),
        document.getElementById("register-view"),
        document.getElementById("reset-view"),
        document.getElementById("home-view")
    ];

    // Assigns the back button to an exisiting back button element
    backBtn = document.getElementById("back");

    // Sets everything
    initialize();
    */

    /* Loops through all scripts from an array
     * and initializes given script at given index
     * with a true or false stated deferred option
     */
    for (let i = 0; i < SCRIPT_PATHS.length; i++) {
        // Deferred boolean statement, default value is false
        let deferred = false;

        // Loops through constant deferred scripts
        for (let j = 0; j < DEFERRED_SCRIPTS; j++) {
            // Checks whether current script is deferred or not
            if (SCRIPT_PATHS[i] == DEFERRED_SCRIPTS[j]) {
                // Sets it to true
                deferred = true;
            }
        }

        // Adds the script to the page
        include(SCRIPT_PATHS[i], deferred);
    }
}

// Initiatlizes the main interval 
function initialize() {
    // Logs initial message
    console.log("Loaded!");

    // Shows the primary view with no animation
    showView(MAIN_VIEW_INDEX);
}

// Shows a view from a specified index, with optional animation and reset options
function showView(index, anim = false, reset = false) {
    /* If reset variable is false, it will assign the current index (prior to update)
     * to the previous index variable. Then it will assign current 
     * index to the given index value from the passed parameter.
     * If it's true, it will set the current index and previous index to
     * the constant variable "MAIN_VIEW_INDEX".
     */
    if (!reset) 
        previousIndex = currentIndex;
    else
        previousIndex = index; 

    // Assigns the final index to the given index
    var finalIndex = currentIndex = index;

    // If the index is out of bounds, set it to 0
    if (finalIndex > views.length) finalIndex = 0;

    // If the index is not the main index, display the back button
    if (finalIndex != MAIN_VIEW_INDEX && !reset)
        backBtn.style.display = "block";
    else
        backBtn.style.display = "none";

    /* Loops through the view elements and shows 
     * the specified view and hides all remaining views
     */
    for (let i = 0; i < views.length; i++) {
        /* If loop index is final index, show the element (i.e the view)
         * else hide the other and current view (which becomes previous)
         */
        if (i == finalIndex)
            views[i].style.display = "block";
        else
            views[i].style.display = "none";
    }
}

// Goes back to the previous index if navigated beyond once
function goBack() {
    // Goes back to the previous index and resets the current index
    showView(previousIndex, false, true);
}

/* Includes a specified script to the current webpage,
 * which can be accessed globally and locally
 */
function include(uri, deferred = true) {
    // Creates a new script element, with mandatory options
    let script = document.createElement("script");

    // Default options
    script.src      = uri;
    script.type     = "text/javascript";
    script.defer    = deferred;

    // Appends the newly created element to the head element
    document.getElementsByName("head").item(0).appendChild(script);
}

