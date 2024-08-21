import { IsNotEmpty, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
export class CreateUserDto {
  @IsNotEmpty({ message: 'username is not empty' })
  username: string;

  @Exclude()
// @IsNotEmpty({ message: 'password is not empty' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is not empty' })
  email: string;
}
