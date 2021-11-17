import { Lobby } from '@lobby/model/Lobby';
import { User } from '@user/model/User';

interface ICreateLobbyDTO {
  user: User;
}

interface ILobbiesRepository {
  list(): Lobby[];
  findByCode(code: string): Lobby | undefined;
  create(data: ICreateLobbyDTO): Lobby;
}

export { ICreateLobbyDTO, ILobbiesRepository };
