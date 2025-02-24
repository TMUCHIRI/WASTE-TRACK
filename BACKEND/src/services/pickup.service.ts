import { Pickup } from "../models/pickup.interface";
import mssql from 'mssql';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { sqlconfig } from "../config/sql.config";

export class pickupService{
    async createPickup(pickup: Pickup){
        const pool = await mssql.connect(sqlconfig);

        const pickup_id = v4(); // Generate a unique pickup ID
        const formattedDate = DateTime.fromFormat(pickup.date, "dd-MM-yyyy")
      .toFormat("yyyy-MM-dd HH:mm:ss");
  
        const result = (
          await pool
            .request()
            .input("pickup_id", mssql.VarChar, pickup_id)
            .input("location", mssql.VarChar, pickup.location)
            .input("date", mssql.DateTime, formattedDate)
            .input("phone_number", mssql.VarChar, pickup.phone_number)
            .input("category", mssql.VarChar, pickup.category)
            .execute("createPickup")
        ).rowsAffected;
  
        if (result[0] === 1) {
          return {
            message: "Pickup created successfully",
            pickup_id,
          };
        } else {
          return {
            error: "Failed to create pickup",
          };
        }
    }

    async displaySinglePickup(pickup_id: string){
        const pool = await mssql.connect(sqlconfig);

        const pickup = (
          await pool
            .request()
            .input("pickup_id", mssql.VarChar, pickup_id)
            .query("SELECT * FROM Pickup WHERE pickup_id = @pickup_id")
        ).recordset[0];
  
        if (pickup) {
          return {
            pickup,
          };
        } else {
          return {
            error: "Pickup not found",
          };
        }
    }

    async displayAllPickups(){
        const pool = await mssql.connect(sqlconfig);

        const pickups = (
          await pool.query("SELECT * FROM Pickup")
        ).recordset;
  
        if (pickups.length > 0) {
          return {
            pickups,
          };
        } else {
          return {
            message: "No pickups found",
          pickups: [],
          };
        }
    }

    async updatePickup(pickup: Pickup){
        const pool = await mssql.connect(sqlconfig);
        const formattedDate = DateTime.fromFormat(pickup.date, "dd-MM-yyyy")
      .toFormat("yyyy-MM-dd HH:mm:ss");

        const result = (
          await pool
            .request()
            .input("pickup_id", mssql.VarChar, pickup.pickup_id)
            .input("location", mssql.VarChar, pickup.location)
            .input("date", mssql.DateTime, formattedDate)
            .input("phone_number", mssql.VarChar, pickup.phone_number)
            .input("category", mssql.VarChar, pickup.category)
            .execute("updatePickup")
        ).rowsAffected;
  
        if (result[0] === 1) {
          return {
            message: "Pickup updated successfully",
            pickup
          };
        } else {
          return {
            error: "Failed to update pickup",
          };
        } 
    }

    async deletePickup(pickup_id: string){
        const pool = await mssql.connect(sqlconfig);

      const result = (
        await pool
          .request()
          .input("pickup_id", mssql.VarChar, pickup_id)
          .execute("deletePickup")
      ).rowsAffected;

      if (result[0] === 1) {
        return {
          message: "Pickup deleted successfully",
        };
      } else {
        return {
          error: "Failed to delete pickup",
        };
      }
    }
}