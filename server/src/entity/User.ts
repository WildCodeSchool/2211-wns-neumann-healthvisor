import { Field, ObjectType, InputType } from "type-graphql";
import { MaxLength, MinLength, IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { argon2id, hash, verify } from "argon2";
import Page from "./Page";

@ObjectType()
@Entity()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @IsEmail()
  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  premium: boolean;

  @Field({ defaultValue: 0})
  @Column({ 
    nullable: false,
    default: 0
  })
  role: number;

  @ManyToMany(() => Page, page => page.users)
  @JoinTable()
  pages: Page[];
}

@InputType()
export class FetchInput {
  @Field()
  @IsNotEmpty()
  id: number;
}

@InputType()
export class SigninInput {
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
  @MinLength(8)
  password: string;
}

const hashOptions =  {
  type: argon2id,
  memoryCost: 2 **16
}

export const hashPassword = async (plain: string): Promise<string> => {
  return await hash(plain, hashOptions);
}

export const verifyPassword = async (hashedPassword: string, plain: string ): Promise<boolean> => {

  return await verify(hashedPassword, plain, hashOptions);

}

export default User;
