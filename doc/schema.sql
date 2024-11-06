-- DBMS: PostgreSQL

-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- profile
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  display_name VARCHAR(255) NOT NULL
);

INSERT INTO profile (id, display_name)
VALUES ('4111179e-3bfa-4b8a-9588-dfe4a49f90bc','DEMO');

-- auth service (Auth0) and profile relation
CREATE TABLE auth_profile (
  auth_type VARCHAR(255) NOT NULL,
  auth_id VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL,
  PRIMARY KEY (auth_type, auth_id),
  FOREIGN KEY (user_id) REFERENCES profile(id)
);

-- user relation
CREATE TABLE user_user (
  user_id UUID NOT NULL,
  friend_id UUID NOT NULL,
  created_at BIGINT NOT NULL,
  PRIMARY KEY (user_id, friend_id),
  FOREIGN KEY (user_id) REFERENCES profile(id),
  FOREIGN KEY (friend_id) REFERENCES profile(id)
);

-- board = checkin target
CREATE TABLE board (
  board_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_type VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL
);

INSERT INTO board (board_id, board_type, display_name )
VALUES ('63fc77f7-a986-48a6-ab6a-ea544eb0ca8c', 'place', 'Tim Hortons');

-- place
CREATE TABLE place (
  board_id UUID PRIMARY KEY,
  map_id VARCHAR(255) UNIQUE NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  map_url VARCHAR(255) NOT NULL,
  type_display_name VARCHAR(255),
  web_url VARCHAR(255),
  FOREIGN KEY (board_id) REFERENCES board(board_id)
);

CREATE INDEX idx_map_id ON place (map_id);

INSERT INTO place (board_id, map_id, address, latitude, longitude, map_url, type_display_name, web_url)
VALUES (
  '63fc77f7-a986-48a6-ab6a-ea544eb0ca8c',
  'ChIJfe2sYHhxhlQR6YR9clFor1Y',
  '555 W Hastings St Unit 6, Vancouver, BC V6B 5K3, Canada',
  49.2849465,
  -123.1119939,
  'https://maps.google.com/?cid=6246325907208635625',
  'Coffee Shop',
  'https://locations.timhortons.ca/en/bc/vancouver/555-hastings-st-west'
);

-- checkin
CREATE TABLE checkin (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID NOT NULL,
  user_id UUID NOT NULL,
  comment TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  starred BOOLEAN NOT NULL,
  user_date VARCHAR(255) NOT NULL,
  FOREIGN KEY (board_id) REFERENCES board(board_id),
  FOREIGN KEY (user_id) REFERENCES profile(id)
);

INSERT INTO checkin (board_id, user_id, comment, created_at, starred, user_date)
VALUES (
  '63fc77f7-a986-48a6-ab6a-ea544eb0ca8c',
  '4111179e-3bfa-4b8a-9588-dfe4a49f90bc',
  'Love it!',
  946684800000,
  true,
  '2000-01-01'
);
