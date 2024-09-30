import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SearchBookDto } from './dto/search-book.dto';
import { handleResponse } from 'src/common/response';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>) { }

  async create(createBookDto: CreateBookDto): Promise<any> {
    try {
      const lowerCaseTitle = createBookDto.title.toLowerCase();
      const book = this.bookRepository.create({
        ...createBookDto,
        title: lowerCaseTitle,
      });
      const newBook = await this.bookRepository.save(book)
      return handleResponse(newBook, 'Book created successfully', HttpStatus.CREATED);
    } catch (error) {
      throw new InternalServerErrorException('Failed creating book');
    }
  }

  async findAll(): Promise<any> {
    try {
      const books = await this.bookRepository.find();
      if (books.length === 0) {
        throw new NotFoundException('No books found');
      }
      return handleResponse(books, 'Books found successfully', HttpStatus.OK);
    } catch (error) {
      throw new InternalServerErrorException('Failed finding books')
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const book = await this.bookRepository.findOneBy({ id });
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return handleResponse(book, 'Book found successfully', HttpStatus.OK);
    } catch (error) {
      throw new InternalServerErrorException('Failed finding book')
    }

  }

  async searchBy(searchBookDto: SearchBookDto): Promise<any> {
    try {
      const { title, author, publishedDate, genre } = searchBookDto;
      const where: FindOptionsWhere<Book> = {};

      if (title) {
        where.title = title;
      }

      if (author) {
        where.author = author;
      }

      if (publishedDate) {
        const date = new Date(publishedDate);
        if (isNaN(date.getTime())) {
          throw new BadRequestException('Invalid date format: YYYY-MM-DD');
        }
        where.publishedDate = date;
      }

      if (genre) {
        where.genre = genre;
      }

      const books = await this.bookRepository.find({ where });
      if (books.length === 0) {
        throw new NotFoundException('No books found');
      }
      return handleResponse(books, 'Books found successfully', HttpStatus.OK);
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Failed searching books');
    }
  }


  async update(id: number, updateBookDto: UpdateBookDto): Promise<any> {
    try {
      if (!updateBookDto || Object.keys(updateBookDto).length === 0) {
        throw new BadRequestException('No data to update');
      }
      const bookToUpdate = await this.bookRepository.findOneBy({ id })
      if (!bookToUpdate) {
        throw new NotFoundException('Book not found')
      }
      const updatedBook = await this.bookRepository.merge(bookToUpdate, updateBookDto);
      return handleResponse(updatedBook, 'Book updated successfully', HttpStatus.OK)
    } catch (error) {
      throw new InternalServerErrorException('Failed updating book')
    };
  }

  async remove(id: number): Promise<any> {
    try {
      const bookDeleted = await this.bookRepository.delete(id);
      if (bookDeleted.affected === 0) {
        throw new NotFoundException('Book not found')
      }
      return handleResponse({}, 'Book deleted successfully', HttpStatus.NO_CONTENT);
    } catch (error) {
      throw new InternalServerErrorException('Failed deleting book')
    };
  }
}
