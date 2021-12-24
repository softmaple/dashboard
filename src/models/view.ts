import { RepoType } from "@/types";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

interface View extends Base {}

class View extends TimeStamps {
  @prop({ enum: RepoType, required: true })
  name: RepoType;

  @prop({ type: () => String, default: new Date().toISOString() })
  timestamp: string;

  @prop({ type: () => Number, default: 0 })
  count: number;

  @prop({ type: () => Number, default: 0 })
  uniques: number;
}

export const ViewModel = getModelForClass(View);
