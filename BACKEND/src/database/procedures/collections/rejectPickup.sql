CREATE OR ALTER PROCEDURE rejectPickup
    @collection_id VARCHAR(255),
    @pickup_id VARCHAR(255)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Update pickup status to 0 (pending)
        UPDATE Pickup
        SET status = 0
        WHERE pickup_id = @pickup_id;

        -- Update Collections record to 0 (rejected)
        UPDATE Collections
        SET status = 0
        WHERE collection_id = @collection_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;