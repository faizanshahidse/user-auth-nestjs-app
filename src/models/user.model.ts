import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  userId?: number;

  @Field()
  name?: string;

  @Field()
  email?: string;

  @Field()
  password: string;
}
