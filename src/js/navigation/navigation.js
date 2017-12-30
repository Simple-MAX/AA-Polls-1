/****************************************************
*                                                   *
*              AA-Polls - navigation.js             *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

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
function goBack() { showView(previousIndex, false, true); }

// Redirects user to the main site or panel
function redirectToPage(page) { 
    // Constant url variable
    const currentUrl = document.location.href;

    // Removes hostname and folders from current url
    let fileName = currentUrl.split("/").slice(-1);

    // Replaces old filename with empty value
    let pagePath = currentUrl.replace(fileName, "");

    console.log(pagePath + page);

    // Redirects user to requested page
    document.location.href = `${pagePath}${page}.html`;
}

// Returns current page url
function getCurrentPage(fileName = false, removeFilePrefix = false) {
    // Gets current url
    let url = window.location.pathname;

    // Strip current url accordingly
    if (fileName) {
        // Removes hostname and folders from current url
        let page = url.substring(url.lastIndexOf("/") + 1);

        // Removes prefix from file if true
        if (removeFilePrefix)
            page = page.replace(".html", "");

        // Return modified result
        return page;
    }

    // Return full url if fileName and removePrefix is false
    return url; 
}
