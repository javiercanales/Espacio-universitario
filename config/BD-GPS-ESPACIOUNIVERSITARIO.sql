/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     08-07-2020 23:55:35                          */
/*==============================================================*/


drop index TIENE_IMAGENES_FK;

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

drop index CREA_FORO_FK;

drop index REFERENTE_A_TEMATICA_FK;

drop index CIERRA_TEMA_FORO_FK;

drop index EU_FORO_PK;

drop table EU_FORO;

drop index EU_IMAGENES_PK;

drop table EU_IMAGENES;

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
   EA_ID_CATEG          INT4                 null,
   EA_ID_COMUNA         INT4                 null,
   EA_ID_IMAGENES       INT4                 null,
   EA_TITULO            VARCHAR(250)         null,
   EA_DESCRIP           VARCHAR(2500)        null,
   EA_MATERIA           VARCHAR(250)         null,
   EA_PRECIO            INT4                 null,
   EA_ESTADO            BOOL                 null,
   EA_FECHA_PUBLIC      DATE                 null,
   EA_FECHA_EXPIR       DATE                 null,
   EA_FECHA_ULT_EDI     DATE                 null,
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
EA_ID_CATEG
);

/*==============================================================*/
/* Index: RESPECTO_A_COMUNA_FK                                  */
/*==============================================================*/
create  index RESPECTO_A_COMUNA_FK on EU_AVISO (
EA_ID_COMUNA
);

/*==============================================================*/
/* Index: TIENE_IMAGENES_FK                                     */
/*==============================================================*/
create  index TIENE_IMAGENES_FK on EU_AVISO (
EA_ID_IMAGENES
);

/*==============================================================*/
/* Table: EU_CATEGORIA_AVISO                                    */
/*==============================================================*/
create table EU_CATEGORIA_AVISO (
   ECA_ID               INT4                 not null,
   ECA_NOMBRE           VARCHAR(250)         null,
   ECA_FECHA_CREACION   DATE                 null,
   constraint PK_EU_CATEGORIA_AVISO primary key (ECA_ID)
);

/*==============================================================*/
/* Index: EU_CATEGORIA_AVISO_PK                                 */
/*==============================================================*/
create unique index EU_CATEGORIA_AVISO_PK on EU_CATEGORIA_AVISO (
ECA_ID
);

/*==============================================================*/
/* Table: EU_COMENTA_AVISO                                      */
/*==============================================================*/
create table EU_COMENTA_AVISO (
   ECO_ID_USUARIO       INT4                 not null,
   ECO_ID_AVISO         INT4                 not null,
   ECO_COMENTARIO       VARCHAR(1024)        null,
   ECO_FECHA_COM        TIMESTAMP                 null,
   constraint PK_EU_COMENTA_AVISO primary key (ECO_ID_USUARIO, ECO_ID_AVISO,ECO_FECHA_COM)
);


/*==============================================================*/
/* Index: EU_COMENTA_AVISO_PK                                   */
/*==============================================================*/
create unique index EU_COMENTA_AVISO_PK on EU_COMENTA_AVISO (
ECO_ID_USUARIO,
ECO_ID_AVISO,
ECO_FECHA_COM  
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
   EF_ID_CREADOR        INT4                 not null,
   EF_ID_TEMA           INT4                 null,
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
EF_ID_TEMA
);

/*==============================================================*/
/* Index: CREA_FORO_FK                                          */
/*==============================================================*/
create  index CREA_FORO_FK on EU_FORO (
EF_ID_CREADOR
);

/*==============================================================*/
/* Table: EU_IMAGENES                                           */
/*==============================================================*/
create table EU_IMAGENES (
   EI_ID                INT4                 not null,
   EI_CANTIDAD_IMG      NUMERIC(5,0)         null,
   EI_PATH_IMG1         VARCHAR(1024)        null,
   EI_PATH_IMG2         VARCHAR(1024)        null,
   EI_PATH_IMG3         VARCHAR(1024)        null,
   EI_PATH_IMG4         VARCHAR(1024)        null,
   EI_PATH_IMG5         VARCHAR(1024)        null,
   constraint PK_EU_IMAGENES primary key (EI_ID)
);

/*==============================================================*/
/* Index: EU_IMAGENES_PK                                        */
/*==============================================================*/
create unique index EU_IMAGENES_PK on EU_IMAGENES (
EI_ID
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
   ER_NOMBRE            VARCHAR(250)                 null,
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
   ETF_ID               INT4                 not null,
   ETF_NOMBRE           VARCHAR(250)         null,
   ETF_FECHA_CREACION   DATE                 null,
   constraint PK_EU_TEMA_FORO primary key (ETF_ID)
);

/*==============================================================*/
/* Index: EU_TEMA_FORO_PK                                       */
/*==============================================================*/
create unique index EU_TEMA_FORO_PK on EU_TEMA_FORO (
ETF_ID
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
   EUS_APELLIDO_PAT     VARCHAR(250)         null,
   EUS_APELLIDO_MAT     VARCHAR(250)         null,
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
   add constraint FK_EU_AVISO_REFERENTE_EU_CATEG foreign key (EA_ID_CATEG)
      references EU_CATEGORIA_AVISO (ECA_ID)
      on delete restrict on update restrict;

alter table EU_AVISO
   add constraint FK_EU_AVISO_RESPECTO__EU_COMUN foreign key (EA_ID_COMUNA)
      references EU_COMUNA (EC_ID)
      on delete restrict on update restrict;

alter table EU_AVISO
   add constraint FK_EU_AVISO_TIENE_IMA_EU_IMAGE foreign key (EA_ID_IMAGENES)
      references EU_IMAGENES (EI_ID)
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
   add constraint FK_EU_FORO_CREA_FORO_EU_USUAR foreign key (EF_ID_CREADOR)
      references EU_USUARIO (EUS_ID)
      on delete restrict on update restrict;

alter table EU_FORO
   add constraint FK_EU_FORO_REFERENTE_EU_TEMA_ foreign key (EF_ID_TEMA)
      references EU_TEMA_FORO (ETF_ID)
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

/* INSERCIÓN DE DATOS */

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
insert into eu_tema_foro (etf_id, etf_nombre, etf_fecha_creacion) values (1, 'Tecnología', '2020-04-25');
insert into eu_tema_foro (etf_id, etf_nombre, etf_fecha_creacion) values (2, 'Educación', '2020-06-05');
insert into eu_tema_foro (etf_id, etf_nombre, etf_fecha_creacion) values (3, 'Comida', '2019-07-03');
insert into eu_tema_foro (etf_id, etf_nombre, etf_fecha_creacion) values (4, 'Ocio', '2019-10-08');
insert into eu_tema_foro (etf_id, etf_nombre, etf_fecha_creacion) values (5, 'Deporte', '2019-12-25');



/*EU_USUARIO*/
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre,eus_apellido_pat,eus_apellido_mat,eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (1, 1, 1, 'Goran', 'Morales','Sepúlveda','gpeirson0@mail.udec.cl', '25R4mfJN', 4397, '+569678954');
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre, eus_apellido_pat,eus_apellido_mat,eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (2, 2, 2, 'Avictor', 'Rosales','Navarro', 'ascottrell1@alumnos.ubiobio.cl', 'oxUAG4WJMi', 6511, '+569678956');
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre, eus_apellido_pat,eus_apellido_mat,eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (3, 3, 1,'Darn', 'Muñoz','Fuentes', 'dstandage2@mail.udec.cl', 'IzPKBjLz96H1', 10653, '+569678974');
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre, eus_apellido_pat,eus_apellido_mat,eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (4, 3, 3,'Cal', 'Araneda','Canales', 'cdoog3@ug.uchile.cl', '1p0TLaBQtk6d', 6418, '+569678964');
insert into eu_usuario (eus_id, eus_id_tipo, eus_id_univ, eus_nombre, eus_apellido_pat,eus_apellido_mat,eus_correo , eus_contrasena, eus_valoracion, eus_telefono) values (5, 2, 4,'Amanda', 'Araya','Arollo', 'anashe4@ufromail.cl', 'glhWOLOOW', 1978, '+569678964');




/*EU_CATEGORIA_AVISO*/

insert into eu_categoria_aviso (eca_id, eca_nombre, eca_fecha_creacion) values (1, 'clases particulares', '2019-09-18');
insert into eu_categoria_aviso (eca_id, eca_nombre, eca_fecha_creacion) values (2, 'arriendos', '2019-09-21');
insert into eu_categoria_aviso (eca_id, eca_nombre, eca_fecha_creacion) values (3, 'compra y Venta', '2019-09-20');
insert into eu_categoria_aviso (eca_id, eca_nombre, eca_fecha_creacion) values (4, 'trueques', '2019-09-17');


/*EU_REGION*/

insert into eu_region(er_id,er_nombre) values (8,'Región del Bío-Bío');
insert into eu_region(er_id,er_nombre) values (9,'Región de la Araucanía');
insert into eu_region(er_id,er_nombre) values (10,'Región de los Lagos');


/* EU_COMUNA */
INSERT INTO eu_comunas(ec_id,ec_nombre,ec_id_region)
VALUES
	(1,'Arica',15),
	(2,'Camarones',15),
	(3,'General Lagos',15),
	(4,'Putre',15),
	(5,'Alto Hospicio',1),
	(6,'Iquique',1),
	(7,'Camiña',1),
	(8,'Colchane',1),
	(9,'Huara',1),
	(10,'Pica',1),
	(11,'Pozo Almonte',1),
	(12,'Antofagasta',2),
	(13,'Mejillones',2),
	(14,'Sierra Gorda',2),
	(15,'Taltal',2),
	(16,'Calama',2),
	(17,'Ollague',2),
	(18,'San Pedro de Atacama',2),
	(19,'María Elena',2),
	(20,'Tocopilla',2),
	(21,'Chañaral',3),
	(22,'Diego de Almagro',3),
	(23,'Caldera',3),
	(24,'Copiapó',3),
	(25,'Tierra Amarilla',3),
	(26,'Alto del Carmen',3),
	(27,'Freirina',3),
	(28,'Huasco',3),
	(29,'Vallenar',3),
	(30,'Canela',4),
	(31,'Illapel',4),
	(32,'Los Vilos',4),
	(33,'Salamanca',4),
	(34,'Andacollo',4),
	(35,'Coquimbo',4),
	(36,'La Higuera',4),
	(37,'La Serena',4),
	(38,'Paihuaco',4),
	(39,'Vicuña',4),
	(40,'Combarbalá',4),
	(41,'Monte Patria',4),
	(42,'Ovalle',4),
	(43,'Punitaqui',4),
	(44,'Río Hurtado',4),
	(45,'Isla de Pascua',5),
	(46,'Calle Larga',5),
	(47,'Los Andes',5),
	(48,'Rinconada',5),
	(49,'San Esteban',5),
	(50,'La Ligua',5),
	(51,'Papudo',5),
	(52,'Petorca',5),
	(53,'Zapallar',5),
	(54,'Hijuelas',5),
	(55,'La Calera',5),
	(56,'La Cruz',5),
	(57,'Limache',5),
	(58,'Nogales',5),
	(59,'Olmué',5),
	(60,'Quillota',5),
	(61,'Algarrobo',5),
	(62,'Cartagena',5),
	(63,'El Quisco',5),
	(64,'El Tabo',5),
	(65,'San Antonio',5),
	(66,'Santo Domingo',5),
	(67,'Catemu',5),
	(68,'Llaillay',5),
	(69,'Panquehue',5),
	(70,'Putaendo',5),
	(71,'San Felipe',5),
	(72,'Santa María',5),
	(73,'Casablanca',5),
	(74,'Concón',5),
	(75,'Juan Fernández',5),
	(76,'Puchuncaví',5),
	(77,'Quilpué',5),
	(78,'Quintero',5),
	(79,'Valparaíso',5),
	(80,'Villa Alemana',5),
	(81,'Viña del Mar',5),
	(82,'Colina',13),
	(83,'Lampa',13),
	(84,'Tiltil',13),
	(85,'Pirque',13),
	(86,'Puente Alto',13),
	(87,'San José de Maipo',13),
	(88,'Buin',13),
	(89,'Calera de Tango',13),
	(90,'Paine',13),
	(91,'San Bernardo',13),
	(92,'Alhué',13),
	(93,'Curacaví',13),
	(94,'María Pinto',13),
	(95,'Melipilla',13),
	(96,'San Pedro',13),
	(97,'Cerrillos',13),
	(98,'Cerro Navia',13),
	(99,'Conchalí',13),
	(100,'El Bosque',13),
	(101,'Estación Central',13),
	(102,'Huechuraba',13),
	(103,'Independencia',13),
	(104,'La Cisterna',13),
	(105,'La Granja',13),
	(106,'La Florida',13),
	(107,'La Pintana',13),
	(108,'La Reina',13),
	(109,'Las Condes',13),
	(110,'Lo Barnechea',13),
	(111,'Lo Espejo',13),
	(112,'Lo Prado',13),
	(113,'Macul',13),
	(114,'Maipú',13),
	(115,'Ñuñoa',13),
	(116,'Pedro Aguirre Cerda',13),
	(117,'Peñalolén',13),
	(118,'Providencia',13),
	(119,'Pudahuel',13),
	(120,'Quilicura',13),
	(121,'Quinta Normal',13),
	(122,'Recoleta',13),
	(123,'Renca',13),
	(124,'San Miguel',13),
	(125,'San Joaquín',13),
	(126,'San Ramón',13),
	(127,'Santiago',13),
	(128,'Vitacura',13),
	(129,'El Monte',13),
	(130,'Isla de Maipo',13),
	(131,'Padre Hurtado',13),
	(132,'Peñaflor',13),
	(133,'Talagante',13),
	(134,'Codegua',6),
	(135,'Coínco',6),
	(136,'Coltauco',6),
	(137,'Doñihue',6),
	(138,'Graneros',6),
	(139,'Las Cabras',6),
	(140,'Machalí',6),
	(141,'Malloa',6),
	(142,'Mostazal',6),
	(143,'Olivar',6),
	(144,'Peumo',6),
	(145,'Pichidegua',6),
	(146,'Quinta de Tilcoco',6),
	(147,'Rancagua',6),
	(148,'Rengo',6),
	(149,'Requínoa',6),
	(150,'San Vicente de Tagua Tagua',6),
	(151,'La Estrella',6),
	(152,'Litueche',6),
	(153,'Marchihue',6),
	(154,'Navidad',6),
	(155,'Peredones',6),
	(156,'Pichilemu',6),
	(157,'Chépica',6),
	(158,'Chimbarongo',6),
	(159,'Lolol',6),
	(160,'Nancagua',6),
	(161,'Palmilla',6),
	(162,'Peralillo',6),
	(163,'Placilla',6),
	(164,'Pumanque',6),
	(165,'San Fernando',6),
	(166,'Santa Cruz',7),
	(167,'Cauquenes',7),
	(168,'Chanco',7),
	(169,'Pelluhue',7),
	(170,'Curicó',7),
	(171,'Hualañé',7),
	(172,'Licantén',7),
	(173,'Molina',7),
	(174,'Rauco',7),
	(175,'Romeral',7),
	(176,'Sagrada Familia',7),
	(177,'Teno',7),
	(178,'Vichuquén',7),
	(179,'Colbún',7),
	(180,'Linares',7),
	(181,'Longaví',7),
	(182,'Parral',7),
	(183,'Retiro',7),
	(184,'San Javier',7),
	(185,'Villa Alegre',7),
	(186,'Yerbas Buenas',7),
	(187,'Constitución',7),
	(188,'Curepto',7),
	(189,'Empedrado',7),
	(190,'Maule',7),
	(191,'Pelarco',7),
	(192,'Pencahue',7),
	(193,'Río Claro',7),
	(194,'San Clemente',7),
	(195,'San Rafael',7),
	(196,'Talca',7),
	(197,'Arauco',8),
	(198,'Cañete',8),
	(199,'Contulmo',8),
	(200,'Curanilahue',8),
	(201,'Lebu',8),
	(202,'Los Álamos',8),
	(203,'Tirúa',8),
	(204,'Alto Biobío',8),
	(205,'Antuco',8),
	(206,'Cabrero',8),
	(207,'Laja',8),
	(208,'Los Ángeles',8),
	(209,'Mulchén',8),
	(210,'Nacimiento',8),
	(211,'Negrete',8),
	(212,'Quilaco',8),
	(213,'Quilleco',8),
	(214,'San Rosendo',8),
	(215,'Santa Bárbara',8),
	(216,'Tucapel',8),
	(217,'Yumbel',8),
	(218,'Chiguayante',8),
	(219,'Concepción',8),
	(220,'Coronel',8),
	(221,'Florida',8),
	(222,'Hualpén',8),
	(223,'Hualqui',8),
	(224,'Lota',8),
	(225,'Penco',8),
	(226,'San Pedro de La Paz',8),
	(227,'Santa Juana',8),
	(228,'Talcahuano',8),
	(229,'Tomé',8),
	(251,'Carahue',9),
	(252,'Cholchol',9),
	(253,'Cunco',9),
	(254,'Curarrehue',9),
	(255,'Freire',9),
	(256,'Galvarino',9),
	(257,'Gorbea',9),
	(258,'Lautaro',9),
	(259,'Loncoche',9),
	(260,'Melipeuco',9),
	(261,'Nueva Imperial',9),
	(262,'Padre Las Casas',9),
	(263,'Perquenco',9),
	(264,'Pitrufquén',9),
	(265,'Pucón',9),
	(266,'Saavedra',9),
	(267,'Temuco',9),
	(268,'Teodoro Schmidt',9),
	(269,'Toltén',9),
	(270,'Vilcún',9),
	(271,'Villarrica',9),
	(272,'Angol',9),
	(273,'Collipulli',9),
	(274,'Curacautín',9),
	(275,'Ercilla',9),
	(276,'Lonquimay',9),
	(277,'Los Sauces',9),
	(278,'Lumaco',9),
	(279,'Purén',9),
	(280,'Renaico',9),
	(281,'Traiguén',9),
	(282,'Victoria',9),
	(283,'Corral',14),
	(284,'Lanco',14),
	(285,'Los Lagos',14),
	(286,'Máfil',14),
	(287,'Mariquina',14),
	(288,'Paillaco',14),
	(289,'Panguipulli',14),
	(290,'Valdivia',14),
	(291,'Futrono',14),
	(292,'La Unión',14),
	(293,'Lago Ranco',14),
	(294,'Río Bueno',14),
	(295,'Ancud',10),
	(296,'Castro',10),
	(297,'Chonchi',10),
	(298,'Curaco de Vélez',10),
	(299,'Dalcahue',10),
	(300,'Puqueldón',10),
	(301,'Queilén',10),
	(302,'Quemchi',10),
	(303,'Quellón',10),
	(304,'Quinchao',10),
	(305,'Calbuco',10),
	(306,'Cochamó',10),
	(307,'Fresia',10),
	(308,'Frutillar',10),
	(309,'Llanquihue',10),
	(310,'Los Muermos',10),
	(311,'Maullín',10),
	(312,'Puerto Montt',10),
	(313,'Puerto Varas',10),
	(314,'Osorno',10),
	(315,'Puero Octay',10),
	(316,'Purranque',10),
	(317,'Puyehue',10),
	(318,'Río Negro',10),
	(319,'San Juan de la Costa',10),
	(320,'San Pablo',10),
	(321,'Chaitén',10),
	(322,'Futaleufú',10),
	(323,'Hualaihué',10),
	(324,'Palena',10),
	(325,'Aisén',11),
	(326,'Cisnes',11),
	(327,'Guaitecas',11),
	(328,'Cochrane',11),
	(329,'O higgins',11),
	(330,'Tortel',11),
	(331,'Coihaique',11),
	(332,'Lago Verde',11),
	(333,'Chile Chico',11),
	(334,'Río Ibáñez',11),
	(335,'Antártica',12),
	(336,'Cabo de Hornos',12),
	(337,'Laguna Blanca',12),
	(338,'Punta Arenas',12),
	(339,'Río Verde',12),
	(340,'San Gregorio',12),
	(341,'Porvenir',12),
	(342,'Primavera',12),
	(343,'Timaukel',12),
	(344,'Natales',12),
	(345,'Torres del Paine',12);
/*EU_IMAGENES*/
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (1, 5, 'http://dummyimage.com/186x212.png/cc0000/ffffff', 'http://dummyimage.com/245x102.png/5fa2dd/ffffff', 'http://dummyimage.com/171x231.jpg/dddddd/000000', 'http://dummyimage.com/215x169.png/cc0000/ffffff', 'http://dummyimage.com/160x166.bmp/dddddd/000000');
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (2, 5, 'http://dummyimage.com/245x185.png/dddddd/000000', 'http://dummyimage.com/215x118.bmp/dddddd/000000', 'http://dummyimage.com/191x149.png/ff4444/ffffff', 'http://dummyimage.com/138x232.jpg/cc0000/ffffff', 'http://dummyimage.com/228x176.bmp/cc0000/ffffff');
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (3, 5, 'http://dummyimage.com/195x188.bmp/cc0000/ffffff', 'http://dummyimage.com/235x210.png/5fa2dd/ffffff', 'http://dummyimage.com/125x242.png/ff4444/ffffff', 'http://dummyimage.com/122x227.jpg/cc0000/ffffff', 'http://dummyimage.com/182x120.png/cc0000/ffffff');
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (4, 4, NULL, 'http://dummyimage.com/174x151.bmp/dddddd/000000', 'http://dummyimage.com/218x129.jpg/cc0000/ffffff', 'http://dummyimage.com/114x240.png/ff4444/ffffff', 'http://dummyimage.com/148x214.jpg/dddddd/000000');
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (5, 4, NULL, 'http://dummyimage.com/183x160.bmp/5fa2dd/ffffff', 'http://dummyimage.com/178x206.png/dddddd/000000', 'http://dummyimage.com/211x196.png/5fa2dd/ffffff', 'http://dummyimage.com/200x116.jpg/ff4444/ffffff');
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (6, 4, NULL, 'http://dummyimage.com/121x114.bmp/dddddd/000000', 'http://dummyimage.com/218x152.bmp/ff4444/ffffff', 'http://dummyimage.com/184x178.jpg/cc0000/ffffff', 'http://dummyimage.com/172x145.bmp/dddddd/000000');
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (7, 3, NULL,NULL, 'http://dummyimage.com/180x246.png/5fa2dd/ffffff', 'http://dummyimage.com/159x132.png/dddddd/000000', 'http://dummyimage.com/248x178.bmp/dddddd/000000');
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (8, 3,NULL,NULL, 'http://dummyimage.com/234x236.png/5fa2dd/ffffff', 'http://dummyimage.com/135x119.bmp/5fa2dd/ffffff', 'http://dummyimage.com/192x162.jpg/5fa2dd/ffffff');
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (9, 2,NULL,NULL,NULL, 'http://dummyimage.com/126x157.jpg/cc0000/ffffff', 'http://dummyimage.com/193x145.jpg/ff4444/ffffff');
insert into eu_imagenes (ei_id, ei_cantidad_img, ei_path_img1, ei_path_img2, ei_path_img3, ei_path_img4, ei_path_img5) values (10, 2,NULL,NULL,NULL, 'http://dummyimage.com/103x120.png/5fa2dd/ffffff', 'http://dummyimage.com/122x127.jpg/cc0000/ffffff');


/*EU_AVISO*/
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (1, 3, 1, 'Suspendisse potenti.', 'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.', 81530, 3, NULL, '2019-10-07', '2021-04-12', '2020-05-29', 1, false);
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (2, 3, 1, 'Vestibulum rutrum rutrum neque.', 'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.', 10453, 2, NULL, '2019-10-30', '2020-11-06', '2019-10-30', 2, true);
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (3, 3, 3, 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.', 'Donec dapibus.', 182862, 2, NULL, '2019-10-02', '2020-10-15', '2020-04-16', 3, true);
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (4, 4, 2, 'Nulla tempus.', 'Pellentesque ultrices mattis odio.', 182300, 2, NULL, '2019-11-21', '2020-10-07', '2019-11-27', 4, true);
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (5, 5, 4, 'In est risus, auctor sed, tristique in, tempus sit amet, sem.', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 69221, 2, NULL, '2019-10-28', '2021-06-27', '2019-10-24', 5, false);
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (6, 4, 2, 'Duis at velit eu est congue elementum.', 'Suspendisse ornare consequat lectus.', 124563, 3, NULL, '2019-10-24', '2021-02-17', '2019-11-19', 6, true);
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (7, 1, 3, 'Fusce posuere felis sed lacus.', 'Donec ut dolor.', 30950, 2, NULL, '2019-11-19', '2021-06-24', '2019-09-29', 7, true);
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (8, 4, 4, 'Ut at dolor quis odio consequat varius.', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 143060, 1, NULL, '2019-08-18', '2021-02-02', '2020-03-08', 8, false);
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (9, 5, 2, 'Aenean lectus.', 'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.', 122750, 1, NULL, '2019-08-17', '2020-08-02', '2020-06-28', 9, false);
insert into eu_aviso (ea_id, ea_id_usuario, ea_id_categ, ea_titulo, ea_descrip, ea_precio, ea_id_comuna, ea_materia, ea_fecha_public, ea_fecha_expir, ea_fecha_ult_edi, ea_id_imagenes, ea_estado) values (10, 4, 3, 'Duis consequat dui nec nisi volutpat eleifend.', 'Pellentesque eget nunc.', 186672, 2, NULL, '2020-04-02', '2020-07-21', '2020-04-05', 10, false);


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
insert into eu_foro (ef_id, ef_id_tema, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre,ef_id_creador) values (1, 1, 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', 'Integer a nibh. In quis justo.', true, '2020-02-28', NULL, NULL,1);
insert into eu_foro (ef_id, ef_id_tema, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre,ef_id_creador) values (2, 2, 'Nulla tempus.', 'Pellentesque at nulla. Suspendisse potenti.', false, '2019-11-18', '2019-12-05', NULL,2);
insert into eu_foro (ef_id, ef_id_tema, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre,ef_id_creador) values (3, 3, 'Vivamus vestibulum sagittis sapien.', 'Cras pellentesque volutpat dui.', true, '2020-01-16', NULL, 4,3);
insert into eu_foro (ef_id, ef_id_tema, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre,ef_id_creador) values (4, 4, 'Pellentesque at nulla.', 'Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', true, '2019-08-25', NULL, NULL,4);
insert into eu_foro (ef_id, ef_id_tema, ef_titulo, ef_descrip, ef_estado, ef_fecha_creacion, ef_fecha_cierre, ef_id_usuario_cierre,ef_id_creador) values (5, 5, 'Fusce posuere felis sed lacus.', 'Sed vel enim sit amet nunc viverra dapibus.', true, '2020-06-22', NULL, NULL,1);


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


