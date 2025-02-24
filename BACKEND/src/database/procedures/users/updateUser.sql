CREATE OR ALTER PROCEDURE updateUser(
    @email VARCHAR(100),
    @password VARCHAR(255),
    @profile_picture VARCHAR(255) = NULL
)AS
BEGIN
  UPDATE Users
  SET 
    password = @password,
    profile_picture = @profile_picture
  WHERE email = @email;
END