import { IUsersRepository } from '@user/repositories/IUsersRepository';
import { Lobby } from '../../model/Lobby';
import { ILobbiesRepository } from '../../repositories/ILobbiesRepository';

interface IRequest {
  userId: string;
}

class CreateLobbyUseCase {
  constructor(
    private lobbiesRepository: ILobbiesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  execute({ userId }: IRequest): Lobby {
    const user = this.usersRepository.findById(userId);
    if (!user) {
      throw new Error();
    }
    const lobby = this.lobbiesRepository.create({ user });

    return lobby;
  }
}

export { CreateLobbyUseCase };
