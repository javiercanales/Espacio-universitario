/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     03-07-2020 12:28:31                          */
/*==============================================================*/


drop index RESPECTO_A_COMUNA_FK;

drop index REFERENTE_A_CATEGORIA_FK;

drop index PUEDE_PUBLICAR_FK;

drop index EU_AVISO_PK;

drop table EU_AVISO;

drop index EU_CATEGORIA_AVISO_PK;

drop table EU_CATEGORIA_AVISO;

drop index COMENTA_AVISO_FK;

drop index COMENTA_AVISO2_FK;

drop index EU_COMENTA_AVISO_PK;

drop table EU_COMENTA_AVISO;

drop index COMENTA_FORO_FK;

drop index COMENTA_FORO2_FK;

drop index EU_COMENTA_FORO_PK;

drop table EU_COMENTA_FORO;

drop index UBICADA_EN_REGION_FK;

drop index EU_COMUNA_PK;

drop table EU_COMUNA;

drop index DENUNCIA_AVISO_FK;

drop index DENUNCIA_AVISO2_FK;

drop index EU_DENUNCIA_AVISO_PK;

drop table EU_DENUNCIA_AVISO;

drop index REFERENTE_A_TEMATICA_FK;

drop index CIERRA_TEMA_FORO_FK;

drop index EU_FORO_PK;

drop table EU_FORO;

drop index MODERA_FORO_FK;

drop index MODERA_FORO2_FK;

drop index EU_MODERA_FORO_PK;

drop table EU_MODERA_FORO;

drop index EU_REGION_PK;

drop table EU_REGION;

drop index EU_TEMA_FORO_PK;

drop table EU_TEMA_FORO;

drop index EU_TIPO_USUARIO_PK;

drop table EU_TIPO_USUARIO;

drop index EU_UNIVERSIDAD_PK;

drop table EU_UNIVERSIDAD;

drop index PERTENECE_A_UNIVERSIDAD_FK;

drop index ES_DEL_TIPO_FK;

drop index EU_USUARIO_PK;

drop table EU_USUARIO;

drop index VALORA_AVISOS_FK;

drop index VALORA_AVISOS2_FK;

drop index EU_VALORA_AVISO_PK;

drop table EU_VALORA_AVISO;

/*==============================================================*/
/* Table: EU_AVISO                                              */
/*==============================================================*/
create table EU_AVISO (
   EA_ID                INT4                 not null,
   EA_ID_USUARIO        INT4                 not null,
   ID_COM_AV2           INT4                 null,
   EA_ID_COMUNA         INT4                 null,
   EA_TITULO            VARCHAR(250)         null,
   EA_DESCRIP           VARCHAR(2500)        null,
   EA_PRECIO            INT4                 null,
   EA_ESTADO            BOOL                 null,
   EA_FECHA_PUBLIC      DATE                 null,
   EA_FECHA_EXPIR       DATE                 null,
   EA_FECHA_ULT_EDI     DATE                 null,
   EA_TIENE_IMAGENES    BOOL                 null,
   EA_CANTIDAD_IMG      NUMERIC(5,0)         null,
   EA_PATH_IMG1         VARCHAR(1024)        null,
   EA_PATH_IMG2         VARCHAR(1024)        null,
   EA_PATH_IMG3         VARCHAR(1024)        null,
   EA_PATH_IMG4         VARCHAR(1024)        null,
   EA_PATH_IMG5         VARCHAR(1024)        null,
   constraint PK_EU_AVISO primary key (EA_ID)
);

/*==============================================================*/
/* Index: EU_AVISO_PK                                           */
/*==============================================================*/
create unique index EU_AVISO_PK on EU_AVISO (
EA_ID
);

/*==============================================================*/
/* Index: PUEDE_PUBLICAR_FK                                     */
/*==============================================================*/
create  index PUEDE_PUBLICAR_FK on EU_AVISO (
EA_ID_USUARIO
);

/*==============================================================*/
/* Index: REFERENTE_A_CATEGORIA_FK                              */
/*==============================================================*/
create  index REFERENTE_A_CATEGORIA_FK on EU_AVISO (
ID_COM_AV2
);

/*==============================================================*/
/* Index: RESPECTO_A_COMUNA_FK                                  */
/*==============================================================*/
create  index RESPECTO_A_COMUNA_FK on EU_AVISO (
EA_ID_COMUNA
);

/*==============================================================*/
/* Table: EU_CATEGORIA_AVISO                                    */
/*==============================================================*/
create table EU_CATEGORIA_AVISO (
   ID_COM_AV2           INT4                 not null,
   ECA_NOMBRE           VARCHAR(250)         null,
   ECA_FECHA_CREACION   DATE                 null,
   constraint PK_EU_CATEGORIA_AVISO primary key (ID_COM_AV2)
);

/*==============================================================*/
/* Index: EU_CATEGORIA_AVISO_PK                                 */
/*==============================================================*/
create unique index EU_CATEGORIA_AVISO_PK on EU_CATEGORIA_AVISO (
ID_COM_AV2
);

/*==============================================================*/
/* Table: EU_COMENTA_AVISO                                      */
/*==============================================================*/
create table EU_COMENTA_AVISO (
   ECO_ID_USUARIO       INT4                 not null,
   ECO_ID_AVISO         INT4                 not null,
   ECO_COMENTARIO       VARCHAR(1024)        null,
   ECO_FECHA_COM        DATE                 null,
   constraint PK_EU_COMENTA_AVISO primary key (ECO_ID_USUARIO, ECO_ID_AVISO)
);

/*==============================================================*/
/* Index: EU_COMENTA_AVISO_PK                                   */
/*==============================================================*/
create unique index EU_COMENTA_AVISO_PK on EU_COMENTA_AVISO (
ECO_ID_USUARIO,
ECO_ID_AVISO
);

/*==============================================================*/
/* Index: COMENTA_AVISO2_FK                                     */
/*==============================================================*/
create  index COMENTA_AVISO2_FK on EU_COMENTA_AVISO (
ECO_ID_USUARIO
);

/*==============================================================*/
/* Index: COMENTA_AVISO_FK                                      */
/*==============================================================*/
create  index COMENTA_AVISO_FK on EU_COMENTA_AVISO (
ECO_ID_AVISO
);

/*==============================================================*/
/* Table: EU_COMENTA_FORO                                       */
/*==============================================================*/
create table EU_COMENTA_FORO (
   ECF_ID               INT4                 not null,
   ECF_ID_FORO          INT4                 not null,
   ECF_COMENTARIO       VARCHAR(1024)        null,
   ECF_FECHA_COM        DATE                 null,
   constraint PK_EU_COMENTA_FORO primary key (ECF_ID, ECF_ID_FORO)
);

/*==============================================================*/
/* Index: EU_COMENTA_FORO_PK                                    */
/*==============================================================*/
create unique index EU_COMENTA_FORO_PK on EU_COMENTA_FORO (
ECF_ID,
ECF_ID_FORO
);

/*==============================================================*/
/* Index: COMENTA_FORO2_FK                                      */
/*==============================================================*/
create  index COMENTA_FORO2_FK on EU_COMENTA_FORO (
ECF_ID
);

/*==============================================================*/
/* Index: COMENTA_FORO_FK                                       */
/*==============================================================*/
create  index COMENTA_FORO_FK on EU_COMENTA_FORO (
ECF_ID_FORO
);

/*==============================================================*/
/* Table: EU_COMUNA                                             */
/*==============================================================*/
create table EU_COMUNA (
   EC_ID                INT4                 not null,
   EC_ID_REGION         INT4                 null,
   EC_NOMBRE            VARCHAR(250)                 null,
   constraint PK_EU_COMUNA primary key (EC_ID)
);

/*==============================================================*/
/* Index: EU_COMUNA_PK                                          */
/*==============================================================*/
create unique index EU_COMUNA_PK on EU_COMUNA (
EC_ID
);

/*==============================================================*/
/* Index: UBICADA_EN_REGION_FK                                  */
/*==============================================================*/
create  index UBICADA_EN_REGION_FK on EU_COMUNA (
EC_ID_REGION
);

/*==============================================================*/
/* Table: EU_DENUNCIA_AVISO                                     */
/*==============================================================*/
create table EU_DENUNCIA_AVISO (
   EDA_ID_USUARIO       INT4                 not null,
   EDA_ID_AVISO         INT4                 not null,
   EDA_COMENTARIO       VARCHAR(1024)        null,
   EDA_FECHA_DENUNCIA   DATE                 null,
   constraint PK_EU_DENUNCIA_AVISO primary key (EDA_ID_USUARIO, EDA_ID_AVISO)
);

/*==============================================================*/
/* Index: EU_DENUNCIA_AVISO_PK                                  */
/*==============================================================*/
create unique index EU_DENUNCIA_AVISO_PK on EU_DENUNCIA_AVISO (
EDA_ID_USUARIO,
EDA_ID_AVISO
);

/*==============================================================*/
/* Index: DENUNCIA_AVISO2_FK                                    */
/*==============================================================*/
create  index DENUNCIA_AVISO2_FK on EU_DENUNCIA_AVISO (
EDA_ID_USUARIO
);

/*==============================================================*/
/* Index: DENUNCIA_AVISO_FK                                     */
/*==============================================================*/
create  index DENUNCIA_AVISO_FK on EU_DENUNCIA_AVISO (
EDA_ID_AVISO
);

/*==============================================================*/
/* Table: EU_FORO                                               */
/*==============================================================*/
create table EU_FORO (
   EF_ID                INT4                 not null,
   ID_COM_AV3           INT4                 null,
   EF_TITULO            VARCHAR(250)         null,
   EF_DESCRIP           VARCHAR(2500)        null,
   EF_ESTADO            BOOL                 null,
   EF_FECHA_CREACION    DATE                 null,
   EF_FECHA_CIERRE      DATE                 null,
   EF_ID_USUARIO_CIERRE INT4                 null,
   constraint PK_EU_FORO primary key (EF_ID)
);

/*==============================================================*/
/* Index: EU_FORO_PK                                            */
/*==============================================================*/
create unique index EU_FORO_PK on EU_FORO (
EF_ID
);

/*==============================================================*/
/* Index: CIERRA_TEMA_FORO_FK                                   */
/*==============================================================*/
create  index CIERRA_TEMA_FORO_FK on EU_FORO (
EF_ID_USUARIO_CIERRE
);

/*==============================================================*/
/* Index: REFERENTE_A_TEMATICA_FK                               */
/*==============================================================*/
create  index REFERENTE_A_TEMATICA_FK on EU_FORO (
ID_COM_AV3
);

/*==============================================================*/
/* Table: EU_MODERA_FORO                                        */
/*==============================================================*/
create table EU_MODERA_FORO (
   EMF_ID_USUARIO       INT4                 not null,
   EMF_ID_FORO          INT4                 not null,
   EMF_ACCION           VARCHAR(25)          null,
   EMF_FECHA_MOD        DATE                 null,
   constraint PK_EU_MODERA_FORO primary key (EMF_ID_USUARIO, EMF_ID_FORO)
);

/*==============================================================*/
/* Index: EU_MODERA_FORO_PK                                     */
/*==============================================================*/
create unique index EU_MODERA_FORO_PK on EU_MODERA_FORO (
EMF_ID_USUARIO,
EMF_ID_FORO
);

/*==============================================================*/
/* Index: MODERA_FORO2_FK                                       */
/*==============================================================*/
create  index MODERA_FORO2_FK on EU_MODERA_FORO (
EMF_ID_USUARIO
);

/*==============================================================*/
/* Index: MODERA_FORO_FK                                        */
/*==============================================================*/
create  index MODERA_FORO_FK on EU_MODERA_FORO (
EMF_ID_FORO
);

/*==============================================================*/
/* Table: EU_REGION                                             */
/*==============================================================*/
create table EU_REGION (
   ER_ID                INT4                 not null,
   ER_NOMBRE            VARCHAR(150)                 null,
   constraint PK_EU_REGION primary key (ER_ID)
);

/*==============================================================*/
/* Index: EU_REGION_PK                                          */
/*==============================================================*/
create unique index EU_REGION_PK on EU_REGION (
ER_ID
);

/*==============================================================*/
/* Table: EU_TEMA_FORO                                          */
/*==============================================================*/
create table EU_TEMA_FORO (
   ID_COM_AV3           INT4                 not null,
   ETF_NOMBRE           VARCHAR(250)         null,
   ETF_FECHA_CREACION   DATE                 null,
   constraint PK_EU_TEMA_FORO primary key (ID_COM_AV3)
);

/*==============================================================*/
/* Index: EU_TEMA_FORO_PK                                       */
/*==============================================================*/
create unique index EU_TEMA_FORO_PK on EU_TEMA_FORO (
ID_COM_AV3
);

/*==============================================================*/
/* Table: EU_TIPO_USUARIO                                       */
/*==============================================================*/
create table EU_TIPO_USUARIO (
   ETU_ID               INT4                 not null,
   ETU_NOMBRE           VARCHAR(250)         null,
   ETU_DESCRIP          VARCHAR(1024)        null,
   constraint PK_EU_TIPO_USUARIO primary key (ETU_ID)
);

/*==============================================================*/
/* Index: EU_TIPO_USUARIO_PK                                    */
/*==============================================================*/
create unique index EU_TIPO_USUARIO_PK on EU_TIPO_USUARIO (
ETU_ID
);

/*==============================================================*/
/* Table: EU_UNIVERSIDAD                                        */
/*==============================================================*/
create table EU_UNIVERSIDAD (
   EUN_ID               INT4                 not null,
   EUN_NOMBRE           VARCHAR(250)         null,
   EUN_DOMINIO_CORREO   VARCHAR(250)         null,
   EUN_DOMINIO_2        VARCHAR(250)         null,
   EUN_FECHA_CREACION   DATE                 null,
   constraint PK_EU_UNIVERSIDAD primary key (EUN_ID)
);

/*==============================================================*/
/* Index: EU_UNIVERSIDAD_PK                                     */
/*==============================================================*/
create unique index EU_UNIVERSIDAD_PK on EU_UNIVERSIDAD (
EUN_ID
);

/*==============================================================*/
/* Table: EU_USUARIO                                            */
/*==============================================================*/
create table EU_USUARIO (
   EUS_ID               INT4                 not null,
   EUS_ID_TIPO          INT4                 not null,
   EUS_ID_UNIV          INT4                 null,
   EUS_NOMBRE           VARCHAR(250)         null,
   EUS_CORREO           VARCHAR(250)         null,
   EUS_CONTRASENA       VARCHAR(25)          null,
   EUS_VALORACION       NUMERIC(5,0)         null,
   EUS_TELEFONO         VARCHAR(12)          null,
   constraint PK_EU_USUARIO primary key (EUS_ID)
);

/*==============================================================*/
/* Index: EU_USUARIO_PK                                         */
/*==============================================================*/
create unique index EU_USUARIO_PK on EU_USUARIO (
EUS_ID
);

/*==============================================================*/
/* Index: ES_DEL_TIPO_FK                                        */
/*==============================================================*/
create  index ES_DEL_TIPO_FK on EU_USUARIO (
EUS_ID_TIPO
);

/*==============================================================*/
/* Index: PERTENECE_A_UNIVERSIDAD_FK                            */
/*==============================================================*/
create  index PERTENECE_A_UNIVERSIDAD_FK on EU_USUARIO (
EUS_ID_UNIV
);

/*==============================================================*/
/* Table: EU_VALORA_AVISO                                       */
/*==============================================================*/
create table EU_VALORA_AVISO (
   EVA_ID_USUARIO       INT4                 not null,
   EVA_ID_AVISO         INT4                 not null,
   EVA_VALORAC          NUMERIC(5,0)         null,
   EVA_COMENTARIO       VARCHAR(1024)        null,
   EVA_FECHA_VALORAC    DATE                 null,
   constraint PK_EU_VALORA_AVISO primary key (EVA_ID_USUARIO, EVA_ID_AVISO)
);

/*==============================================================*/
/* Index: EU_VALORA_AVISO_PK                                    */
/*==============================================================*/
create unique index EU_VALORA_AVISO_PK on EU_VALORA_AVISO (
EVA_ID_USUARIO,
EVA_ID_AVISO
);

/*==============================================================*/
/* Index: VALORA_AVISOS2_FK                                     */
/*==============================================================*/
create  index VALORA_AVISOS2_FK on EU_VALORA_AVISO (
EVA_ID_USUARIO
);

/*==============================================================*/
/* Index: VALORA_AVISOS_FK                                      */
/*==============================================================*/
create  index VALORA_AVISOS_FK on EU_VALORA_AVISO (
EVA_ID_AVISO
);

alter table EU_AVISO
   add constraint FK_EU_AVISO_PUEDE_PUB_EU_USUAR foreign key (EA_ID_USUARIO)
      references EU_USUARIO (EUS_ID)
      on delete restrict on update restrict;

alter table EU_AVISO
   add constraint FK_EU_AVISO_REFERENTE_EU_CATEG foreign key (ID_COM_AV2)
      references EU_CATEGORIA_AVISO (ID_COM_AV2)
      on delete restrict on update restrict;

alter table EU_AVISO
   add constraint FK_EU_AVISO_RESPECTO__EU_COMUN foreign key (EA_ID_COMUNA)
      references EU_COMUNA (EC_ID)
      on delete restrict on update restrict;

alter table EU_COMENTA_AVISO
   add constraint FK_EU_COMEN_COMENTA_A_EU_AVISO foreign key (ECO_ID_AVISO)
      references EU_AVISO (EA_ID)
      on delete restrict on update restrict;

alter table EU_COMENTA_AVISO
   add constraint FK_EU_COMEN_COMENTA_A_EU_USUAR foreign key (ECO_ID_USUARIO)
      references EU_USUARIO (EUS_ID)
      on delete restrict on update restrict;

alter table EU_COMENTA_FORO
   add constraint FK_EU_COMEN_COMENTA_F_EU_FORO foreign key (ECF_ID_FORO)
      references EU_FORO (EF_ID)
      on delete restrict on update restrict;

alter table EU_COMENTA_FORO
   add constraint FK_EU_COMEN_COMENTA_F_EU_USUAR foreign key (ECF_ID)
      references EU_USUARIO (EUS_ID)
      on delete restrict on update restrict;

alter table EU_COMUNA
   add constraint FK_EU_COMUN_UBICADA_E_EU_REGIO foreign key (EC_ID_REGION)
      references EU_REGION (ER_ID)
      on delete restrict on update restrict;

alter table EU_DENUNCIA_AVISO
   add constraint FK_EU_DENUN_DENUNCIA__EU_AVISO foreign key (EDA_ID_AVISO)
      references EU_AVISO (EA_ID)
      on delete restrict on update restrict;

alter table EU_DENUNCIA_AVISO
   add constraint FK_EU_DENUN_DENUNCIA__EU_USUAR foreign key (EDA_ID_USUARIO)
      references EU_USUARIO (EUS_ID)
      on delete restrict on update restrict;

alter table EU_FORO
   add constraint FK_EU_FORO_CIERRA_TE_EU_USUAR foreign key (EF_ID_USUARIO_CIERRE)
      references EU_USUARIO (EUS_ID)
      on delete restrict on update restrict;

alter table EU_FORO
   add constraint FK_EU_FORO_REFERENTE_EU_TEMA_ foreign key (ID_COM_AV3)
      references EU_TEMA_FORO (ID_COM_AV3)
      on delete restrict on update restrict;

alter table EU_MODERA_FORO
   add constraint FK_EU_MODER_MODERA_FO_EU_FORO foreign key (EMF_ID_FORO)
      references EU_FORO (EF_ID)
      on delete restrict on update restrict;

alter table EU_MODERA_FORO
   add constraint FK_EU_MODER_MODERA_FO_EU_USUAR foreign key (EMF_ID_USUARIO)
      references EU_USUARIO (EUS_ID)
      on delete restrict on update restrict;

alter table EU_USUARIO
   add constraint FK_EU_USUAR_ES_DEL_TI_EU_TIPO_ foreign key (EUS_ID_TIPO)
      references EU_TIPO_USUARIO (ETU_ID)
      on delete restrict on update restrict;

alter table EU_USUARIO
   add constraint FK_EU_USUAR_PERTENECE_EU_UNIVE foreign key (EUS_ID_UNIV)
      references EU_UNIVERSIDAD (EUN_ID)
      on delete restrict on update restrict;

alter table EU_VALORA_AVISO
   add constraint FK_EU_VALOR_VALORA_AV_EU_AVISO foreign key (EVA_ID_AVISO)
      references EU_AVISO (EA_ID)
      on delete restrict on update restrict;

alter table EU_VALORA_AVISO
   add constraint FK_EU_VALOR_VALORA_AV_EU_USUAR foreign key (EVA_ID_USUARIO)
      references EU_USUARIO (EUS_ID)
      on delete restrict on update restrict;


/*EU_UNIVERSIDAD*/

insert into eu_universidad (eun_id, eun_nombre, eun_dominio_correo, eun_dominio_2, eun_fecha_creacion) values (1, 'Universidad de Concepción', 'mail.udec.cl', 'com.com', '2020-04-25');
insert into eu_universidad (eun_id, eun_nombre, eun_dominio_correo, eun_dominio_2, eun_fecha_creacion) values (2, 'Universidad del Bío-Bío', 'alumnos.ubiobio.cl', NULL, '2020-04-25');
insert into eu_universidad (eun_id, eun_nombre, eun_dominio_correo, eun_dominio_2, eun_fecha_creacion) values (3, 'Universidad de Chile', 'ug.uchile.cl', NULL, '2020-04-25');
insert into eu_universidad (eun_id, eun_nombre, eun_dominio_correo, eun_dominio_2, eun_fecha_creacion) values (4, 'Universidad de la Frontera', 'ufromail.cl', NULL, '2020-04-25');



/*EU_TIPO_USUARIO*/
insert into eu_tipo_usuario (etu_id, etu_nombre, etu_descrip) values (1, 'admi', 'usuario administrador');
insert into eu_tipo_usuario (etu_id, etu_nombre, etu_descrip) values (2, 'mod', 'usuario moderador');
insert into eu_tipo_usuario (etu_id, etu_nombre, etu_descrip) values (3, 'us', 'usuario estudiante');



/*EU_TEMA_FORO*/
insert into eu_tema_foro (id_com_av3, etf_nombre, etf_fecha_creacion) values (1, 'Tecnología', '2020-04-25');
insert into eu_tema_foro (id_com_av3, etf_nombre, etf_fecha_creacion) values (2, 'Educación', '2020-06-05');
insert into eu_tema_foro (id_com_av3, etf_nombre, etf_fecha_creacion) values (3, 'Comida', '2019-07-03');
insert into eu_tema_foro (id_com_av3, etf_nombre, etf_fecha_creacion) values (4, 'Ocio', '2019-10-08');
insert into eu_tema_foro (id_com_av3, etf_nombre, etf_fecha_creacion) values (5, 'Deporte', '2019-12-25');



/*EU_USUARIO*/
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre, eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (1, 1, 1, 'Goran', 'gpeirson0@mail.udec.cl', '25R4mfJN', 4397, '+569678954');
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre, eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (2, 2, 2, 'Avictor', 'ascottrell1@alumnos.ubiobio.cl', 'oxUAG4WJMi', 6511, '+569678956');
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre, eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (3, 3, 1,'Darn', 'dstandage2@mail.udec.cl', 'IzPKBjLz96H1', 10653, '+569678974');
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre, eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (4, 3, 3,'Cal', 'cdoog3@ug.uchile.cl', '1p0TLaBQtk6d', 6418, '+569678964');
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre, eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (5, 2, 4,'Amanda', 'anashe4@ufromail.cl', 'glhWOLOOW', 1978, '+569678964');




/*EU_CATEGORIA_AVISO*/

insert into eu_categoria_aviso (id_com_av2, eca_nombre, eca_fecha_creacion) values (1, 'clases particulares', '2019-09-18');
insert into eu_categoria_aviso (id_com_av2, eca_nombre, eca_fecha_creacion) values (2, 'arriendos', '2019-09-21');
insert into eu_categoria_aviso (id_com_av2, eca_nombre, eca_fecha_creacion) values (3, 'compra y Venta', '2019-09-20');
insert into eu_categoria_aviso (id_com_av2, eca_nombre, eca_fecha_creacion) values (4, 'trueques', '2019-09-17');


/*EU_REGION*/

insert into eu_region(er_id,er_nombre) values (8,'Región del Bío-Bío');
insert into eu_region(er_id,er_nombre) values (9,'Región de la Araucanía');
insert into eu_region(er_id,er_nombre) values (10,'Región de los Lagos');


/* EU_COMUNA */
insert into eu_comuna(ec_id,ec_id_region,ec_nombre) values (1,8,'Concepción');
insert into eu_comuna(ec_id,ec_id_region,ec_nombre) values (2,8,'Talcahuano');
insert into eu_comuna(ec_id,ec_id_region,ec_nombre) values (3,8,'Penco');


/*EU_AVISO*/
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (1, 2, 1, 'Etiam justo.', 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 231196, true, '2020-01-08', '2020-08-24', NULL, false, 0, NULL, NULL, NULL, NULL, NULL,1);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (2, 4, 1, 'Nulla ut erat id mauris vulputate elementum.', 'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.', 176178, true, '2020-02-28', '2021-04-30', NULL, false, 0, NULL,NULL, NULL, NULL, NULL,1);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (3, 1, 1, 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.', 214695, true, '2020-04-12', '2021-06-12', NULL, false, 0, 'http://dummyimage.com/141x137.jpg/5fa2dd/ffffff', NULL, NULL, NULL, NULL,2);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (4, 3, 2, 'Ut tellus.', 'Quisque ut erat. Curabitur gravida nisi at nibh.', 50664, true, '2020-06-25', '2020-08-07', '2020-03-25', false, 1, NULL, NULL, NULL, NULL, NULL,2);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (5, 1, 2, 'In sagittis dui vel nisl.', 'Nunc purus. Phasellus in felis.', 412299, true, '2020-03-15', '2021-03-14', '2020-03-23', false, 1,NULL, NULL, NULL, NULL,NULL,2);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (6, 4, 4, 'Integer tincidunt ante vel ipsum.', 'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.', 481418, true, '2020-03-05', '2020-06-09', NULL, false, 1, NULL, NULL, NULL, NULL, NULL,3);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (7, 5, 2, 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.', 144886, true, '2020-02-09', '2021-04-11', NULL, true, 1, 'http://dummyimage.com/114x184.bmp/dddddd/000000', NULL, NULL, NULL, NULL,3);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (8, 3, 1, 'Sed vel enim sit amet nunc viverra dapibus.', 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.', 46645, true, '2020-04-27', '2021-03-01', '2020-05-25', true, 1, 'http://dummyimage.com/109x162.bmp/ff4444/ffffff', NULL,NULL, NULL, NULL,2);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (9, 4, 2, 'Suspendisse potenti.', 'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 481743, true, '2020-02-21', '2020-12-16', '2019-07-30', true, 1, 'http://dummyimage.com/157x178.jpg/5fa2dd/ffffff', NULL, NULL, NULL, NULL,3);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (10, 1, 1, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.', 'Nam tristique tortor eu pede.', 164328, false, '2020-05-28', '2020-12-09', NULL, true, 1, 'http://dummyimage.com/203x120.bmp/cc0000/ffffff', NULL, NULL, NULL, NULL,3);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (11, 2, 2, 'Vestibulum ac est lacinia nisi venenatis tristique.', 'Vivamus in felis eu sapien cursus vestibulum.', 324902, false, '2020-05-08', '2021-05-18', '2019-07-23', true, 1, 'http://dummyimage.com/166x128.jpg/5fa2dd/ffffff', NULL, NULL, NULL, NULL,1);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (12, 5, 1, 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.', 359364, false, '2020-05-27', '2020-10-08', NULL, true, 1, 'http://dummyimage.com/183x177.png/5fa2dd/ffffff', NULL, NULL, NULL, NULL,2);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (13, 1, 4, 'Sed vel enim sit amet nunc viverra dapibus.', 'Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', 418355, false, '2020-04-29', '2021-05-02', NULL, true, 1, 'http://dummyimage.com/182x186.bmp/5fa2dd/ffffff', NULL, NULL, NULL, NULL,3);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (14, 3, 4, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.', 'Pellentesque ultrices mattis odio.', 211078, false, '2020-03-30', '2021-02-13', NULL, true, 1, 'http://dummyimage.com/153x134.png/5fa2dd/ffffff', NULL, NULL, NULL, NULL,1);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (15, 1, 4, 'Maecenas pulvinar lobortis est.', 'Integer ac neque. Duis bibendum.', 33379, true, '2020-05-08', '2021-04-06', NULL, true, 1, 'http://dummyimage.com/207x186.png/cc0000/ffffff', NULL, NULL, NULL, NULL,1);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (16, 3, 1, 'Proin at turpis a pede posuere nonummy.', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 438149, false, '2020-04-25', '2020-12-29', NULL, true, 1, 'http://dummyimage.com/148x195.png/dddddd/000000', NULL, NULL, NULL, NULL,2);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (17, 4, 4, 'Pellentesque viverra pede ac diam.', 'In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.', 315931, true, '2020-05-22', '2020-08-17', NULL, true, 1, 'http://dummyimage.com/238x121.png/ff4444/ffffff', NULL, NULL, NULL, NULL,3);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (18, 4, 2, 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.', 457766, true, '2020-01-10', '2020-08-19', NULL, true, 1, 'http://dummyimage.com/189x105.bmp/ff4444/ffffff', NULL, NULL, NULL, NULL,3);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (19, 5, 2, 'Aliquam erat volutpat.', 'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.', 493613, true, '2020-03-09', '2021-07-01', NULL, true, 1, 'http://dummyimage.com/160x244.jpg/ff4444/ffffff', NULL, NULL, NULL, NULL,1);
insert into eu_aviso (ea_id, ea_id_usuario, id_com_av2, ea_titulo, ea_descrip, ea_precio, ea_estado, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_tiene_imagenes, ea_cantidad_img, ea_path_img1, ea_path_img2, ea_path_img3, ea_path_img4, ea_path_img5,ea_id_comuna) values (20, 4, 4, 'In sagittis dui vel nisl.', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.', 119194, true, '2020-05-15', '2021-04-03', NULL, true, 1, 'http://dummyimage.com/158x140.png/5fa2dd/ffffff', NULL, NULL, NULL, NULL,2);



/*EU_VALORA_AVISO*/

insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (5, 1, 1, 'Vivamus in felis eu sapien cursus vestibulum.', '2020-02-27');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (2, 1, 1, 'Vestibulum sed magna at nunc commodo placerat. Praesent blandit.', '2020-03-24');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (3, 2, 2, 'Etiam vel augue. Vestibulum rutrum rutrum neque.', '2020-04-20');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (5, 2, 2, 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', '2020-03-26');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (5, 3, 3, 'Vivamus vestibulum sagittis sapien.', '2020-06-10');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (1, 3, 3, 'In quis justo.', '2020-04-20');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (1, 4, 4, 'Quisque ut erat. Curabitur gravida nisi at nibh.', '2020-06-30');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (4, 4, 4, 'Mauris ullamcorper purus sit amet nulla.', '2020-07-14');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (2, 6, 5, 'Nulla facilisi.', '2020-03-26');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (5, 6, 5, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.', '2020-02-25');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (5, 7, 6, 'Etiam pretium iaculis justo.', '2020-03-15');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (2, 7, 6, 'In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.', '2020-03-10');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (3, 8, 7, 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '2020-05-13');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (2, 8, 7, 'Suspendisse potenti. In eleifend quam a odio.', '2020-04-19');
insert into eu_valora_aviso (eva_id_usuario, eva_id_aviso, eva_valorac, eva_comentario, eva_fecha_valorac) values (2, 9, 8, 'Morbi non quam nec dui luctus rutrum. Nulla tellus.', '2020-02-24');


/*EU_COMENTA_AVISO*/
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (4, 1, 'Vivamus vel nulla eget eros elementum pellentesque.', '2020-01-09');
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (3, 1, 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '2020-02-05');
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (3, 2, 'Suspendisse potenti.', '2020-03-01');
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (1, 2, 'Sed ante.', '2020-03-02');
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (3, 3, 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.', '2020-04-28');
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (2, 3, 'Maecenas tincidunt lacus at velit.', '2020-04-23');
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (4, 4, 'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.', '2020-07-01');
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (3, 4, 'Duis aliquam convallis nunc.', '2020-07-11');
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (2, 5, 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.', '2020-03-21');
insert into eu_comenta_aviso (eco_id_usuario, eco_id_aviso, eco_comentario, eco_fecha_com) values (5, 5, 'Pellentesque eget nunc.', '2020-03-23');


/*EU_DENUNCIA_AVISO*/
insert into eu_denuncia_aviso (eda_id_usuario, eda_id_aviso, eda_comentario, eda_fecha_denuncia) values (1, 1, 'Vivamus vel nulla eget eros elementum pellentesque.', '2020-01-09');
insert into eu_denuncia_aviso (eda_id_usuario, eda_id_aviso, eda_comentario, eda_fecha_denuncia) values (2, 1, 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '2020-02-05');
insert into eu_denuncia_aviso (eda_id_usuario, eda_id_aviso, eda_comentario, eda_fecha_denuncia) values (4, 2, 'Suspendisse potenti.', '2020-03-01');
insert into eu_denuncia_aviso (eda_id_usuario, eda_id_aviso, eda_comentario, eda_fecha_denuncia) values (3, 2, 'Sed ante.', '2020-03-02');



/*EU_FORO*/
insert into eu_foro (ef_id, id_com_av3, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre) values (1, 1, 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', 'Integer a nibh. In quis justo.', true, '2020-02-28', NULL, NULL);
insert into eu_foro (ef_id, id_com_av3, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre) values (2, 2, 'Nulla tempus.', 'Pellentesque at nulla. Suspendisse potenti.', false, '2019-11-18', '2019-12-05', NULL);
insert into eu_foro (ef_id, id_com_av3, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre) values (3, 3, 'Vivamus vestibulum sagittis sapien.', 'Cras pellentesque volutpat dui.', true, '2020-01-16', NULL, 4);
insert into eu_foro (ef_id, id_com_av3, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre) values (4, 4, 'Pellentesque at nulla.', 'Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', true, '2019-08-25', NULL, NULL);
insert into eu_foro (ef_id, id_com_av3, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre) values (5, 5, 'Fusce posuere felis sed lacus.', 'Sed vel enim sit amet nunc viverra dapibus.', true, '2020-06-22', NULL, NULL);


/*EU_COMENTA_FORO*/
insert into eu_comenta_foro (ecf_id, ecf_id_foro, ecf_comentario,ecf_fecha_com) values (1, 1, 'Suspendisse potenti.', '2020-06-16');
insert into eu_comenta_foro (ecf_id, ecf_id_foro, ecf_comentario,ecf_fecha_com) values (2, 2, 'Nam dui.', '2019-11-29');
insert into eu_comenta_foro (ecf_id, ecf_id_foro, ecf_comentario,ecf_fecha_com) values (5, 3, 'Curabitur at ipsum ac tellus semper interdum.', '2020-06-08');
insert into eu_comenta_foro (ecf_id, ecf_id_foro, ecf_comentario,ecf_fecha_com) values (4, 4, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2019-08-28');
insert into eu_comenta_foro (ecf_id, ecf_id_foro, ecf_comentario,ecf_fecha_com) values (3, 5, 'Fusce consequat.', '2020-06-23');



/*EU_MODERA_FORO*/
insert into eu_modera_foro (emf_id_usuario, emf_id_foro, emf_accion,emf_fecha_mod) values (3, 1, 'Suspendisse potenti.', '2020-06-16');
insert into eu_modera_foro (emf_id_usuario, emf_id_foro, emf_accion,emf_fecha_mod) values (4, 2, 'Nam dui.', '2019-11-29');
insert into eu_modera_foro (emf_id_usuario, emf_id_foro, emf_accion,emf_fecha_mod) values (3, 3, 'Curabitur at ipsum ac', '2020-06-08');





