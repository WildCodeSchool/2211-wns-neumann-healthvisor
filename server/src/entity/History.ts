import { Field, ObjectType, InputType, Float } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import Page from "./Page";

// import User from "./User";

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
}

@InputType()
export class HistoryInput {
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
}

export default History;
