import { IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantDto {
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
  company: string;

  @IsArray()
  @IsNotEmpty()
  @IsDefined()
  roles: string[];
}