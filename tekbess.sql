create database tekbees;

use tekbees;

create table products(
	id int auto_increment,
    barCode varchar(100),
    name varchar(100),
    description varchar(300),
    price int,
    stock int,
    categoryId int,
    primary key(id)
);

create table categories(
	id int auto_increment,
    name varchar(100),
    descripton varchar(300),
    primary key(id)
);


create table client(
	id int auto_increment,
    docTypeId char(4),
    doc bigint,
    fullName varchar(200),
    email varchar(100),
    address varchar(200),
    city varchar(100),
    primary key(id)
);

create table invoce(
	id int auto_increment,
    productId int,
    clientId int,
    qty int,
    primary key(id)
);


