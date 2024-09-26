import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

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
      const books = await this.bookRepository.find({
        select: ['title', 'author', 'publishedDate', 'genre']
      });
      if (books.length === 0) {
        return 'No books found';
      }
      return books;

    } catch (error) {
      console.error('Database error:', error.message);
      throw new InternalServerErrorException('Failed to get books')
    }
  }

  async findOne(id: number): Promise<Book | string> {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(title: string): Promise<string> {
    try {
      const lowerCaseTitle = title.toLowerCase();
      const eliminated = await this.bookRepository.delete({ title: lowerCaseTitle });
      if (eliminated.affected === 0) {
        throw new NotFoundException(`Book with title ${lowerCaseTitle} not found`);
      }
      return 'Book deleted succesfully';
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete book');
    };
  }
}
