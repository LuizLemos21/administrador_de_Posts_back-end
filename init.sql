-- Create table for usuario
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
);

-- Create table for post
CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    conteudo TEXT NOT NULL,
    dataagendamento TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    likes INTEGER DEFAULT 0,
    comentarios INTEGER DEFAULT 0,
    favoritacoes INTEGER DEFAULT 0,
    compartilhamentos INTEGER DEFAULT 0,
    userid INTEGER NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(userid) 
        REFERENCES usuario(id)
);

-- Create table for apiredesocial
CREATE TABLE apiredesocial (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    endpoit TEXT NOT NULL,
    userid INTEGER NOT NULL,
    acessToken TEXT NOT NULL,
    socialNetwork TEXT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(userid) 
        REFERENCES usuario(id)
);

-- Create table for admin
CREATE TABLE admin (
    userid INTEGER PRIMARY KEY,
    CONSTRAINT fk_user
        FOREIGN KEY(userid) 
        REFERENCES usuario(id)
);
