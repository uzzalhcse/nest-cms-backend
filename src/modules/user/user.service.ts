import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    const options: FindManyOptions<User> = {
      relations: ['parent']
    };

    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    // Find a category by ID in the database
    const user = await this.userRepository.findOneBy({ email });

    // Throw an exception if the category is not found
    if (!user) {
      throw new NotFoundException(`Category with ID ${email} not found`);
    }

    return user;
  }

  async findOne(id: number): Promise<User> {
    // Find a category by ID in the database
    const user = await this.userRepository.findOneBy({ id });

    // Throw an exception if the category is not found
    if (!user) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Create a new category entity
    const user = this.userRepository.create(createUserDto);

    // Save the category to the database
    return this.userRepository.save(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<UpdateResult> {
    // Save the updated category to the database
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    // Find the category by ID
    const user = await this.findOne(id);

    // Remove the category from the database
    await this.userRepository.remove(user);
  }

  async seed() {
    const itemsToCreate = 50;
    const items = [];

    for (let i = 0; i < itemsToCreate; i++) {
      const item = new User();
      item.name = `User ${i + 1}`;
      item.email = `user${i + 1}@gmail.com`;
      item.password = '123456';
      // Set other properties as needed
      items.push(item);
    }

    await this.userRepository.save(items);
    console.log(`${items.length} users seeded successfully.`);
  }
}
