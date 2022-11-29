CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE catagories(
	id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
	name VARCHAR NOT NULL
);

CREATE TABLE contacts(
	id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
	name VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	phone VARCHAR,
	category_id UUID,
	FOREIGN KEY(category_id) REFERENCES catagories(id)
);
