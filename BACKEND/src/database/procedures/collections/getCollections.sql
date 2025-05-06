CREATE PROCEDURE getCollectorCollections
  @user_id VARCHAR(255)
AS
BEGIN
  SELECT 
    c.collection_id,
    c.pickup_id,
    c.collector_name,
    CONVERT(VARCHAR, c.pickup_date, 105) AS pickup_date, -- Format as dd-MM-yyyy
    c.category,
    CAST(c.status AS INT) AS status,
    u.username,
    u.email,
    p.location
  FROM Collections c
  INNER JOIN Pickup p ON c.pickup_id = p.pickup_id
  INNER JOIN Users u ON p.user_id = u.user_id -- Join with Pickup's user_id (creator)
  WHERE c.user_id = @user_id; -- Filter by collector's user_id
END