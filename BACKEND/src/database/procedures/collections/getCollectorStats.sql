CREATE PROCEDURE getCollectorAnalytics
  @user_id VARCHAR(255)
AS
BEGIN
  -- Pending Requests: Active pickups not yet accepted by this collector
  DECLARE @pendingRequests INT;
  SET @pendingRequests = (
    SELECT COUNT(*)
    FROM Pickup p
    WHERE p.status = 1
    AND NOT EXISTS (
      SELECT 1 FROM Collections c WHERE c.pickup_id = p.pickup_id AND c.user_id = @user_id
    )
  );

  -- Completed Requests: Collections with status = 1 for this collector
  DECLARE @completedRequests INT;
  SET @completedRequests = (
    SELECT COUNT(*)
    FROM Collections c
    WHERE c.user_id = @user_id AND c.status = 1
  );

  -- Category Stats: Count of completed collections by category
  SELECT 
    @pendingRequests AS pending_requests,
    @completedRequests AS completed_requests,
    c.category,
    COUNT(c.collection_id) AS category_count
  FROM Collections c
  WHERE c.user_id = @user_id AND c.status = 1
  GROUP BY c.category;
END