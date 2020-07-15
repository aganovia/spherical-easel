import { SEPoint } from "./SEPoint";
import { SECircle } from "./SECircle";
import { SELine } from "./SELine";
import { SESegment } from "./SESegment";
import Point from "@/plottables/Point";
import { SENodule } from "./SENodule";
import { IntersectionReturnType } from "@/types";
import { DisplayStyle } from "@/plottables/Nodule";
import store from "@/store";
import { Vector3 } from "three";
import { SEOneDimensional } from "@/types";

export class SEPointOnOneDimensional extends SEPoint {
  /**
   * The One-Dimensional parents of this SEPointOnOneDimensional
   */
  private oneDimensionalParent: SEOneDimensional;

  /**
   * Create an intersection point between two one-dimensional objects
   * @param pt the TwoJS point associated with this intersection
   * @param oneDimensionalParent The parent
   */
  constructor(
    pt: Point,
    oneDimensionalParent: SEOneDimensional
    //    initialVector: Vector3
  ) {
    super(pt);
    this.ref = pt;
    this.oneDimensionalParent = oneDimensionalParent;
    // this._locationVector.copy(initialVector);
    this.name = `PointOn(${oneDimensionalParent.name})`;

    // Place registerChild calls AFTER the name is set
    // so debugging output shows name correctly
    oneDimensionalParent.registerChild(this);
  }

  /**
   * Set or get the location vector of the SEPointOnOneDim on the unit ideal sphere
   * If you over ride a setting your must also override the getter! (And Vice Versa)
   */
  set locationVector(pos: Vector3) {
    // Record the location on the unit ideal sphere of this SEPointOnOneDim
    this._locationVector
      .copy((this.oneDimensionalParent as SEOneDimensional).closestVector(pos))
      .normalize();
    // Set the position of the associated displayed plottable Point
    this.ref.positionVector = this._locationVector;
  }
  get locationVector(): Vector3 {
    return this._locationVector;
  }

  public update(): void {
    if (!this.canUpdateNow()) {
      return;
    }
    this.setOutOfDate(false);
    this._exists = this.oneDimensionalParent.exists;
    if (this._exists) {
      // Update the current location with the closest point on the parent to the old location
      this.locationVector = (this
        .oneDimensionalParent as SEOneDimensional).closestVector(
        this._locationVector
      );
    }
    // Update visibility
    if (this._showing) {
      this.ref.setVisible(true);
    } else {
      this.ref.setVisible(false);
    }
    this.updateKids();
  }
}