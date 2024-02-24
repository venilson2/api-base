import { IsDefined, IsNotEmpty, IsString, IsEmail, IsOptional, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  role: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsDate()
  birth_date: Date;

  @IsOptional()
  @IsString()
  reset_token: string;
}
