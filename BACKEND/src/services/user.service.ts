import mssql, { pool } from "mssql";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import lodash from "lodash";
import { UserDetails } from "../models/user.interface";
import { sqlconfig } from "../config/sql.config";

export class userService {
  async registerUser(user: UserDetails) {
    let pool = await mssql.connect(sqlconfig);

    let user_id = v4();

    let hashedPassword = bcrypt.hashSync(user.password, 6);

    let emailExist = (
      await pool.query(`SELECT * FROM Users WHERE email = '${user.email}'`)
    ).recordset;
    console.log(emailExist[0]);
    if (!lodash.isEmpty(emailExist)) {
      return {
        error: "Email already exists",
      };
    }

    let result = (
      await pool
        .request()
        .input("user_id", user_id)
        .input("username", mssql.VarChar, user.username)
        .input("email", mssql.VarChar, user.email)
        .input("password", mssql.VarChar, hashedPassword)
        .execute("registerUser")
    ).rowsAffected;

    if (result[0] == 1) {
      return {
        message: "User registered successfully",
        user_id,
      };
    } else {
      return {
        error: "User not registered",
      };
    }
  }
  //method for fetching users and collectors
  async fetchAllUsers(){

    let pool = await mssql.connect(sqlconfig)
    let result = (await pool.query(`SELECT * FROM Users WHERE role IN ('user', 'collector')`)).recordset
    
    if(result.length == 0){
      return{
        message: "No users found"
      }
    }else{
      return{
        users: result
      }
    }
  }
  //method for fetching users only
  async fetchRoleUsers(){
    let pool = await mssql.connect(sqlconfig)
    let result = (await pool.query(`SELECT * FROM Users WHERE role = 'user'`)).recordset

    if(result.length == 0){
      return{
        message: "No users found"
      }
    }else{
      return{
        users: result
      }
    }
  }

  async fetchSingleUser(user_id: string) {
    let pool = await mssql.connect(sqlconfig);
    let user = (
      await pool
        .request()
        .input("user_id", mssql.VarChar, user_id)
        .query(`SELECT * FROM Users WHERE user_id = '${user_id}'`)
    ).recordset;

    if (!user[0].user_id) {
      return {
        error: "User not found",
      };
    } else {
      return {
        user: user[0],
      };
    }
  }

  async updateUser(email: string, password: string, profile_picture?: string) {
    let pool = await mssql.connect(sqlconfig);
    let user_password = bcrypt.hashSync(password, 6);

    // Check if the email exists
    let emailExist = (
      await pool.request().query(`SELECT * FROM Users WHERE email = '${email}'`)
    ).recordset;

    if (lodash.isEmpty(emailExist)) {
      return {
        error: "Email doesn't exist",
      };
    } else {
      // Update user details
      let result = (
        await pool
          .request()
          .input("email", emailExist[0].email)
          .input("password", user_password)
          .input("profile_picture", profile_picture || null) // Pass the profile picture URL or null
          .execute("updateUser")
      ).rowsAffected;

      if (result[0] < 1) {
        return {
          error: "Unable to update user details",
        };
      } else {
        return {
          message: "User details updated successfully",
          email,
          user_password,
          profile_picture,
        };
      }
    }
  }

  async switchCollectorRole(user_id: string){
    let response = await this.fetchSingleUser(user_id);

    if (response.user.user_id) {
      let pool = await mssql.connect(sqlconfig);
      let response = await (
        await pool
          .request()
          .input("user_id", mssql.VarChar, user_id)
          .query(`UPDATE Users SET role = 'collector' WHERE user_id = '${user_id}'`)
      ).rowsAffected
      if (response[0] === 1) {
        return {
          message: "User role updated to collector",
        };
        
      } else {
        return{
          error: "Unable to change user role"
        }
      } 
    } else {
      return{
        error: "User not found"
      }
    }
  }

  async  switchRoleToAdmin(user_id: string){
    let response = await this.fetchSingleUser(user_id);

    if (response.user.user_id) {
      let pool = await mssql.connect(sqlconfig);

      let response = await (
        await pool
        .request()
        .input("user_id", mssql.VarChar, user_id)
        .query(`UPDATE Users SET role = 'admin' WHERE user_id = '${user_id}'`)
      ).rowsAffected;

      if (response[0] === 1){
        return{
          message: "User role updated to admin"
        }
      } else {
        return{
          error: "Unable to change user role"
        }
      }
    } else {
      return{
        error: "User not found"
      }
    }
  }
  
  async revokePrivileges(user_id: string){
    let response = await this.fetchSingleUser(user_id);

    if (response.user.user_id) {
      let pool = await mssql.connect(sqlconfig);

      let response = await (
        await pool
        .request()
        .input("user_id", mssql.VarChar, user_id)
        .query(`UPDATE Users SET role = 'user' WHERE user_id = '${user_id}'`)
      ).rowsAffected;

      if (response[0] ===1) {
        return{
          message: "Privileges revoked successfully"
        }
      } else {
        return{
          error: "Unable to revoke privileges"
        }
      }
    } else{
      return{
        error: "User not found"
      }
    }
  }

  async deactivateUser(user_id: string) {
    try {
      let pool = await mssql.connect(sqlconfig);
      let userExists = (await pool.request()
          .input('user_id', mssql.VarChar, user_id)
          .query('SELECT * FROM Users WHERE user_id = @user_id AND isActive = 1')).recordset;
    
      if (userExists.length === 0) {
        return {
          message: 'User not found or already deactivated'
        };
      }
  
      let result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .execute('deactivateUser');
  
      if (result.rowsAffected[0] === 1) {
        return {
          message: 'User deactivated successfully'
        };
      } else {
        return {
          error: 'User not deactivated'
        };
      }
    } catch (error) {
      console.error('SQL error', error);
      throw error;
    }
  }
  
  async activateUser(user_id: string) {
    try {
      let pool = await mssql.connect(sqlconfig);
      let userExists = (await pool.request()
          .input('user_id', mssql.VarChar, user_id)
          .query('SELECT * FROM Users WHERE user_id = @user_id AND isActive = 0')).recordset;
  
      if (userExists.length === 0) {
        return {
          message: 'User not found or already active'
        };
      }
  
      await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .execute('activateUser');
  
      return {
        message: 'User activated successfully'
      };
    } catch (error) {
      console.error('SQL error', error);
      throw error;
    }
  }
}