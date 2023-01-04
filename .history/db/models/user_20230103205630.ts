import {
    Field,
    PrimaryKey,
    TigrisCollection,
    TigrisDataTypes,
  } from "@tigrisdata/core";
  
  @TigrisCollection("video")
  export class Video {
    @PrimaryKey(TigrisDataTypes.INT32, { order: 1, autoGenerate: true })
    id!: number;

    @Field()
    name!: string

    @Field()
    email!: string

    @Field()
    

  }