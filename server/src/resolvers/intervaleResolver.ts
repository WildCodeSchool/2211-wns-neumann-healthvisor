import { Resolver, Query, Arg, Mutation } from "type-graphql";
import datasource from "../db";
import Intervale, {IntervaleInput} from "../entity/Intervale"

@Resolver(Intervale)
export class IntervaleResolver {
    @Query (() => [Intervale])
    async Intervale(): Promise<Intervale[]> {
        const intervals = await datasource.getRepository(Intervale).find();

        return intervals
    }

    @Mutation(()=> Intervale)
    async createIntervale(@Arg("data") data: IntervaleInput): Promise<Intervale> {
        return await datasource.getRepository(Intervale).save(data)
    }


}