BEGIN;

CREATE TABLE users
(
  userid SERIAL,
  username TEXT DEFAULT NULL,
  user_password TEXT DEFAULT NULL,
  token TEXT DEFAULT NULL
);

COMMIT;