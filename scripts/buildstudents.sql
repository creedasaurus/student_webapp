-- Database: school

DROP DATABASE IF EXISTS school;

CREATE DATABASE school
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS s_info;

CREATE TABLE s_info (
	    id SERIAL PRIMARY KEY,
	    fname VARCHAR(15) NOT NULL,
	    lname VARCHAR(15) NOT NULL,
	    startDate DATE,
	    street VARCHAR(35),
	    city VARCHAR(15),
	    state VARCHAR(2),
	    zip INT,
	    phone VARCHAR(8),
	    s_year INT,
	    active BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year) 
VALUES ('Lois','Hanson','1993-03-12','923 North 1400 East','Williamsburg','ID',93673,'673-3114',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Alex','Peterson','1994-07-11','931 South 300 West','Williamsburg','ID',93673,'679-2116',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Elizabeth','Howard','1994-03-19','1726 East 1330 North','Williamsburg','ID',93679,'734-3219',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Emmelie','Well','1992-12-23','2710 West 3700 North','Williamsburg','ID',93667,'369-3334',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Anna','Ballicki','1993-09-14','2710 West 3700 North','Purdie','ID',93667,'369-3334',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Daniel','McCormic','1993-03-29','44 West 300 South','Greenville','ID',93639,'739-2131',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Joseph','Read','1994-04-19','92 South 200 East','Green Park','ID',93619,'369-3629',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Jake','Calvert','1992-10-27','103 South 1230 East','Blythville','ID',93699,'739-3171',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Jake','Paterson','1993-12-03 00:00:00','103 South 1230 East','Blythville','ID',93699,'739-3171',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Sara','Calvert','1994-07-12 00:00:00','371 North 1420 East','Williamsburg','ID',93673,'734-1097',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Jared','Anderson','1992-11-23 00:00:00','706 North 300 East','Williamsburg','ID',93673,'793-3129',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('So-Ri','Choi','1994-06-04 00:00:00','706 North 300 East','Williamsburg','ID',93673,'793-3129',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Edward','Hashimoto','1993-07-27 00:00:00','1237 East Orchard Heights','Williamsburg','ID',93673,'733-0469',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Joe','Larson','1994-02-21 00:00:00','1237 Island Dr. #2','Williamsburg','ID',93673,'679-1629',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Jon','Diom','1994-02-13 00:00:00','79 North Main PO Box 79','Collinston','ID',93620,'239-3392',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Jenna','Larsen','1993-12-14 00:00:00','PO Box 33 463 West Main Street','Richards','ID',93637,'439-2221',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Aonna','Saker','1993-03-24 00:00:00','311 East 30 North','Jonefield','ID',93667,'369-3336',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Josh','Alexander','1993-12-27 00:00:00','322 East 200 South','Williamsburg','ID',93673,'733-0336',3);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Josie','Kane','1993-03-03 00:00:00','64 Canterbury Lane','Williamsburg','ID',93673,'679-0200',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Julius','Brooks','1993-06-19 00:00:00','937 Sumac Drive','Williamsburg','ID',93673,'733-6790',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Derrick','Dovovan','1993-02-26 00:00:00','373 Edgewood Dr.','Harrisburg','ID',93632,'734-3176',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('John','Hank','1993-01-06 00:00:00','270 West 400 South','Williamsburg','ID',93673,'734-1643',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Gordon','O''Brian','1993-02-03 00:00:00','397 N 300 W','Williamsburg','ID',94321,'673-2344',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Thomas','Steen','1992-09-01 00:00:00','373 Bringhurst Dr.','Harrisburg','ID',93632,'679-4000',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Rick','Williams','1993-03-22 00:00:00','114 East Stadium Dr.','Williamsburg','ID',93622,'797-6914',4);

INSERT INTO s_info (fname, lname, startDate, street, city, state, zip, phone, s_year)
VALUES ('Nate','Hatch','1994-01-19 00:00:00','179 West 1190 North','Williamsburg','ID',93679,'673-4490',3);


