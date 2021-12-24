import { RepoType } from "@/types";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

interface Clone extends Base {}

class Clone extends TimeStamps {
  @prop({ enum: RepoType, required: true })
  name: RepoType;

  @prop({ type: () => String, default: new Date().toISOString() })
  timestamp: string;

  @prop({ type: () => Number, default: 0 })
  count: number;

  @prop({ type: () => Number, default: 0 })
  uniques: number;
}

export const CloneModel = getModelForClass(Clone);
