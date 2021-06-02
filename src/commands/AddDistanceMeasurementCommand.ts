import { Command } from "./Command";
import { SENodule } from "@/models/SENodule";
import { AddMeasurementCommand } from "./AddMeasurementCommand";
import { SEPoint } from "@/models/SEPoint";
import {
  CoordinateSelection,
  SEPointCoordinate
} from "@/models/SEPointCoordinate";
import { SESegmentDistance } from "@/models/SESegmentDistance";

export class AddDistanceMeasurementCommand extends AddMeasurementCommand {
  // /**
  //  *
  //  * @param seMeasurement The measurement object being added
  //  * @param parent the point whose coordinate is being measured
  //  */
  // constructor(
  //   seMeasurement: SEMeasurement,
  //   parent: SEPoint[],
  //   selector: CoordinateSelection
  // ) {
  //   super(seMeasurement, parent);
  // }

  toOpcode(): null | string | Array<string> {
    return [
      "AddDistanceMeasurement",
      /* arg-1 */ this.seMeasurement.name,
      /* arg-2 */ this.parents.map((n: SENodule) => n.name).join("/")
    ].join("/");
  }

  static parse(command: string, objMap: Map<string, SENodule>): Command {
    const tokens = command.split("/");
    const point1 = objMap.get(tokens[2]) as SEPoint | undefined;
    const point2 = objMap.get(tokens[3]) as SEPoint | undefined;
    if (point1 && point2) {
      const distanceMeasure = new SESegmentDistance(point1, point2);
      return new AddDistanceMeasurementCommand(distanceMeasure, [
        point1,
        point2
      ]);
    } else
      throw new Error(
        `AddLocationMeasurement: end point ${tokens[2]} or ${tokens[3]} is undefined`
      );
  }
}
