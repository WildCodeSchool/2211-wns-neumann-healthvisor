import { Field, ObjectType, InputType } from "type-graphql";
import { MaxLength, MinLength, IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  email: string;

  @Field()
  @Column({ length: 200 })
  password: string;

  @Field()
  @Column()
  premium: boolean;
}

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @MaxLength(200)
  @MinLength(1)
  password: string;

  @Field()
  premium: boolean;
}

export default User;
