CREATE TABLE Pickup(pickup_id VARCHAR(255) PRIMARY KEY NOT NULL, location VARCHAR(255) NOT NULL, date DATETIME NOT NULL, phone_number VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL);


-- Add status column to Pickup table
ALTER TABLE Pickup
ADD status BIT DEFAULT 0 NOT NULL;

SELECT * FROM Pickup;