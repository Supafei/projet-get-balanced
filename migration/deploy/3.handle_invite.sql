-- SQLBook: Code
BEGIN;

CREATE TABLE invite (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_email text NOT NULL,
planner_id int NOT NULL,
);

COMMIT;