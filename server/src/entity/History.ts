import { Field, ObjectType, InputType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import Page from "./Page";
import User from "./User";

@ObjectType()
@Entity()
class History {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  date: Date;

  @Field()
  @Column()
  responseTime: number;

  @Field()
  @Column({
    nullable: true
  })
  screenshot: string;

  @ManyToOne(() => Page, page => page.histories)
  page: Page;

  @ManyToOne(() => User, user => user.histories)
  user: User;
}

@ObjectType()
export class HistoryAnonymous {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  status: string;

  @Field()
  date: Date;

  @Field()
  responseTime: number;

  @Field()
  screenshot: string;

  @Field()
  url: string;
}

@InputType()
export class HistoryInput {
  @Field()
  id: number;

  @Field()
  @MaxLength(3)
  @MinLength(3)
  status: string;

  @Field()
  @MaxLength(3)
  @MinLength(3)
  date: Date;

  @Field()
  @Column()
  responseTime: number

  @Field()
  page: number;
}


export default History;
