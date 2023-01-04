import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

@TigrisCollection("video")
export class VideoModel {
  @PrimaryKey(TigrisDataTypes.INT32, { order: 1, autoGenerate: true })
  id!: number;

  @Field()
  name!: string;

  @Field()
  cover!: string

  @Field()
  video!: string;

  @Field()
  user!: string;
}
