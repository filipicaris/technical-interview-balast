CREATE TABLE drugs (
  id uuid PRIMARY KEY,
  title varchar (255) NOT NULL,
  "version" bigint NOT NULL,
  published_date varchar (255) NOT NULL,
  indications jsonb,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX drugs_title_idx ON drugs (title);