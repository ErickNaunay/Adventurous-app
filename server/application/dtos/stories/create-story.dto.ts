import BaseDto from '../base.dto';
import { CreateStoryDto as ICreateStoryDto } from '../../../business/use-cases/story/dtos';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoryDto extends BaseDto implements ICreateStoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  constructor(params: ICreateStoryDto) {
    super();
    this.title = params.title;
    this.summary = params.summary;
  }
}

export default CreateStoryDto;
