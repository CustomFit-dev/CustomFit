

<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "customfit_test";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Establecer el conjunto de caracteres a UTF-8
$conn->set_charset("utf8");

// Opcional: Función para ejecutar consultas
function executeQuery($sql) {
    global $conn;
    $result = $conn->query($sql);
    if ($result === FALSE) {
        echo "Error en la consulta: " . $conn->error;
    }
    return $result;
}
?>
