CREATE OR ALTER PROCEDURE createPickup(
    @pickup_id VARCHAR(255),
    @location VARCHAR(255),
    @date DATETIME,
    @phone_number VARCHAR(255),
    @category VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Pickup(pickup_id, location, date, phone_number, category)
    VALUES(@pickup_id, @location, @date, @phone_number, @category)
END