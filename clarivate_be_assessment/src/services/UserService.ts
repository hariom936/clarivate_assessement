/**
 * @author: Hariom Verma
 * @file: src/services/UserService.ts
 * @description: User Service is used as a service for exposing user related methods for primarily
 * UserController. User Service interacts with Database for user related CRUD operations.
 */


import { Service } from "typedi";
import { ApiError } from "../utils/Apierror";
import httpStatus from "http-status";
import { Like, Repository } from "typeorm";
import AppDataSource from "../config/dbconfig";
import { Users } from "../entity/Users";
import { LoginUser } from "../entity/LoginUser";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  password: number;
  
}

interface LoginUserData {
  email: string;
  password: number;
}

@Service()
export class UserService {
  private user: Repository<Users>;
  private logins: Repository<LoginUser>;

  constructor() {
    this.user = AppDataSource.getRepository(Users);
    this.logins = AppDataSource.getRepository(LoginUser);
  }

  /**
   * Create a new user in system database
   * @param {Object} user
   * @returns {boolean} true if created successfully, false if not.
   */
  public async createUser(userData: UserData) {
    try {
  
      const userToCreate = this.mapToUserEntity(userData);

      const createdUsers = this.user.create(userToCreate);
      await this.user.save(createdUsers);

      return { createdUsers };
    } catch (error: any) {
      console.error("Error creating user:", error);
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        error?.message || "An error occurred while creating the user."
      );
    }
  }

  private mapToUserEntity(userData: UserData): Users {
    return {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
    } as unknown as Users;
  }

  /**
   * Login a user with email and password
   * @param {string} email
   * @param {number} password
   */
  public async login(loginUserData: LoginUserData) {
    try {


      const userToLogin = this.mapToUserLoginEntity(loginUserData);
  
      const LoginUsers = this.logins.create(userToLogin);
      await this.logins.save(LoginUsers);

      return LoginUsers;
    } catch (error: any) {
      console.error("Error creating user:", error);
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        error?.message || "An error occurred while creating the user."
      );
    }
  }

  private mapToUserLoginEntity(loginUserData: LoginUserData): LoginUser {
    return {
      email: loginUserData.email,
      password: loginUserData.password,
    } as unknown as LoginUser;
  }

  public async fetchData(query): Promise<{ count: number; users: Users[] }> {
    let queryCondition;
    let search = query.search || null;
    if (search && search !== "" && search !== undefined && search !== null)
      queryCondition = { where: { storeName: Like(`%${search}%`) } };
    else queryCondition = {};
    const count = await this.user.count(queryCondition);
    const users = await this.user.find(queryCondition);

    return { count, users };
  }

  public async fetchDetails(queryParam: any) {
    const { userId, search } = queryParam;
    // If userId is provided, fetch user by ID
    if (userId) {
      const user = await this.user.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error(`User with id ${userId} not found`);
      }
      return { data: user };
    }
    const queryCondition: any = {
      where: {},
    };
  
    if (search) {
      queryCondition.where.first_name = search;
    }
  
    // Actually fetch users using the query condition
    const data = await this.user.find(queryCondition);
  
    return { data };
  }
  

  public async updateUser(
    userId: number,
    updateUser: any
  ): Promise<Users | undefined> {
    const userToUpdate = await this.user.findOne({ where: { id: userId } });
    if (!userToUpdate) {
      throw new Error(`User with id ${userId} not found`);
    }

    // Update the user entity with the new data
    Object.assign(userToUpdate, updateUser);

    // Save the updated user entity back to the database
    try {
      await this.user.save(userToUpdate);
      return userToUpdate;
    } catch (error) {
      // Handle errors such as validation errors, database errors, etc.
      throw new Error(
        `Unable to update user with id ${userId}. Error: ${error.message}`
      );
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    // Find the user to delete
    const userToDelete = await this.user.findOne({ where: { id: userId } });
    
    if (!userToDelete) {
      throw new Error(`User with id ${userId} not found`);
    }
  
    try {
      // Delete the user from the database
      await this.user.remove(userToDelete);
    } catch (error) {
      // Handle errors such as database errors, integrity constraints, etc.
      throw new Error(`Unable to delete user with id ${userId}. Error: ${error.message}`);
    }
  }
  
  
  
}
