import { IsDateString, IsOptional, IsString } from "class-validator";

export class SearchBookDto{
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    author?: string;

    @IsDateString()
    @IsOptional()
    publishedDate?: string;

    @IsString()
    @IsOptional()
    genre?: string;
}