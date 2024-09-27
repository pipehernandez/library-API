import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsString()
    title?: string;

    @IsString()
    author?: string;

    @IsDate({ message: 'Published date must be a valid date: YYYY-MM-DD' })
    @Type(() => Date)
    publishedDate?: Date;

    @IsString()
    genre?: string;
}
