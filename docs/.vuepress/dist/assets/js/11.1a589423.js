(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{379:function(t,s,a){"use strict";a.r(s);var e=a(41),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"adding-a-tool"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-a-tool"}},[t._v("#")]),t._v(" Adding A Tool")]),t._v(" "),a("p",[t._v("There are two different type of tools in Sphere Easel: those that create new geometric objects based on user mouse input and those that use existing geometric and measurement objects to control the location of an existing kind of object object (i.e. point, line segment, line, circle, or ellipse). The former tools are called New Object Tools and the later are called Control Tools")]),t._v(" "),a("h2",{attrs:{id:"adding-a-control-tool"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-a-control-tool"}},[t._v("#")]),t._v(" Adding a Control Tool")]),t._v(" "),a("p",[t._v("This section is an outline of the steps need to add a tool that takes a collection of objects (geometric and measurement) and produces the parameters to locate and size a non-custom existing "),a("span",{staticClass:"class"},[t._v("Nodule")]),t._v(" object (i.e. "),a("span",{staticClass:"class"},[t._v("Point")]),t._v(","),a("span",{staticClass:"class"},[t._v("Segment")]),t._v(","),a("span",{staticClass:"class"},[t._v("Line")]),t._v(", "),a("span",{staticClass:"class"},[t._v("Circle")]),t._v(", "),a("span",{staticClass:"class"},[t._v("Ellipse")]),t._v(") based on the selection collection of objects. This will involve creating a new "),a("span",{staticClass:"class"},[t._v("SENodule")]),t._v(" object and a new eventHandler to construct the "),a("span",{staticClass:"class"},[t._v("SENodule")]),t._v(" object and associated it to an exist "),a("span",{staticClass:"class"},[t._v("Nodule")]),t._v(" object. In all cases attempt to follow the naming conventions outlined by the other variables and files.")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("Create a new entry in the "),a("span",{staticClass:"variable"},[t._v("buttonList")]),t._v(" found in the "),a("span",{staticClass:"file"},[t._v("ToolGroups.vue")]),t._v(" file. Decide on")]),t._v(" "),a("ul",[a("li",[a("span",{staticClass:"variable"},[t._v("id")]),t._v(": This is a number that controls the order that the tools within this group are listed.")]),t._v(" "),a("li",[a("span",{staticClass:"variable"},[t._v("actionModeValue")]),t._v(": This is a unique string (the actionMode) that is used to activate the correct event handler when this button is pressed.")]),t._v(" "),a("li",[a("span",{staticClass:"variable"},[t._v("icon")]),t._v(": Create an icon or select a name from the "),a("a",{attrs:{href:"https://cdn.materialdesignicons.com/5.0.45/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Material Design Icons"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("li",[t._v("Use the language feature to set up the following messages. Each of the variables below is a string pointer to an object in a file in the "),a("span",{staticClass:"directory"},[t._v("languages")]),t._v(" directory. English speakers will probably add to the "),a("span",{staticClass:"file"},[t._v("en.json")]),t._v(" file.\n"),a("ul",[a("li",[a("span",{staticClass:"variable"},[t._v("displayedName")]),t._v(" A short name for the tool displayed in footer.")]),t._v(" "),a("li",[a("span",{staticClass:"variable"},[t._v("toolTipMessage")]),t._v(" A short message to describe the tools use when the button is moused over.")]),t._v(" "),a("li",[a("span",{staticClass:"variable"},[t._v("toolUseMessage")]),t._v(" A longer message to describe more fully the use of the tool.")])])]),t._v(" "),a("li",[a("span",{staticClass:"variable"},[t._v("displayToolUseMessage")]),t._v(": A flag to control the display of the tool use message.")]),t._v(" "),a("li",[a("span",{staticClass:"variable"},[t._v("toolGroup")]),t._v(": This is the group that the tool will appear in. Picking an existing group is the easiest way to get the tool displayed. If a new tool group is created, this section of code in "),a("span",{staticClass:"variable"},[t._v("ToolGroups.vue")]),t._v(" will have to be duplicated:")])]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--\n   The XXXXXX Tool Group only shown if the user has permission to use a tool in this\n   group. Note the use of the translation $t(key_value).\n --\x3e")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("XXXXXXXToolGroup"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-show")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("nonEmptyGroup('XXXXXX')"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h3")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("body-1 font-weight-bold"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v('{{ $t("toolGroups.XXXXXXTools") }}'),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("v-btn-toggle")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-model")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("actionMode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@change")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("switchActionMode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("mr-2 d-flex flex-wrap accent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("ToolButton")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-for")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("(button, pos) in buttonList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":key")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("pos"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":button")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("button"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("toolGroup")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("XXXXXX"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("v-on:")]),t._v("displayOnlyThisToolUseMessage")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("displayOnlyThisToolUseMessageFunc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("ToolButton")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("v-btn-toggle")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])]),t._v(" "),a("li",[a("p",[t._v("Add the new tool name to the list of tools to be displayed in ???????. Add the "),a("span",{staticClass:"variable"},[t._v("actionMode")]),t._v(" string to the list.")])]),t._v(" "),a("li",[a("p",[t._v("Write a new "),a("span",{staticClass:"class"},[t._v("SENodule")]),t._v(" file. These files always start with the letters SE. See the "),a("RouterLink",{attrs:{to:"/design/#models-directory"}},[t._v("Models Directory")]),t._v(".")],1),t._v(" "),a("ul",[a("li",[a("p",[t._v("Copy the form of the "),a("span",{staticClass:"method"},[t._v("update(state: SaveStateType)")]),t._v(" method. In particular this should start with")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("canUpdateNow")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setOutOfDate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("Then it should update the existence and location of the object and should end with setting the display of the corresponding "),a("span",{staticClass:"class"},[t._v("Nodule")]),t._v(" object. (Make sure that you set the parameters to properly display the "),a("span",{staticClass:"class"},[t._v("Nodule")]),t._v(" object -- read the variables section of the object for directions.)\nThe last lines should be")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" SaveStateMode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UndoMove"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Store any information about the SENodule that is *not* determined by its point parents.  (Any")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// information that is not captured by the locations of the point parent(s) and will not correctly be")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// recreated on an update({}) method must be store here). A new XXXSaveState will have to be")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// created in @/types/index.ts")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" SaveStateMode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UndoDelete"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Store all information about this SENodule here")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The DisplayOnly case fall through and does nothing")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" SaveStateMode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DisplayOnly"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateKids")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("See more in the "),a("RouterLink",{attrs:{to:"/design/#move-handler"}},[t._v("Move Handler")]),t._v(" and "),a("RouterLink",{attrs:{to:"/design/#delete-handler"}},[t._v("Delete Handler")]),t._v(".")],1)])])]),t._v(" "),a("li",[a("p",[t._v("Write an "),a("RouterLink",{attrs:{to:"/design/#event-handlers"}},[t._v("event handler")]),t._v(". Start by thinking about which tool is most similar to the one being created. Start by creating a copy of that file and renaming it appropriately. Copy the structure to properly link the "),a("span",{staticClass:"class"},[t._v("Nodule")]),t._v(" and "),a("span",{staticClass:"class"},[t._v("SENodule")]),t._v(" objects. See the "),a("RouterLink",{attrs:{to:"/design/#plottables-directory"}},[t._v("Plottables Directory")]),t._v(".")],1),t._v(" "),a("ul",[a("li",[t._v("A new "),a("span",{staticClass:"command"},[t._v("Command")]),t._v(" object will have to written. Look and see which existing commands are most similar to the one being created. Copy that command. See the "),a("RouterLink",{attrs:{to:"/design/#commands"}},[t._v("Command")]),t._v(" section. This class is where all newly created objects are inserted (and removed on "),a("span",{staticClass:"method"},[t._v("restoreState()")]),t._v(") into the "),a("RouterLink",{attrs:{to:"/design/#data-structure"}},[t._v("Data Structure")]),t._v(". Think carefully about undoing. Adding a new kind of point requires that when you undo and then redo the add operation it remains the new kid of object.")],1),t._v(" "),a("li",[t._v("A new mutations of the store may be required. Look in the "),a("span",{staticClass:"file"},[t._v("mutations.ts")]),t._v(" in the "),a("RouterLink",{attrs:{to:"/design/#store"}},[t._v("Store")]),t._v(". Although the "),a("span",{staticClass:"string"},[t._v("RemovePoint")]),t._v(" mutation might work.")],1),t._v(" "),a("li",[t._v("Edge case questions to ask: What should the behavior be if...\n"),a("ul",[a("li",[t._v("The user mouse presses outside of the canvas, and mouse releases in the canvas (inside of the sphere or not)?")]),t._v(" "),a("li",[t._v("The user mouse presses inside the canvas, mouse moves outside of the sphere (with out a mouse leave event, so still in the canvas), and then mouse releases inside of the canvas (inside of the sphere or not)?")]),t._v(" "),a("li",[t._v("The user mouse presses inside the canvas, mouse moves outside of the sphere ("),a("em",[t._v("with")]),t._v(" a mouse leave event), and then mouse releases... inside of the canvas or not... inside of the sphere or not?")]),t._v(" "),a("li",[t._v("The user presses and release in the same location.")])])])])]),t._v(" "),a("li",[a("p",[t._v("Add the tool to the "),a("span",{staticClass:"file"},[t._v("SphereFrame.vue")]),t._v(" file.")]),t._v(" "),a("ul",[a("li",[t._v("Import the handler.")]),t._v(" "),a("li",[t._v("Add a private variable (like "),a("span",{staticClass:"variable"},[t._v("xxxxTool")]),t._v(" ) for the handler.")]),t._v(" "),a("li",[t._v("In the "),a("span",{staticClass:"method"},[t._v("mounted()")]),t._v(" method add the constructor call.")]),t._v(" "),a("li",[t._v("In the "),a("span",{staticClass:"method"},[t._v("switchActionMode(mode: string)")]),t._v(" add a new case using the "),a("span",{staticClass:"variable"},[t._v("actionMode")]),t._v(" string and tool reference")])])]),t._v(" "),a("li",[a("p",[t._v("Debug your tool. Play with it and make sure it behaves in many situations.")]),t._v(" "),a("ul",[a("li",[t._v("What is the behavior under all the edge condition list in step 4? How does undo and redo work in each of those edge cases?")])])]),t._v(" "),a("li",[a("p",[t._v("Add at least three new tests in the "),a("span",{staticClass:"file"},[t._v("???")]),t._v(" file in the "),a("span",{staticClass:"directory"},[t._v("test")]),t._v(" directory.")])]),t._v(" "),a("li",[a("p",[t._v("Update the documentation. Create a new description of the use of the tool in the")]),t._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/tools/edit.html"}},[t._v("Tools Documents")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/design/#event-handlers"}},[t._v("Event Handlers")])],1)])])]),t._v(" "),a("h2",{attrs:{id:"adding-a-new-object-tool"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-a-new-object-tool"}},[t._v("#")]),t._v(" Adding a New Object Tool")]),t._v(" "),a("p",[t._v("This section is an outline of the steps needed to add a tool that takes user mouse information and creates a new one-dimensional object based on the user information. This is a much more involved task and requires an intimate knowledge of how Sphere Easel work. This will involving creating both a new "),a("span",{staticClass:"class"},[t._v("SENodule")]),t._v(" object and a corresponding "),a("span",{staticClass:"class"},[t._v("Nodule")]),t._v(" object. It will involve modifying many of the existing class to take into account this new object.")])])}),[],!1,null,null,null);s.default=n.exports}}]);