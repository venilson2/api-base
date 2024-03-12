import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    readonly name: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    readonly age: number;
  }