import mssql from "mssql";
import { v4 } from "uuid";
import { sqlconfig } from "../config/sql.config";

export class collectionService {
  // Accept a pickup (collector action)
  async acceptPickup(user_id: string, pickup_id: string) {
    try {
      const pool = await mssql.connect(sqlconfig);
      const collection_id = v4(); // Generate unique collection ID

      // Verify the collector exists
      const collector = await pool
        .request()
        .input("user_id", mssql.VarChar, user_id)
        .query("SELECT * FROM Users WHERE user_id = @user_id AND role = 'collector'");

      if (collector.recordset.length === 0) {
        return { error: "Collector not found" };
      }

      // Execute the stored procedure
      const result = (
        await pool
          .request()
          .input("collection_id", mssql.VarChar, collection_id)
          .input("user_id", mssql.VarChar, user_id)
          .input("pickup_id", mssql.VarChar, pickup_id)
          .execute("acceptPickup")
      ).rowsAffected;

      if (result[0] === 1) {
        return { message: "Pickup accepted successfully", collection_id };
      } else {
        return { error: "Failed to accept pickup" };
      }
    } catch (error) {
      console.error("Error accepting pickup:", error);
      throw error;
    }
  }

  // Reject a pickup (collector action)
  async rejectPickup(collection_id: string, pickup_id: string) {
    try {
      const pool = await mssql.connect(sqlconfig);

      // Execute the stored procedure
      const result = (
        await pool
          .request()
          .input("collection_id", mssql.VarChar, collection_id)
          .input("pickup_id", mssql.VarChar, pickup_id)
          .execute("rejectPickup")
      ).rowsAffected;

      if (result[0] === 1) {
        return { message: "Pickup rejected successfully" };
      } else {
        return { error: "Failed to reject pickup" };
      }
    } catch (error) {
      console.error("Error rejecting pickup:", error);
      throw error;
    }
  }

  // View all accepted pickups
  async getAllAcceptedPickups() {
    try {
      const pool = await mssql.connect(sqlconfig);
      const query = `
        SELECT 
          c.collection_id, 
          c.collector_name, 
          p.pickup_id, 
          p.location, 
          p.date, 
          p.category
        FROM Collections c
        INNER JOIN Pickup p ON c.pickup_id = p.pickup_id
        WHERE c.status = 1
      `;

      const result = (await pool.query(query)).recordset;
      return result.length > 0 ? { pickups: result } : { message: "No accepted pickups" };
    } catch (error) {
      console.error("Error fetching accepted pickups:", error);
      throw error;
    }
  }

  async getCollectorCollections(user_id: string) {
    const pool = await mssql.connect(sqlconfig);
    const result = await pool
      .request()
      .input('user_id', mssql.VarChar, user_id)
      .execute('getCollectorCollections');
    
    return result.recordset;
  }

  // View a single accepted pickup
  async getSingleAcceptedPickup(collection_id: string) {
    try {
      const pool = await mssql.connect(sqlconfig);
      const query = `
        SELECT 
          c.collection_id, 
          c.collector_name, 
          p.pickup_id, 
          p.location, 
          p.date, 
          p.category
        FROM Collections c
        INNER JOIN Pickup p ON c.pickup_id = p.pickup_id
        WHERE c.status = 1 AND c.collection_id = @collection_id
      `;

      const result = (
        await pool
          .request()
          .input("collection_id", mssql.VarChar, collection_id)
          .query(query)
      ).recordset[0];

      return result ? { pickup: result } : { error: "Accepted pickup not found" };
    } catch (error) {
      console.error("Error fetching accepted pickup:", error);
      throw error;
    }
  }

  // View all pending pickups (status = 0 in Pickup)
  async getAllPendingPickups() {
    try {
      const pool = await mssql.connect(sqlconfig);
      const result = (
        await pool.query("SELECT * FROM Pickup WHERE status = 0")
      ).recordset;

      return result.length > 0 ? { pickups: result } : { message: "No pending pickups" };
    } catch (error) {
      console.error("Error fetching pending pickups:", error);
      throw error;
    }
  }

  // View a single pending pickup
  async getSinglePendingPickup(pickup_id: string) {
    try {
      const pool = await mssql.connect(sqlconfig);
      const pickup = (
        await pool
          .request()
          .input("pickup_id", mssql.VarChar, pickup_id)
          .query("SELECT * FROM Pickup WHERE status = 0 AND pickup_id = @pickup_id")
      ).recordset[0];

      return pickup ? { pickup } : { error: "Pending pickup not found" };
    } catch (error) {
      console.error("Error fetching pending pickup:", error);
      throw error;
    }
  }

  // View all canceled/rejected pickups (status = 0 in Collections)
  async getAllCanceledPickups() {
    try {
      const pool = await mssql.connect(sqlconfig);
      const query = `
        SELECT 
          c.collection_id, 
          c.collector_name, 
          p.pickup_id, 
          p.location, 
          p.date, 
          p.category
        FROM Collections c
        INNER JOIN Pickup p ON c.pickup_id = p.pickup_id
        WHERE c.status = 0
      `;

      const result = (await pool.query(query)).recordset;
      return result.length > 0 ? { pickups: result } : { message: "No canceled pickups" };
    } catch (error) {
      console.error("Error fetching canceled pickups:", error);
      throw error;
    }
  }

  // View a single canceled pickup
  async getSingleCanceledPickup(collection_id: string) {
    try {
      const pool = await mssql.connect(sqlconfig);
      const query = `
        SELECT 
          c.collection_id, 
          c.collector_name, 
          p.pickup_id, 
          p.location, 
          p.date, 
          p.category
        FROM Collections c
        INNER JOIN Pickup p ON c.pickup_id = p.pickup_id
        WHERE c.status = 0 AND c.collection_id = @collection_id
      `;

      const result = (
        await pool
          .request()
          .input("collection_id", mssql.VarChar, collection_id)
          .query(query)
      ).recordset[0];

      return result ? { pickup: result } : { error: "Canceled pickup not found" };
    } catch (error) {
      console.error("Error fetching canceled pickup:", error);
      throw error;
    }
  }

  async getCollectorAnalytics(user_id: string) {
    const pool = await mssql.connect(sqlconfig);
    const result = await pool
      .request()
      .input('user_id', mssql.VarChar, user_id)
      .execute('getCollectorAnalytics');
    
    const recordset = result.recordset;
    if (recordset.length === 0) {
      return {
        pending_requests: 0,
        completed_requests: 0,
        category_stats: []
      };
    }

    const analytics = {
      pending_requests: recordset[0].pending_requests,
      completed_requests: recordset[0].completed_requests,
      category_stats: recordset.map(row => ({
        category: row.category,
        count: row.category_count
      }))
    };
    return analytics;
  }
}