import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';
import TYPES from '../../dependecy-injection-container/types';

import {
  IFindChapters,
  IFindOneChapter,
  ICreateChapter,
  IUpdateChapter,
  IDeleteChapter
} from '../../business/use-cases/chapter';

import { CreateChapterDto, UpdateChapterDto } from '../dtos/chapters';

export async function find(req: Request, res: Response): Promise<void> {
  const useCase = container.resolve<IFindChapters>(TYPES.FIND_CHAPTERS);

  const result = await useCase.execute();

  res.status(StatusCodes.OK).json(result);
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const useCase = container.resolve<IFindOneChapter>(TYPES.FIND_ONE_CHAPTER);

  const result = await useCase.execute(req.params.id);

  res.status(StatusCodes.OK).json(result);
}

export async function create(req: Request, res: Response): Promise<void> {
  const dto = new CreateChapterDto(req.body);

  await dto.isValid();

  const useCase = container.resolve<ICreateChapter>(TYPES.CREATE_CHAPTER);

  const result = await useCase.execute(req.params.id, dto);

  res.status(StatusCodes.CREATED).json(result);
}

export async function update(req: Request, res: Response): Promise<void> {
  const dto = new UpdateChapterDto(req.body);

  await dto.isValid();

  const useCase = container.resolve<IUpdateChapter>(TYPES.UPDATE_CHAPTER);

  const result = await useCase.execute(req.params.id, dto);

  res.status(StatusCodes.OK).json(result);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const useCase = container.resolve<IDeleteChapter>(TYPES.DELETE_CHAPTER);

  await useCase.execute(req.params.id);

  res.status(StatusCodes.NO_CONTENT).json();
}
