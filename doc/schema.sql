-- DBMS: PostgreSQL

-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create place table
CREATE TABLE place (
  id VARCHAR(255) PRIMARY KEY,
  address VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  map_url VARCHAR(255) NOT NULL,
  type_display_name VARCHAR(255),
  web_url VARCHAR(255)
);

-- create profile table
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  display_name VARCHAR(255) NOT NULL
);

-- create auth-profile table
CREATE TABLE auth_profile (
  auth_type VARCHAR(255) NOT NULL,
  auth_id VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL,
  PRIMARY KEY (auth_type, auth_id),
  FOREIGN KEY (user_id) REFERENCES profile(id)
);

-- create visit table
CREATE TABLE visit (
  place_id VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL,
  date VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  starred BOOLEAN NOT NULL,
  PRIMARY KEY (place_id, user_id, date),
  FOREIGN KEY (place_id) REFERENCES place(id),
  FOREIGN KEY (user_id) REFERENCES profile(id)
);
