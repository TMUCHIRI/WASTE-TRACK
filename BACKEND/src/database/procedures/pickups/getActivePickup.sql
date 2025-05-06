CREATE PROCEDURE getActivePickups
  @user_id VARCHAR(255)
AS
BEGIN
  SELECT 
    pickup_id,
    date AS pickup_date,
    NULL AS collector, -- No collector info from Pickup table
    category,
    CASE WHEN status = 1 THEN 'Pending' ELSE 'Completed' END AS status
  FROM Pickup
  WHERE user_id = @user_id;
END