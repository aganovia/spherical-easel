import Two from "two.js";
import { Vector3 } from "three";
import { SEPoint } from "@/models/SEPoint";
import Point from "@/plottables/Point";
import { AddPointCommand } from "@/commands/AddPointCommand";
import { DisplayStyle } from "@/plottables/Nodule";
import Highlighter from "./Highlighter";
import { SEIntersectionPoint } from "@/models/SEIntersectionPoint";
import { ConvertInterPtToUserCreatedCommand } from "@/commands/ConvertInterPtToUserCreatedCommand";
import { SELine } from "@/models/SELine";
import { SESegment } from "@/models/SESegment";
import { SECircle } from "@/models/SECircle";
import { SENodule } from "@/models/SENodule";
import { IntersectionReturnType } from "@/types";
import store from "@/store";

export default class IntersectionPointHandler extends Highlighter {
  /**
   * The two objects to intersect
   */
  private oneDimensional1: SENodule | null = null;
  private oneDimensional2: SENodule | null = null;
  /**
   * An array to hold updated information about the intersection points so we can properly
   * convert the existing intersection points to isUserCreated = true
   */
  private updatedIntersectionInfo: IntersectionReturnType[] = [];

  /**
   * The prefix of the name so we can search for all intersection points for this prefix and return all
   * of the intersection points of the two one-dimensional objects
   */
  private intersectionPointNamePrefix = "";

  constructor(layers: Two.Group[]) {
    super(layers);
  }

  mousePressed(event: MouseEvent): void {
    // Only process events from the left (inner) mouse button to avoid adverse interactions with any pop-up menu
    if (event.button != 0) return;
    //Select the objects to intersect
    if (this.isOnSphere) {
      // Fill the first oneDimensional object
      if (this.oneDimensional1 == null) {
        if (this.hitSESegments.length > 0) {
          this.oneDimensional1 = this.hitSESegments[0];
          this.oneDimensional1.selected = true;
        } else if (this.hitSELines.length > 0) {
          this.oneDimensional1 = this.hitSELines[0];
          this.oneDimensional1.selected = true;
        } else if (this.hitSECircles.length > 0) {
          this.oneDimensional1 = this.hitSECircles[0];
          this.oneDimensional1.selected = true;
        }
      } else if (this.oneDimensional2 == null) {
        // Fill the second oneDimensional object
        if (this.hitSESegments.length > 0) {
          this.oneDimensional2 = this.hitSESegments[0];
          this.oneDimensional2.selected = true;
        } else if (this.hitSELines.length > 0) {
          this.oneDimensional2 = this.hitSELines[0];
          this.oneDimensional2.selected = true;
        } else if (this.hitSECircles.length > 0) {
          this.oneDimensional2 = this.hitSECircles[0];
          this.oneDimensional2.selected = true;
        }
      }

      // As soon as both oneDimensional objects are not null do the intersection
      if (this.oneDimensional1 != null && this.oneDimensional2 != null) {
        // Make sure the objects intersect on the screen and only convert those that are actual
        // intersection point showing on the default screen plane.
        // First we have to decide on the order to intersection them in so that the order information of the intersection
        // will be correct.
        //Make sure the SENodules are in the correct order: SELines, SESegments, then SECircles.
        //  That the argument pair to the store.getters.intersectTwoObjects() method is one of:
        //  (SELine,SELine), (SELine,SESegment), (SELine,SECircle), (SESegment, SESegment),
        //      (SESegment, SECircle), (SECircle, SECircle)
        //   If they have the same type put them in alphabetical order.
        if (this.oneDimensional1 instanceof SELine) {
          // Line line intersection
          if (this.oneDimensional2 instanceof SELine) {
            if (this.oneDimensional1.name < this.oneDimensional2.name) {
              store.getters
                .intersectTwoObjects(this.oneDimensional1, this.oneDimensional2)
                .forEach((element: IntersectionReturnType) =>
                  this.updatedIntersectionInfo.push(element)
                );
            } else {
              console.debug("here!");
              store.getters
                .intersectTwoObjects(this.oneDimensional2, this.oneDimensional1)
                .forEach((element: IntersectionReturnType) =>
                  this.updatedIntersectionInfo.push(element)
                );
            }
          }
          // Line segment intersection
          if (this.oneDimensional2 instanceof SESegment) {
            store.getters
              .intersectTwoObjects(this.oneDimensional1, this.oneDimensional2)
              .forEach((element: IntersectionReturnType) =>
                this.updatedIntersectionInfo.push(element)
              );
          }
          // Line circle intersection
          if (this.oneDimensional2 instanceof SECircle) {
            store.getters
              .intersectTwoObjects(this.oneDimensional1, this.oneDimensional2)
              .forEach((element: IntersectionReturnType) =>
                this.updatedIntersectionInfo.push(element)
              );
          }
        }

        if (this.oneDimensional1 instanceof SESegment) {
          // Segment line intersection
          if (this.oneDimensional2 instanceof SELine) {
            store.getters
              .intersectTwoObjects(this.oneDimensional2, this.oneDimensional1)
              .forEach((element: IntersectionReturnType) =>
                this.updatedIntersectionInfo.push(element)
              );
          }
          // Segment segment intersection
          if (this.oneDimensional2 instanceof SESegment) {
            if (this.oneDimensional1.name < this.oneDimensional2.name) {
              store.getters
                .intersectTwoObjects(this.oneDimensional1, this.oneDimensional2)
                .forEach((element: IntersectionReturnType) =>
                  this.updatedIntersectionInfo.push(element)
                );
            } else {
              store.getters
                .intersectTwoObjects(this.oneDimensional2, this.oneDimensional1)
                .forEach((element: IntersectionReturnType) =>
                  this.updatedIntersectionInfo.push(element)
                );
            }
          }
          // Segment circle intersection
          if (this.oneDimensional2 instanceof SECircle) {
            store.getters
              .intersectTwoObjects(this.oneDimensional1, this.oneDimensional2)
              .forEach((element: IntersectionReturnType) =>
                this.updatedIntersectionInfo.push(element)
              );
          }
        }

        if (this.oneDimensional1 instanceof SECircle) {
          // Circle line intersection
          if (this.oneDimensional2 instanceof SELine) {
            store.getters
              .intersectTwoObjects(this.oneDimensional2, this.oneDimensional1)
              .forEach((element: IntersectionReturnType) =>
                this.updatedIntersectionInfo.push(element)
              );
          }
          // Circle segment intersection
          if (this.oneDimensional2 instanceof SESegment) {
            store.getters
              .intersectTwoObjects(this.oneDimensional2, this.oneDimensional1)
              .forEach((element: IntersectionReturnType) =>
                this.updatedIntersectionInfo.push(element)
              );
          }
          // Circle circle intersection
          if (this.oneDimensional2 instanceof SECircle) {
            if (this.oneDimensional1.name < this.oneDimensional2.name) {
              store.getters
                .intersectTwoObjects(this.oneDimensional1, this.oneDimensional2)
                .forEach((element: IntersectionReturnType) =>
                  this.updatedIntersectionInfo.push(element)
                );
            } else {
              store.getters
                .intersectTwoObjects(this.oneDimensional2, this.oneDimensional1)
                .forEach((element: IntersectionReturnType) =>
                  this.updatedIntersectionInfo.push(element)
                );
            }
          }
        }

        // Find the intersection point(s) and convert them to created
        // Make sure parent names are in alpha order so we can find the already created intersection point
        // We don't know how many point of intersection there are so we are missing the ",<order num>)"
        // part of the name, so this is the name prefix

        if (this.oneDimensional1.name < this.oneDimensional2.name) {
          this.intersectionPointNamePrefix = `Intersection(${this.oneDimensional1.name},${this.oneDimensional2.name}`;
        } else {
          this.intersectionPointNamePrefix = `Intersection(${this.oneDimensional2.name},${this.oneDimensional1.name}`;
        }

        // Get all the SEIntersectionPoints that start with this prefix and convert them to user created points, but only if the point exists on the screen as an actual intersection point.
        this.store.getters
          .findIntersectionPointsStartingWith(this.intersectionPointNamePrefix)
          .forEach((element: SEIntersectionPoint, index: number) => {
            if (
              !element.isUserCreated &&
              this.updatedIntersectionInfo[index].exists
            ) {
              new ConvertInterPtToUserCreatedCommand(element).execute();
            }
          });
        // Reset the oneDimensional in preparation for another intersection.
        this.oneDimensional1.selected = false;
        this.oneDimensional1 = null;
        this.oneDimensional2.selected = false;
        this.oneDimensional2 = null;
        this.updatedIntersectionInfo.clear();
      }
    }
  }

  mouseMoved(event: MouseEvent): void {
    // Highlight all nearby objects and update location points
    super.mouseMoved(event);
  }

  // eslint-disable-next-line
  mouseReleased(event: MouseEvent): void {
    // Only process events from the left (inner) mouse button to avoid adverse interactions with any pop-up menu
    if (event.button != 0) return;
  }

  // eslint-disable-next-line
  mouseLeave(event: MouseEvent): void {
    super.mouseLeave(event);
    // Reset the oneDimensional in preparation for another intersection.
    if (this.oneDimensional1) {
      this.oneDimensional1.selected = false;
      this.oneDimensional1 = null;
    }
    if (this.oneDimensional2) {
      this.oneDimensional2.selected = false;
      this.oneDimensional2 = null;
    }
  }
  activate(): void {
    super.activate();
  }
  deactivate(): void {
    super.deactivate();
  }
}