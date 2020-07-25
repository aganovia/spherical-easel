import { Command } from "./Command";
import { SELine } from "@/models/SELine";
import { Matrix4, Vector3 } from "three";
import { SESegment } from "@/models/SESegment";

export class MoveSegmentCommand extends Command {
  private seSegment: SESegment;
  private oldNormalVector = new Vector3();
  private newNormalVector = new Vector3();
  private oldArcLength: number;
  private newArcLength: number;

  constructor(
    seSegment: SESegment,
    oldNormalVector: Vector3,
    newNormalVector: Vector3,
    oldArcLength: number,
    newArcLength: number
  ) {
    super();
    this.seSegment = seSegment;
    this.oldNormalVector.copy(oldNormalVector);
    this.newNormalVector.copy(newNormalVector);
    this.oldArcLength = oldArcLength;
    this.newArcLength = newArcLength;
  }

  do(): void {
    Command.store.commit("changeSegmentNormalVectorArcLength", {
      segmentId: this.seSegment.id,
      normal: this.newNormalVector,
      arcLength: this.newArcLength
    });
  }

  saveState(): void {
    this.lastState = this.seSegment.id;
  }

  restoreState(): void {
    Command.store.commit("changeSegmentNormalVectorArcLength", {
      segmentId: this.lastState,
      normal: this.oldNormalVector,
      arcLength: this.oldArcLength
    });
  }
}