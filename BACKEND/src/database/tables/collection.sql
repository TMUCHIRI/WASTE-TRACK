CREATE TABLE Collections (
    collection_id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    pickup_id VARCHAR(255) NOT NULL,
    collector_name VARCHAR(255) NOT NULL,
    pickup_date DATETIME NOT NULL,
    category VARCHAR(255) NOT NULL,
    status BIT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (pickup_id) REFERENCES Pickup(pickup_id)
);


SELECT * FROM Collections;