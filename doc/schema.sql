-- DBMS: PostgreSQL

-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------------------------------------

-- profile
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  display_name VARCHAR(255) NOT NULL,
  image_url VARCHAR(255)
);

INSERT INTO profile (id, display_name)
VALUES ('4111179e-3bfa-4b8a-9588-dfe4a49f90bc','DEMO');

-- auth service (Auth0) and profile relation
CREATE TABLE auth_profile (
  auth_type VARCHAR(255) NOT NULL,
  auth_id VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL,
  email VARCHAR(255),
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

--------------------------------------------------------------------------------

-- board = checkin target
CREATE TABLE board (
  board_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_type VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL
);

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

INSERT INTO board (board_id, board_type, display_name )
VALUES ('63fc77f7-a986-48a6-ab6a-ea544eb0ca8c', 'place', 'Tim Hortons');
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

-- product
CREATE TABLE product (
  board_id UUID PRIMARY KEY,
  barcode VARCHAR(255),
  brands VARCHAR(255),
  categories VARCHAR(255),
  image_url VARCHAR(255),
  FOREIGN KEY (board_id) REFERENCES board(board_id)
);

CREATE INDEX idx_barcode ON product (barcode);

INSERT INTO board (board_id, board_type, display_name )
VALUES (
  '135ed8c0-37cc-4ec9-a03c-a4ab5026582a',
  'product',
  'Bubblemint Excel White'
);
INSERT INTO product (board_id, barcode, brands, categories, image_url)
VALUES (
  '135ed8c0-37cc-4ec9-a03c-a4ab5026582a',
  '0064900409554',
  'Excel',
  'Snacks, Sweet snacks, Confectioneries, Chewing gum, Sugar-free chewing gum',
  'https://images.openfoodfacts.org/images/products/006/490/040/9554/front_en.23.400.jpg'
);

--------------------------------------------------------------------------------

-- checkin
CREATE TABLE checkin (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID NOT NULL,
  user_id UUID NOT NULL,
  comment TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  rate VARCHAR(2) NOT NULL CHECK (rate IN ('+1', '0', '-1')),
  user_date VARCHAR(255) NOT NULL,
  FOREIGN KEY (board_id) REFERENCES board(board_id),
  FOREIGN KEY (user_id) REFERENCES profile(id)
);

CREATE INDEX idx_checkin_created_at ON checkin (created_at);

INSERT INTO checkin (board_id, user_id, comment, created_at, rate, user_date)
VALUES (
  '63fc77f7-a986-48a6-ab6a-ea544eb0ca8c',
  '4111179e-3bfa-4b8a-9588-dfe4a49f90bc',
  'Love it!',
  946684800000,
  '+1',
  '2000-01-01'
);
