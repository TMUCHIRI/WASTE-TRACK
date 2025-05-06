CREATE TABLE Pickup(pickup_id VARCHAR(255) PRIMARY KEY NOT NULL, location VARCHAR(255) NOT NULL, date DATETIME NOT NULL, phone_number VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL);


-- Add status column to Pickup table
ALTER TABLE Pickup
ADD status BIT DEFAULT 0 NOT NULL;

-- Add user_id to Pickup table (if not already present)
ALTER TABLE Pickup
ADD user_id VARCHAR(255) NOT NULL,
FOREIGN KEY (user_id) REFERENCES Users(user_id);

SELECT * FROM Pickup;
SELECT * FROM Collections;

DELETE FROM Collections;

DELETE FROM Pickup;


SELECT pickup_id, date AS pickup_date, NULL AS collector, category,
       CASE WHEN status = 1 THEN 'Pending' ELSE 'Completed' END AS status
FROM Pickup
WHERE user_id = 'b66eee12-9adf-4de1-8058-e4ad9806d895';
