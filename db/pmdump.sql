--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-06-10 09:29:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS postmanager;
--
-- TOC entry 4880 (class 1262 OID 16590)
-- Name: postmanager; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postmanager WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';


ALTER DATABASE postmanager OWNER TO postgres;

\connect postmanager

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 4880
-- Name: DATABASE postmanager; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postmanager IS 'database for postmanager application
';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16652)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16592)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id integer NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16591)
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq OWNER TO postgres;

--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 215
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- TOC entry 223 (class 1259 OID 16660)
-- Name: apiredesocial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apiredesocial (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    endpoint character varying(255) NOT NULL,
    userid integer,
    accesstoken character varying,
    "SocialNetwork" character varying
);


ALTER TABLE public.apiredesocial OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16659)
-- Name: apiredesocial_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.apiredesocial_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.apiredesocial_id_seq OWNER TO postgres;

--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 222
-- Name: apiredesocial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.apiredesocial_id_seq OWNED BY public.apiredesocial.id;


--
-- TOC entry 218 (class 1259 OID 16606)
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    id integer NOT NULL,
    conteudo text,
    dataagendamento timestamp without time zone,
    likes integer,
    comentarios integer,
    favoritacoes integer,
    compartilhamentos integer,
    userid integer
);


ALTER TABLE public.post OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16605)
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_id_seq OWNER TO postgres;

--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 217
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- TOC entry 220 (class 1259 OID 16624)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16623)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;

--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- TOC entry 4707 (class 2604 OID 16595)
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- TOC entry 4710 (class 2604 OID 16663)
-- Name: apiredesocial id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apiredesocial ALTER COLUMN id SET DEFAULT nextval('public.apiredesocial_id_seq'::regclass);


--
-- TOC entry 4708 (class 2604 OID 16609)
-- Name: post id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- TOC entry 4709 (class 2604 OID 16627)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- TOC entry 4872 (class 0 OID 16652)
-- Dependencies: 221
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20240429064319-usuario.js
\.


--
-- TOC entry 4867 (class 0 OID 16592)
-- Dependencies: 216
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (id) FROM stdin;
\.


--
-- TOC entry 4874 (class 0 OID 16660)
-- Dependencies: 223
-- Data for Name: apiredesocial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.apiredesocial (id, nome, endpoint, userid, accesstoken, "SocialNetwork") FROM stdin;
2	LinkedIn	https://api.linkedin.com	\N	\N	\N
\.


--
-- TOC entry 4869 (class 0 OID 16606)
-- Dependencies: 218
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (id, conteudo, dataagendamento, likes, comentarios, favoritacoes, compartilhamentos, userid) FROM stdin;
12	aaaaaaaaa	\N	0	0	0	0	6
13	aaaaaaaaaaaaaaaaaaa	1222-12-12 15:18:28	0	0	0	0	\N
14	Sample content for the post	2024-06-15 10:00:00	10	5	3	2	\N
15	Sample content for the post	2024-06-15 10:00:00	10	5	3	2	\N
16	aaaaaaaaaaaaaaaaaaa	1222-12-12 15:18:28	0	0	0	0	\N
17	aaaaaaaaaaaaaaaaa	1000-12-12 15:07:28	0	0	0	0	\N
18	aaaaaaaaaaaaaaaa	2020-12-12 15:01:00	0	0	0	0	\N
21	Teste de Timer	2024-06-09 02:59:00	0	0	0	0	13
\.


--
-- TOC entry 4871 (class 0 OID 16624)
-- Dependencies: 220
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, nome, email, senha) FROM stdin;
7	KungFuPanda345	ednaldopereira@gmail.com	65586867
10	Jooj Baiano	ednaldopereira@gmail.com	1234
6	luizfernando845	luizfernandosilvalemos845@gmail.com	12345
4	rodrigo123	rodrigo123@gmail.com	12345
12	luizlemos0610	luizfernandosilvalemos845@gmail.com	$2b$10$IOKCMYBgMAzxRdAE9K2ab.y8W4MIkvWoKa4zEQSgBpNiO4kR2P3fa
13	thenexo13	fallemospsi@gmail.com	$2b$10$j8JrEN3sMOvKyMuskSZRw.I8iRyVX2rTQ297zVZNSExCv..4zzLiO
14	luizlemos22	denisesilvalemos@hotmail.com	$2b$10$tJSz5lGJe6nTTEb6V9EP.eWJotHh8CI0rF5WO9SPX7yogoRdMVNrG
\.


--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 215
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_seq', 1, false);


--
-- TOC entry 4887 (class 0 OID 0)
-- Dependencies: 222
-- Name: apiredesocial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.apiredesocial_id_seq', 2, true);


--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 217
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_id_seq', 22, true);


--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 14, true);


--
-- TOC entry 4718 (class 2606 OID 16656)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 4712 (class 2606 OID 16597)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- TOC entry 4720 (class 2606 OID 16667)
-- Name: apiredesocial apiredesocial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apiredesocial
    ADD CONSTRAINT apiredesocial_pkey PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 16613)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- TOC entry 4716 (class 2606 OID 16631)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 4721 (class 2606 OID 16632)
-- Name: admin admin_ibfk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_ibfk_1 FOREIGN KEY (id) REFERENCES public.usuario(id);


--
-- TOC entry 4722 (class 2606 OID 16637)
-- Name: post post_ibfk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_ibfk_1 FOREIGN KEY (userid) REFERENCES public.usuario(id);


-- Completed on 2024-06-10 09:29:59

--
-- PostgreSQL database dump complete
--

