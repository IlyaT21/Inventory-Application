PGDMP      1                }            inventory_application     16.6 (Ubuntu 16.6-1.pgdg24.04+1)     17.2 (Ubuntu 17.2-1.pgdg24.04+1)     u           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            v           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            w           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            x           1262    17899    inventory_application    DATABASE     �   CREATE DATABASE inventory_application WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
 %   DROP DATABASE inventory_application;
                     postgres    false            �            1259    17907 
   categories    TABLE     Y   CREATE TABLE public.categories (
    id smallint NOT NULL,
    name character varying
);
    DROP TABLE public.categories;
       public         heap r       postgres    false            �            1259    17915    categories_id_seq    SEQUENCE     �   ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    216            �            1259    17900    products    TABLE     �   CREATE TABLE public.products (
    id smallint NOT NULL,
    price real,
    category_id smallint DEFAULT 1,
    name character varying
);
    DROP TABLE public.products;
       public         heap r       postgres    false            �            1259    17914    products_id_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    215            p          0    17907 
   categories 
   TABLE DATA           .   COPY public.categories (id, name) FROM stdin;
    public               postgres    false    216   [       o          0    17900    products 
   TABLE DATA           @   COPY public.products (id, price, category_id, name) FROM stdin;
    public               postgres    false    215   �       y           0    0    categories_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.categories_id_seq', 123, true);
          public               postgres    false    218            z           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 7, true);
          public               postgres    false    217            �           2606    17913    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public                 postgres    false    216            �           2606    17906    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public                 postgres    false    215            �           2606    17922    categories unique_category_name 
   CONSTRAINT     Z   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT unique_category_name UNIQUE (name);
 I   ALTER TABLE ONLY public.categories DROP CONSTRAINT unique_category_name;
       public                 postgres    false    216            �           2606    17916 !   products product_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) NOT VALID;
 K   ALTER TABLE ONLY public.products DROP CONSTRAINT product_category_id_fkey;
       public               postgres    false    3292    215    216            p   <   x�37��KN,IM�/ʬJM�27�LO,�2��LJͫ���244��-M��/..����� ��]      o   '   x�3�442�47�L,-��2�46�,8���S�b���� t�     