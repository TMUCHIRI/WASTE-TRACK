CREATE OR ALTER PROCEDURE updatePickup(
    @pickup_id VARCHAR(255),
    @location VARCHAR(255),
    @date DATETIME,
    @phone_number VARCHAR(255),
    @category VARCHAR(255))
AS
BEGIN
    UPDATE Pickup
    SET location = @location,
        date = @date,
        phone_number = @phone_number,
        category = @category
    WHERE pickup_id = @pickup_id
END