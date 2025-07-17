CREATE TABLE tracker (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_agent VARCHAR(255) NOT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);