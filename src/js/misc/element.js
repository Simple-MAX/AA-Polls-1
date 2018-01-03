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

// Constant variables
let AnchorButton = {
    Types: {
        Small: "small",
        Regular: "regular"
    },
    Text: "Button",
    IconText: "&times;"
}

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
function createElement(type, id = "", className = "") {
    // Create a new element with given type
    let element = document.createElement(type);

    // If id is not empty, assign it
    if (id != "") element.setAttribute("id", id);

    // If class is given, assign it to element
    if (className != "") element.className = className;

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

    // Terminate if element is non-existent
    if (parent == null) return;

    // Removes a child based on a specified index
    parent.removeChild(parent.childNodes[index]);
}

// Switches between CSS classes
function changeElementClass(id, className) {
    // Gets the specified element with id
    let element = getElement(id);

    // Terminate if element is non-existent
    if (element == null) return;

    // Attempts to change element class
    element.className = className;
}

// Creates and returns an anchor button
function createAnchorButton(data) {
    // Determines class name for button
    let className = "small-anchor-button";

    // Set default class name value
    if (data.type == "regular")
        className = "anchor-button";
    else
        className = "small-anchor-button";

    // Creates button element
    let button = createElement("a", data.id, className);

    // Set href attribute if key exists
    if (data.href != null && data.href != "")
        button.setAttribute("href", "#" + data.href);

    // Creates the button text
    let text = createElement("p", "", "text");

    // Set actual text to button
    text.innerHTML = data.text;

    // Set default button text if null
    if (data.text == null || data.text == "")
        text.innerHTML = "Button";

    // Append the text element
    button.appendChild(text);

    // Add icon text only if requested
    if (data.iconText != null && data.iconText != "") {
        // Creates a text icon element
        let iconText = createElement("p", "", "icon-text");

        // Assign actual icon text to element
        iconText.innerHTML = data.iconText;

        // Append the icon text element
        button.appendChild(iconText);
    }

    // Return the newly created element
    return button;
}
