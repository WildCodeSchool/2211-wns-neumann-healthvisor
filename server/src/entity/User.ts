import { Field, ObjectType, InputType } from "type-graphql";
import { MaxLength, MinLength, IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { argon2id, hash, verify } from "argon2";

import Page from "./Page";
import History from "./History";

@ObjectType()
@Entity()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @IsEmail()
  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  premium: boolean;

  @Field({ defaultValue: 0 })
  @Column({
    nullable: false,
    default: 0
  })
  role: number;

  @Field(() => [Page], { nullable: true })
  @ManyToMany(() => Page, page => page.users)
  @JoinTable()
  pages?: Page[];

  @Field(() => [History], { nullable: true })
  @OneToMany(() => History, history => history.user)
  histories?: History[];

}

@InputType()
export class SignUpInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @MaxLength(255)
  @MinLength(8)
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @MaxLength(200)
  password: string;
}

const hashOptions = {
  type: argon2id,
  memoryCost: 2 ** 16
}

export const hashPassword = async (plain: string): Promise<string> => {
  return await hash(plain, hashOptions);
}

export const verifyPassword = async (hashedPassword: string, plain: string): Promise<boolean> => {

  return await verify(hashedPassword, plain, hashOptions);

}

export default User;
