import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty({ message: 'The title must not be empty' })
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsDate({ message: 'Published date must be a valid date: YYYY-MM-DD' })
    @Type(() => Date)
    publishedDate: Date;

    @IsString()
    genre: string;
}
