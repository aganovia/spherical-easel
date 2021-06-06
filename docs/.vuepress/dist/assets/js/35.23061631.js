(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{408:function(e,t,o){"use strict";o.r(t);var l=o(41),s=Object(l.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"edit-tools"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#edit-tools"}},[e._v("#")]),e._v(" Edit Tools")]),e._v(" "),o("p",[e._v("Each of these tools allows the user to edit an arrangement.")]),e._v(" "),o("p",[e._v("::: tool-title")]),e._v(" "),o("h2",{attrs:{id:"selection"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#selection"}},[e._v("#")]),e._v(" Selection")]),e._v(" "),o("p",[e._v(":::")]),e._v(" "),o("p",[e._v("::: tool-description")]),e._v(" "),o("p",[e._v("Select object(s) to change their visual style or to perform actions on them with other tools.")]),e._v(" "),o("p",[e._v("::: tool-details Selecting Objects:")]),e._v(" "),o("ul",[o("li",[e._v("All selected objects will glow (i.e. have a highlight color displayed in the background of the object) and slowly blink.")]),e._v(" "),o("li",[e._v("Not Implemented? To select multiple objects, mouse drag and create a rectangle. Anything (TODO: entirely? partially?) with in that region will be selected when the mouse is released.")]),e._v(" "),o("li",[e._v("To clear your selection, mouse press and release at a location with no objects nearby.")]),e._v(" "),o("li",[e._v("To add or subtract to your current selection, press and hold the "),o("kbd",[e._v("Alt/Option")]),e._v(" key when mouse pressing. A mouse press will add the objects to the current selection or, if the mouse press is on already selected objects, those objects will be removed from the current selection.")]),e._v(" "),o("li",[e._v("To single out one object when multiple objects are nearby, mouse over (with "),o("em",[e._v("no")]),e._v(" mouse press or release) that location (where there are at lease two objects nearby) and press and hold a number key "),o("kbd",[e._v("1-9")]),e._v(". Depending on the key, a single object will be highlighted. To add this objected to the selected list, mouse press and release without moving.")]),e._v(" "),o("li",[e._v("To select multiple objects with the key press action:\n"),o("ol",[o("li",[e._v("Mouse over a location near the first object and key press a number to highlight the desired object")]),e._v(" "),o("li",[e._v("Mouse press and release (without moving the mouse) - the first object should be selected")]),e._v(" "),o("li",[e._v("Mouse over a location near the second object and key press a number to highlight the desired object")]),e._v(" "),o("li",[e._v("Mouse press and release (without moving the mouse) - the first and second objects should be selected")])])]),e._v(" "),o("li",[e._v("To select all points, move the mouse into the sphere and press and hold the "),o("kbd",[e._v("p")]),e._v(" key. All points should be highlighted. To move them into the current selection, mouse press and release once. Similarly to select...\n"),o("ul",[o("li",[e._v("All circles use the "),o("kbd",[e._v("c")]),e._v(" key")]),e._v(" "),o("li",[e._v("All lines use the "),o("kbd",[e._v("l")]),e._v(" key")]),e._v(" "),o("li",[e._v("All segments use the "),o("kbd",[e._v("s")]),e._v(" key")]),e._v(" "),o("li",[e._v("All ellipses use the "),o("kbd",[e._v("e")]),e._v(" key")]),e._v(" "),o("li",[e._v("All labels use the "),o("kbd",[e._v("L")]),e._v(" key")])])])]),e._v(" "),o("p",[o("strong",[e._v("Changing Visual Style:")])]),e._v(" "),o("ul",[o("li",[e._v("If the Style Panel in open, the selected object or objects are in the focus of the Style Panel. When an object is in focus its style properties are displayed in the Style Panel and you can edit them. Note: if multiple objects are in focus, the common style properties are displayed and you can edit them all simultaneously.")])]),e._v(" "),o("p",[o("strong",[e._v("Perform Other Tool Actions")])]),e._v(" "),o("ul",[o("li",[e._v("If you select an object or objects and then activate another tool then the action of that tool is applied to the selected object(s) so long as the selected object(s) are appropriate for the tool. For example,\n"),o("ul",[o("li",[e._v("if you select multiple objects and then activate the Delete Tool, all selected objects will be deleted.")]),e._v(" "),o("li",[e._v("if you select two points and then activate the Circle Tool, then a circle will be created with the first selected point as the center and the second as a point on the circle determining the radius.")]),e._v(" "),o("li",[e._v("if you select three points and then activate the Circle Tool, then the points are ignored, unselected, and no new circle is created.")])])])]),e._v(" "),o("p",[e._v(":::")]),e._v(" "),o("p",[e._v("::: tool-title")]),e._v(" "),o("h2",{attrs:{id:"delete"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#delete"}},[e._v("#")]),e._v(" Delete")]),e._v(" "),o("p",[e._v(":::")]),e._v(" "),o("p",[e._v("::: tool-description")]),e._v(" "),o("p",[e._v("Delete selected objects.")]),e._v(" "),o("p",[e._v("::: tool-details")]),e._v(" "),o("ul",[o("li",[o("p",[e._v("Clicking at a location deletes all nearby objects.")])]),e._v(" "),o("li",[o("p",[e._v("When an object is deleted all objects that depend on this object (including its label) are also deleted.")])]),e._v(" "),o("li",[o("p",[e._v("If this tool is activated with any objects selected, the selected objects are deleted automatically.")]),e._v(" "),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),o("p",[e._v("If when clicking at a location more than one object is deleted and this is not the desired behavior, then Undo you first action, change to the "),o("RouterLink",{attrs:{to:"/tools/edit.html#selection"}},[e._v("Selection Tool")]),e._v(", and then select the object or objects to be hidden. Then activating this tool will delete the selected objects.")],1)])])]),e._v(" "),o("p",[e._v(":::")]),e._v(" "),o("p",[e._v("::: tool-title")]),e._v(" "),o("h2",{attrs:{id:"undo-redo"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#undo-redo"}},[e._v("#")]),e._v(" Undo/Redo")]),e._v(" "),o("p",[e._v(":::")]),e._v(" "),o("p",[e._v("::: tool-description")]),e._v(" "),o("p",[e._v("Undo or redo the last action.")]),e._v(" "),o("p",[e._v("::: tool-details")]),e._v(" "),o("ul",[o("li",[e._v("These tools undo or redo the last action.")]),e._v(" "),o("li",[e._v("Zooming and rotating are undoable, except in the case when rotating (including "),o("RouterLink",{attrs:{to:"/userguide/titlebar.html#global-settings"}},[e._v("momentum rotations")]),e._v("), panning, or mouse wheel zooming. In those cases only the view before and after are recorded and the intermediate views are not.")],1),e._v(" "),o("li",[e._v("If either of these tools is activated with any objects selected, the selected objects are unselected and ignored.")])]),e._v(" "),o("p",[e._v(":::")]),e._v(" "),o("p",[e._v("::: tool-title")]),e._v(" "),o("h2",{attrs:{id:"copy-visual-style"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#copy-visual-style"}},[e._v("#")]),e._v(" Copy Visual Style")]),e._v(" "),o("p",[e._v(":::")]),e._v(" "),o("p",[e._v("::: tool-description")]),e._v(" "),o("p",[e._v("Copy the style attributes of a template object to other objects.")]),e._v(" "),o("p",[e._v("::: tool-details")]),e._v(" "),o("ul",[o("li",[e._v("The first object selected becomes the template.")]),e._v(" "),o("li",[e._v("Clicking on subsequent objects will change the style\nof those objects to match the template object's style. TODO: Does this work across types? That is, can you copy the style of a point to the style of a circle? I think yes.")]),e._v(" "),o("li",[e._v("If this tool is activated with any objects selected, they are all unselected and ignored.")])]),e._v(" "),o("p",[e._v(":::")])])}),[],!1,null,null,null);t.default=s.exports}}]);