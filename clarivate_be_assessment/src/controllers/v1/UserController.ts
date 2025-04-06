import {
  JsonController,
  Get,
  Post,
  Body,
  Req,
  Res,
  QueryParams,
  Patch,
  Delete,
} from "routing-controllers";
import { Service } from "typedi";
import { ResponseService } from "../../services/ResponseService";
import {
  CreateUser,
  LoginUser,
  UpdateUser,
  UserId,
  UserListing,
} from "../../validations/UserValidation";
import messages from "../../constant/messages";
import { action, component } from "../../constant/api";
import { Request, Response } from "express";
import { apiRoute } from "../../utils/apiSemver";
import { UserService } from "../../services/UserService";
import { Users } from "../../entity/Users";

@Service()
@JsonController(apiRoute(component.USER))
export default class CustomerAdminAuthController {
  constructor(
    private userService: UserService,
    private responseService: ResponseService
  ) {
    this.userService = new UserService();
    this.responseService = new ResponseService();
  }

  @Post(action.ADD)
  public async completeUserOnboarding(
    @Req() req: Request,
    @Body() userData: CreateUser,
    @Res() res: Response
  ) {
    try {
      const user = await this.userService.createUser(userData);
      if (user) {
        return this.responseService.success({
          res,
          message: messages.USER.ADD_USER_SUCCESS,
          data: user,
        });
      } else {
        return this.responseService.failure({
          res,
          message: messages.USER.ADD_USER_FAILED,
        });
      }
    } catch (error) {
      return this.responseService.serverError({
        res,
        error,
      });
    }
  }

  @Post(action.LOGIN)
  public async loginUser(
    @Req() req: Request,
    @Body() userData: LoginUser,
    @Res() res: Response
  ) {
    try {
      const user = await this.userService.login(userData);
      if (user) {
        return this.responseService.success({
          res,
          message: messages.USER.LOGIN_USER_SUCCESS,
          data: user,
        });
      } else {
        return this.responseService.failure({
          res,
          message: messages.USER.LOGIN_USER_FAILED,
        });
      }
    } catch (error) {
      return this.responseService.serverError({
        res,
        error,
      });
    }
  }

  @Get(action.LIST)
  public async getListing(
    @Req() req: Request,
    @QueryParams() query: UserListing,
    @Res() res: Response
  ) {
    try {
      const fetchData = await this.userService.fetchData(query);
      if (fetchData) {
        return this.responseService.success({
          res,
          message: messages.SUCCESS,
          data: fetchData,
        });
      } else {
        return this.responseService.noDataFound({
          res,
          message: messages.NOT_FOUND,
        });
      }
    } catch (error) {
      return this.responseService.serverError({
        res,
        error,
      });
    }
  }

  @Get(action.DETAIL)
  public async getMallDetails(
    @Req() req: Request,
    @QueryParams() query: UserListing,
    @Res() res: Response
  ) {
    try {
      const fetchData = await this.userService.fetchDetails(query);
      if (fetchData) {
        return this.responseService.success({
          res,
          message: messages.SUCCESS,
          data: fetchData,
        });
      } else {
        return this.responseService.noDataFound({
          res,
          message: messages.NOT_FOUND,
        });
      }
    } catch (error) {
      return this.responseService.serverError({
        res,
        error,
      });
    }
  }

  @Patch(action.UPDATE)
  public async editUserData(
    @Body() updateUser: UpdateUser,
    @QueryParams() query: UserId, // You can keep using UserListing if needed, just make sure it has userId
    @Res() res: Response,
    @Req() req: Request
  ) {
    try {
      const userId = Number(query.userId); // Extract userId from query
  
      if (!userId) {
        return this.responseService.failure({
          res,
          message: "User ID is required",
        });
      }
  
      const upData = await this.userService.updateUser(userId, updateUser);
      if (!upData) {
        return this.responseService.failure({
          res,
          message: messages.USER.USER_UPDATE_FAILED,
        });
      }
  
      return this.responseService.success({
        res,
        message: messages.USER.USER_UPDATE_SUCCESS,
        data: upData,
      });
    } catch (error) {
      return this.responseService.serverError({
        res,
        error: error.message || 'Server Error',
      });
    }
  }
  

  @Delete(action.DELETE)
  public async deleteUser(
  @Res() res: Response,
  @QueryParams() query: any,
  @Req() req: Request
) {
  try {
    const userId = Number(query.userId); // Extract userId from query

    if (!userId) {
      return this.responseService.failure({
        res,
        message: "User ID is required",
      });
    }

    // ✅ Call service to delete user
    await this.userService.deleteUser(userId);

    return this.responseService.success({
      res,
      message: messages.USER.DELETE_USER_SUCCESS,
    });
  } catch (error) {
    return this.responseService.serverError({
      res,
      error: error.message || messages.USER.DELETE_USER_FAILED,
    });
  }
}

}