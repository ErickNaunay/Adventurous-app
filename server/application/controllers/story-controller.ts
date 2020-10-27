import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';
import TYPES from '../../dependecy-injection-container/types';

import {
  IFindOneStory,
  IFindStories,
  ICreateStory,
  IUpdateStory,
  IDeleteStory
} from '../../business/use-cases/story';

import { CreateStoryDto, UpdateStoryDto } from '../dtos/stories';

export async function find(req: Request, res: Response): Promise<void> {
  const useCase = container.resolve<IFindStories>(TYPES.FIND_STORIES);

  const result = await useCase.execute();

  res.status(StatusCodes.OK).json(result);
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const useCase = container.resolve<IFindOneStory>(TYPES.FIND_ONE_STORY);

  const result = await useCase.execute(req.params.id);

  res.status(StatusCodes.OK).json(result);
}

export async function create(req: Request, res: Response): Promise<void> {
  const dto = new CreateStoryDto(req.body);

  await dto.isValid();

  const useCase = container.resolve<ICreateStory>(TYPES.CREATE_STORY);

  const result = await useCase.execute(dto);

  res.status(StatusCodes.CREATED).json(result);
}

export async function update(req: Request, res: Response): Promise<void> {
  const dto = new UpdateStoryDto(req.body);

  await dto.isValid();

  const useCase = container.resolve<IUpdateStory>(TYPES.UPDATE_STORY);

  const result = await useCase.execute(req.params.id, dto);

  res.status(StatusCodes.OK).json(result);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const useCase = container.resolve<IDeleteStory>(TYPES.DELETE_STORY);

  await useCase.execute(req.params.id);

  res.status(StatusCodes.NO_CONTENT).json();
}
