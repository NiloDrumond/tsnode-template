import { User } from '@/modules/user/model/User';
import { v4 as uuidV4 } from 'uuid';

interface ILobbyConstructorDTO {
  host: User;
  code: string;
}

class Lobby {
  id: string;
  host: User;
  code: string;
  created_at: Date;

  constructor({ host, code }: ILobbyConstructorDTO) {
    this.id = uuidV4();
    this.created_at = new Date();
    this.host = host;
    this.code = code;
  }
}

export { Lobby };
