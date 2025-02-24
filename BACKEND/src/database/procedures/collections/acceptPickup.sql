CREATE OR ALTER PROCEDURE acceptPickup
    @collection_id VARCHAR(255),
    @user_id VARCHAR(255),
    @pickup_id VARCHAR(255)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Update pickup status to 1 (approved)
        UPDATE Pickup
        SET status = 1
        WHERE pickup_id = @pickup_id;

        -- Insert into Collections table
        INSERT INTO Collections (
            collection_id,
            user_id,
            pickup_id,
            collector_name,
            pickup_date,
            category,
            status
        )
        SELECT
            @collection_id,
            @user_id,
            P.pickup_id,
            U.username,
            P.date,
            P.category,
            1 -- Status = 1 (approved)
        FROM Pickup P
        INNER JOIN Users U ON U.user_id = @user_id
        WHERE P.pickup_id = @pickup_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;