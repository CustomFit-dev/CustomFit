-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 06, 2025 at 01:24 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `customfit_d3`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_project`
--

CREATE TABLE `api_project` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `comentarios` varchar(500) DEFAULT NULL,
  `status` varchar(100) NOT NULL,
  `created` datetime(6) NOT NULL,
  `modificado` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_rol`
--

CREATE TABLE `api_rol` (
  `id` bigint NOT NULL,
  `nombrerol` varchar(20) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `api_rol`
--

INSERT INTO `api_rol` (`id`, `nombrerol`, `descripcion`) VALUES
(1, 'usuario', 'Rol para los usuarios que compran en la plataforma'),
(2, 'administrador', 'Rol con acceso completo al sistema'),
(3, 'proveedor', 'Rol para los proveedores que publican productos');

-- --------------------------------------------------------

--
-- Table structure for table `api_userprofile`
--

CREATE TABLE `api_userprofile` (
  `id` bigint NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `correo_electronico` varchar(254) NOT NULL,
  `conf_correo_electronico` varchar(254) NOT NULL,
  `rol_id` bigint DEFAULT NULL,
  `fecha_sesion` datetime(6) DEFAULT NULL,
  `codigo_verificacion` varchar(6) DEFAULT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `api_userprofile`
--

INSERT INTO `api_userprofile` (`id`, `nombres`, `apellidos`, `nombre_usuario`, `celular`, `correo_electronico`, `conf_correo_electronico`, `rol_id`, `fecha_sesion`, `codigo_verificacion`, `user_id`) VALUES
(1, 'Carlos', 'Pérez', 'cperezfff', '3001112234', 'carlosp@gmail.com', 'carlosp@gmail.com', 2, '2025-05-05 00:00:00.000000', '139669', 1),
(4, 'Ana', 'Rodríguez', 'arodriguez', '3034445566', 'anar@gmail.com', 'anar@gmail.com', 3, '2025-05-05 00:00:00.000000', NULL, 4),
(10, 'Sofía', 'Cano', 'scano', '3090001122', 'sofiac@gmail.com', 'sofiac@gmail.com', 3, '2025-05-05 00:00:00.000000', NULL, 10);

-- --------------------------------------------------------

--
-- Table structure for table `authtoken_token`
--

CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `authtoken_token`
--

INSERT INTO `authtoken_token` (`key`, `created`, `user_id`) VALUES
('0fd3880bb73d33f86e7680630b8c71a7c3dca446', '2025-05-30 14:29:38.707716', 10),
('198b99ad114cbdc11e1e07e04d819884d7b3b268', '2025-05-30 12:09:01.074748', 4),
('7e6c5d0056b67a03736d0bf68cf6cdc478b9ba2c', '2025-05-06 02:03:47.480334', 1),
('979e1fb566b16a3918bb81aa6fcff00d6ea62603', '2025-06-06 14:46:33.381553', 15),
('c057ecb9eca082d842695eac505630c554cecdb2', '2025-05-30 12:42:28.937596', 11),
('cc249c8c9738042c605b0fa865362b7f6038700a', '2025-06-23 18:37:56.828163', 5);

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int NOT NULL,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add Token', 7, 'add_token'),
(26, 'Can change Token', 7, 'change_token'),
(27, 'Can delete Token', 7, 'delete_token'),
(28, 'Can view Token', 7, 'view_token'),
(29, 'Can add Token', 8, 'add_tokenproxy'),
(30, 'Can change Token', 8, 'change_tokenproxy'),
(31, 'Can delete Token', 8, 'delete_tokenproxy'),
(32, 'Can view Token', 8, 'view_tokenproxy'),
(33, 'Can add project', 9, 'add_project'),
(34, 'Can change project', 9, 'change_project'),
(35, 'Can delete project', 9, 'delete_project'),
(36, 'Can view project', 9, 'view_project'),
(37, 'Can add user profile', 10, 'add_userprofile'),
(38, 'Can change user profile', 10, 'change_userprofile'),
(39, 'Can delete user profile', 10, 'delete_userprofile'),
(40, 'Can view user profile', 10, 'view_userprofile'),
(41, 'Can add rol', 11, 'add_rol'),
(42, 'Can change rol', 11, 'change_rol'),
(43, 'Can delete rol', 11, 'delete_rol'),
(44, 'Can view rol', 11, 'view_rol'),
(45, 'Can add tela', 12, 'add_tela'),
(46, 'Can change tela', 12, 'change_tela'),
(47, 'Can delete tela', 12, 'delete_tela'),
(48, 'Can view tela', 12, 'view_tela'),
(49, 'Can add color', 13, 'add_color'),
(50, 'Can change color', 13, 'change_color'),
(51, 'Can delete color', 13, 'delete_color'),
(52, 'Can view color', 13, 'view_color'),
(53, 'Can add estampado', 14, 'add_estampado'),
(54, 'Can change estampado', 14, 'change_estampado'),
(55, 'Can delete estampado', 14, 'delete_estampado'),
(56, 'Can view estampado', 14, 'view_estampado'),
(57, 'Can add producto', 15, 'add_producto'),
(58, 'Can change producto', 15, 'change_producto'),
(59, 'Can delete producto', 15, 'delete_producto'),
(60, 'Can view producto', 15, 'view_producto'),
(61, 'Can add proveedor', 16, 'add_proveedor'),
(62, 'Can change proveedor', 16, 'change_proveedor'),
(63, 'Can delete proveedor', 16, 'delete_proveedor'),
(64, 'Can view proveedor', 16, 'view_proveedor'),
(65, 'Can add talla', 17, 'add_talla'),
(66, 'Can change talla', 17, 'change_talla'),
(67, 'Can delete talla', 17, 'delete_talla'),
(68, 'Can view talla', 17, 'view_talla'),
(69, 'Can add proveedor solicitud', 18, 'add_proveedorsolicitud'),
(70, 'Can change proveedor solicitud', 18, 'change_proveedorsolicitud'),
(71, 'Can delete proveedor solicitud', 18, 'delete_proveedorsolicitud'),
(72, 'Can view proveedor solicitud', 18, 'view_proveedorsolicitud');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$260000$demo$hash1', NULL, 1, 'cperez', 'Carlos', 'Pérez', 'carlosp@gmail.com', 1, 1, '2025-05-05 20:37:55.000000'),
(2, 'pbkdf2_sha256$260000$demo$hash2', NULL, 0, 'mgomez', 'María', 'Gómez', 'mariag@gmail.com', 0, 1, '2025-05-05 20:37:55.000000'),
(3, 'pbkdf2_sha256$260000$demo$hash3', NULL, 0, 'lmartinez', 'Luis', 'Martínez', 'luism@gmail.com', 0, 1, '2025-05-05 20:37:55.000000'),
(4, 'pbkdf2_sha256$260000$demo$hash4', NULL, 0, 'arodriguez', 'Ana', 'Rodríguez', 'anar@gmail.com', 0, 1, '2025-05-05 20:37:55.000000'),
(5, 'pbkdf2_sha256$260000$demo$hash5', NULL, 0, 'jdiaz', 'Jorge', 'Díaz', 'jorged@gmail.com', 0, 1, '2025-05-05 20:37:55.000000'),
(6, 'pbkdf2_sha256$260000$demo$hash6', NULL, 0, 'lramirez', 'Lucía', 'Ramírez', 'luciar@gmail.com', 0, 1, '2025-05-05 20:37:55.000000'),
(7, 'pbkdf2_sha256$260000$demo$hash7', NULL, 0, 'ctorres', 'Camilo', 'Torres', 'camilot@gmail.com', 0, 1, '2025-05-05 20:37:55.000000'),
(8, 'pbkdf2_sha256$260000$demo$hash8', NULL, 0, 'pmorales', 'Paula', 'Morales', 'paulam@gmail.com', 0, 1, '2025-05-05 20:37:55.000000'),
(9, 'pbkdf2_sha256$260000$demo$hash9', NULL, 0, 'dvargas', 'Diego', 'Vargas', 'diegov@gmail.com', 0, 1, '2025-05-05 20:37:55.000000'),
(10, 'pbkdf2_sha256$260000$demo$hash10', NULL, 0, 'scano', 'Sofía', 'Cano', 'sofiac@gmail.com', 0, 1, '2025-05-05 20:37:55.000000'),
(11, '!mVRU23elQcKiyMmQ1C7HitINm8ink2Pw5Pj3yoF6', NULL, 0, 'gkein24', '', '', 'kevin363@gmail.com', 0, 1, '2025-05-23 15:17:06.461203'),
(12, 'pbkdf2_sha256$870000$LokxqyoJdZazqGDxsk82ZY$ikQlOA91Lqh4/qCYeIi6l6TQt35Pt68m+1vficG0QOM=', NULL, 0, 'fddfdf', '', '', 'kevin11234daniel@gmail.com', 0, 1, '2025-06-06 14:35:17.903947'),
(13, 'pbkdf2_sha256$870000$8JAvp0fVWgNLPbozaidpOi$OO95KXZhuaymBAXzS7Sv2KGpLoNj+lTOKbBkkMR2P6k=', NULL, 0, 'fddfdfssass', '', '', 'kevin112daniel@gmail.com', 0, 1, '2025-06-06 14:36:10.435846'),
(14, 'pbkdf2_sha256$870000$uTLVUS3p4FhmJnS1t5CQJ4$O8o+Ke76+gTZv3B6ZljvTspbqI/j1L3ozDSDe7e1kCw=', NULL, 0, 'dfcaasasas', '', '', 'kevin1156562daniel@gmail.com', 0, 1, '2025-06-06 14:38:07.629141'),
(15, 'pbkdf2_sha256$870000$hgbpiiAZIR8V0Ifg8JFCKv$8d2ZiHjVfihcNV7DeuVRs3dhnCONhxYE2p8Y3y9PgXQ=', NULL, 0, 'kevi6767676', '', '', 'kevin112344daniel@gmail.com', 0, 1, '2025-06-06 14:45:23.984007'),
(16, 'pbkdf2_sha256$870000$J9if16WuTCPMzXjIoZe7Xq$J/e/6WIXGe+oQbJtSTMd2QkhWcvn1mp3LeVmX8yAiss=', NULL, 0, 'dada', '', '', 'dsff@gmail.com', 0, 1, '2025-06-06 14:52:10.581357'),
(17, 'pbkdf2_sha256$870000$l5KSwKxirphGWGarzf0Lfz$n/fertq0/gEQWY68B2ZFAzhu8cQF/IJEcul12BEiu3o=', NULL, 0, 'safded2445', '', '', 'keee@gmail.com', 0, 1, '2025-06-06 14:56:26.323495');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carrito`
--

CREATE TABLE `carrito` (
  `idCarrito` bigint NOT NULL,
  `fechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) DEFAULT '0.00',
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `carrito`
--

INSERT INTO `carrito` (`idCarrito`, `fechaCreacion`, `total`, `user_id`) VALUES
(11, '2025-05-19 20:20:49', 120000.00, 10);

-- --------------------------------------------------------

--
-- Table structure for table `carrito_producto`
--

CREATE TABLE `carrito_producto` (
  `id` int NOT NULL,
  `idCarrito` bigint NOT NULL,
  `idProductos` bigint NOT NULL,
  `cantidadProductos` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `carrito_producto`
--

INSERT INTO `carrito_producto` (`id`, `idCarrito`, `idProductos`, `cantidadProductos`) VALUES
(11, 11, 25, 2);

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `IdColor` bigint NOT NULL,
  `NombreColor` varchar(45) NOT NULL,
  `disponibilidad` varchar(2) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`IdColor`, `NombreColor`, `disponibilidad`, `updated_at`) VALUES
(11, 'Rojos', 'Si', '2025-04-30 15:50:48'),
(12, 'Azul', 'Si', '2025-04-30 15:50:48'),
(13, 'Negro', 'No', '2025-04-30 15:50:48'),
(14, 'Blanco', 'No', '2025-04-30 15:50:48'),
(15, 'Verde', 'Si', '2025-04-30 15:50:48'),
(16, 'Amarillo', 'Si', '2025-04-30 15:50:48'),
(17, 'Gris', 'Si', '2025-04-30 15:50:48'),
(18, 'Rosado', 'No', '2025-04-30 15:50:48'),
(19, 'Morado', 'No', '2025-04-30 15:50:48');

-- --------------------------------------------------------

--
-- Table structure for table `comentarios`
--

CREATE TABLE `comentarios` (
  `idComentarios` bigint NOT NULL,
  `contenido` varchar(45) NOT NULL,
  `api_userprofile_id` bigint NOT NULL,
  `fecha_creacion` date NOT NULL,
  `proveedores_idproveedor` bigint NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(13, 'api', 'color'),
(14, 'api', 'estampado'),
(15, 'api', 'producto'),
(9, 'api', 'project'),
(16, 'api', 'proveedor'),
(18, 'api', 'proveedorsolicitud'),
(11, 'api', 'rol'),
(17, 'api', 'talla'),
(12, 'api', 'tela'),
(10, 'api', 'userprofile'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(7, 'authtoken', 'token'),
(8, 'authtoken', 'tokenproxy'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-05-06 01:30:47.048894'),
(2, 'auth', '0001_initial', '2025-05-06 01:30:49.084132'),
(3, 'admin', '0001_initial', '2025-05-06 01:30:49.476518'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-05-06 01:30:49.491787'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-05-06 01:30:49.506620'),
(6, 'api', '0001_initial', '2025-05-06 01:30:49.581831'),
(7, 'api', '0002_userprofile', '2025-05-06 01:30:49.673628'),
(8, 'api', '0003_remove_userprofile_created_and_more', '2025-05-06 01:30:49.841534'),
(9, 'api', '0004_rol', '2025-05-06 01:30:49.899619'),
(10, 'api', '0005_rename_idrol_rol_rol', '2025-05-06 01:30:49.941322'),
(11, 'api', '0006_remove_rol_rol', '2025-05-06 01:30:50.020504'),
(12, 'api', '0007_rol_nrol', '2025-05-06 01:30:50.112609'),
(13, 'api', '0008_userprofile_rol', '2025-05-06 01:30:50.457653'),
(14, 'api', '0009_userprofile_fecha_sesion', '2025-05-06 01:30:50.587539'),
(15, 'api', '0010_remove_rol_nrol', '2025-05-06 01:30:50.657501'),
(16, 'api', '0011_alter_userprofile_rol', '2025-05-06 01:30:50.970797'),
(17, 'api', '0012_alter_userprofile_rol', '2025-05-06 01:30:51.521341'),
(18, 'api', '0013_alter_rol_descripcion_alter_rol_nombrerol', '2025-05-06 01:30:51.829516'),
(19, 'api', '0014_userprofile_codigo_verificacion', '2025-05-06 01:30:51.875569'),
(20, 'api', '0015_alter_project_id_alter_userprofile_id', '2025-05-06 01:30:52.183529'),
(21, 'api', '0016_userprofile_user_alter_userprofile_id', '2025-05-06 01:30:52.593884'),
(22, 'contenttypes', '0002_remove_content_type_name', '2025-05-06 01:30:52.924053'),
(23, 'auth', '0002_alter_permission_name_max_length', '2025-05-06 01:30:53.187956'),
(24, 'auth', '0003_alter_user_email_max_length', '2025-05-06 01:30:53.322225'),
(25, 'auth', '0004_alter_user_username_opts', '2025-05-06 01:30:53.368851'),
(26, 'auth', '0005_alter_user_last_login_null', '2025-05-06 01:30:53.721348'),
(27, 'auth', '0006_require_contenttypes_0002', '2025-05-06 01:30:53.731991'),
(28, 'auth', '0007_alter_validators_add_error_messages', '2025-05-06 01:30:53.773292'),
(29, 'auth', '0008_alter_user_username_max_length', '2025-05-06 01:30:54.062711'),
(30, 'auth', '0009_alter_user_last_name_max_length', '2025-05-06 01:30:54.336334'),
(31, 'auth', '0010_alter_group_name_max_length', '2025-05-06 01:30:54.458215'),
(32, 'auth', '0011_update_proxy_permissions', '2025-05-06 01:30:54.494248'),
(33, 'auth', '0012_alter_user_first_name_max_length', '2025-05-06 01:30:54.773164'),
(34, 'authtoken', '0001_initial', '2025-05-06 01:30:55.123101'),
(35, 'authtoken', '0002_auto_20160226_1747', '2025-05-06 01:30:55.239354'),
(36, 'authtoken', '0003_tokenproxy', '2025-05-06 01:30:55.249707'),
(37, 'authtoken', '0004_alter_tokenproxy_options', '2025-05-06 01:30:55.262222'),
(38, 'sessions', '0001_initial', '2025-05-06 01:30:55.380586'),
(39, 'api', '0017_tela_alter_userprofile_rol', '2025-06-20 11:36:11.874750'),
(40, 'api', '0018_color_estampado_producto_proveedor_talla_and_more', '2025-06-27 03:39:52.193390'),
(41, 'api', '0019_alter_tela_table', '2025-06-27 03:42:14.709189'),
(42, 'api', '0020_proveedorsolicitud_delete_proveedor', '2025-08-18 00:35:10.797697'),
(43, 'api', '0021_alter_proveedorsolicitud_options', '2025-08-18 01:19:52.826270'),
(44, 'api', '0022_remove_proveedorsolicitud_estado_and_more', '2025-08-18 01:38:48.618939');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estampado`
--

CREATE TABLE `estampado` (
  `idEstampado` bigint NOT NULL,
  `NombreEstampado` varchar(45) NOT NULL,
  `TipoEstampado` varchar(45) NOT NULL,
  `PrecioEstampado` bigint NOT NULL,
  `ImgEstampado` varchar(100) NOT NULL,
  `ColorEstampado` varchar(45) NOT NULL,
  `fecha_agregado` date NOT NULL,
  `Disponibilidad` varchar(45) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `estampado`
--

INSERT INTO `estampado` (`idEstampado`, `NombreEstampado`, `TipoEstampado`, `PrecioEstampado`, `ImgEstampado`, `ColorEstampado`, `fecha_agregado`, `Disponibilidad`, `updated_at`) VALUES
(11, 'Flora', 'Textilss', 15000, 'https://mi-nube.com/imagenes/floral_vintage.jpg', 'Rosa', '2025-04-30', 'No', '2025-09-24 08:23:05'),
(12, 'Rayas Clásicas', 'Geométrico', 13000, 'https://mi-nube.com/imagenes/rayas_clasicas.jpg', 'Azul', '2025-04-30', 'Disponible', '2025-04-30 15:56:08'),
(13, 'Arte Pop', 'Abstracto', 18000, 'https://mi-nube.com/imagenes/arte_pop.jpg', 'Multicolor', '2025-04-30', 'No disponible', '2025-04-30 15:56:08'),
(14, 'Animal Print', 'Figurativo', 16000, 'https://mi-nube.com/imagenes/animal_print.jpg', 'Marrón', '2025-04-30', 'Disponible', '2025-04-30 15:56:08'),
(15, 'Graffiti Urbano', 'Moderno', 20000, 'https://mi-nube.com/imagenes/graffiti_urbano.jpg', 'Negro', '2025-04-30', 'Disponible', '2025-04-30 15:56:08'),
(16, 'Corazones', 'Infantil', 12000, 'https://mi-nube.com/imagenes/corazones.jpg', 'Rojo', '2025-04-30', 'Si', '2025-09-24 07:54:58'),
(17, 'Estrellas', 'Minimalista', 12500, 'https://mi-nube.com/imagenes/estrellas.jpg', 'Blanco', '2025-04-30', 'Disponible', '2025-04-30 15:56:08'),
(18, 'Ondas Marinas', 'Abstracto', 17000, 'https://mi-nube.com/imagenes/ondas_marinas.jpg', 'Verde', '2025-04-30', 'No disponible', '2025-04-30 15:56:08'),
(19, 'Mandala Zen', 'Étnico', 19000, 'https://mi-nube.com/imagenes/mandala_zen.jpg', 'Morado', '2025-04-30', 'Disponible', '2025-04-30 15:56:08'),
(20, 'Pixelado Retro', 'Digital', 15500, 'https://mi-nube.com/imagenes/pixelado_retro.jpg', 'Gris', '2025-04-30', 'Disponible', '2025-04-30 15:56:08'),
(21, 'Círculos Armonía', 'Geométrico', 14000, 'https://mi-nube.com/imagenes/circulos_armonia.jpg', 'Amarillo', '2025-04-30', 'No disponible', '2025-04-30 15:56:08'),
(22, 'Cómic Explosivo', 'Cultural', 21000, 'https://mi-nube.com/imagenes/comic_explosivo.jpg', 'Multicolor', '2025-04-30', 'Disponible', '2025-04-30 15:56:08'),
(23, 'FloraSSS', 'Textilss', 15000, 'https://mi-nube.com/imagenes/floral_vintage.jpg', 'Rosa', '2025-09-23', 'Si', '2025-09-24 07:54:45');

-- --------------------------------------------------------

--
-- Table structure for table `factura`
--

CREATE TABLE `factura` (
  `idFactura` bigint NOT NULL,
  `CantidadProductos` bigint NOT NULL,
  `PrecioFinal` bigint NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `estado_factura` varchar(45) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_user` bigint NOT NULL,
  `prdido_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `factura`
--

INSERT INTO `factura` (`idFactura`, `CantidadProductos`, `PrecioFinal`, `fecha_creacion`, `estado_factura`, `updated_at`, `id_user`, `prdido_id`) VALUES
(32, 2, 10000, '2025-05-20 01:24:42', 'cancelada', '2025-05-20 01:25:07', 10, 31);

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedidos` bigint NOT NULL,
  `Direccion` varchar(45) NOT NULL,
  `FechaAproximada` date NOT NULL,
  `Usuarios_IdUsuario` bigint NOT NULL,
  `fecha_pedido` date NOT NULL,
  `estado_pedido` varchar(45) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `carrito_idCarrito` bigint NOT NULL,
  `prove_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`idPedidos`, `Direccion`, `FechaAproximada`, `Usuarios_IdUsuario`, `fecha_pedido`, `estado_pedido`, `updated_at`, `carrito_idCarrito`, `prove_id`) VALUES
(31, 'calle36c#116b11', '2025-05-29', 10, '2025-05-19', 'pendiente', '2025-05-20 01:22:20', 11, 1);

-- --------------------------------------------------------

--
-- Table structure for table `plantillas`
--

CREATE TABLE `plantillas` (
  `id` bigint NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `tipo` enum('frontal','espalda','derecha','izquierda') NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `plantillas`
--

INSERT INTO `plantillas` (`id`, `nombre`, `tipo`, `imagen_url`) VALUES
(1, 'frontal1', 'frontal', 'https://mi-nube.com/imagenes/floral_vintage.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `idProductos` bigint NOT NULL,
  `NombreProductos` varchar(45) NOT NULL,
  `imgProducto` varchar(100) NOT NULL,
  `TipoProductos` varchar(45) NOT NULL,
  `PrecioProducto` bigint NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `Color_IdColor` bigint NOT NULL,
  `Tela_idTela` bigint NOT NULL,
  `Tallas_idTallas` bigint NOT NULL,
  `fecha_creacion` date NOT NULL DEFAULT (curdate()),
  `fecha_actualizacion` date NOT NULL DEFAULT (curdate()),
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tipo_producto` enum('shop','personalizado') NOT NULL DEFAULT 'personalizado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`idProductos`, `NombreProductos`, `imgProducto`, `TipoProductos`, `PrecioProducto`, `Descripcion`, `Color_IdColor`, `Tela_idTela`, `Tallas_idTallas`, `fecha_creacion`, `fecha_actualizacion`, `updated_at`, `tipo_producto`) VALUES
(25, 'Camisetas', 'https://ejemplo.com/images/camiseta_basica.jpg', 'Camiseta', 0, 'Camiseta básica de algodón, cómoda y duradera.', 11, 12, 13, '2025-04-30', '2025-04-30', '2025-09-24 07:23:29', 'personalizado'),
(26, 'Camiseta Estampada', 'https://ejemplo.com/images/camiseta_estampada.jpg', 'Camiseta', 24999, 'Camiseta con estampado exclusivo para el verano.', 14, 15, 16, '2025-04-29', '2025-04-29', '2025-04-29 05:00:00', 'personalizado'),
(27, 'Camiseta de Manga Larga', 'https://ejemplo.com/images/camiseta_manga_larga.jpg', 'Camiseta', 29999, 'Camiseta de manga larga, ideal para días frescos.', 17, 18, 19, '2025-04-28', '2025-04-28', '2025-04-28 05:00:00', 'personalizado');

-- --------------------------------------------------------

--
-- Table structure for table `productos_has_estampado`
--

CREATE TABLE `productos_has_estampado` (
  `Productos_idProductos` bigint NOT NULL,
  `Estampado_idEstampado` bigint NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productos_has_estampado`
--

INSERT INTO `productos_has_estampado` (`Productos_idProductos`, `Estampado_idEstampado`, `updated_at`) VALUES
(25, 11, '2025-04-30 05:00:00'),
(25, 12, '2025-04-30 05:00:00'),
(25, 13, '2025-04-30 05:00:00'),
(26, 14, '2025-04-30 05:00:00'),
(26, 15, '2025-04-30 05:00:00'),
(26, 16, '2025-04-30 05:00:00'),
(27, 17, '2025-04-30 05:00:00'),
(27, 18, '2025-04-30 05:00:00'),
(27, 19, '2025-04-30 05:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `propuestas_diseno`
--

CREATE TABLE `propuestas_diseno` (
  `id` bigint NOT NULL,
  `nombre_empresa` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `cuello` enum('Sí','No') DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `texto_personalizado` text,
  `fecha_envio` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_Tela` bigint NOT NULL,
  `id_Talla` bigint NOT NULL,
  `id_Color` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `propuestas_diseno`
--

INSERT INTO `propuestas_diseno` (`id`, `nombre_empresa`, `descripcion`, `cuello`, `cantidad`, `texto_personalizado`, `fecha_envio`, `id_Tela`, `id_Talla`, `id_Color`) VALUES
(1, 'Diseños KEV', 'Camiseta personalizada para feria de software', 'Sí', 50, 'Innovar con estilo', '2025-06-25 22:35:26', 13, 19, 11);

-- --------------------------------------------------------

--
-- Table structure for table `propuesta_plantilla`
--

CREATE TABLE `propuesta_plantilla` (
  `Id` int NOT NULL,
  `Id_propuesta` bigint NOT NULL,
  `id_plantilla` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `propuesta_plantilla`
--

INSERT INTO `propuesta_plantilla` (`Id`, `Id_propuesta`, `id_plantilla`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `proveedorsolicitud`
--

CREATE TABLE `proveedorsolicitud` (
  `id_solicitud` int NOT NULL,
  `usuario_id` int NOT NULL,
  `Nitcedula` varchar(30) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `NombreEmpresa` varchar(255) NOT NULL,
  `descripcionEmpresa` text NOT NULL,
  `AñosExp` int NOT NULL,
  `Estado` varchar(20) NOT NULL DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `proveedorsolicitud`
--

INSERT INTO `proveedorsolicitud` (`id_solicitud`, `usuario_id`, `Nitcedula`, `direccion`, `NombreEmpresa`, `descripcionEmpresa`, `AñosExp`, `Estado`) VALUES
(2, 4, '800222333-2', 'Cl 50 #40-15, Bogotá', 'Confecciones Andinas', 'Empresa dedicada a ropa formal y casual.', 8, 'Aceptado'),
(6, 10, '400666777-6', 'Cra 15 #22-80, Cartagena', 'Diseños Caribe', 'Fabricante de ropa playera y accesorios de moda.', 6, 'Aceptado');

-- --------------------------------------------------------

--
-- Table structure for table `tallas`
--

CREATE TABLE `tallas` (
  `idTallas` bigint NOT NULL,
  `Talla` varchar(3) NOT NULL,
  `Disponibilidad` varchar(45) NOT NULL,
  `genero` varchar(45) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tallas`
--

INSERT INTO `tallas` (`idTallas`, `Talla`, `Disponibilidad`, `genero`, `updated_at`) VALUES
(12, 'S', 'no', 'Masculino', '2025-09-24 08:50:44'),
(13, 'M', 'no', 'Hombre', '2025-06-20 15:00:10'),
(14, 'L', 'si', 'Hombre', '2025-06-20 15:00:03'),
(16, 'S', 'no', 'Hombre', '2025-06-20 15:00:22'),
(19, 'XL', 'si', 'Hombre', '2025-06-20 15:00:52'),
(20, 'XXL', 'si', 'Hombre', '2025-06-20 15:00:59'),
(24, 'XL', 'si', 'Hombre', '2025-06-22 04:57:47'),
(30, 'XXL', 'No', 'Masculino', '2025-09-24 08:51:02');

-- --------------------------------------------------------

--
-- Table structure for table `tela`
--

CREATE TABLE `tela` (
  `idTela` bigint NOT NULL,
  `NombreTela` varchar(45) NOT NULL,
  `TipoTela` varchar(45) NOT NULL,
  `PrecioTela` bigint NOT NULL,
  `fecha_agregado` date NOT NULL,
  `Disponibilidad` varchar(45) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tela`
--

INSERT INTO `tela` (`idTela`, `NombreTela`, `TipoTela`, `PrecioTela`, `fecha_agregado`, `Disponibilidad`, `updated_at`) VALUES
(12, 'Poliéster Suave', 'Poliéster', 0, '2025-04-30', 'si', '2025-06-22 04:45:53'),
(13, 'Lino Fresco', 'Lino', 30000, '2025-04-30', 'no', '2025-06-20 12:48:43'),
(14, 'Denim Clásico', 'Jean', 27000, '2025-04-30', 'si', '2025-06-20 12:48:49'),
(15, 'Seda Natural', 'Seda', 55000, '2025-04-30', 'si', '2025-06-20 12:48:54'),
(16, 'Rayón Ligero', 'Rayón', 22000, '2025-04-30', 'si', '2025-06-20 12:49:00'),
(17, 'Franela Gruesa', 'Franela', 26000, '2025-04-30', 'Si', '2025-06-20 19:20:04'),
(18, 'Spandex Deportivo', 'Spandex', 24000, '2025-04-30', 'si', '2025-06-20 12:49:11'),
(19, 'Tweed Invierno', 'Tweed', 32000, '2025-04-30', 'si', '2025-06-20 12:49:17'),
(20, 'Gabardina', 'Algodón', 28000, '2025-04-30', 'si', '2025-06-20 12:49:22'),
(21, 'Lycra Ajustada', 'Lycra', 23000, '2025-04-30', 'si', '2025-06-20 12:49:27'),
(22, 'Encaje Floral', 'Encaje', 35000, '2025-04-30', 'no', '2025-06-20 12:49:32'),
(23, 'Lino fino', 'Lino', 35000, '2025-06-20', 'si', '2025-06-20 19:18:08'),
(24, 'Lino fino', 'Algodón', 0, '2025-06-20', 'Si', '2025-06-20 19:22:28');

-- --------------------------------------------------------

--
-- Table structure for table `ubicacion`
--

CREATE TABLE `ubicacion` (
  `idubicacion` bigint NOT NULL,
  `nombre_ubicacion` varchar(100) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `vista_usuario_carrito_productos_detalle`
-- (See below for the actual view)
--
CREATE TABLE `vista_usuario_carrito_productos_detalle` (
`cantidad` bigint
,`color` varchar(45)
,`Disponibilidad` varchar(45)
,`fechaCreacion` datetime
,`genero` varchar(45)
,`idCarrito` bigint
,`nombre_productos` varchar(45)
,`tallas` varchar(3)
,`tela` varchar(45)
,`total` decimal(10,2)
,`usuario_id` bigint
,`usuario_nombre` varchar(100)
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_project`
--
ALTER TABLE `api_project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `api_rol`
--
ALTER TABLE `api_rol`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_userprofile`
--
ALTER TABLE `api_userprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `api_userprofile_rol_id_c7a4834c_fk_api_rol_id` (`rol_id`);

--
-- Indexes for table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`idCarrito`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `carrito_producto`
--
ALTER TABLE `carrito_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCarrito` (`idCarrito`),
  ADD KEY `idProductos` (`idProductos`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`IdColor`);

--
-- Indexes for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`idComentarios`),
  ADD KEY `idx_comentarios_api_userprofile` (`api_userprofile_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `estampado`
--
ALTER TABLE `estampado`
  ADD PRIMARY KEY (`idEstampado`),
  ADD UNIQUE KEY `idEstampado_UNIQUE` (`idEstampado`);

--
-- Indexes for table `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`),
  ADD UNIQUE KEY `idFactura_UNIQUE` (`idFactura`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `prdido_id` (`prdido_id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedidos`,`carrito_idCarrito`),
  ADD UNIQUE KEY `idPedidos_UNIQUE` (`idPedidos`),
  ADD KEY `fk_Pedidos_Usuarios1_idx` (`Usuarios_IdUsuario`),
  ADD KEY `fk_pedidos_carrito1_idx` (`carrito_idCarrito`),
  ADD KEY `prove_id` (`prove_id`);

--
-- Indexes for table `plantillas`
--
ALTER TABLE `plantillas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProductos`),
  ADD UNIQUE KEY `idProductos_UNIQUE` (`idProductos`),
  ADD KEY `fk_Productos_Color1_idx` (`Color_IdColor`),
  ADD KEY `fk_Productos_Tela1_idx` (`Tela_idTela`),
  ADD KEY `fk_Productos_Tallas1_idx` (`Tallas_idTallas`);

--
-- Indexes for table `productos_has_estampado`
--
ALTER TABLE `productos_has_estampado`
  ADD PRIMARY KEY (`Productos_idProductos`,`Estampado_idEstampado`),
  ADD KEY `fk_Productos_has_Estampado_Estampado1_idx` (`Estampado_idEstampado`),
  ADD KEY `fk_Productos_has_Estampado_Productos1_idx` (`Productos_idProductos`);

--
-- Indexes for table `propuestas_diseno`
--
ALTER TABLE `propuestas_diseno`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_Tela` (`id_Tela`),
  ADD UNIQUE KEY `id_Talla` (`id_Talla`),
  ADD UNIQUE KEY `id_Color` (`id_Color`);

--
-- Indexes for table `propuesta_plantilla`
--
ALTER TABLE `propuesta_plantilla`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id_propuesta` (`Id_propuesta`),
  ADD UNIQUE KEY `id_plantilla` (`id_plantilla`);

--
-- Indexes for table `proveedorsolicitud`
--
ALTER TABLE `proveedorsolicitud`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `proveedorsolicitud_usuario_fk` (`usuario_id`);

--
-- Indexes for table `tallas`
--
ALTER TABLE `tallas`
  ADD PRIMARY KEY (`idTallas`);

--
-- Indexes for table `tela`
--
ALTER TABLE `tela`
  ADD PRIMARY KEY (`idTela`);

--
-- Indexes for table `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`idubicacion`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_project`
--
ALTER TABLE `api_project`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_rol`
--
ALTER TABLE `api_rol`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `api_userprofile`
--
ALTER TABLE `api_userprofile`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carrito`
--
ALTER TABLE `carrito`
  MODIFY `idCarrito` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `carrito_producto`
--
ALTER TABLE `carrito_producto`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `IdColor` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `idComentarios` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `estampado`
--
ALTER TABLE `estampado`
  MODIFY `idEstampado` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `factura`
--
ALTER TABLE `factura`
  MODIFY `idFactura` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedidos` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `plantillas`
--
ALTER TABLE `plantillas`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `idProductos` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `propuestas_diseno`
--
ALTER TABLE `propuestas_diseno`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `propuesta_plantilla`
--
ALTER TABLE `propuesta_plantilla`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `proveedorsolicitud`
--
ALTER TABLE `proveedorsolicitud`
  MODIFY `id_solicitud` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tallas`
--
ALTER TABLE `tallas`
  MODIFY `idTallas` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tela`
--
ALTER TABLE `tela`
  MODIFY `idTela` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `idubicacion` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

-- --------------------------------------------------------

--
-- Structure for view `vista_usuario_carrito_productos_detalle`
--
DROP TABLE IF EXISTS `vista_usuario_carrito_productos_detalle`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_usuario_carrito_productos_detalle`  AS SELECT `u`.`id` AS `usuario_id`, `u`.`nombres` AS `usuario_nombre`, `c`.`idCarrito` AS `idCarrito`, `c`.`fechaCreacion` AS `fechaCreacion`, `c`.`total` AS `total`, `p`.`NombreProductos` AS `nombre_productos`, `cp`.`cantidadProductos` AS `cantidad`, `t`.`Talla` AS `tallas`, `t`.`Disponibilidad` AS `Disponibilidad`, `t`.`genero` AS `genero`, `te`.`NombreTela` AS `tela`, `col`.`NombreColor` AS `color` FROM ((((((`api_userprofile` `u` join `carrito` `c` on((`u`.`id` = `c`.`user_id`))) join `carrito_producto` `cp` on((`c`.`idCarrito` = `cp`.`idCarrito`))) join `productos` `p` on((`cp`.`idProductos` = `p`.`idProductos`))) join `tallas` `t` on((`p`.`Tallas_idTallas` = `t`.`idTallas`))) join `tela` `te` on((`p`.`Tela_idTela` = `te`.`idTela`))) join `color` `col` on((`p`.`Color_IdColor` = `col`.`IdColor`))) ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `api_userprofile`
--
ALTER TABLE `api_userprofile`
  ADD CONSTRAINT `api_userprofile_rol_id_c7a4834c_fk_api_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `api_rol` (`id`),
  ADD CONSTRAINT `api_userprofile_user_id_5a1c1c92_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `api_userprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carrito_producto`
--
ALTER TABLE `carrito_producto`
  ADD CONSTRAINT `carrito_producto_ibfk_1` FOREIGN KEY (`idCarrito`) REFERENCES `carrito` (`idCarrito`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_producto_ibfk_2` FOREIGN KEY (`idProductos`) REFERENCES `productos` (`idProductos`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `api_userprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`prdido_id`) REFERENCES `pedidos` (`idPedidos`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedidos_carrito1` FOREIGN KEY (`carrito_idCarrito`) REFERENCES `carrito` (`idCarrito`),
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`Usuarios_IdUsuario`) REFERENCES `api_userprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`prove_id`) REFERENCES `api_userprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_Productos_Color1` FOREIGN KEY (`Color_IdColor`) REFERENCES `color` (`IdColor`),
  ADD CONSTRAINT `fk_Productos_Tallas1` FOREIGN KEY (`Tallas_idTallas`) REFERENCES `tallas` (`idTallas`),
  ADD CONSTRAINT `fk_Productos_Tela1` FOREIGN KEY (`Tela_idTela`) REFERENCES `tela` (`idTela`);

--
-- Constraints for table `productos_has_estampado`
--
ALTER TABLE `productos_has_estampado`
  ADD CONSTRAINT `fk_Productos_has_Estampado_Estampado1` FOREIGN KEY (`Estampado_idEstampado`) REFERENCES `estampado` (`idEstampado`),
  ADD CONSTRAINT `fk_Productos_has_Estampado_Productos1` FOREIGN KEY (`Productos_idProductos`) REFERENCES `productos` (`idProductos`);

--
-- Constraints for table `propuestas_diseno`
--
ALTER TABLE `propuestas_diseno`
  ADD CONSTRAINT `propuestas_diseno_ibfk_1` FOREIGN KEY (`id_Color`) REFERENCES `color` (`IdColor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `propuestas_diseno_ibfk_2` FOREIGN KEY (`id_Tela`) REFERENCES `tela` (`idTela`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `propuestas_diseno_ibfk_3` FOREIGN KEY (`id_Talla`) REFERENCES `tallas` (`idTallas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `propuesta_plantilla`
--
ALTER TABLE `propuesta_plantilla`
  ADD CONSTRAINT `propuesta_plantilla_ibfk_1` FOREIGN KEY (`id_plantilla`) REFERENCES `plantillas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `propuesta_plantilla_ibfk_2` FOREIGN KEY (`Id_propuesta`) REFERENCES `propuestas_diseno` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proveedorsolicitud`
--
ALTER TABLE `proveedorsolicitud`
  ADD CONSTRAINT `proveedorsolicitud_usuario_fk` FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
