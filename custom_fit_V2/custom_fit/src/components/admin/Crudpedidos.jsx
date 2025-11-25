import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PedidosList = () => {
  const [pedidos, setPedidos] = useState([]);

  const fetchPedidos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/pedidos/", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      setPedidos(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los pedidos", "error");
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const eliminarPedido = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/pedidos/${id}/eliminar/`, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
        Swal.fire("Eliminado", "Pedido eliminado correctamente", "success");
        fetchPedidos();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el pedido", "error");
      }
    }
  };

  return (
    <div>
      <h1>Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>No hay pedidos.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.usuario_nombre}</td>
                <td>${pedido.total}</td>
                <td>{new Date(pedido.fecha).toLocaleString()}</td>
                <td>
                  <Link to={`/pedidos/${pedido.id}`}>Ver</Link> |{" "}
                  <Link to={`/pedidos/${pedido.id}/editar`}>Editar</Link> |{" "}
                  <button onClick={() => eliminarPedido(pedido.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PedidosList;
