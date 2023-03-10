import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

@TigrisCollection("user")
export class User{
  @PrimaryKey(TigrisDataTypes.INT32, { order: 1, autoGenerate: true })
  id!: number;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
