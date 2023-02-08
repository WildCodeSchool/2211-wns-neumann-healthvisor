import { Field, ObjectType, InputType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import User from "./User";

@ObjectType()
@Entity()
class Page {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    url: string;

    // @ManyToMany(() => User)
    // @JoinTable
    // users: User[];
}

@InputType()
export class PageInput {
    @Field()
    temps: number;
}

export default Page