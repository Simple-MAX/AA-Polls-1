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
