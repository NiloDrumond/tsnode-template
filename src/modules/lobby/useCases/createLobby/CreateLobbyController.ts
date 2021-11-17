import { Request, Response } from 'express';

import { CreateLobbyUseCase } from './CreateLobbyUseCase';

class CreateLobbyController {
  constructor(private createLobbyUseCase: CreateLobbyUseCase) {}

  handle(request: Request, response: Response): Response {
    const { userId } = request.body;

    const Lobby = this.createLobbyUseCase.execute({ userId });

    return response.status(201).json({ Lobby });
  }
}

export { CreateLobbyController };
