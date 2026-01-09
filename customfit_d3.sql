-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 25-11-2025 a las 04:03:43
-- Versión del servidor: 8.4.3
-- Versión de PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `customfit_d3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_carrito`
--

CREATE TABLE `api_carrito` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `creado` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `api_carrito`
--

INSERT INTO `api_carrito` (`id`, `usuario_id`, `creado`) VALUES
(1, 108, '2025-11-24 21:56:36'),
(2, 2, '2025-11-24 19:26:02'),
(3, 1, '2025-11-24 19:26:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_carritoitem`
--

CREATE TABLE `api_carritoitem` (
  `id` bigint NOT NULL,
  `carrito_id` int NOT NULL,
  `producto_id` bigint NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `api_carritoitem`
--

INSERT INTO `api_carritoitem` (`id`, `carrito_id`, `producto_id`, `cantidad`) VALUES
(12, 2, 1, 5),
(14, 2, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_project`
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
-- Estructura de tabla para la tabla `api_rol`
--

CREATE TABLE `api_rol` (
  `id` bigint NOT NULL,
  `nombrerol` varchar(20) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `api_rol`
--

INSERT INTO `api_rol` (`id`, `nombrerol`, `descripcion`) VALUES
(1, 'user', 'Usuario estándar con acceso limitado'),
(2, 'admin', 'Administrador del sistema con acceso completo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_userprofile`
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
-- Volcado de datos para la tabla `api_userprofile`
--

INSERT INTO `api_userprofile` (`id`, `nombres`, `apellidos`, `nombre_usuario`, `celular`, `correo_electronico`, `conf_correo_electronico`, `rol_id`, `fecha_sesion`, `codigo_verificacion`, `user_id`) VALUES
(1, 'Kevin', 'Patiño Gómez', 'admin', '3001234567', 'admin@customfit.com', 'admin@customfit.com', 2, '2025-10-09 18:44:19.000000', NULL, 1),
(2, 'Maríassss', 'Gómez López', 'maria', '3012345678', 'maria@correo.com', 'maria@correo.com', 1, '2025-10-09 18:44:19.000000', NULL, 2),
(3, 'Juan', 'López Herrera', 'juan', '3023456789', 'juan@correo.com', 'juan@correo.com', 1, '2025-10-09 18:44:19.000000', 'C34567', 3),
(4, 'Camila', 'Rodríguez Díaz', 'camila', '3034567890', 'camila@correo.com', 'camila@correo.com', 1, '2025-10-09 18:44:19.000000', NULL, 4),
(5, 'Andrés', 'García Torres', 'andres', '3045678901', 'andres@correo.com', 'andres@correo.com', 1, '2025-10-09 18:44:19.000000', 'E56789', 5),
(6, 'Laura', 'Sánchez Mejía', 'laura', '3056789012', 'laura@correo.com', 'laura@correo.com', 1, '2025-10-09 18:44:19.000000', 'F67890', 6),
(7, 'Felipe', 'Torres Álvarez', 'felipe', '3067890123', 'felipe@correo.com', 'felipe@correo.com', 1, '2025-10-09 18:44:19.000000', 'G78901', 7),
(8, 'Carolina', 'Martínez Ruiz', 'carolina', '3078901234', 'carolina@correo.com', 'carolina@correo.com', 1, '2025-10-09 18:44:19.000000', 'H89012', 8),
(9, 'Daniel', 'Ruiz Herrera', 'daniel', '3089012345', 'daniel@correo.com', 'daniel@correo.com', 1, '2025-10-09 18:44:19.000000', 'I90123', 9),
(10, 'Sofía', 'Morales Díaz', 'sofia', '3090123456', 'sofia@correo.com', 'sofia@correo.com', 1, '2025-10-09 18:44:19.000000', 'J01234', 10),
(25, 'Maria', 'Gomez Lopez', 'mariaa', '3124567687', 'maria23@correo.com', 'maria23@correo.com', 1, '2025-10-14 23:01:22.032087', '234967', 107),
(26, 'Cesar', 'Garcia', 'Hamburg', '3118251570', 'cesar@gmail.com', 'cesar@gmail.com', 2, '2025-11-04 11:54:13.766347', NULL, 108);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `authtoken_token`
--

CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `authtoken_token`
--

INSERT INTO `authtoken_token` (`key`, `created`, `user_id`) VALUES
('5678b3eb5176d9a318aa615f855f9a4883e36b5c', '2025-10-10 00:03:27.984477', 1),
('5b46e88c871806553688988f7fe7ba65059bbc25', '2025-11-12 17:32:16.522859', 4),
('762e79174a0c039d8f371428087255ce51518f60', '2025-10-10 00:04:20.772930', 2),
('96ee5f0c5106b19690f3d94e033742f250ca57da', '2025-11-04 15:53:08.181696', 108);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int NOT NULL,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(73, 'Can add log entry', 19, 'add_logentry'),
(74, 'Can change log entry', 19, 'change_logentry'),
(75, 'Can delete log entry', 19, 'delete_logentry'),
(76, 'Can view log entry', 19, 'view_logentry'),
(77, 'Can add permission', 20, 'add_permission'),
(78, 'Can change permission', 20, 'change_permission'),
(79, 'Can delete permission', 20, 'delete_permission'),
(80, 'Can view permission', 20, 'view_permission'),
(81, 'Can add group', 21, 'add_group'),
(82, 'Can change group', 21, 'change_group'),
(83, 'Can delete group', 21, 'delete_group'),
(84, 'Can view group', 21, 'view_group'),
(85, 'Can add user', 22, 'add_user'),
(86, 'Can change user', 22, 'change_user'),
(87, 'Can delete user', 22, 'delete_user'),
(88, 'Can view user', 22, 'view_user'),
(89, 'Can add content type', 23, 'add_contenttype'),
(90, 'Can change content type', 23, 'change_contenttype'),
(91, 'Can delete content type', 23, 'delete_contenttype'),
(92, 'Can view content type', 23, 'view_contenttype'),
(93, 'Can add session', 24, 'add_session'),
(94, 'Can change session', 24, 'change_session'),
(95, 'Can delete session', 24, 'delete_session'),
(96, 'Can view session', 24, 'view_session'),
(97, 'Can add Token', 25, 'add_token'),
(98, 'Can change Token', 25, 'change_token'),
(99, 'Can delete Token', 25, 'delete_token'),
(100, 'Can view Token', 25, 'view_token'),
(101, 'Can add Token', 26, 'add_tokenproxy'),
(102, 'Can change Token', 26, 'change_tokenproxy'),
(103, 'Can delete Token', 26, 'delete_tokenproxy'),
(104, 'Can view Token', 26, 'view_tokenproxy'),
(105, 'Can add project', 27, 'add_project'),
(106, 'Can change project', 27, 'change_project'),
(107, 'Can delete project', 27, 'delete_project'),
(108, 'Can view project', 27, 'view_project'),
(109, 'Can add user profile', 28, 'add_userprofile'),
(110, 'Can change user profile', 28, 'change_userprofile'),
(111, 'Can delete user profile', 28, 'delete_userprofile'),
(112, 'Can view user profile', 28, 'view_userprofile'),
(113, 'Can add rol', 29, 'add_rol'),
(114, 'Can change rol', 29, 'change_rol'),
(115, 'Can delete rol', 29, 'delete_rol'),
(116, 'Can view rol', 29, 'view_rol'),
(117, 'Can add tela', 30, 'add_tela'),
(118, 'Can change tela', 30, 'change_tela'),
(119, 'Can delete tela', 30, 'delete_tela'),
(120, 'Can view tela', 30, 'view_tela'),
(121, 'Can add estampado', 31, 'add_estampado'),
(122, 'Can change estampado', 31, 'change_estampado'),
(123, 'Can delete estampado', 31, 'delete_estampado'),
(124, 'Can view estampado', 31, 'view_estampado'),
(125, 'Can add producto', 32, 'add_producto'),
(126, 'Can change producto', 32, 'change_producto'),
(127, 'Can delete producto', 32, 'delete_producto'),
(128, 'Can view producto', 32, 'view_producto'),
(129, 'Can add productos personalizados', 33, 'add_productospersonalizados'),
(130, 'Can change productos personalizados', 33, 'change_productospersonalizados'),
(131, 'Can delete productos personalizados', 33, 'delete_productospersonalizados'),
(132, 'Can view productos personalizados', 33, 'view_productospersonalizados'),
(133, 'Can add productos personalizados has estampado', 34, 'add_productospersonalizadoshasestampado'),
(134, 'Can change productos personalizados has estampado', 34, 'change_productospersonalizadoshasestampado'),
(135, 'Can delete productos personalizados has estampado', 34, 'delete_productospersonalizadoshasestampado'),
(136, 'Can view productos personalizados has estampado', 34, 'view_productospersonalizadoshasestampado'),
(137, 'Can add proveedor solicitud', 35, 'add_proveedorsolicitud'),
(138, 'Can change proveedor solicitud', 35, 'change_proveedorsolicitud'),
(139, 'Can delete proveedor solicitud', 35, 'delete_proveedorsolicitud'),
(140, 'Can view proveedor solicitud', 35, 'view_proveedorsolicitud');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user`
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
-- Volcado de datos para la tabla `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 1, 'admin', 'Kevin', 'Patiño', 'admin@customfit.com', 1, 1, '2025-10-09 18:44:11.000000'),
(2, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 0, 'maria', 'María', 'Gómez', 'maria@correo.com', 0, 1, '2025-10-09 18:44:11.000000'),
(3, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 0, 'juan', 'Juan', 'López', 'juan@correo.com', 0, 1, '2025-10-09 18:44:11.000000'),
(4, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 0, 'camila', 'Camila', 'Rodríguez', 'camila@correo.com', 0, 1, '2025-10-09 18:44:11.000000'),
(5, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 0, 'andres', 'Andrés', 'García', 'andres@correo.com', 0, 1, '2025-10-09 18:44:11.000000'),
(6, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 0, 'laura', 'Laura', 'Sánchez', 'laura@correo.com', 0, 1, '2025-10-09 18:44:11.000000'),
(7, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 0, 'felipe', 'Felipe', 'Torres', 'felipe@correo.com', 0, 1, '2025-10-09 18:44:11.000000'),
(8, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 0, 'carolina', 'Carolina', 'Martínez', 'carolina@correo.com', 0, 1, '2025-10-09 18:44:11.000000'),
(9, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 0, 'daniel', 'Daniel', 'Ruiz', 'daniel@correo.com', 0, 1, '2025-10-09 18:44:11.000000'),
(10, 'pbkdf2_sha256$600000$XyM1zYwTjxkLkDkq0EoYzO$Er0hZQ3HKm2rTZhXU3p1mO4Rz3Rk+1csrdI2u3G+Y+U=', '2025-10-09 18:44:11.000000', 0, 'sofia', 'Sofía', 'Morales', 'sofia@correo.com', 0, 1, '2025-10-09 18:44:11.000000'),
(107, 'pbkdf2_sha256$870000$sDsapQDRF98wiOzxLMFhgL$7hybXYxiAN2L+VjUtPTtb2ujU/pO6X3ZqFgy9AgP+ks=', NULL, 0, 'mariaa', '', '', 'maria23@correo.com', 0, 1, '2025-10-14 23:01:21.020062'),
(108, 'pbkdf2_sha256$1000000$jZGNAlJiio3e79657SQUsR$IQ+IlMW1BopTq/QmmSxFNDPldd6dHXUKpw6XAmIvJSU=', NULL, 0, 'Hamburg', '', '', 'cesar@gmail.com', 0, 1, '2025-11-04 11:54:12.848523'),
(109, 'pbkdf2_sha256$720000$wCMrfLie5JjYUqUz1EqvYU$Mmrw83I0UMZin8zaWBj2yosiN0Z+vWVsVZDxhgaZghU=', NULL, 0, 'hamburgd', '', '', 'cesarg@gmail.com', 0, 1, '2025-11-12 17:56:53.644326');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `idComentarios` bigint NOT NULL,
  `contenido` varchar(45) NOT NULL,
  `api_userprofile_id` bigint NOT NULL,
  `fecha_creacion` date NOT NULL,
  `proveedores_idproveedor` bigint NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `api_userprofile_id1` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_admin_log`
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
-- Estructura de tabla para la tabla `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(19, 'admin', 'logentry'),
(31, 'api', 'estampado'),
(32, 'api', 'producto'),
(33, 'api', 'productospersonalizados'),
(34, 'api', 'productospersonalizadoshasestampado'),
(27, 'api', 'project'),
(35, 'api', 'proveedorsolicitud'),
(29, 'api', 'rol'),
(30, 'api', 'tela'),
(28, 'api', 'userprofile'),
(21, 'auth', 'group'),
(20, 'auth', 'permission'),
(22, 'auth', 'user'),
(25, 'authtoken', 'token'),
(26, 'authtoken', 'tokenproxy'),
(23, 'contenttypes', 'contenttype'),
(24, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(45, 'contenttypes', '0001_initial', '2025-11-04 12:29:26.521701'),
(46, 'auth', '0001_initial', '2025-11-04 12:29:26.534468'),
(47, 'admin', '0001_initial', '2025-11-04 12:29:26.535898'),
(48, 'admin', '0002_logentry_remove_auto_add', '2025-11-04 12:29:26.537441'),
(49, 'admin', '0003_logentry_add_action_flag_choices', '2025-11-04 12:29:26.539057'),
(50, 'api', '0001_initial', '2025-11-04 12:29:26.540713'),
(51, 'api', '0002_userprofile', '2025-11-04 12:29:26.542136'),
(52, 'api', '0003_remove_userprofile_created_and_more', '2025-11-04 12:29:26.543378'),
(53, 'api', '0004_rol', '2025-11-04 12:29:26.544899'),
(54, 'api', '0005_rename_idrol_rol_rol', '2025-11-04 12:29:26.546619'),
(55, 'api', '0006_remove_rol_rol', '2025-11-04 12:29:26.548111'),
(56, 'api', '0007_rol_nrol', '2025-11-04 12:29:26.549370'),
(57, 'api', '0008_userprofile_rol', '2025-11-04 12:29:26.550549'),
(58, 'api', '0009_userprofile_fecha_sesion', '2025-11-04 12:29:26.551871'),
(59, 'api', '0010_remove_rol_nrol', '2025-11-04 12:29:26.553339'),
(60, 'api', '0011_alter_userprofile_rol', '2025-11-04 12:29:26.555276'),
(61, 'api', '0012_alter_userprofile_rol', '2025-11-04 12:29:26.556701'),
(62, 'api', '0013_alter_rol_descripcion_alter_rol_nombrerol', '2025-11-04 12:29:26.558053'),
(63, 'api', '0014_userprofile_codigo_verificacion', '2025-11-04 12:29:26.559549'),
(64, 'api', '0015_alter_project_id_alter_userprofile_id', '2025-11-04 12:29:26.561130'),
(65, 'api', '0016_userprofile_user_alter_userprofile_id', '2025-11-04 12:29:26.562340'),
(66, 'api', '0017_tela_alter_userprofile_rol', '2025-11-04 12:29:26.563959'),
(67, 'api', '0018_estampado_producto_productospersonalizados_and_more', '2025-11-04 12:29:26.565666'),
(68, 'api', '0019_alter_tela_table', '2025-11-04 12:29:26.567283'),
(69, 'api', '0020_alter_producto_options', '2025-11-04 12:29:26.568583'),
(70, 'contenttypes', '0002_remove_content_type_name', '2025-11-04 12:29:26.570157'),
(71, 'auth', '0002_alter_permission_name_max_length', '2025-11-04 12:29:26.571680'),
(72, 'auth', '0003_alter_user_email_max_length', '2025-11-04 12:29:26.573400'),
(73, 'auth', '0004_alter_user_username_opts', '2025-11-04 12:29:26.575020'),
(74, 'auth', '0005_alter_user_last_login_null', '2025-11-04 12:29:26.576283'),
(75, 'auth', '0006_require_contenttypes_0002', '2025-11-04 12:29:26.577455'),
(76, 'auth', '0007_alter_validators_add_error_messages', '2025-11-04 12:29:26.578937'),
(77, 'auth', '0008_alter_user_username_max_length', '2025-11-04 12:29:26.580339'),
(78, 'auth', '0009_alter_user_last_name_max_length', '2025-11-04 12:29:26.581520'),
(79, 'auth', '0010_alter_group_name_max_length', '2025-11-04 12:29:26.582671'),
(80, 'auth', '0011_update_proxy_permissions', '2025-11-04 12:29:26.583839'),
(81, 'auth', '0012_alter_user_first_name_max_length', '2025-11-04 12:29:26.585242'),
(82, 'authtoken', '0001_initial', '2025-11-04 12:29:26.586585'),
(83, 'authtoken', '0002_auto_20160226_1747', '2025-11-04 12:29:26.588176'),
(84, 'authtoken', '0003_tokenproxy', '2025-11-04 12:29:26.589865'),
(85, 'authtoken', '0004_alter_tokenproxy_options', '2025-11-04 12:29:26.591548'),
(86, 'sessions', '0001_initial', '2025-11-04 12:29:26.592812'),
(87, 'api', '0021_alter_producto_options', '2025-11-04 12:38:52.018501');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estampado`
--

CREATE TABLE `estampado` (
  `idEstampado` bigint NOT NULL,
  `NombreEstampado` varchar(45) NOT NULL,
  `TipoEstampado` varchar(45) NOT NULL,
  `ImgEstampado` varchar(100) NOT NULL,
  `ColorEstampado` varchar(45) NOT NULL,
  `fecha_agregado` date NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `PrecioEstampado` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estampado`
--

INSERT INTO `estampado` (`idEstampado`, `NombreEstampado`, `TipoEstampado`, `ImgEstampado`, `ColorEstampado`, `fecha_agregado`, `updated_at`, `PrecioEstampado`) VALUES
(1, 'Llama Creativa', 'Vinilo textil', 'estampado_llama.png', 'Rojo', '2025-01-12', '2025-10-11 05:23:24', 10000),
(2, 'Círculos Modernos', 'Sublimación', 'estampado_circulos.png', 'Azul', '2025-02-05', '2025-10-11 05:17:50', 2000),
(3, 'Rayas Urbanas', 'Serigrafía', 'estampado_rayas.png', 'Negro', '2025-03-15', '2025-10-11 05:26:12', 11000),
(4, 'Flor Tropical', 'Bordado', 'estampado_flor.png', 'Verde', '2025-03-28', '2025-10-09 23:44:39', NULL),
(5, 'Fénix Dorado', 'Vinilo textil', 'estampado_fenix.png', 'Dorado', '2025-04-10', '2025-10-09 23:44:39', NULL),
(6, 'Galaxy Dream', 'Sublimación', 'estampado_galaxy.png', 'Morado', '2025-05-02', '2025-10-09 23:44:39', NULL),
(7, 'Minimal Lines', 'Serigrafía', 'estampado_lines.png', 'Blanco', '2025-06-19', '2025-10-09 23:44:39', NULL),
(8, 'Skull Street', 'Vinilo textil', 'estampado_skull.png', 'Gris', '2025-07-23', '2025-10-09 23:44:39', NULL),
(9, 'Nature Leaf', 'Bordado', 'estampado_leaf.png', 'Verde Oscuro', '2025-08-04', '2025-10-09 23:44:39', NULL),
(10, 'Sunset Waves', 'Sublimación', 'estampado_sunset.png', 'Naranja', '2025-09-15', '2025-10-09 23:44:39', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estampado_has_propuestas_diseno`
--

CREATE TABLE `estampado_has_propuestas_diseno` (
  `estampado_idEstampado` bigint NOT NULL,
  `propuestas_diseno_id` bigint NOT NULL,
  `propuestas_diseno_tela_idTela` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estampado_has_propuestas_diseno`
--

INSERT INTO `estampado_has_propuestas_diseno` (`estampado_idEstampado`, `propuestas_diseno_id`, `propuestas_diseno_tela_idTela`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 1),
(5, 5, 2),
(6, 6, 3),
(7, 7, 2),
(8, 8, 1),
(9, 9, 2),
(10, 10, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedidos` bigint NOT NULL,
  `Direccion` varchar(45) NOT NULL,
  `FechaAproximada` date NOT NULL,
  `fecha_pedido` date NOT NULL,
  `estado_pedido` varchar(45) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `urlFrontal` varchar(100) DEFAULT NULL,
  `urlEspaldar` varchar(100) DEFAULT NULL,
  `urlMangaDerecha` varchar(100) DEFAULT NULL,
  `urlMangaIzquierda` varchar(100) DEFAULT NULL,
  `fechaDeEnvio` date NOT NULL,
  `carrito_idCarrito` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedidos`, `Direccion`, `FechaAproximada`, `fecha_pedido`, `estado_pedido`, `updated_at`, `urlFrontal`, `urlEspaldar`, `urlMangaDerecha`, `urlMangaIzquierda`, `fechaDeEnvio`, `carrito_idCarrito`) VALUES
(1, 'Calle 10 #23-15, Bogotá', '2025-10-15', '2025-10-10', 'En proceso', '2025-10-09 23:45:23', 'img/frontal1.png', 'img/espalda1.png', 'img/mangaD1.png', 'img/mangaI1.png', '2025-10-12', 1),
(2, 'Carrera 45 #56-22, Medellín', '2025-10-17', '2025-10-11', 'Pendiente', '2025-10-09 23:45:23', 'img/frontal2.png', 'img/espalda2.png', 'img/mangaD2.png', 'img/mangaI2.png', '2025-10-13', 2),
(3, 'Avenida 9 #30-18, Cali', '2025-10-18', '2025-10-12', 'Entregado', '2025-10-09 23:45:23', 'img/frontal3.png', 'img/espalda3.png', 'img/mangaD3.png', 'img/mangaI3.png', '2025-10-14', 3),
(4, 'Carrera 14 #52-09, Barranquilla', '2025-10-20', '2025-10-13', 'En camino', '2025-10-09 23:45:23', 'img/frontal4.png', 'img/espalda4.png', 'img/mangaD4.png', 'img/mangaI4.png', '2025-10-15', 4),
(5, 'Calle 60 #8-25, Bucaramanga', '2025-10-21', '2025-10-14', 'Pendiente', '2025-10-09 23:45:23', 'img/frontal5.png', 'img/espalda5.png', 'img/mangaD5.png', 'img/mangaI5.png', '2025-10-16', 5),
(6, 'Carrera 33 #15-20, Cartagena', '2025-10-22', '2025-10-15', 'En proceso', '2025-10-09 23:45:23', 'img/frontal6.png', 'img/espalda6.png', 'img/mangaD6.png', 'img/mangaI6.png', '2025-10-17', 6),
(7, 'Calle 25 #44-12, Manizales', '2025-10-23', '2025-10-16', 'Entregado', '2025-10-09 23:45:23', 'img/frontal7.png', 'img/espalda7.png', 'img/mangaD7.png', 'img/mangaI7.png', '2025-10-18', 7),
(8, 'Carrera 20 #11-30, Pereira', '2025-10-24', '2025-10-17', 'Cancelado', '2025-10-09 23:45:23', 'img/frontal8.png', 'img/espalda8.png', 'img/mangaD8.png', 'img/mangaI8.png', '2025-10-19', 8),
(9, 'Avenida 7 #100-50, Bogotá', '2025-10-25', '2025-10-18', 'En camino', '2025-10-09 23:45:23', 'img/frontal9.png', 'img/espalda9.png', 'img/mangaD9.png', 'img/mangaI9.png', '2025-10-20', 9),
(10, 'Calle 80 #90-30, Medellín', '2025-10-26', '2025-10-19', 'Pendiente', '2025-10-09 23:45:23', 'img/frontal10.png', 'img/espalda10.png', 'img/mangaD10.png', 'img/mangaI10.png', '2025-10-21', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantillas`
--

CREATE TABLE `plantillas` (
  `id` bigint NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `tipo` enum('frontal','espalda','derecha','izquierda') NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `plantillas`
--

INSERT INTO `plantillas` (`id`, `nombre`, `tipo`, `imagen_url`) VALUES
(1, 'Plantilla Básica Frontal', 'frontal', 'img/plantillas/frontal_basica.png'),
(2, 'Plantilla Espalda Clásica', 'espalda', 'img/plantillas/espalda_clasica.png'),
(3, 'Plantilla Manga Derecha', 'derecha', 'img/plantillas/manga_derecha.png'),
(4, 'Plantilla Manga Izquierda', 'izquierda', 'img/plantillas/manga_izquierda.png'),
(5, 'Plantilla Deportiva Frontal', 'frontal', 'img/plantillas/frontal_deportiva.png'),
(6, 'Plantilla Casual Espalda', 'espalda', 'img/plantillas/espalda_casual.png'),
(7, 'Plantilla Floral Derecha', 'derecha', 'img/plantillas/floral_derecha.png'),
(8, 'Plantilla Gamer Izquierda', 'izquierda', 'img/plantillas/gamer_izquierda.png'),
(9, 'Plantilla Vintage Frontal', 'frontal', 'img/plantillas/vintage_frontal.png'),
(10, 'Plantilla Moderna Espalda', 'espalda', 'img/plantillas/espalda_moderna.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProductos` bigint NOT NULL,
  `NombreProductos` varchar(45) NOT NULL,
  `TipoProductos` varchar(45) NOT NULL,
  `PrecioProducto` bigint NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_actualizacion` date NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `urlFrontal` varchar(100) DEFAULT NULL,
  `urlEspaldar` varchar(100) DEFAULT NULL,
  `urlMangaIzquierda` varchar(100) DEFAULT NULL,
  `urlMangaDerecha` varchar(100) DEFAULT NULL,
  `Tallas` varchar(50) NOT NULL,
  `Color` varchar(50) NOT NULL,
  `Tela_idTela` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProductos`, `NombreProductos`, `TipoProductos`, `PrecioProducto`, `Descripcion`, `fecha_creacion`, `fecha_actualizacion`, `updated_at`, `urlFrontal`, `urlEspaldar`, `urlMangaIzquierda`, `urlMangaDerecha`, `Tallas`, `Color`, `Tela_idTela`) VALUES
(1, 'Camiseta Básica Blancassss', 'Camisas', 40000, 'Camiseta de algodón suave ideal para uso diario.', '2025-01-10', '2025-11-12', '2025-11-13 03:22:22', 'https://tiendadim.com/wp-content/uploads/2025/03/0009_Camiseta-front.jpg', 'https://tiendadim.com/wp-content/uploads/2025/03/0008_Camiseta-back.jpg', 'https://tiendadim.com/wp-content/uploads/2025/03/0007_Detalle-2-camiseta.jpg', 'https://tiendadim.com/wp-content/uploads/2025/03/0006_Detalle-1-Camiseta-600x600.jpg', 'M', 'Blanco', 1),
(2, 'Camiseta Azul Clásica', 'Camisas', 42000, 'Prenda versátil con corte moderno y cómodo.', '2025-01-12', '2025-11-12', '2025-11-13 00:25:38', 'https://ekunchile.cl/wp-content/uploads/2023/06/Camisa-rayas-BELLOTA-1.jpg', 'img/espalda2.png', 'img/mangaI2.png', 'img/mangaD2.png', 'L', 'Negro', 2),
(3, 'Camiseta Azul Marino', 'Camisas Personalizadas', 45000, 'Camiseta de tela transpirable perfecta para exteriores.', '2025-01-14', '2025-11-10', '2025-11-11 05:27:07', 'https://ekunchile.cl/wp-content/uploads/2023/05/a48-300x300.jpg', 'img/espalda3.png', 'https://ekunchile.cl/wp-content/uploads/2023/06/Camisa-rayas-BELLOTA-1.jpg', 'img/mangaD3.png', 'S', 'Azul', 3),
(4, 'Camiseta Roja Casual', 'Camisas', 47000, 'Diseño cómodo con costuras reforzadas.', '2025-01-16', '2025-11-12', '2025-11-13 00:25:47', 'img/frontal4.png', 'img/espalda4.png', 'img/mangaI4.png', 'img/mangaD4.png', 'M', 'Rojo', 4),
(5, 'Camiseta Verde Militar', 'Camisas Personalizadas', 48000, 'Perfecta para looks urbanos y relajados.', '2025-01-18', '2025-11-12', '2025-11-13 00:26:14', 'img/frontal5.png', 'img/espalda5.png', 'img/mangaI5.png', 'img/mangaD5.png', 'XL', 'Verde', 5),
(6, 'Camiseta Deportiva Gris', 'Camisas Personalizadas', 50000, 'Diseñada para entrenamiento con tela elástica.', '2025-02-01', '2025-11-12', '2025-11-13 00:26:25', 'img/frontal6.png', 'img/espalda6.png', 'img/mangaI6.png', 'img/mangaD6.png', 'L', 'Gris', 2),
(7, 'Camiseta Estilo Retro', 'Camisas', 55000, 'Inspirada en los años 90, ideal para personalizar.', '2025-02-03', '2025-11-12', '2025-11-13 00:26:34', 'img/frontal7.png', 'img/espalda7.png', 'img/mangaI7.png', 'img/mangaD7.png', 'M', 'Blanco', 3),
(8, 'Camiseta Manga Larga Negra', 'Camisas', 52000, 'Camiseta elegante para clima fresco.', '2025-02-04', '2025-11-12', '2025-11-13 01:05:02', 'img/frontal8.png', 'img/espalda8.png', 'img/mangaI8.png', 'img/mangaD8.png', 'L', 'Negro', 4),
(9, 'Camiseta Bordado Pequeño', 'camisa', 58000, 'Permite añadir iniciales o logotipos.', '2025-02-05', '2025-10-16', '2025-10-16 17:31:08', 'img/frontal9.png', 'img/espalda9.png', 'img/mangaI9.png', 'img/mangaD9.png', 'S', 'Beige', 5),
(10, 'Camiseta Blanca Premium', 'Camisas', 60000, 'Corte moderno y tela de alta calidad.', '2025-02-06', '2025-11-12', '2025-11-13 03:18:28', 'img/frontal10.png', 'img/espalda10.png', 'img/mangaI10.png', 'img/mangaD10.png', 'M', 'Blanco', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productosperonalizaos`
--

CREATE TABLE `productosperonalizaos` (
  `idProductosPeronalizaos` bigint NOT NULL,
  `NombrePersonalizado` varchar(45) DEFAULT NULL,
  `precioPersonalizado` double DEFAULT NULL,
  `rolProducto` varchar(45) DEFAULT 'ENUM(''tienda'', ''personalizado'')',
  `stock` int NOT NULL,
  `productos_idProductos` bigint NOT NULL,
  `urlFrontal` varchar(100) DEFAULT NULL,
  `urlEspadarl` varchar(100) DEFAULT NULL,
  `urlMangaDerecha` varchar(100) DEFAULT NULL,
  `urlMangaIzquierda` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productosperonalizaos`
--

INSERT INTO `productosperonalizaos` (`idProductosPeronalizaos`, `NombrePersonalizado`, `precioPersonalizado`, `rolProducto`, `stock`, `productos_idProductos`, `urlFrontal`, `urlEspadarl`, `urlMangaDerecha`, `urlMangaIzquierda`) VALUES
(1, 'Camiseta Logo Minimalista', 55000, 'personalizado', 0, 1, 'img/frontal1.png', 'img/espalda1.png', 'img/mangaD1.png', 'img/mangaI1.png'),
(2, 'Camiseta Deportiva Azul', 60000, 'personalizado', 0, 2, 'img/frontal2.png', 'img/espalda2.png', 'img/mangaD2.png', 'img/mangaI2.png'),
(3, 'Camiseta Frase Motivadora', 52000, 'personalizado', 0, 3, 'img/frontal3.png', 'img/espalda3.png', 'img/mangaD3.png', 'img/mangaI3.png'),
(4, 'Camiseta Abstracta Urbana', 70000, 'personalizado', 0, 4, 'img/frontal4.png', 'img/espalda4.png', 'img/mangaD4.png', 'img/mangaI4.png'),
(5, 'Camiseta Negra Clásica', 40000, 'tienda', 25, 5, 'img/frontal5.png', 'img/espalda5.png', 'img/mangaD5.png', 'img/mangaI5.png'),
(6, 'Camiseta Gamer Neon', 68000, 'personalizado', 9, 6, 'img/frontal6.png', 'img/espalda6.png', 'img/mangaD6.png', 'img/mangaI6.png'),
(7, 'Camiseta Floral Blanca', 60000, 'personalizado', 11, 7, 'img/frontal7.png', 'img/espalda7.png', 'img/mangaD7.png', 'img/mangaI7.png'),
(8, 'Camiseta Roja Tienda', 45000, 'tienda', 20, 8, 'img/frontal8.png', 'img/espalda8.png', 'img/mangaD8.png', 'img/mangaI8.png'),
(9, 'Camiseta Vintage 90s', 63000, 'personalizado', 14, 9, 'img/frontal9.png', 'img/espalda9.png', 'img/mangaD9.png', 'img/mangaI9.png'),
(10, 'Camiseta Bordado Iniciales', 58000, 'personalizado', 10, 10, 'img/frontal10.png', 'img/espalda10.png', 'img/mangaD10.png', 'img/mangaI10.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productosperonalizaos_has_carrito`
--

CREATE TABLE `productosperonalizaos_has_carrito` (
  `ProductosPeronalizaos_idProductosPeronalizaos` bigint NOT NULL,
  `carrito_idCarrito` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productosperonalizaos_has_carrito`
--

INSERT INTO `productosperonalizaos_has_carrito` (`ProductosPeronalizaos_idProductosPeronalizaos`, `carrito_idCarrito`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productosperonalizaos_has_estampado`
--

CREATE TABLE `productosperonalizaos_has_estampado` (
  `ProductosPeronalizaos_idProductosPeronalizaos` bigint NOT NULL,
  `estampado_idEstampado` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productosperonalizaos_has_estampado`
--

INSERT INTO `productosperonalizaos_has_estampado` (`ProductosPeronalizaos_idProductosPeronalizaos`, `estampado_idEstampado`) VALUES
(1, 1),
(4, 1),
(2, 2),
(5, 2),
(1, 3),
(7, 3),
(3, 4),
(8, 4),
(2, 5),
(9, 5),
(3, 6),
(10, 6),
(4, 7),
(6, 8),
(7, 9),
(10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propuestas_diseno`
--

CREATE TABLE `propuestas_diseno` (
  `id` bigint NOT NULL,
  `nombre_empresa` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `cantidad` int DEFAULT NULL,
  `texto_personalizado` text,
  `propuestas_disenocol` varchar(45) DEFAULT NULL,
  `tallas_idTallas` bigint DEFAULT NULL,
  `tela_idTela` bigint NOT NULL,
  `color_IdColor` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `propuestas_diseno`
--

INSERT INTO `propuestas_diseno` (`id`, `nombre_empresa`, `descripcion`, `cantidad`, `texto_personalizado`, `propuestas_disenocol`, `tallas_idTallas`, `tela_idTela`, `color_IdColor`) VALUES
(1, 'CustomFit Designs', 'Diseño de camiseta con logotipo frontal para evento empresarial.', 50, 'Innovación y estilo', 'corporativo', 2, 1, 3),
(2, 'EcoWear Ltda', 'Camisetas ecológicas con mensaje ambiental.', 100, 'Cuidemos el planeta', 'ecologico', 3, 2, 4),
(3, 'TechZone', 'Uniformes de equipo con nombres personalizados.', 30, 'Equipo TechZone', 'tecnologia', 1, 3, 2),
(4, 'Urban Street', 'Diseño urbano con gráficos modernos en la espalda.', 40, 'Urban Vibes', 'urbano', 4, 1, 1),
(5, 'Deportiva Plus', 'Camisetas deportivas transpirables con número personalizado.', 60, 'Entrena al máximo', 'deportivo', 5, 2, 5),
(6, 'ArteColor', 'Diseños artísticos con estampados coloridos.', 20, 'Arte en movimiento', 'artistico', 3, 3, 6),
(7, 'GamerX', 'Diseño para evento gamer con logo en manga derecha.', 25, 'GamerX Power', 'gaming', 2, 2, 7),
(8, 'Café Aroma', 'Uniformes para empleados con logo del café bordado.', 15, 'Café Aroma', 'restaurante', 1, 1, 8),
(9, 'PetLovers', 'Camisetas con frases y huellas de mascotas.', 35, 'Amor por los peludos', 'mascotas', 4, 2, 9),
(10, 'MusicWave', 'Diseños musicales con ondas de sonido y texto.', 45, 'Vive la música', 'musical', 5, 3, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propuestas_diseno_has_plantillas`
--

CREATE TABLE `propuestas_diseno_has_plantillas` (
  `propuestas_diseno_id` bigint NOT NULL,
  `propuestas_diseno_tela_idTela` bigint NOT NULL,
  `plantillas_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `propuestas_diseno_has_plantillas`
--

INSERT INTO `propuestas_diseno_has_plantillas` (`propuestas_diseno_id`, `propuestas_diseno_tela_idTela`, `plantillas_id`) VALUES
(1, 1, 1),
(1, 1, 2),
(4, 1, 2),
(2, 2, 3),
(3, 3, 4),
(5, 2, 5),
(6, 3, 6),
(7, 2, 7),
(8, 1, 8),
(9, 2, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tela`
--

CREATE TABLE `tela` (
  `idTela` bigint NOT NULL,
  `NombreTela` varchar(45) NOT NULL,
  `fecha_agregado` date NOT NULL,
  `Disponibilidad` varchar(45) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tela`
--

INSERT INTO `tela` (`idTela`, `NombreTela`, `fecha_agregado`, `Disponibilidad`, `updated_at`, `precio`) VALUES
(1, 'Algodón Orgánico', '2025-01-10', 'Si', '2025-10-11 04:37:27', 25000),
(2, 'Poliéster Premium', '2025-01-15', 'Si', '2025-10-10 05:40:21', 22000),
(3, 'Lino Natural', '2025-02-05', 'Si', '2025-10-11 04:42:34', 30000),
(4, 'Seda Satinada', '2025-02-20', 'Si', '2025-10-11 04:43:02', 45000),
(5, 'Denim Azul', '2025-03-12', 'Si', '2025-10-11 04:42:38', 28000),
(6, 'Franela Suave', '2025-03-25', 'Disponible', '2025-10-09 23:44:45', 26000),
(7, 'Cuero Sintético', '2025-04-07', 'Si', '2025-10-11 04:41:43', 40000),
(8, 'Lycra Elástica', '2025-05-01', 'Disponible', '2025-10-09 23:44:45', 24000),
(9, 'Popelina Blanca', '2025-06-10', 'Disponible', '2025-10-09 23:44:45', 27000),
(10, 'Tafetán Brillante', '2025-07-18', 'Agotada', '2025-10-09 23:44:45', 35000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `api_carrito`
--
ALTER TABLE `api_carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_fk` (`usuario_id`);

--
-- Indices de la tabla `api_carritoitem`
--
ALTER TABLE `api_carritoitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carrito_fk` (`carrito_id`),
  ADD KEY `producto_fk` (`producto_id`);

--
-- Indices de la tabla `api_project`
--
ALTER TABLE `api_project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `api_rol`
--
ALTER TABLE `api_rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `api_userprofile`
--
ALTER TABLE `api_userprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `api_userprofile_rol_id_c7a4834c_fk_api_rol_id` (`rol_id`);

--
-- Indices de la tabla `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indices de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`idComentarios`,`api_userprofile_id1`),
  ADD KEY `idx_comentarios_api_userprofile` (`api_userprofile_id`),
  ADD KEY `fk_comentarios_api_userprofile1_idx` (`api_userprofile_id1`);

--
-- Indices de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indices de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indices de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indices de la tabla `estampado`
--
ALTER TABLE `estampado`
  ADD PRIMARY KEY (`idEstampado`),
  ADD UNIQUE KEY `idEstampado_UNIQUE` (`idEstampado`);

--
-- Indices de la tabla `estampado_has_propuestas_diseno`
--
ALTER TABLE `estampado_has_propuestas_diseno`
  ADD PRIMARY KEY (`estampado_idEstampado`,`propuestas_diseno_id`,`propuestas_diseno_tela_idTela`),
  ADD KEY `fk_estampado_has_propuestas_diseno_propuestas_diseno1_idx` (`propuestas_diseno_id`,`propuestas_diseno_tela_idTela`),
  ADD KEY `fk_estampado_has_propuestas_diseno_estampado1_idx` (`estampado_idEstampado`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedidos`,`carrito_idCarrito`),
  ADD UNIQUE KEY `idPedidos_UNIQUE` (`idPedidos`),
  ADD KEY `fk_pedidos_carrito1_idx` (`carrito_idCarrito`);

--
-- Indices de la tabla `plantillas`
--
ALTER TABLE `plantillas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProductos`),
  ADD UNIQUE KEY `idProductos_UNIQUE` (`idProductos`),
  ADD KEY `fk_Productos_Tela1_idx` (`Tela_idTela`);

--
-- Indices de la tabla `productosperonalizaos`
--
ALTER TABLE `productosperonalizaos`
  ADD PRIMARY KEY (`idProductosPeronalizaos`),
  ADD KEY `fk_ProductosPeronalizaos_productos1_idx` (`productos_idProductos`);

--
-- Indices de la tabla `productosperonalizaos_has_carrito`
--
ALTER TABLE `productosperonalizaos_has_carrito`
  ADD PRIMARY KEY (`ProductosPeronalizaos_idProductosPeronalizaos`,`carrito_idCarrito`),
  ADD KEY `fk_ProductosPeronalizaos_has_carrito_carrito1_idx` (`carrito_idCarrito`),
  ADD KEY `fk_ProductosPeronalizaos_has_carrito_ProductosPeronalizaos1_idx` (`ProductosPeronalizaos_idProductosPeronalizaos`);

--
-- Indices de la tabla `productosperonalizaos_has_estampado`
--
ALTER TABLE `productosperonalizaos_has_estampado`
  ADD PRIMARY KEY (`ProductosPeronalizaos_idProductosPeronalizaos`,`estampado_idEstampado`),
  ADD KEY `fk_ProductosPeronalizaos_has_estampado_estampado1_idx` (`estampado_idEstampado`),
  ADD KEY `fk_ProductosPeronalizaos_has_estampado_ProductosPeronalizao_idx` (`ProductosPeronalizaos_idProductosPeronalizaos`);

--
-- Indices de la tabla `propuestas_diseno`
--
ALTER TABLE `propuestas_diseno`
  ADD PRIMARY KEY (`id`,`tela_idTela`),
  ADD KEY `fk_propuestas_diseno_tela1_idx` (`tela_idTela`);

--
-- Indices de la tabla `propuestas_diseno_has_plantillas`
--
ALTER TABLE `propuestas_diseno_has_plantillas`
  ADD PRIMARY KEY (`propuestas_diseno_id`,`propuestas_diseno_tela_idTela`,`plantillas_id`),
  ADD KEY `fk_propuestas_diseno_has_plantillas_plantillas1_idx` (`plantillas_id`),
  ADD KEY `fk_propuestas_diseno_has_plantillas_propuestas_diseno1_idx` (`propuestas_diseno_id`,`propuestas_diseno_tela_idTela`);

--
-- Indices de la tabla `tela`
--
ALTER TABLE `tela`
  ADD PRIMARY KEY (`idTela`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `api_carrito`
--
ALTER TABLE `api_carrito`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `api_carritoitem`
--
ALTER TABLE `api_carritoitem`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `api_project`
--
ALTER TABLE `api_project`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `api_rol`
--
ALTER TABLE `api_rol`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `api_userprofile`
--
ALTER TABLE `api_userprofile`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `idComentarios` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT de la tabla `estampado`
--
ALTER TABLE `estampado`
  MODIFY `idEstampado` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedidos` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `plantillas`
--
ALTER TABLE `plantillas`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProductos` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `propuestas_diseno`
--
ALTER TABLE `propuestas_diseno`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tela`
--
ALTER TABLE `tela`
  MODIFY `idTela` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `api_carrito`
--
ALTER TABLE `api_carrito`
  ADD CONSTRAINT `usuario_fk` FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `api_carritoitem`
--
ALTER TABLE `api_carritoitem`
  ADD CONSTRAINT `carrito_fk` FOREIGN KEY (`carrito_id`) REFERENCES `api_carrito` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `producto_fk` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`idProductos`) ON DELETE CASCADE;

--
-- Filtros para la tabla `api_userprofile`
--
ALTER TABLE `api_userprofile`
  ADD CONSTRAINT `api_userprofile_rol_id_c7a4834c_fk_api_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `api_rol` (`id`),
  ADD CONSTRAINT `api_userprofile_user_id_5a1c1c92_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `fk_comentarios_api_userprofile1` FOREIGN KEY (`api_userprofile_id1`) REFERENCES `api_userprofile` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `estampado_has_propuestas_diseno`
--
ALTER TABLE `estampado_has_propuestas_diseno`
  ADD CONSTRAINT `fk_estampado_has_propuestas_diseno_estampado1` FOREIGN KEY (`estampado_idEstampado`) REFERENCES `estampado` (`idEstampado`),
  ADD CONSTRAINT `fk_estampado_has_propuestas_diseno_propuestas_diseno1` FOREIGN KEY (`propuestas_diseno_id`,`propuestas_diseno_tela_idTela`) REFERENCES `propuestas_diseno` (`id`, `tela_idTela`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
