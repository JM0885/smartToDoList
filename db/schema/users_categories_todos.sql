DROP TABLE todos;
DROP TABLE categories;
DROP TABLE users;


CREATE TABLE users(
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
);

CREATE TABLE categories(
id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(255)
);

CREATE TABLE todos(
id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER,
category_id INTEGER,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
title VARCHAR(255),
start_date TIMESTAMP,
end_date TIMESTAMP,
api_id VARCHAR(255),
img_url VARCHAR(255),
info_url VARCHAR(255)
);
