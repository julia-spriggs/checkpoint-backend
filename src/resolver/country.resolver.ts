import { CountryCreateInput } from '../entity/Country.entity';
import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Country from "../entity/Country.entity";
import CountryServices from "../services/country.services";

@Resolver()
export default class CountryResolver {
    @Query(() => [Country])
    async listCountries(@Arg("search", { nullable: true }) search: string) {
        const countries: Country[] = await new CountryServices().list(
            search as string | undefined
        );
        return countries;
    }
    @Query(() => Country)
    async findCountry(@Arg("code") code: string) {
        const country: Country = await new CountryServices().find(code);
        return country;
    }

    @Mutation(() => Country)
    async createCountry(@Arg("info") info: CountryCreateInput) {
        const result: Country = await new CountryServices().create(info);
        return result;
    }
}