import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    EntityRepository, getCustomRepository,
    PrimaryGeneratedColumn, Repository,
    UpdateDateColumn
} from 'typeorm';
import {IsEmail, MaxLength} from 'class-validator';

@Entity(Book.tableName)
export class Book extends BaseEntity {
    static readonly tableName = 'book';
    static readonly schema = {
        id: 'id',
        displayName: 'displayName',
        content: 'content',
        createdBy: 'created_by',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        name: Book.schema.displayName,
    })
    @MaxLength(100)
    displayName: string;

    @Column({
        length: 500,
        name: Book.schema.content,
    })
    @MaxLength(500)
    content: string;

    @Column({
        name: Book.schema.createdBy,
    })
    @IsEmail()
    createdBy: string;

    @CreateDateColumn({
        name: Book.schema.createdAt,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: Book.schema.updatedAt,
    })
    updatedAt: Date;

    static get repo(): BookRepository {
        return getCustomRepository(BookRepository);
    }
}

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
    async getAll() {
        const books = await this.find();
        if (!books) return {
            Oops: 'There are no books in the database'
        };
        return books;
    }

    async getOne(bookId: any) {
        const book = await this.findOne(bookId);
        if (!book) return {
            Oops: 'No books found'
        };
        return book;
    }

    async updateById(bookId: any, bookUpdate: Book) {
        let book = await this.findOne(bookId);
        if (!book) return {
            Oops: 'No books found'
        };
        book.displayName = bookUpdate.displayName ? bookUpdate.displayName : book.displayName;
        book.content = bookUpdate.content ? bookUpdate.content : book.content;
        await this.save(book);
        return book;
    }
}
