import BaseDto from '../base.dto';
import { UpdateStoryDto as IUpdateStoryDto } from '../../../business/use-cases/story/dtos';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStoryDto extends BaseDto implements IUpdateStoryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  summary?: string;

  constructor(params: IUpdateStoryDto) {
    super();
    this.title = params.title;
    this.summary = params.summary;
  }
}

export default UpdateStoryDto;
