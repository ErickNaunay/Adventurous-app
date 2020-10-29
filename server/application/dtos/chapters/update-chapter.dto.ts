import BaseDto from '../base.dto';
import { UpdateChapterDto as IUpdateChapterDto } from '../../../business/use-cases/chapter/dtos';
import {
  ArrayUnique,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsString
} from 'class-validator';

export class UpdateChapterDto extends BaseDto implements IUpdateChapterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  sequence?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNotEmpty()
  @ArrayUnique()
  connections?: number[];

  constructor(params: IUpdateChapterDto) {
    super();
    this.sequence = params.sequence;
    this.content = params.content;
    this.connections = params.connections;
  }
}

export default UpdateChapterDto;
