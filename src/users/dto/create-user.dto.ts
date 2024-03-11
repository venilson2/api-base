import { IsDefined, IsNotEmpty, IsString, IsEmail, IsOptional, IsPhoneNumber, IsIn, IsDateString} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  full_name: string;

  @IsOptional()
  @IsDateString()
  birth_date: Date;

  @IsOptional()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('BR', { message: 'Invalid phone number' })
  phone_number: string;

  @IsOptional()
  @IsString()
  company_id: string;
}
