CREATE TABLE users(
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL
);

