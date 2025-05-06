CREATE PROCEDURE getUserPickupHistory
  @userId VARCHAR(255)
AS
BEGIN
  SELECT 
    p.pickup_id AS id,
    p.date AS date,
    c.collector_name AS collector,
    p.category,
    'Completed' AS status -- Since we're filtering for Pickup.status = 0
  FROM Pickup p
  JOIN Collections c ON p.pickup_id = c.pickup_id
  WHERE p.user_id = @userId AND p.status = 1;
END