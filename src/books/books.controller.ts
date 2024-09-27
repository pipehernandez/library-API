import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { SearchBookDto } from './dto/search-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/add')
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<Book[] | string>  {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book | string> {
    return await this.booksService.findOne(id);
  }

  @Get('/search')
  async findBy(@Query()searchBookDto: SearchBookDto): Promise<Book[]>{
    return await this.booksService.searchBy(searchBookDto)
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<Partial<Book> | string> {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.booksService.remove(id);
  }
}
