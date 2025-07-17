const pool = require("../config/db");

const trackUser = async (useragent) => {
  const result = await pool.query("INSERT INTO tracker (user_agent) VALUES ($1) RETURNING *", [useragent]);
  return result.rows[0];
};

const getTrackedUsersDay = async () => {
  const result = await pool.query(`
        WITH last_10_days AS (
            SELECT generate_series(
                CURRENT_DATE - INTERVAL '9 days', 
                CURRENT_DATE, 
                INTERVAL '1 day'
            )::DATE AS visit_date
        )
        SELECT 
            l.visit_date, 
            COALESCE(COUNT(t.time_stamp), 0) AS total_visits
        FROM last_10_days l
        LEFT JOIN tracker t ON DATE(t.time_stamp) = l.visit_date
        GROUP BY l.visit_date
        ORDER BY l.visit_date DESC;
        `);
  return result.rows;
};
const getTrackedUsersWeek = async () => {
  const result = await pool.query(`
        WITH last_10_weeks AS (
            SELECT generate_series(
                DATE_TRUNC('week', CURRENT_DATE) - INTERVAL '9 weeks',
                DATE_TRUNC('week', CURRENT_DATE),
                INTERVAL '1 week'
            )::DATE AS week_start
        )
        SELECT 
            l.week_start, 
            COALESCE(COUNT(t.id), 0) AS total_visits
        FROM last_10_weeks l
        LEFT JOIN tracker t ON DATE_TRUNC('week', t.time_stamp) = l.week_start
        GROUP BY l.week_start
        ORDER BY l.week_start DESC;
          `);
  return result.rows;
};
const getTrackedUsersMonth = async () => {
  const result = await pool.query(`
        WITH last_10_months AS (
            SELECT generate_series(
                DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '9 months',
                DATE_TRUNC('month', CURRENT_DATE),
                INTERVAL '1 month'
            )::DATE AS month_start
        )
        SELECT 
            l.month_start, 
            COALESCE(COUNT(t.id), 0) AS total_visits
        FROM last_10_months l
        LEFT JOIN tracker t ON DATE_TRUNC('month', t.time_stamp) = l.month_start
        GROUP BY l.month_start
        ORDER BY l.month_start DESC
          `);
  return result.rows;
};

const getTotalTrackedUsers = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM tracker");
  return result.rows[0].count;
};
module.exports = {
  trackUser,
  getTrackedUsersDay,
  getTrackedUsersWeek,
  getTrackedUsersMonth,
  getTotalTrackedUsers,
};
