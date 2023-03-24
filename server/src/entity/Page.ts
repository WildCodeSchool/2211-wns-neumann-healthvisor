import { Field, ObjectType, InputType } from "type-graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength, MinLength  } from "class-validator";
import User from "./User";

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

    @ManyToMany(() => User, user => user.pages)
    users: User[];
}

@InputType()
export class PageInput {
    @Field()
    @MaxLength(200)
    @MinLength(5)
    url: string;
}

export default Page