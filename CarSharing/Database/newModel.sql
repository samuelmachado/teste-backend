--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.17
-- Dumped by pg_dump version 9.5.5

-- Started on 2020-02-10 19:32:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2141 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 188 (class 1259 OID 16605)
-- Name: aluguelCarro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "aluguelCarro" (
    "idAluguel" integer NOT NULL,
    "dataCheckIn" timestamp with time zone,
    "dataCheckOut" timestamp with time zone,
    "fkCarro" integer
);


ALTER TABLE "aluguelCarro" OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16603)
-- Name: aluguelCarro_idAluguel_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "aluguelCarro_idAluguel_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "aluguelCarro_idAluguel_seq" OWNER TO postgres;

--
-- TOC entry 2142 (class 0 OID 0)
-- Dependencies: 187
-- Name: aluguelCarro_idAluguel_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "aluguelCarro_idAluguel_seq" OWNED BY "aluguelCarro"."idAluguel";


--
-- TOC entry 186 (class 1259 OID 16594)
-- Name: carro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE carro (
    id integer NOT NULL,
    "idUnidade" integer,
    "idModelo" integer,
    placa character varying,
    cor character varying
);


ALTER TABLE carro OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16592)
-- Name: carro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE carro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE carro_id_seq OWNER TO postgres;

--
-- TOC entry 2143 (class 0 OID 0)
-- Dependencies: 185
-- Name: carro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE carro_id_seq OWNED BY carro.id;


--
-- TOC entry 182 (class 1259 OID 16569)
-- Name: fabricante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE fabricante (
    id integer NOT NULL,
    fabricante character varying
);


ALTER TABLE fabricante OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 16567)
-- Name: fabricante_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE fabricante_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fabricante_id_seq OWNER TO postgres;

--
-- TOC entry 2144 (class 0 OID 0)
-- Dependencies: 181
-- Name: fabricante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE fabricante_id_seq OWNED BY fabricante.id;


--
-- TOC entry 184 (class 1259 OID 16580)
-- Name: modeloCarro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "modeloCarro" (
    id integer NOT NULL,
    "idFabricante" integer,
    modelo character varying,
    imagem character varying
);


ALTER TABLE "modeloCarro" OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 16578)
-- Name: modeloCarro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "modeloCarro_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "modeloCarro_id_seq" OWNER TO postgres;

--
-- TOC entry 2145 (class 0 OID 0)
-- Dependencies: 183
-- Name: modeloCarro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "modeloCarro_id_seq" OWNED BY "modeloCarro".id;


--
-- TOC entry 2005 (class 2604 OID 16608)
-- Name: idAluguel; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "aluguelCarro" ALTER COLUMN "idAluguel" SET DEFAULT nextval('"aluguelCarro_idAluguel_seq"'::regclass);


--
-- TOC entry 2004 (class 2604 OID 16597)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY carro ALTER COLUMN id SET DEFAULT nextval('carro_id_seq'::regclass);


--
-- TOC entry 2002 (class 2604 OID 16572)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY fabricante ALTER COLUMN id SET DEFAULT nextval('fabricante_id_seq'::regclass);


--
-- TOC entry 2003 (class 2604 OID 16583)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "modeloCarro" ALTER COLUMN id SET DEFAULT nextval('"modeloCarro_id_seq"'::regclass);


--
-- TOC entry 2133 (class 0 OID 16605)
-- Dependencies: 188
-- Data for Name: aluguelCarro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "aluguelCarro" ("idAluguel", "dataCheckIn", "dataCheckOut", "fkCarro") FROM stdin;
\.


--
-- TOC entry 2146 (class 0 OID 0)
-- Dependencies: 187
-- Name: aluguelCarro_idAluguel_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"aluguelCarro_idAluguel_seq"', 1, false);


--
-- TOC entry 2131 (class 0 OID 16594)
-- Dependencies: 186
-- Data for Name: carro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY carro (id, "idUnidade", "idModelo", placa, cor) FROM stdin;
12	427	1	BCS5B68	BRANCO
\.


--
-- TOC entry 2147 (class 0 OID 0)
-- Dependencies: 185
-- Name: carro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('carro_id_seq', 1, false);


--
-- TOC entry 2127 (class 0 OID 16569)
-- Dependencies: 182
-- Data for Name: fabricante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY fabricante (id, fabricante) FROM stdin;
2	Renault
\.


--
-- TOC entry 2148 (class 0 OID 0)
-- Dependencies: 181
-- Name: fabricante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('fabricante_id_seq', 1, false);


--
-- TOC entry 2129 (class 0 OID 16580)
-- Dependencies: 184
-- Data for Name: modeloCarro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "modeloCarro" (id, "idFabricante", modelo, imagem) FROM stdin;
1	2	Kwid	modelos/kwid.png
\.


--
-- TOC entry 2149 (class 0 OID 0)
-- Dependencies: 183
-- Name: modeloCarro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"modeloCarro_id_seq"', 1, true);


--
-- TOC entry 2009 (class 2606 OID 16602)
-- Name: carro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY carro
    ADD CONSTRAINT carro_pkey PRIMARY KEY (id);


--
-- TOC entry 2007 (class 2606 OID 16577)
-- Name: fabricante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY fabricante
    ADD CONSTRAINT fabricante_pkey PRIMARY KEY (id);


--
-- TOC entry 2011 (class 2606 OID 16609)
-- Name: aluguelCarro_fkCarro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "aluguelCarro"
    ADD CONSTRAINT "aluguelCarro_fkCarro_fkey" FOREIGN KEY ("fkCarro") REFERENCES carro(id);


--
-- TOC entry 2010 (class 2606 OID 16587)
-- Name: modeloCarro_idFabricante_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "modeloCarro"
    ADD CONSTRAINT "modeloCarro_idFabricante_fkey" FOREIGN KEY ("idFabricante") REFERENCES fabricante(id);


--
-- TOC entry 2140 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2020-02-10 19:32:08

--
-- PostgreSQL database dump complete
--

