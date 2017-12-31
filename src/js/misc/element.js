/****************************************************
*                                                   *
*               AA-Polls - element.js               *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Locates and fetches a specified element
function getElement(id) { return document.getElementById(id); }

// Gets the type of a specific element
function getElementType(id) { return (typeof getElement(id)); }

// Gets the value of a specific element
function getElementValue(id) { return getElement(id).value; }

// Gets the first element with a given class name
function getElementByClass(className) {
    return (document.getElementsByClassName(className))[0];
} 

// Creates an element instance
function createElement(type, id = "") {
    // Create a new element with given type
    let element = document.createElement(type);

    // If id is not empty, assign it
    if (id != "") element.setAttribute("id", id);

    // Return newly created element
    return element;
}

// Simulates a mouse click on element
function simulateElementClick(id) { getElement(id).click(); }

// Removes all children from a specific parent
function removeChildren(parentId) {
    // Gets the parent element
    let parent = getElement(parentId);

    // Loops through and delets all existing children
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
}

// Removes child from a parent with a given index
function removeChild(parentId, index = 0) {
    // Gets the parent element
    let parent = getElement(parentId);

    // Removes a child based on a specified index
    parent.removeChild(parent.childNodes[index]);
}
