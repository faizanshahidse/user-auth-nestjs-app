import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddUserDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;
}
