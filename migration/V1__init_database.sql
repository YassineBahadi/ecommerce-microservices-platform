CREATE SEQUENCE IF NOT EXISTS category_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS product_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE category
(
    id          INTEGER NOT NULL,
    description VARCHAR(255),
    name        VARCHAR(255),
    CONSTRAINT category_pkey PRIMARY KEY (id)
);

CREATE TABLE product
(
    id                 INTEGER          NOT NULL,
    description        VARCHAR(255),
    name               VARCHAR(255),
    available_quantity DOUBLE PRECISION NOT NULL,
    price              numeric(38, 2),
    category_id        INTEGER,
    CONSTRAINT product_pkey PRIMARY KEY (id)
);

ALTER TABLE product
    ADD CONSTRAINT foreignkeycategoryconstraint FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE NO ACTION;