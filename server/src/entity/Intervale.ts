import { Field, ObjectType, InputType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
class Intervale {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ default: 1 })
    temps: number;
}

@InputType()
export class IntervaleInput {
    @Field()
    temps: number;
}

export default Intervale