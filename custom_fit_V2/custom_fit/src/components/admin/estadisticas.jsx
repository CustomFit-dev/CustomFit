
import { useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import {
  Activity,
  Users,
  Eye,
  ShoppingCart,
  BarChart3,
  Shirt,
  MessageSquare,
  Clock3,
  UserPlus
} from "lucide-react";

const styles = {
  container: {
    width: "90%",        // Más ancho en móviles
    maxWidth: "1440px",  // Para que no se pase en pantallas grandes
    margin: "0 auto",    // Centrar horizontalmente
    background: "transparent",
    minHeight: "100vh",
    padding: "16px",
    fontFamily: "Inter, system-ui, sans-serif",
    color: "#fff",
    boxSizing: "border-box"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Ajusta el número de columnas según espacio
    gap: "16px",
    width: "100%",  // Ocupa todo el ancho del contenedor
  },
  card: {
    backgroundColor: "#1e1a2d",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    minWidth: 0, // Para evitar overflow en flex hijos
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  cardTitle: {
    color: "#a0aec0",
    fontSize: "0.875rem", // 14px en rem, para mejor escalabilidad
    fontWeight: "500"
  },
  valueText: {
    fontSize: "1.5rem", // 24px en rem
    fontWeight: "bold"
  },
  chartContainer: {
    height: "200px",
    width: "100%"
  }
};


// Simulación de datos para los nuevos módulos
const sampleData = [
  { name: "Semana 1", ventas: 120 },
  { name: "Semana 2", ventas: 210 },
  { name: "Semana 3", ventas: 180 },
  { name: "Semana 4", ventas: 250 },
];

const pedidosEstado = [
  { name: "Pendiente", value: 10, color: "#facc15" },
  { name: "Producción", value: 7, color: "#60a5fa" },
  { name: "Enviado", value: 5, color: "#34d399" },
  { name: "Entregado", value: 15, color: "#4ade80" }
];

export default function Dashboard() {
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <div style={{...styles.card, borderColor: "rgba(250, 204, 21, 0.3)"}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Camisas Personalizadas</span>
            <Shirt style={{color: "#facc15"}} size={16} />
          </div>
          <div style={{...styles.valueText, color: "#facc15"}}>872</div>
        </div>

        <div style={{...styles.card, borderColor: "rgba(96, 165, 250, 0.3)"}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Pedidos en Producción</span>
            <Clock3 style={{color: "#60a5fa"}} size={16} />
          </div>
          <div style={{...styles.valueText, color: "#60a5fa"}}>32</div>
        </div>

        <div style={{...styles.card, borderColor: "rgba(34, 211, 238, 0.3)"}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Clientes Frecuentes</span>
            <Users style={{color: "#22d3ee"}} size={16} />
          </div>
          <div style={{...styles.valueText, color: "#22d3ee"}}>48</div>
        </div>

        <div style={{...styles.card, borderColor: "rgba(244, 114, 182, 0.3)"}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Comentarios Recientes</span>
            <MessageSquare style={{color: "#f472b6"}} size={16} />
          </div>
          <div style={{fontSize: "16px", color: "#f9a8d4"}}>"Muy buena calidad!" - Ana</div>
        </div>

        <div style={{...styles.card, gridColumn: "span 2", borderColor: "rgba(139, 92, 246, 0.3)"}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Ventas Semanales</span>
            <BarChart3 style={{color: "#a78bfa"}} size={16} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#1e1a2d", borderColor: "#6366F1" }} />
              <Bar dataKey="ventas" fill="#c084fc" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{...styles.card, gridColumn: "span 2", borderColor: "rgba(251, 191, 36, 0.3)"}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Estado de Pedidos</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pedidosEstado}
                cx="50%"
                cy="50%"
                label
                outerRadius={80}
                dataKey="value"
              >
                {pedidosEstado.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e1a2d", borderColor: "#6366F1" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
