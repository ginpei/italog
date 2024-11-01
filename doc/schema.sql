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

-- create sample place
INSERT INTO place (id, address, display_name, latitude, longitude, map_url, type_display_name, web_url)
VALUES ('ChIJfe2sYHhxhlQR6YR9clFor1Y', '555 W Hastings St Unit 6, Vancouver, BC V6B 5K3, Canada', 'Tim Hortons', 49.2849465, -123.1119939, 'https://maps.google.com/?cid=6246325907208635625', 'Coffee Shop', 'https://locations.timhortons.ca/en/bc/vancouver/555-hastings-st-west');

-- create profile table
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  display_name VARCHAR(255) NOT NULL
);

-- create sample profile
INSERT INTO profile (id, display_name)
VALUES ('4111179e-3bfa-4b8a-9588-dfe4a49f90bc','DEMO');

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

-- create sample visit
INSERT INTO visit (comment, created_at, date, place_id, starred, user_id)
VALUES ('Love it!', 946684800000, '2000-01-01', 'ChIJfe2sYHhxhlQR6YR9clFor1Y', true, '4111179e-3bfa-4b8a-9588-dfe4a49f90bc' );

-- create user relation table
CREATE TABLE user_user (
  user_id UUID NOT NULL,
  friend_id UUID NOT NULL,
  created_at BIGINT NOT NULL,
  PRIMARY KEY (user_id, friend_id),
  FOREIGN KEY (user_id) REFERENCES profile(id),
  FOREIGN KEY (friend_id) REFERENCES profile(id)
);
