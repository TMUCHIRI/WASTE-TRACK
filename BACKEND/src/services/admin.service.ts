import mssql from 'mssql';
import { sqlconfig } from '../config/sql.config';

export class AdminService {
  async getAdminAnalytics() {
    const pool = await mssql.connect(sqlconfig);
    const result = await pool.request().execute('getAdminAnalytics');
    
    const recordset = result.recordset;
    if (recordset.length === 0) {
      return {
        total_requests: (await pool.request().query('SELECT COUNT(*) AS count FROM Pickup')).recordset[0].count,
        pending_requests: (await pool.request().query(
          "SELECT COUNT(*) AS count FROM Pickup p WHERE p.status = 1 AND NOT EXISTS (SELECT 1 FROM Collections c WHERE c.pickup_id = p.pickup_id)"
        )).recordset[0].count,
        completed_requests: 0,
        total_collectors: (await pool.request().query("SELECT COUNT(*) AS count FROM Users WHERE role = 'collector'")).recordset[0].count,
        total_users: (await pool.request().query("SELECT COUNT(*) AS count FROM Users WHERE role = 'user'")).recordset[0].count,
        category_stats: []
      };
    }

    const analytics = {
      total_requests: recordset[0].total_requests,
      pending_requests: recordset[0].pending_requests,
      completed_requests: recordset[0].completed_requests,
      total_collectors: recordset[0].total_collectors,
      total_users: recordset[0].total_users,
      category_stats: recordset.map(row => ({
        category: row.category,
        count: row.category_count
      }))
    };
    return analytics;
  }
}

export const adminServiceInstance = new AdminService();