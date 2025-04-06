import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  MaxLength,
  IsNumber,
  Min,
  IsString,
  IsIn,
  IsMongoId,
  IsArray,
  ValidateNested,
  IsDate,
  IsDateString,
} from "class-validator";

import { Transform } from "class-transformer";
import validationConstants from "../constant/validationConstants";

export class CreateUser {
  @IsOptional({ message: validationConstants.REQUIRED })
  first_name: string;

  @IsOptional({ message: validationConstants.REQUIRED })
  last_name: string;

  @IsOptional({ message: validationConstants.INVALID_VALUE })
  @IsEmail({}, { message: validationConstants.INVALID_VALUE })
  email: string;

  @IsNotEmpty({ message: validationConstants.REQUIRED })
  @IsNumber({}, { message: validationConstants.IS_NUMBER_TYPE })
  phone: number;

  @IsNotEmpty({ message: validationConstants.REQUIRED })
  @IsNumber({},{ message: validationConstants.IS_NUMBER_TYPE })
  password: number;

  


}

export class LoginUser {

  @IsOptional({ message: validationConstants.INVALID_VALUE })
  @IsEmail({}, { message: validationConstants.INVALID_VALUE })
  email: string;


  @IsNotEmpty({ message: validationConstants.REQUIRED })
  @IsNumber({},{ message: validationConstants.IS_NUMBER_TYPE })
  password: number;

}

export class UserListing {


  @IsNotEmpty({ message: "Page is Required" })
  @IsNumber()
  @Min(1)
  page: number;
}

export class UserId {
  @IsNotEmpty({ message: validationConstants.REQUIRED })
  @IsNumber({}, { message: validationConstants.IS_NUMBER_TYPE })
  userId: number;
}
export class UpdateUser {
  @IsOptional({ message: validationConstants.REQUIRED })
  first_name: string;

  @IsOptional({ message: validationConstants.REQUIRED })
  last_name: string;

  @IsOptional({ message: validationConstants.INVALID_VALUE })
  @IsEmail({}, { message: validationConstants.INVALID_VALUE })
  email: string;

  @IsOptional({ message: validationConstants.REQUIRED })
  @IsNumber({}, { message: validationConstants.IS_NUMBER_TYPE })
  phone: number;

  @IsOptional({ message: validationConstants.REQUIRED })
  @IsNumber({},{ message: validationConstants.IS_NUMBER_TYPE })
  password: number;

  

}