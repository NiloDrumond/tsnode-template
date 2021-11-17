import { generateLobbyCode } from '@lobby/services/generateLobbyCode';
import { Lobby } from '../../model/Lobby';
import { ILobbiesRepository, ICreateLobbyDTO } from '../ILobbiesRepository';

const CODE_RETRIES = 10;

class LobbiesRepository implements ILobbiesRepository {
  private lobbies: Lobby[];

  private static INSTANCE: LobbiesRepository;

  constructor() {
    this.lobbies = [];
  }

  public static getInstance(): LobbiesRepository {
    if (!LobbiesRepository.INSTANCE) {
      LobbiesRepository.INSTANCE = new LobbiesRepository();
    }
    return LobbiesRepository.INSTANCE;
  }

  findByCode(code: string): Lobby | undefined {
    return this.lobbies.find((l) => l.code === code);
  }

  private generateCode(): string {
    for (let i = 0; i < CODE_RETRIES; i++) {
      const code = generateLobbyCode();
      const existing = this.findByCode(code);
      if (!existing) {
        return code;
      }
    }
    throw new Error('Unable to generate lobby code');
  }

  create({ user }: ICreateLobbyDTO): Lobby {
    const code = this.generateCode();
    const lobby = new Lobby({ host: user, code });
    this.lobbies.push(lobby);
    return lobby;
  }

  list(): Lobby[] {
    return this.lobbies;
  }
}

export { LobbiesRepository };
