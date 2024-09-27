import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SearchBookDto } from './dto/search-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {

    try {
      const lowerCaseTitle = createBookDto.title.toLowerCase();
      const book = this.bookRepository.create({
        ...createBookDto,
        title: lowerCaseTitle
      });
      return this.bookRepository.save(book)
    } catch (error) {
      throw new InternalServerErrorException('Failed creating book')
    }
  }

  async findAll(): Promise<Book[] | string> {
    try {
      const books = await this.bookRepository.find();
      if (books.length === 0) {
        return 'No books found';
      }
      return books;

    } catch (error) {
      throw new InternalServerErrorException('Failed to get books')
    }
  }

  async findOne(id: number): Promise<Book | string> {
    try {
      const book = await this.bookRepository.findOneBy({id});
      if (!book) {
        return `Book with id ${id} not found`
        
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get book')
    }
    
  }

  async searchBy(searchBookDto: SearchBookDto): Promise<Book[]>{
    try {
      const { title, author, publishedDate, genre } = searchBookDto;

      const where: FindOptionsWhere<Book> = {}

      if(title){
        where.title = title
      }

      if(author){
        where.author = author
      }

      if(publishedDate){
        const date = new Date(publishedDate);
        if(isNaN(date.getTime())){
          throw new Error('Invalid date format:(YYYY-MM-DD');
        }
        where.publishedDate = date
      }

      if(genre){
        where.genre = genre
      }

      const books = await this.bookRepository.find({where});
      if(books.length === 0){
        throw new NotFoundException('No books found')
      }
      return books;
    } catch (error) {
      throw new InternalServerErrorException('Failed to search books')
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Partial<Book> | string> {
    try {
      const bookToUpdate = await this.bookRepository.findOneBy({id})
      if (!bookToUpdate) {
        return `Book with id ${id} not found`
        }
        const updatedBook = await this.bookRepository.merge(bookToUpdate, updateBookDto);
        return await this.bookRepository.save(updatedBook);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update book')
    };
  }

  async remove(id: number): Promise<string> {
    try {
      const bookToDelete = await this.bookRepository.findOneBy({id})
      if (!bookToDelete) {
        return `Book with id ${id} not found`
        }
      await this.bookRepository.delete({id});
      return `Book with id ${id} deleted` 
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete book');
    };
  }
}
