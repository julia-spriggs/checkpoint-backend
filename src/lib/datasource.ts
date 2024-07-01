import Country from "../entity/Country.entity";
import { DataSource } from "typeorm";

export default new DataSource({
    type: "sqlite",
    database: "countries.sqlite",
    entities: [Country],
    synchronize: true,
    logging: ["error", "query"],
});