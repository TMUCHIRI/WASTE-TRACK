CREATE OR ALTER PROCEDURE deletePickup(
    @pickup_id VARCHAR(255))
AS
BEGIN
    DELETE FROM Pickup
    WHERE pickup_id = @pickup_id
END