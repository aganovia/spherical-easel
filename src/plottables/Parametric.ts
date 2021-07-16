/** @format */

import { Vector3, Vector2, Matrix4 } from "three";
import Two from "two.js";
import SETTINGS, { LAYER } from "@/global-settings";
import Nodule, { DisplayStyle } from "./Nodule";
import { StyleOptions, StyleEditPanels } from "@/types/Styles";
import AppStore from "@/store";
import { SENodule } from "@/models/SENodule";
import { namespace } from "vuex-class";
import {
  AppState,
  UpdateMode,
  CoordExpression,
  MinMaxExpression,
  MinMaxNumber
} from "@/types";
import { SEExpression } from "@/models/SEExpression";
import { SEStore } from "@/store";
import { ExpressionParser } from "@/expression/ExpressionParser";

// const desiredXAxis = new Vector3();
// const desiredYAxis = new Vector3();
// const desiredZAxis = new Vector3();
// // const Z_AXIS = new Vector3(0, 0, 1);
const transformMatrix = new Matrix4(); // maps from the un-rotated sphere to the rotated one
const SUBDIVISIONS = SETTINGS.parametric.numPoints;

/**
 * For drawing surface Parametric. A Parametric consists of two paths (front and back)
 * for a total of 2N subdivisions.
 * We initially assign the same number of segments/subdivisions to each path,
 * but as the Parametric is being deformed the number of subdivisions on each path
 * may change: longer path will hold more subdivision points (while keeping the
 * total points 2N so we don't create/remove new points)
 */
export default class Parametric extends Nodule {
  /**
   * These are string expressions that once set define the Parametric curve
   */
  private _coordinateExpressions: CoordExpression = { x: "", y: "", z: "" };

  private _primeCoordinateExpressions: CoordExpression = {
    x: "",
    y: "",
    z: ""
  };

  private _tExpressions: MinMaxExpression = { min: "", max: "" };

  private _tNumbers: MinMaxNumber = { min: NaN, max: NaN };

  /**
   * The expressions that are the parents of this curve
   */
  private _seParentExpressions: SEExpression[] = [];

  /**
   * A parser to convert from the expression to a formula/number
   */
  private parser = new ExpressionParser();

  /**
   * The vector P(t) for tMin <= t <= tMax P(t)= parameterization traces out the curve
   * And the vector P'(t) = parameterizationPrime of the curve.
   */
  private parameterization = new Vector3();
  private parameterizationPrime = new Vector3();
  private _closed: boolean; // true if P(tNumber.min)=P(tNumber.max)

  /**
   * The map which gets updated with the current value of the measurements
   */
  readonly varMap = new Map<string, number>();

  /**
   * The arcLength of the parametric curve from tNumber.min to tNumber.Max
   */
  private _initialArcLength: number;
  /**
   * The tMin & tMax starting *tracing* parameter of the curve.
   */
  public tMinMaxExpressionValues(): number[] | null {
    if (this._tExpressions.min === "" || this._tExpressions.max === "")
      return null;
    // first update the map with the current values of the measurements
    this._seParentExpressions.forEach((m: SEExpression) => {
      const measurementName = m.name;
      // console.debug("Measurement", m, measurementName);
      this.varMap.set(measurementName, m.value);
    });
    let tMin = this.parser.evaluateWithVars(
      this._tExpressions.min,
      this.varMap
    );
    let tMax = this.parser.evaluateWithVars(
      this._tExpressions.max,
      this.varMap
    );
    // restrict to the parameter interval of tNumber.min to tNumber.max
    if (tMin < this._tNumbers.min) tMin = this._tNumbers.min;
    if (tMax > this._tNumbers.max) tMax = this._tNumbers.max;

    return [tMin, tMax];
  }

  /**
   * The parameterization of the curve.
   * @param t the parameter
   * @returns vector containing the location
   */
  public P(t: number): Vector3 {
    // first update the map with the current value of
    this._seParentExpressions.forEach((m: SEExpression) => {
      const measurementName = m.name;
      // console.debug("Measurement", m, measurementName);
      this.varMap.set(measurementName, m.value);
    });
    //add the current t value
    this.varMap.set("t", t);

    return this.parameterization.set(
      this.parser.evaluateWithVars(this._coordinateExpressions.x, this.varMap),
      this.parser.evaluateWithVars(this._coordinateExpressions.y, this.varMap),
      this.parser.evaluateWithVars(this._coordinateExpressions.z, this.varMap)
    );
  }
  /**
   * The parameterization of the derivative of the curve
   * Note: This is *not* a unit parameterization
   * @param t the parameter
   */
  public PPrime(t: number): Vector3 {
    // first update the map with the current value of
    this._seParentExpressions.forEach((m: SEExpression) => {
      const measurementName = m.name;
      // console.debug("Measurement", m, measurementName);
      this.varMap.set(measurementName, m.value);
    });
    //add the current t value
    this.varMap.set("t", t);

    return this.parameterizationPrime.set(
      this.parser.evaluateWithVars(
        this._primeCoordinateExpressions.x,
        this.varMap
      ),
      this.parser.evaluateWithVars(
        this._primeCoordinateExpressions.y,
        this.varMap
      ),
      this.parser.evaluateWithVars(
        this._primeCoordinateExpressions.z,
        this.varMap
      )
    );
  }

  /**
   * Vuex global state
   */
  protected store = AppStore; //

  /**
   * The TwoJS objects to display the front/back parts and their glowing counterparts.
   */
  private frontParts: Two.Path[] = [];
  private backParts: Two.Path[] = [];
  private glowingFrontParts: Two.Path[] = [];
  private glowingBackParts: Two.Path[] = [];
  private _numberOfParts = 1; // we need at least one of each front and back to render the object

  private pool: Two.Anchor[] = []; //The pool of vertices
  private glowingPool: Two.Anchor[] = []; //The pool of vertices
  /**
   * The styling variables for the drawn curve. The user can modify these.
   */
  // Front
  private strokeColorFront = SETTINGS.parametric.drawn.strokeColor.front;
  private glowingStrokeColorFront =
    SETTINGS.parametric.glowing.strokeColor.front;
  private strokeWidthPercentFront = 100;
  private dashArrayFront = [] as number[]; // Initialize in constructor
  // Back -- use the default non-dynamic back style options so that when the user disables the dynamic back style these options are displayed
  private dynamicBackStyle = SETTINGS.parametric.dynamicBackStyle;
  private strokeColorBack = SETTINGS.parametric.drawn.strokeColor.back;
  private glowingStrokeColorBack = SETTINGS.parametric.glowing.strokeColor.back;
  private strokeWidthPercentBack = 100;
  private dashArrayBack = [] as number[]; // Initialize in constructor

  /** Initialize the current line width that is adjust by the zoom level and the user widthPercent */
  static currentParametricStrokeWidthFront =
    SETTINGS.parametric.drawn.strokeWidth.front;
  static currentParametricStrokeWidthBack =
    SETTINGS.parametric.drawn.strokeWidth.back;
  static currentGlowingParametricStrokeWidthFront =
    SETTINGS.parametric.drawn.strokeWidth.front +
    SETTINGS.parametric.glowing.edgeWidth;
  static currentGlowingParametricStrokeWidthBack =
    SETTINGS.parametric.drawn.strokeWidth.back +
    SETTINGS.parametric.glowing.edgeWidth;

  /**
   * Update all the current stroke widths
   * @param factor The ratio of the current magnification factor over the old magnification factor
   */
  static updateCurrentStrokeWidthForZoom(factor: number): void {
    Parametric.currentParametricStrokeWidthFront *= factor;
    Parametric.currentParametricStrokeWidthBack *= factor;
    Parametric.currentGlowingParametricStrokeWidthFront *= factor;
    Parametric.currentGlowingParametricStrokeWidthBack *= factor;
  }

  /**
   * For temporary calculation with ThreeJS objects
   */
  private tmpVector = new Vector3();
  private tmpVector1 = new Vector3();
  private tmpMatrix = new Matrix4();

  constructor(
    coordinateExpressions: { x: string; y: string; z: string },
    primeCoordinateExpressions: { x: string; y: string; z: string },
    tExpressions: { min: string; max: string },
    tNumbers: { min: number; max: number },
    measurementParents: SEExpression[],
    closed: boolean
  ) {
    super();
    // Set the expressions for the curve, its derivative, and the tMin & tMax
    this._coordinateExpressions.x = coordinateExpressions.x;
    this._coordinateExpressions.y = coordinateExpressions.y;
    this._coordinateExpressions.z = coordinateExpressions.z;

    this._primeCoordinateExpressions.x = primeCoordinateExpressions.x;
    this._primeCoordinateExpressions.y = primeCoordinateExpressions.y;
    this._primeCoordinateExpressions.z = primeCoordinateExpressions.z;

    this._tExpressions.min = tExpressions.min;
    this._tExpressions.max = tExpressions.max;

    this._tNumbers.min = tNumbers.min;
    this._tNumbers.max = tNumbers.max;

    this._seParentExpressions.push(...measurementParents);

    this._closed = closed;

    // Determine an *ESTIMATE* of number of front/back parts need to render the curve, the curves can change length and shape depending on the
    // the value of the M1, M2, etc.  So overestimate the actual number
    //
    // Do this by sampling along the curve from tNumbers.min to tNumbers.max and then intersecting the curve with the plane through two points on the curve (and counting the intersections)

    // we know that is is not the case that tNumber.max <= tNumber.min because the ParametricForm.vue checked for this
    const tValues: number[] = [];
    for (
      let i = 0;
      i < SETTINGS.parameterization.numberOfTestTValues + 1;
      i++
    ) {
      tValues.push(
        this._tNumbers.min +
          (i / SETTINGS.parameterization.numberOfTestTValues) *
            (this._tNumbers.max - this._tNumbers.min)
      );
    }
    // First form the objective function, this is the function that we want to find the zeros.
    // We want to find the t values where the P(t) is perpendicular to tmpVector
    // because tmpVector will be a normal to the plane containing P(t1) and P(t2)
    // This means we want the dot product to be zero
    const d = (t: number): number => {
      return this.P(t).dot(this.tmpVector);
    };
    const dp = (t: number): number => {
      return this.PPrime(t).dot(this.tmpVector);
    };

    // console.log(
    //   "Intersect Parametric with many planes and count the intersections"
    // );
    tValues.forEach(t1 => {
      tValues.forEach(t2 => {
        // avoid duplicate searches so make t1 less than t2 and avoid tangent lines so make the difference large-ish
        if (t1 < t2 && Math.abs(t2 - t1) > 0.2) {
          // if the curves is closed do not search if t2=tMax, because this has been search already by tMin ( a t value that correspond to the same point).
          if (this.closed && t2 === this._tNumbers.max) {
            return;
          }
          // console.log("New Search", t1, t2);

          // Set the tmpVector to the normal of the plane thru P(t1) and P(t2)
          this.tmpVector1.copy(this.P(t1)); // Copy P(t1) to a new tmp vector because computing P(t2) will overwrite P(t1)
          this.tmpVector.crossVectors(this.tmpVector1, this.P(t2));

          if (this.tmpVector.isZero(SETTINGS.nearlyAntipodalIdeal)) return;

          let zeros: number[];
          if (this.closed) {
            // if the curve is closed then we don't want both tMin and tMax (which correspond to the same point) to be different zeros
            zeros = SENodule.findZerosParametrically(
              d.bind(this),
              this._tNumbers.min,
              this._tNumbers.max -
                (1 / SETTINGS.parameterization.subdivisions) *
                  (this._tNumbers.max - this._tNumbers.min),
              dp.bind(this)
            );
          } else {
            zeros = SENodule.findZerosParametrically(
              d.bind(this),
              this._tNumbers.min,
              this._tNumbers.max,
              dp.bind(this)
            );
          }
          // if (
          //   -1 ===
          //   zeros.findIndex(z => {
          //     if (
          //       Math.abs(z - t1) < SETTINGS.tolerance ||
          //       Math.abs(z - t2) < SETTINGS.tolerance
          //     ) {
          //       return true;
          //     } else {
          //       return false;
          //     }
          //   })
          // ) {
          //   console.log(
          //     "t1 or t2 doesn't appear on the list of zeros",
          //     zeros.length,
          //     zeros,
          //     t1,
          //     t2
          //   );
          // }

          // Search for zeros that are very close to or equal to the t1 and t2 values, and don't count them (we don't have to
          // remove them because we only care about the number of zeros)
          const duplicateZeroTValues: number[] = [];
          zeros.forEach((z, ind) => {
            if (Math.abs(z - t1) < SETTINGS.tolerance) {
              duplicateZeroTValues.push(ind);
            } else if (Math.abs(z - t2) < SETTINGS.tolerance) {
              duplicateZeroTValues.push(ind);
            }
          });
          // if (duplicateZeroTValues.length > 2) {
          //   console.log(zeros, t1, t2);
          // }
          // DuplicateZeroTValues counts t1 and t2, so add 2 back into the count
          // Divide by two because the parts alternate between front and back and this.numberOfParts is the number of front parts (which is equal to the number of back parts)
          if (
            Math.ceil((zeros.length - duplicateZeroTValues.length + 2) / 2) >
            this._numberOfParts
          ) {
            this._numberOfParts = Math.ceil(
              (zeros.length - duplicateZeroTValues.length + 2) / 2
            );
          }
        }
      });
    });
    console.log("number of parts", this._numberOfParts);

    // to set the number of vertices need to render the parametric curve use the density of SUBDIVISIONS per unit INITIAL arcLength and multiply by the arcLength
    this._initialArcLength = this.arcLength(
      this._tNumbers.min,
      this._tNumbers.max
    );
    // console.log("arcLength", this._initialArcLength);
    // As the Parametric is moved around the vertices are passed between the front and back parts, but it
    // is always true that sum of the number of all frontVertices and the sum of all the backVertices = 2*floor(SUBDIVISIONS*arcLength)+2
    const frontVertices: Two.Vector[] = [];
    for (
      let k = 0;
      k < Math.floor(SUBDIVISIONS * this._initialArcLength) + 1;
      k++
    ) {
      // Create Two.Vectors for the paths that will be cloned later
      frontVertices.push(new Two.Vector(0, 0));
    }
    this.frontParts[0] = new Two.Path(
      frontVertices,
      /*closed*/ false,
      /*curve*/ false
    );

    // now create, record ids, and set nofill (and strip of their anchors so that the number of anchors is correct) the other parts that may be needed
    for (let i = 0; i < this._numberOfParts; i++) {
      this.glowingFrontParts[i] = this.frontParts[0].clone();
      this.backParts[i] = this.frontParts[0].clone();
      this.glowingBackParts[i] = this.frontParts[0].clone();

      if (i > 0) {
        // clear the vectors from all the parts so that the total number (between front and back) of vectors is 2*SUBDIVISIONS
        this.frontParts[i] = this.frontParts[0].clone();
        this.frontParts[i].vertices.splice(0);
        this.glowingFrontParts[i].vertices.splice(0);
        this.backParts[i].vertices.splice(0);
        this.glowingBackParts[i].vertices.splice(0);
      }
      Nodule.idPlottableDescriptionMap.set(String(this.frontParts[i].id), {
        type: "parametric",
        side: "front",
        fill: false,
        part: ""
      });
      // #region updatePlottableMap
      Nodule.idPlottableDescriptionMap.set(String(this.backParts[i].id), {
        type: "parametric",
        side: "back",
        fill: false,
        part: ""
      });
      // #endregion updatePlottableMap

      // Set the styles that are always true
      // The front/back parts have no fill because that is handled by the front/back fill
      // The front/back fill have no stroke because that is handled by the front/back part
      this.frontParts[i].noFill();
      this.backParts[i].noFill();
      this.glowingFrontParts[i].noFill();
      this.glowingBackParts[i].noFill();

      //Turn off the glowing display initially but leave it on so that the temporary objects show up
      this.frontParts[i].visible = true;
      this.backParts[i].visible = true;
      this.glowingBackParts[i].visible = false;
      this.glowingFrontParts[i].visible = false;
    }

    if (SETTINGS.parametric.drawn.dashArray.front.length > 0) {
      SETTINGS.parametric.drawn.dashArray.front.forEach(v =>
        this.dashArrayFront.push(v)
      );
    }
    if (SETTINGS.parametric.drawn.dashArray.back.length > 0) {
      SETTINGS.parametric.drawn.dashArray.back.forEach(v =>
        this.dashArrayBack.push(v)
      );
    }
  }
  /**
   *
   * @param tMin starting t parameter
   * @param tMax ending t parameter
   * @returns acrLength of the curve from tMin to tMax
   */
  arcLength(tMin: number, tMax: number): number {
    let oldArcLength = 0;
    let newArcLength: number;
    let iteration = 1;
    do {
      newArcLength = 0;
      // replace with Simpson's rule? some adaptive algorithm? PPrime is possibly undefined at certain values
      for (
        let i = 0;
        i < SETTINGS.parameterization.subdivisions * iteration;
        i++
      ) {
        newArcLength =
          newArcLength +
          this.PPrime(
            tMin +
              ((i + 0.5) /
                (SETTINGS.parameterization.subdivisions * iteration)) *
                (tMax - tMin)
          ).length();
        // console.log(
        //   "PPrime",
        //   this.PPrime(
        //     tMin +
        //       (i / (SETTINGS.parameterization.subdivisions * iteration)) *
        //         (tMax - tMin)
        //   ).x,
        //   this.PPrime(
        //     tMin +
        //       (i / (SETTINGS.parameterization.subdivisions * iteration)) *
        //         (tMax - tMin)
        //   ).length()
        // );
      }
      newArcLength /=
        (SETTINGS.parameterization.subdivisions * iteration) / (tMax - tMin);

      if (
        Math.abs(oldArcLength - newArcLength) <
        SETTINGS.parameterization.maxChangeInArcLength
      ) {
        return newArcLength;
      } else {
        oldArcLength = newArcLength;
        iteration++;
        // console.log("arc length iteration", iteration, oldArcLength);
      }
    } while (
      iteration < SETTINGS.parameterization.maxNumberOfIterationArcLength
    );

    return newArcLength;
  }
  /**
   * The Parametric curve is given in on the unit sphere, which might have been rotated, so we always transform from the un-rotated
   * sphere to the rotated one and then project the points to 2D (assigning to front/back depending on the sign of the z coordinate)
   * This method updates the TwoJS objects (frontPart,  ...) for display
   */
  public updateDisplay(): void {
    // Create a matrix4 in the three.js package (called transformMatrix) that maps the unrotated parametric curve to
    // the one in the target desired (updated) position (i.e. the target parametric).

    // The target Parametric (on the sphere of radius SETTINGS.boundaryCircle.radius) is rotated version of the
    // original Parametric (which is on the un-rotated unit sphere)
    // so scale XYZ space
    // this will make the original Parametric (in un-rotated position on the sphere) finally coincide with the target Parametric
    transformMatrix.getInverse(SEStore.inverseTotalRotationMatrix);
    this.tmpMatrix.makeScale(
      SETTINGS.boundaryCircle.radius,
      SETTINGS.boundaryCircle.radius,
      SETTINGS.boundaryCircle.radius
    );
    transformMatrix.multiply(this.tmpMatrix);
    // console.log(transformMatrix);
    // transformMatrix now maps the un-rotated parametric to the target parametric

    // Recalculate the 3D coordinates of the Parametric and record the projection in the TwoJS paths

    // // Parts becomes closed when the other parts vanishes
    // this.frontPart.closed = backLen === 0;
    // this.backPart.closed = frontLen === 0;
    // this.glowingFrontPart.closed = backLen === 0;
    // this.glowingBackPart.closed = frontLen === 0;

    // Bring all the anchor points to a common pool
    // Each front/back  path will pull anchor points from
    // this pool as needed

    for (let i = 0; i < this._numberOfParts; i++) {
      this.pool.push(...this.frontParts[i].vertices.splice(0));
      this.pool.push(...this.backParts[i].vertices.splice(0));
    }

    for (let i = 0; i < this._numberOfParts; i++) {
      this.glowingPool.push(...this.glowingFrontParts[i].vertices.splice(0));
      this.glowingPool.push(...this.glowingBackParts[i].vertices.splice(0));
    }

    // find the tracing tMin and tMax
    const [tMin, tMax] = this.tMinMaxExpressionValues() ?? [
      this._tNumbers.min,
      this._tNumbers.max
    ];

    // if the tMin/tMax values are out of order plot nothing (the object doesn't exist)
    if (tMax <= tMin) return;

    const tempArcLength = Math.min(
      this.arcLength(tMin, tMax),
      this._initialArcLength
    ); // this is always less than this._initialArcLength

    let lastPositiveIndex = -1;
    let lastNegativeIndex = -1;

    let currentFrontPartIndex = 0;
    let currentBackPartIndex = 0;

    for (
      let index = 0;
      index < 2 * Math.floor(SUBDIVISIONS * tempArcLength) + 2;
      index++
    ) {
      // The t value
      const tVal =
        tMin +
        (index / (2 * Math.floor(SUBDIVISIONS * tempArcLength) + 1)) *
          (tMax - tMin);

      // P(tval) is the location on the unit sphere of the Parametric in un-rotated position
      this.tmpVector.copy(this.P(tVal));
      // Set tmpVector equal to location on the target Parametric in rotated position
      this.tmpVector.applyMatrix4(transformMatrix);

      // console.log(
      //   "tmp z",
      //   this.tmpVector.z,
      //   this.frontParts.length,
      //   this.backParts.length,
      //   lastPositiveIndex,
      //   currentFrontPartIndex
      // );
      // When the Z-coordinate is negative, the vertex belongs the
      // the back side of the sphere
      if (this.tmpVector.z < 0) {
        // Move to the next back part if necessary
        if (lastNegativeIndex !== index - 1) {
          currentBackPartIndex++;
          if (currentBackPartIndex >= this.backParts.length) {
            throw new Error(
              "Parametric update: Needs more back parts than were allocated in the constructor"
            );
          }
        }
        lastNegativeIndex = index;
        // console.log(
        //   "index, last neg index, currentBackPartIndex",
        //   index,
        //   lastNegativeIndex,
        //   currentBackPartIndex
        // );

        const vertex = this.pool.pop();
        if (vertex !== undefined) {
          vertex.x = this.tmpVector.x;
          vertex.y = this.tmpVector.y;
          this.backParts[currentBackPartIndex].vertices.push(vertex);
        }
        const glowingVertex = this.glowingPool.pop();
        if (glowingVertex !== undefined) {
          glowingVertex.x = this.tmpVector.x;
          glowingVertex.y = this.tmpVector.y;
          this.glowingBackParts[currentBackPartIndex].vertices.push(
            glowingVertex
          );
        }
      } else {
        // Move to the next front part if necessary
        if (lastPositiveIndex !== index - 1) {
          currentFrontPartIndex++;
          if (currentFrontPartIndex >= this.frontParts.length) {
            throw new Error(
              "Parametric Update: Needs more front parts than were allocated in the constructor"
            );
          }
        }
        lastPositiveIndex = index;
        // console.log(
        //   "index, last pos index, currentFrontPartIndex",
        //   index,
        //   lastPositiveIndex,
        //   currentFrontPartIndex
        // );
        const vertex = this.pool.pop();
        if (vertex !== undefined) {
          vertex.x = this.tmpVector.x;
          vertex.y = this.tmpVector.y;
          this.frontParts[currentFrontPartIndex].vertices.push(vertex);
        }
        const glowingVertex = this.glowingPool.pop();
        if (glowingVertex !== undefined) {
          glowingVertex.x = this.tmpVector.x;
          glowingVertex.y = this.tmpVector.y;
          this.glowingFrontParts[currentFrontPartIndex].vertices.push(
            glowingVertex
          );
        }
      }
    }
  }

  /**
   * Get the parameters for the curve
   */
  get closed(): boolean {
    return this._closed;
  }
  get coordinateExpressions(): CoordExpression {
    return this._coordinateExpressions;
  }
  get primeCoordinateExpressions(): CoordExpression {
    return this._primeCoordinateExpressions;
  }
  get tExpressions(): MinMaxExpression {
    return this._tExpressions;
  }
  get tNumbers(): MinMaxNumber {
    return this._tNumbers;
  }
  get seParentExpressions(): SEExpression[] {
    return this._seParentExpressions;
  }
  get numberOfParts(): number {
    return this._numberOfParts;
  }

  endPointVector(minMax: boolean): Vector3 | undefined {
    transformMatrix.getInverse(SEStore.inverseTotalRotationMatrix);
    this.tmpMatrix.makeScale(
      SETTINGS.boundaryCircle.radius,
      SETTINGS.boundaryCircle.radius,
      SETTINGS.boundaryCircle.radius
    );
    transformMatrix.multiply(this.tmpMatrix);

    // find the tracing tMin and tMax
    const [tMin, tMax] = this.tMinMaxExpressionValues() ?? [
      this._tNumbers.min,
      this._tNumbers.max
    ];

    // if the tMin/tMax values are out of order plot nothing (the object doesn't exist)
    if (tMax <= tMin) return undefined;

    let tVal: number;
    if (minMax) {
      tVal = tMin;
    } else {
      tVal = tMax;
    }
    // P(tval) is the location on the unit sphere of the Parametric in un-rotated position
    this.tmpVector.copy(this.P(tVal));
    // Set tmpVector equal to location on the target Parametric in rotated position
    return this.tmpVector.applyMatrix4(transformMatrix);
  }

  frontGlowingDisplay(): void {
    this.frontParts.forEach(part => (part.visible = true));
    this.glowingFrontParts.forEach(part => (part.visible = true));
  }
  backGlowingDisplay(): void {
    this.backParts.forEach(part => (part.visible = true));
    this.glowingBackParts.forEach(part => (part.visible = true));
  }
  glowingDisplay(): void {
    this.frontGlowingDisplay();
    this.backGlowingDisplay();
  }
  frontNormalDisplay(): void {
    this.frontParts.forEach(part => (part.visible = true));
    this.glowingFrontParts.forEach(part => (part.visible = false));
  }
  backNormalDisplay(): void {
    this.backParts.forEach(part => (part.visible = true));
    this.glowingBackParts.forEach(part => (part.visible = false));
  }
  normalDisplay(): void {
    this.frontNormalDisplay();
    this.backNormalDisplay();
  }

  setVisible(flag: boolean): void {
    if (!flag) {
      this.frontParts.forEach(part => (part.visible = false));
      this.backParts.forEach(part => (part.visible = false));

      this.glowingBackParts.forEach(part => (part.visible = false));
      this.glowingFrontParts.forEach(part => (part.visible = false));
    } else {
      this.normalDisplay();
    }
  }

  setSelectedColoring(flag: boolean): void {
    //set the new colors into the variables
    if (flag) {
      this.glowingStrokeColorFront = SETTINGS.style.selectedColor.front;
      this.glowingStrokeColorBack = SETTINGS.style.selectedColor.back;
    } else {
      this.glowingStrokeColorFront =
        SETTINGS.parametric.glowing.strokeColor.front;
      this.glowingStrokeColorBack =
        SETTINGS.parametric.glowing.strokeColor.back;
    }
    // apply the new color variables to the object
    this.stylize(DisplayStyle.ApplyCurrentVariables);
  }

  /**
   * Adds the front/back/glowing/not parts to the correct layers
   * @param layers
   */
  addToLayers(layers: Two.Group[]): void {
    // These must always be executed even if the front/back part is empty
    // Otherwise when they become non-empty they are not displayed

    this.frontParts.forEach(part => part.addTo(layers[LAYER.foreground]));
    this.glowingFrontParts.forEach(part =>
      part.addTo(layers[LAYER.foregroundGlowing])
    );

    this.backParts.forEach(part => part.addTo(layers[LAYER.background]));
    this.glowingBackParts.forEach(part =>
      part.addTo(layers[LAYER.backgroundGlowing])
    );
  }

  removeFromLayers(/*layers: Two.Group[]*/): void {
    this.frontParts.forEach(part => part.remove());

    this.glowingFrontParts.forEach(part => part.remove());
    this.backParts.forEach(part => part.remove());

    this.glowingBackParts.forEach(part => part.remove());
  }

  /**
   * Copies the style options set by the Style Panel into the style variables and then updates the
   * Two.js objects (with adjustSize and stylize(ApplyVariables))
   * @param options The style options
   */
  updateStyle(options: StyleOptions): void {
    console.debug("Circle Update style of Parametric using", options);
    if (options.panel === StyleEditPanels.Front) {
      // Set the front options
      if (options.strokeWidthPercent !== undefined) {
        this.strokeWidthPercentFront = options.strokeWidthPercent;
      }

      if (options.strokeColor !== undefined) {
        this.strokeColorFront = options.strokeColor;
      }
      if (options.dashArray !== undefined) {
        this.dashArrayFront.clear();
        for (let i = 0; i < options.dashArray.length; i++) {
          this.dashArrayFront.push(options.dashArray[i]);
        }
      }
    } else if (options.panel == StyleEditPanels.Back) {
      // Set the back options
      // options.dynamicBackStyle is boolean, so we need to explicitly check for undefined otherwise
      // when it is false, this doesn't execute and this.dynamicBackStyle is not set
      if (options.dynamicBackStyle !== undefined) {
        this.dynamicBackStyle = options.dynamicBackStyle;
      }
      // overwrite the back options only in the case the dynamic style is not enabled
      if (!this.dynamicBackStyle) {
        if (options.strokeWidthPercent !== undefined) {
          this.strokeWidthPercentBack = options.strokeWidthPercent;
        }
        if (options.strokeColor !== undefined) {
          this.strokeColorBack = options.strokeColor;
        }
        if (options.dashArray !== undefined) {
          // clear the dashArray
          this.dashArrayBack.clear();
          for (let i = 0; i < options.dashArray.length; i++) {
            this.dashArrayBack.push(options.dashArray[i]);
          }
        }
      }
    }
    // Now apply the style and size
    this.stylize(DisplayStyle.ApplyCurrentVariables);
    this.adjustSize();
  }

  /**
   * Return the current style state
   */
  currentStyleState(panel: StyleEditPanels): StyleOptions {
    switch (panel) {
      case StyleEditPanels.Front: {
        const dashArrayFront = [] as number[];
        if (this.dashArrayFront.length > 0) {
          this.dashArrayFront.forEach(v => dashArrayFront.push(v));
        }
        return {
          panel: panel,
          strokeWidthPercent: this.strokeWidthPercentFront,
          strokeColor: this.strokeColorFront,
          dashArray: dashArrayFront
        };
      }
      case StyleEditPanels.Back: {
        const dashArrayBack = [] as number[];
        if (this.dashArrayBack.length > 0) {
          this.dashArrayBack.forEach(v => dashArrayBack.push(v));
        }
        return {
          panel: panel,
          strokeWidthPercent: this.strokeWidthPercentBack,
          strokeColor: this.strokeColorBack,
          dashArray: dashArrayBack,
          dynamicBackStyle: this.dynamicBackStyle
        };
      }
      default:
      case StyleEditPanels.Label: {
        return {
          panel: panel
        };
      }
    }
  }
  /**
   * Return the default style state
   */
  defaultStyleState(panel: StyleEditPanels): StyleOptions {
    switch (panel) {
      case StyleEditPanels.Front: {
        const dashArrayFront = [] as number[];
        if (SETTINGS.parametric.drawn.dashArray.front.length > 0) {
          SETTINGS.parametric.drawn.dashArray.front.forEach(v =>
            dashArrayFront.push(v)
          );
        }
        return {
          panel: panel,
          strokeWidthPercent: 100,
          fillColor: SETTINGS.parametric.drawn.fillColor.front,
          strokeColor: SETTINGS.parametric.drawn.strokeColor.front,
          dashArray: dashArrayFront
        };
      }
      case StyleEditPanels.Back: {
        const dashArrayBack = [] as number[];

        if (SETTINGS.parametric.drawn.dashArray.back.length > 0) {
          SETTINGS.parametric.drawn.dashArray.back.forEach(v =>
            dashArrayBack.push(v)
          );
        }
        return {
          panel: panel,

          strokeWidthPercent: SETTINGS.parametric.dynamicBackStyle
            ? Nodule.contrastStrokeWidthPercent(100)
            : 100,

          strokeColor: SETTINGS.parametric.dynamicBackStyle
            ? Nodule.contrastStrokeColor(
                SETTINGS.parametric.drawn.strokeColor.front
              )
            : SETTINGS.parametric.drawn.strokeColor.back,

          fillColor: SETTINGS.parametric.dynamicBackStyle
            ? Nodule.contrastFillColor(
                SETTINGS.parametric.drawn.fillColor.front
              )
            : SETTINGS.parametric.drawn.fillColor.back,

          dashArray: dashArrayBack,

          dynamicBackStyle: SETTINGS.parametric.dynamicBackStyle
        };
      }
      default:
      case StyleEditPanels.Label: {
        return {
          panel: panel
        };
      }
    }
  }

  /**
   * Sets the variables for stroke width glowing/not
   */
  adjustSize(): void {
    this.frontParts.forEach(
      part =>
        (part.linewidth =
          (Parametric.currentParametricStrokeWidthFront *
            this.strokeWidthPercentFront) /
          100)
    );
    this.backParts.forEach(
      part =>
        (part.linewidth =
          (Parametric.currentParametricStrokeWidthBack *
            (this.dynamicBackStyle
              ? Nodule.contrastStrokeWidthPercent(this.strokeWidthPercentFront)
              : this.strokeWidthPercentBack)) /
          100)
    );
    this.glowingFrontParts.forEach(
      part =>
        (part.linewidth =
          (Parametric.currentGlowingParametricStrokeWidthFront *
            this.strokeWidthPercentFront) /
          100)
    );
    this.glowingBackParts.forEach(
      part =>
        (part.linewidth =
          (Parametric.currentGlowingParametricStrokeWidthBack *
            (this.dynamicBackStyle
              ? Nodule.contrastStrokeWidthPercent(this.strokeWidthPercentFront)
              : this.strokeWidthPercentBack)) /
          100)
    );
  }

  /**
   * Set the rendering style (flags: ApplyTemporaryVariables, ApplyCurrentVariables) of the Parametric
   *
   * ApplyTemporaryVariables means that
   *    1) The temporary variables from SETTINGS.point.temp are copied into the actual Two.js objects
   *    2) The pointScaleFactor is copied from the Point.pointScaleFactor (which accounts for the Zoom magnification) into the actual Two.js objects
   *
   * Apply CurrentVariables means that all current values of the private style variables are copied into the actual Two.js objects
   */
  stylize(flag: DisplayStyle): void {
    switch (flag) {
      case DisplayStyle.ApplyTemporaryVariables: {
        // Use the SETTINGS temporary options to directly modify the Two.js objects.

        // THIS SHOULD NEVER BE EXECUTED
        //FRONT
        if (SETTINGS.parametric.temp.strokeColor.front === "noStroke") {
          this.frontParts.forEach(part => part.noStroke());
        } else {
          this.frontParts.forEach(
            part => (part.stroke = SETTINGS.parametric.temp.strokeColor.front)
          );
        }
        // The Parametric width is set to the current Parametric width (which is updated for zoom magnification)
        this.frontParts.forEach(
          part =>
            (part.linewidth = Parametric.currentParametricStrokeWidthFront)
        );
        // Copy the front dash properties from the front default drawn dash properties
        if (SETTINGS.parametric.drawn.dashArray.front.length > 0) {
          this.frontParts.forEach(part => part.dashes.clear());
          SETTINGS.parametric.drawn.dashArray.front.forEach(v => {
            this.frontParts.forEach(part => part.dashes.push(v));
          });
        }
        //BACK
        if (SETTINGS.parametric.temp.strokeColor.back === "noStroke") {
          this.backParts.forEach(part => part.noStroke());
        } else {
          this.backParts.forEach(
            part => (part.stroke = SETTINGS.parametric.temp.strokeColor.back)
          );
        }
        // The Parametric width is set to the current Parametric width (which is updated for zoom magnification)
        this.backParts.forEach(
          part => (part.linewidth = Parametric.currentParametricStrokeWidthBack)
        );
        // Copy the front dash properties from the front default drawn dash properties
        if (SETTINGS.parametric.drawn.dashArray.back.length > 0) {
          this.backParts.forEach(part => part.dashes.clear());
          SETTINGS.parametric.drawn.dashArray.back.forEach(v => {
            this.backParts.forEach(part => part.dashes.push(v));
          });
        }

        // The temporary display is never highlighted
        this.glowingFrontParts.forEach(part => (part.visible = false));
        this.glowingBackParts.forEach(part => (part.visible = false));
        break;
      }

      case DisplayStyle.ApplyCurrentVariables: {
        // Use the current variables to directly modify the Two.js objects.

        // FRONT

        if (this.strokeColorFront === "noStroke") {
          this.frontParts.forEach(part => part.noStroke());
        } else {
          this.frontParts.forEach(
            part => (part.stroke = this.strokeColorFront)
          );
        }
        // strokeWidthPercent is applied by adjustSize()

        if (this.dashArrayFront.length > 0) {
          this.frontParts.forEach(part => part.dashes.clear());
          this.dashArrayFront.forEach(v => {
            this.frontParts.forEach(part => part.dashes.push(v));
          });
        } else {
          // the array length is zero and no dash array should be set
          this.frontParts.forEach(part => part.dashes.clear());
          this.frontParts.forEach(part => part.dashes.push(0));
        }
        // BACK
        if (this.dynamicBackStyle) {
          if (
            Nodule.contrastStrokeColor(this.strokeColorFront) === "noStroke"
          ) {
            this.backParts.forEach(part => part.noStroke());
          } else {
            this.backParts.forEach(
              part =>
                (part.stroke = Nodule.contrastStrokeColor(
                  this.strokeColorFront
                ))
            );
          }
        } else {
          if (this.strokeColorBack === "noStroke") {
            this.backParts.forEach(part => part.noStroke());
          } else {
            this.backParts.forEach(
              part => (part.stroke = this.strokeColorBack)
            );
          }
        }

        // strokeWidthPercent applied by adjustSizer()

        if (this.dashArrayBack.length > 0) {
          this.backParts.forEach(part => part.dashes.clear());
          this.dashArrayBack.forEach(v => {
            this.backParts.forEach(part => part.dashes.push(v));
          });
        } else {
          // the array length is zero and no dash array should be set
          this.backParts.forEach(part => part.dashes.clear());
          this.backParts.forEach(part => part.dashes.push(0));
        }

        // UPDATE the glowing object

        // Glowing Front
        // no fillColor for glowing ellipses
        this.glowingFrontParts.forEach(
          part => (part.stroke = this.glowingStrokeColorFront)
        );
        // strokeWidthPercent applied by adjustSize()

        // Copy the front dash properties to the glowing object
        if (this.dashArrayFront.length > 0) {
          this.glowingFrontParts.forEach(part => part.dashes.clear());
          this.dashArrayFront.forEach(v => {
            this.glowingFrontParts.forEach(part => part.dashes.push(v));
          });
        } else {
          // the array length is zero and no dash array should be set
          this.glowingFrontParts.forEach(part => part.dashes.clear());
          this.glowingFrontParts.forEach(part => part.dashes.push(0));
        }

        // Glowing Back
        // no fillColor for glowing ellipses
        this.glowingBackParts.forEach(
          part => (part.stroke = this.glowingStrokeColorBack)
        );
        // strokeWidthPercent applied by adjustSize()

        // Copy the back dash properties to the glowing object
        if (this.dashArrayBack.length > 0) {
          this.glowingBackParts.forEach(part => part.dashes.clear());
          this.dashArrayBack.forEach(v => {
            this.glowingBackParts.forEach(part => part.dashes.push(v));
          });
        } else {
          // the array length is zero and no dash array should be set
          this.glowingBackParts.forEach(part => part.dashes.clear());
          this.glowingBackParts.forEach(part => part.dashes.push(0));
        }
        break;
      }
    }
  }
}