(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{415:function(e,t,o){"use strict";o.r(t);var a=o(41),i=Object(a.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"style-panel"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#style-panel"}},[e._v("#")]),e._v(" Style Panel")]),e._v(" "),o("p",[e._v("The Style Panel is found on the right-hand side of the screen. The Style Panel is hidden initially and can be made visible by clicking on the Style Settings (TODO:AddIconImage) icon in the upper right corner of the Sphere Canvas.")]),e._v(" "),o("p",[e._v("The Style Panel allows the user to adjust the visual style and feel of objects displayed in the Sphere Canvas: stroke color and width, fill color, opacity, and labeling. The focus of the Style Panel is one or more selected object whose attributes the user would like to modify. The user can use the "),o("RouterLink",{attrs:{to:"/tools/edit.html#selection"}},[e._v("Selection Tool")]),e._v(" to select a single object or a collection of objects and then the Style Panel will will display the options for the object or objects. If a single object is in focus, then all options for that object are displayed. If multiple objects are selected then only the adjustable attributes common to all the objects are displayed. The adjustable attributes are spread over several tabs and the functionality of each is described below.")],1),e._v(" "),o("p",[e._v("The user can select a Transformation, Measurement, Calculation, or object by clicking on it in the Objects Tab.")]),e._v(" "),o("h2",{attrs:{id:"basic-tab"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#basic-tab"}},[e._v("#")]),e._v(" Basic Tab")]),e._v(" "),o("p",[e._v("This tab displays the adjustable features of the selected object(s) including the following:")]),e._v(" "),o("h3",{attrs:{id:"definition-text"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#definition-text"}},[e._v("#")]),e._v(" Definition Text")]),e._v(" "),o("p",[e._v("This is an automatically generated string that gives some information about the selected object. This is also the string that is displayed in the Object Tab to describe some of the features of the object. This will alway help determine the dependency structure by indicating the parents of the object (if any). The location of points that are free (i.e. have no parents) is listed in this string.")]),e._v(" "),o("p",[e._v("Here are several examples:")]),e._v(" "),o("ul",[o("li",[e._v("P1(0.214, -0.782, 0.585) - Point 1 is located at the given coordinates.")]),e._v(" "),o("li",[e._v("Intersection(C1,C2) - A point at the intersection circles 1 and 2. This is different than Intersection(C2,C1) because, generically, two intersections of the circles can be distinguished by the right-hand rule. If you place your right and at the center of the sphere with you fingers pointing in the direction of the center of the first listed circle and sweep your fingers in the direction of center of the second circle, your thumb will indicate which side of the plane containing the plane $P$ the intersection point occurs on. $P$ is the plane containing the center of the sphere and the centers of the two circles.")]),e._v(" "),o("li",[e._v("On(H1) - A point on hyperbola 1.")]),e._v(" "),o("li",[e._v("Circle(P2, P3) - A circle with center at point P2 containing point P3.")]),e._v(" "),o("li",[e._v("Parabola(P1, L2) - A parabola with center P1 and directrix line L2.")]),e._v(" "),o("li",[e._v("N-Sect(Ls2,3,2) - The 2nd point in the 3-Secting of line segment Ls2.")]),e._v(" "),o("li",[e._v("Reflection(Li1) - A Reflection over line Li1.")]),e._v(" "),o("li",[e._v("Text("),o("code",[e._v("<string>")]),e._v(") - The text displayed by the text object.")]),e._v(" "),o("li",[e._v("M2-Length(Li1) - The length of line segment Li1, with Measurement Token M2.")]),e._v(" "),o("li",[e._v("M3-SliderVal(S1) - The value of slider S1, with Measurement Token M3.")]),e._v(" "),o("li",[e._v("M4-CalcVal(Calc1) - The value of the calculation Calc1 with Measurement Token M4")]),e._v(" "),o("li",[e._v("AngleMarker(Li1, Li2) - Angle Marker between lines Li1 and Li2")])]),e._v(" "),o("h3",{attrs:{id:"name"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#name"}},[e._v("#")]),e._v(" Name")]),e._v(" "),o("p",[e._v("This is automatically generated when the object was created, but the user can change it. The name can contain "),o("a",{attrs:{href:"https://en.wikipedia.org/wiki/LaTeX",target:"_blank",rel:"noopener noreferrer"}},[e._v("$\\LaTeX$"),o("OutboundLink")],1),e._v(" strings and it doesn't have to be unique. These are typically short because of their use in the Definition Text displayed in the Objects Tab. Here are several automatically generated names that demonstrate the default naming conventions:")]),e._v(" "),o("ul",[o("li",[e._v("P - "),o("RouterLink",{attrs:{to:"/tools/basic.html#point"}},[e._v("Point")])],1),e._v(" "),o("li",[e._v("Li - "),o("RouterLink",{attrs:{to:"/tools/basic.html#line"}},[e._v("Line")])],1),e._v(" "),o("li",[e._v("Ls - "),o("RouterLink",{attrs:{to:"/tools/basic.html#line-segment"}},[e._v("Line Segment")])],1),e._v(" "),o("li",[e._v("C - "),o("RouterLink",{attrs:{to:"/tools/basic.html#circle"}},[e._v("Circle")])],1),e._v(" "),o("li",[e._v("E - "),o("RouterLink",{attrs:{to:"/tools/conic.html#ellipse"}},[e._v("Ellipse")])],1),e._v(" "),o("li",[e._v("H - "),o("RouterLink",{attrs:{to:"/tools/conic.html#parabola"}},[e._v("Hyperbola")])],1),e._v(" "),o("li",[e._v("Pa - "),o("RouterLink",{attrs:{to:"/tools/conic.html#hyperbola"}},[e._v("Parabola")])],1),e._v(" "),o("li",[e._v("Po - "),o("RouterLink",{attrs:{to:"/tools/basic.html#polygon-too-hard"}},[e._v("Polygon")])],1),e._v(" "),o("li",[e._v("Ca - "),o("RouterLink",{attrs:{to:"/tools/advanced.html#circular-arc"}},[e._v("Circular Arc")])],1),e._v(" "),o("li",[e._v("Pc - "),o("RouterLink",{attrs:{to:"/tools/advanced.html#parametric-curve-user-defined"}},[e._v("Parametric Curve")])],1),e._v(" "),o("li",[e._v("Rp - "),o("RouterLink",{attrs:{to:"/tools/transformation.html#create-reflection-over-point"}},[e._v("Reflection over a point")])],1),e._v(" "),o("li",[e._v("Rl - "),o("RouterLink",{attrs:{to:"/tools/transformation.html#create-reflection"}},[e._v("Reflection over a line")])],1),e._v(" "),o("li",[e._v("Ro - "),o("RouterLink",{attrs:{to:"/tools/transformation.html#create-measured-rotation"}},[e._v("Rotation")])],1),e._v(" "),o("li",[e._v("Tr - "),o("RouterLink",{attrs:{to:"/tools/transformation.html#create-translation"}},[e._v("Translation")])],1),e._v(" "),o("li",[e._v("In - "),o("RouterLink",{attrs:{to:"/tools/transformation.html#create-inversion"}},[e._v("Inversion")])],1),e._v(" "),o("li",[e._v("Calc - "),o("RouterLink",{attrs:{to:"/userguide/toolsobjectspanel.html#calculations"}},[e._v("Calculation")])],1),e._v(" "),o("li",[e._v("Sl - "),o("RouterLink",{attrs:{to:"/tools/measurement.html#slider"}},[e._v("Slider")])],1),e._v(" "),o("li",[e._v("Tx - "),o("RouterLink",{attrs:{to:"/tools/basic.html#text"}},[e._v("Text")])],1),e._v(" "),o("li",[e._v("Am - Angle Marker")])]),e._v(" "),o("p",[e._v("Maximum length is ?5? characters. TODO: Update? Is a limit even needed?")]),e._v(" "),o("h3",{attrs:{id:"caption"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#caption"}},[e._v("#")]),e._v(" Caption")]),e._v(" "),o("p",[e._v("This is a user generated string that helps the user describe the object more fully. For example, a point might have name P10 but the user might also want to display more information about the point and set the caption to the more informative string “The centroid”. This string can contain "),o("a",{attrs:{href:"https://en.wikipedia.org/wiki/LaTeX",target:"_blank",rel:"noopener noreferrer"}},[e._v("$\\LaTeX$"),o("OutboundLink")],1),e._v(" strings and carriage returns.")]),e._v(" "),o("p",[e._v("Maximum length is ?30? characters. TODO: Update? Is a limit even needed?")]),e._v(" "),o("h3",{attrs:{id:"label-styling-options"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#label-styling-options"}},[e._v("#")]),e._v(" Label Styling Options")]),e._v(" "),o("p",[e._v("This allows the user to select the attributes of how the text of the name and caption are rendered on the front and back of the sphere. The options are")]),e._v(" "),o("ul",[o("li",[e._v("Font Family")]),e._v(" "),o("li",[e._v("Font Size")]),e._v(" "),o("li",[e._v("Font Style")]),e._v(" "),o("li",[e._v("Display Angle")]),e._v(" "),o("li",[e._v("Decorations")]),e._v(" "),o("li",[e._v("Front Color")]),e._v(" "),o("li",[e._v("Back Color")]),e._v(" "),o("li",[e._v("Front Opacity")]),e._v(" "),o("li",[e._v("Back Opacity")])]),e._v(" "),o("p",[e._v('The front color is the color used when rendering the text on the front of the sphere. The back color option is both a check box (labelled "Auto") and a color picker. If the box is unchecked the selected color is used. If the box is checked the color is automatically computed based on a contrast constant and the front color (and the color picker value is ignored). To adjust the contrast use the '),o("RouterLink",{attrs:{to:"/userguide/titlebar.html#global-settings"}},[e._v("Global Settings")]),e._v(".")],1),e._v(" "),o("h3",{attrs:{id:"label-display-options"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#label-display-options"}},[e._v("#")]),e._v(" Label Display Options")]),e._v(" "),o("p",[e._v("This is a check box followed by a pull down menu so the user can select which attributes to display in the label location associated to the object. The options in the pull down menu are:")]),e._v(" "),o("ul",[o("li",[e._v("Name - Only the name is displayed")]),e._v(" "),o("li",[e._v("Caption - Only the caption is displayed")]),e._v(" "),o("li",[e._v("Name & Caption - Only the name and caption are displayed")])]),e._v(" "),o("p",[e._v("If the box is unchecked nothing is displayed at the label location, the label is hidden, and the options in the pull down menu are ignored. If the box is checked the pull down menu indicates what is displayed at the label location.")]),e._v(" "),o("h3",{attrs:{id:"show-object"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#show-object"}},[e._v("#")]),e._v(" Show Object")]),e._v(" "),o("p",[e._v("If this box is checked the object is shown.")]),e._v(" "),o("h3",{attrs:{id:"trace-options"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#trace-options"}},[e._v("#")]),e._v(" Trace Options")]),e._v(" "),o("p",[e._v("This is a check box that is unchecked by default. If this feature is activated, a temporary copy of the object is left behind as the object moves on the sphere (i.e. is moved with the "),o("RouterLink",{attrs:{to:"/tools/display.html#move"}},[e._v("Move Tool")]),e._v("). To clear the temporary copies deactivate the Move Tool by activating another tool. This is feature only applies to points, lines, and circles.")],1),e._v(" "),o("h3",{attrs:{id:"fix-object"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#fix-object"}},[e._v("#")]),e._v(" Fix Object")]),e._v(" "),o("p",[e._v("Checking this box will make any free objects fixed. That is, the move tool will not be able to move the object. Checking this box for already unmovable objects will have no effect on those objects. To learn more about free objects see the details of the "),o("RouterLink",{attrs:{to:"/tools/display.html#move"}},[e._v("Move Tool")]),e._v(".")],1),e._v(" "),o("h2",{attrs:{id:"front-style-tab"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#front-style-tab"}},[e._v("#")]),e._v(" Front Style Tab")]),e._v(" "),o("p",[e._v("This tab allows the user to adjust the style features of the selected object(s) that pertain to their rendering on the front of the sphere. They include pickers for the following attributes:")]),e._v(" "),o("ul",[o("li",[e._v("Fill Color And No Fill Options")]),e._v(" "),o("li",[e._v("Stroke Color And No Stroke Options")]),e._v(" "),o("li",[e._v("Stroke Width")]),e._v(" "),o("li",[e._v("Radius")]),e._v(" "),o("li",[e._v("Dashing Pattern")]),e._v(" "),o("li",[e._v("Overall Opacity")])]),e._v(" "),o("p",[e._v("Which options are displayed depends on the objects selected. For example, the Fill Color is only available for points, circles, conic, and polygons. Radius is only available for points and angle markers and Dashing pattern is only available for one-dimensional objects.")]),e._v(" "),o("h2",{attrs:{id:"back-style-tab"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#back-style-tab"}},[e._v("#")]),e._v(" Back Style Tab")]),e._v(" "),o("p",[e._v('This tab allows the user to adjust the style features of the selected object(s) that pertain to their rendering on the back of the sphere. At the top of this tab is a check box (labelled "Auto").\nIf the box is unchecked the selected styles are used to render the object on the back of the sphere. If the box is checked the styles are automatically computed based on a contrast constant and the front style (and the style choices are ignored). To adjust the contrast use the '),o("RouterLink",{attrs:{to:"/userguide/titlebar.html#global-settings"}},[e._v("Global Settings")]),e._v(".")],1),e._v(" "),o("p",[e._v("They include pickers for the following attributes:")]),e._v(" "),o("ul",[o("li",[e._v("Fill Color And No Fill Option")]),e._v(" "),o("li",[e._v("Stroke Color And No Stroke Options")]),e._v(" "),o("li",[e._v("Stroke Width")]),e._v(" "),o("li",[e._v("Radius")]),e._v(" "),o("li",[e._v("Dashing Pattern")]),e._v(" "),o("li",[e._v("Overall Opacity")])]),e._v(" "),o("p",[e._v("Which options are displayed depends on the objects selected. For example, the Fill Color is only available for points, circles, conic, and polygons. Radius is only available for points and angle markers and Dashing pattern is only available for one-dimensional objects.")]),e._v(" "),o("h2",{attrs:{id:"advanced-tab"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#advanced-tab"}},[e._v("#")]),e._v(" Advanced Tab")]),e._v(" "),o("p",[e._v("This tab allows the user to adjust some of the style features of the selected objects based on Measurement Token. For example:")]),e._v(" "),o("ul",[o("li",[e._v("The user can write a boolean valued expression the controls if the object is shown or not (overriding the "),o("RouterLink",{attrs:{to:"/userguide/stylepanel.html#show-object"}},[e._v("Show Object")]),e._v(" check box).")],1),e._v(" "),o("li",[e._v("The user can write a real valued expression that controls the Red, Blue, or Green component of the color of either the fill (in the case of points) or the stroke color (in the case of one-dimensional objects).")]),e._v(" "),o("li",[e._v("For "),o("RouterLink",{attrs:{to:"/tools/basic.html#line-segment"}},[e._v("Line Segments")]),e._v(" and "),o("RouterLink",{attrs:{to:"/tools/advanced.html#circular-arc"}},[e._v("Circular Arc")]),e._v(" the extension value is set here. The user can enter a fix number or a Measurement Token to control the length of the Line Segment or Circular Arc. Details can be found in the tool descriptions.")],1),e._v(" "),o("li",[e._v("For "),o("RouterLink",{attrs:{to:"/tools/advanced.html#parametric-curve-user-defined"}},[e._v("Parametric Curves")]),e._v(" this is the tab where the parametric description $P(t)$, lower bound ($t_l$), upper bound ($t_u$), and open/closed options are entered. Details can be found in the tool description.")],1),e._v(" "),o("li",[e._v("The user can edit a "),o("RouterLink",{attrs:{to:"/userguide/toolsobjectspanel.html#calculations"}},[e._v("Calculation")]),e._v(" in this tab.")],1),e._v(" "),o("li",[e._v("The user edit a "),o("RouterLink",{attrs:{to:"/tools/measurement.html#slider"}},[e._v("Slider")]),e._v(" in this tab. The user can adjust the lower and upper bounds of the slider, the step size, and if the slider should be animated.")],1)])])}),[],!1,null,null,null);t.default=i.exports}}]);