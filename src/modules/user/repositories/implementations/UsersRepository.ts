import { User } from '../../model/User';
import { IUsersRepository, ICreateUserDTO } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }
    return UsersRepository.INSTANCE;
  }

  create({ nickname }: ICreateUserDTO): User {
    const user = new User({ nickname });
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
