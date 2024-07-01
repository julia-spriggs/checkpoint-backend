import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Field, ID, ObjectType, InputType } from "type-graphql";

@ObjectType()
@Entity()
class Country {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    code: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    emoji: string;
}

    @InputType()
    export class CountryCreateInput {
        @Field()
        @Column()
        code: string;

        @Field()
        @Column()
        name: string;

        @Field()
        emoji: string;
    }

export default Country;

