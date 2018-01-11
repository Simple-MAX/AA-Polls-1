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

// Returns the default home page for current user
function getInitialPage(userType = UserType.User) {
    // Assigns default pages
    const pages = [
        ["SuperUser", Pages.Users],
        ["Admin", Pages.Groups],
        ["User", Pages.Home]
    ];

    // Loops through and checks looks for appropriate page
    for (let i = 0; i < pages.length; i++)
        if (userType == pages[i][0]) 
            return pages[i][1];

    // Return home page if not found
    return Pages.Home;
}
