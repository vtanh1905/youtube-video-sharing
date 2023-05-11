CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.account (
   email VARCHAR(50),
   password VARCHAR(255) NOT NULL,
   PRIMARY KEY(email)
);

CREATE TABLE IF NOT EXISTS app.video (
   id VARCHAR(50),
   email VARCHAR(50) NOT NULL,
   description TEXT,
   PRIMARY KEY(id),
   CONSTRAINT fk_video_to_account
      FOREIGN KEY(email) 
	      REFERENCES app.account(email)
);
