import { User } from '../model/User';

interface ICreateUserDTO {
  nickname: string;
}

interface IUsersRepository {
  list: () => User[];
  findById: (id: string) => User | undefined;
  create: (data: ICreateUserDTO) => User;
}

export { ICreateUserDTO, IUsersRepository };
