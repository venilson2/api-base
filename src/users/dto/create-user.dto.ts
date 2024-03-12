import { IsDefined, IsNotEmpty, IsString, IsEmail, IsOptional, IsPhoneNumber, IsIn, IsDateString, IsArray} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  full_name: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birth_date: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR', { message: 'Invalid phone number' })
  phone_number: string;

  @ApiProperty()
  @IsArray()
  @IsIn(['condo_admin', 'resident', 'condo_manager', 'caretaker', 'management_admin', 'fiscal_counselor'])
  roles: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  company_id: string;
}
