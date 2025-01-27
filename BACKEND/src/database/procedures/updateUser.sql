CREATE OR ALTER PROCEDURE updateUser(
    @email VARCHAR(255),
    @password VARCHAR(255)
) AS
    BEGIN
    UPDATE Users SET password = @password WHERE email = @email;
    END;