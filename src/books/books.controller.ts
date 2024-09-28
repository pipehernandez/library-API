import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseFilters } from '@nestjs/common';
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

  @Get('/search')
  async findBy(@Query()searchBookDto: SearchBookDto): Promise<any>{
    return await this.booksService.searchBy(searchBookDto)
  }

  @Get()
  async findAll(): Promise<Book[]>  {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    return await this.booksService.findOne(id);
  }



  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<Partial<Book>> {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.booksService.remove(id);
  }
}
