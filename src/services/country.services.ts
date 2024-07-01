import Country, { CountryCreateInput } from "../entity/Country.entity";
import { Repository, Like } from "typeorm";
import datasource from "../lib/datasource";

class CountryServices {
    db: Repository<Country>;
    constructor() {
        this.db = datasource.getRepository(Country);
    }
    async create(data: CountryCreateInput) {
        const newCountry = this.db.create({...data});
        return await this.db.save(newCountry);
    }

    async list(search?: string) {
        return await this.db.find({
            where: search
                ? [
                    { code: Like(`%${search}%`) }
                ]
            : undefined,
        });
    }

    async find(code: string) {
        const country = await this.db.findOne({
            where: { code },
        });
        if (!country) {
            throw new Error("this country does not exist in our database");
        }
        return country;
    }
}

export default CountryServices;