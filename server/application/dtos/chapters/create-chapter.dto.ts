import BaseDto from '../base.dto';
import { CreateChapterDto as ICreateChapterDto } from '../../../business/use-cases/chapter/dtos';
import { ArrayUnique, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateChapterDto extends BaseDto implements ICreateChapterDto {
  @IsNotEmpty()
  @IsPositive()
  sequence: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @ArrayUnique()
  connections: number[];

  constructor(params: ICreateChapterDto) {
    super();
    this.sequence = params.sequence;
    this.content = params.content;
    this.connections = params.connections;
  }
}

export default CreateChapterDto;
