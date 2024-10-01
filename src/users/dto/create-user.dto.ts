import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5, {message: 'The name must have at least 5 letters'})
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: 'The password must have at least 8 characters'})
    @Matches(/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    password: string;
    
}
