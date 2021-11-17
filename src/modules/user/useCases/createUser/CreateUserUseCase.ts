import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  nickname: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ nickname }: IRequest): User {
    const User = this.usersRepository.create({ nickname });

    return User;
  }
}

export { CreateUserUseCase };
