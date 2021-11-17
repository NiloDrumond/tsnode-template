import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { nickname } = request.body;

    const User = this.createUserUseCase.execute({ nickname });

    return response.status(201).json({ User });
  }
}

export { CreateUserController };
