import { Field, ObjectType, InputType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import History from "./History";

// import User from "./User";

@ObjectType()
@Entity()
class Page {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    @MaxLength(200)
    @MinLength(5)
    url: string;

    @Field()
    @Column({ default: 1 })
    intervale: number;

    @Field(() => [History])
    @OneToMany(() => History, (history) => history.page)
    histories: History[];
}

@InputType()
export class PageInput {
    @Field()
    @MaxLength(200)
    @MinLength(5)
    url: string;
}

export default Page