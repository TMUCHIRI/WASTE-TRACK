CREATE PROCEDURE getAdminAnalytics
AS
BEGIN
  -- Total Requests: All pickups
  DECLARE @totalRequests INT;
  SET @totalRequests = (SELECT COUNT(*) FROM Pickup);

  -- Pending Requests: Active pickups not yet accepted
  DECLARE @pendingRequests INT;
  SET @pendingRequests = (
    SELECT COUNT(*)
    FROM Pickup p
    WHERE p.status = 1
    AND NOT EXISTS (SELECT 1 FROM Collections c WHERE c.pickup_id = p.pickup_id)
  );

  -- Completed Requests: Collections with status = 1
  DECLARE @completedRequests INT;
  SET @completedRequests = (SELECT COUNT(*) FROM Collections c WHERE c.status = 1);

  -- Total Collectors: Users with role 'collector'
  DECLARE @totalCollectors INT;
  SET @totalCollectors = (SELECT COUNT(*) FROM Users u WHERE u.role = 'collector');

  -- Total Users: Users with role 'user'
  DECLARE @totalUsers INT;
  SET @totalUsers = (SELECT COUNT(*) FROM Users u WHERE u.role = 'user');

  -- Category Stats: Count of completed collections by category
  SELECT 
    @totalRequests AS total_requests,
    @pendingRequests AS pending_requests,
    @completedRequests AS completed_requests,
    @totalCollectors AS total_collectors,
    @totalUsers AS total_users,
    c.category,
    COUNT(c.collection_id) AS category_count
  FROM Collections c
  WHERE c.status = 1
  GROUP BY c.category;
END