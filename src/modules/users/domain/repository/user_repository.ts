import type { UserType } from "../entities/user_entity";
import type { GetUsersParams } from "../../infrastructure/params/user_params";
import type { UserRemoteDataSource } from "../../infrastructure/data_sources/user_remote_data_source";

export class UserRepository {
  private remoteDataSource: UserRemoteDataSource;

  constructor(remoteDataSource: UserRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  getUsers(params?: GetUsersParams): Promise<UserType[]> {
    return this.remoteDataSource.getUsers(params);
  }

  getUserById(id: string): Promise<UserType> {
    return this.remoteDataSource.getUserById(id);
  }

  activateUser(id: string): Promise<UserType> {
    return this.remoteDataSource.activateUser(id);
  }

  deactivateUser(id: string): Promise<UserType> {
    return this.remoteDataSource.deactivateUser(id);
  }
}
