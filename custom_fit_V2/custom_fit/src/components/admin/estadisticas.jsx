import { useState } from "react";
import {
  LineChart, BarChart, PieChart, Pie, Cell, ResponsiveContainer,
  Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import {
  Activity, Users, Eye, ShoppingCart, BarChart3, Shirt, MessageSquare,
  Clock3, UserPlus, TrendingUp, TrendingDown, Star, Truck
} from "lucide-react";

const styles = {
  container: {
    width: "100%",
    maxWidth: "1440px",
    margin: "0 auto",
    background: "transparent",
    minHeight: "100vh",
    padding: "16px",
    fontFamily: "Inter, system-ui, sans-serif",
    color: "#fff",
    boxSizing: "border-box"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
    width: "100%",
  },
  card: {
    background: "linear-gradient(135deg, #1e293b, #111827)",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  cardTitle: {
    color: "#a0aec0",
    fontSize: "0.875rem",
    fontWeight: "500"
  },
  valueText: {
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  trendIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px'
  },
  chartWrapper: {
    width: "100%",
    height: "250px",
  }
};

const ventasSemanales = [
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

const rendimientoMensual = [
  { mes: "Ene", visitas: 400, conversiones: 80 },
  { mes: "Feb", visitas: 500, conversiones: 120 },
  { mes: "Mar", visitas: 480, conversiones: 90 },
  { mes: "Abr", visitas: 600, conversiones: 130 },
];

const productosTop = [
  { name: "Camisa Básica", ventas: 180 },
  { name: "Camisa Logo", ventas: 145 },
  { name: "Camisa Premium", ventas: 210 },
];

export default function Dashboard() {
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <InfoCard title="Nuevos Usuarios" icon={<UserPlus color="#34d399" size={18} />} value="45" trend="+12%" />
        <InfoCard title="Órdenes Totales" icon={<ShoppingCart color="#f87171" size={18} />} value="128" trend="-5%" color="red" />
        <InfoCard title="Visitas al Sitio" icon={<Eye color="#60a5fa" size={18} />} value="1,200" trend="+8%" />
        <InfoCard title="Tasa de Conversión" icon={<Activity color="#facc15" size={18} />} value="3.5%" trend="+1.1%" />
        <InfoCard title="Camisas Vendidas" icon={<Shirt color="#facc15" size={18} />} value="872" />
        <InfoCard title="Pedidos en Producción" icon={<Clock3 color="#60a5fa" size={18} />} value="32" />
        <InfoCard title="Clientes Frecuentes" icon={<Users color="#22d3ee" size={18} />} value="48" />
        <InfoCard title="Último Comentario" icon={<MessageSquare color="#f472b6" size={18} />} value='"Excelente calidad!" - Ana' small />
        <InfoCard title="Cantidad de Proveedores" icon={<Truck color="#38bdf8" size={18} />} value="12" trend="+2" />

        <ChartCard title="Ventas Semanales" icon={<BarChart3 color="#a78bfa" size={18} />}>
          <BarChart data={ventasSemanales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#1e1a2d", borderColor: "#6366F1" }} />
            <Bar dataKey="ventas" fill="#c084fc" />
          </BarChart>
        </ChartCard>

        <ChartCard title="Estado de Pedidos">
          <PieChart>
            <Pie data={pedidosEstado} cx="50%" cy="50%" label outerRadius={80} dataKey="value">
              {pedidosEstado.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#1e1a2d", borderColor: "#6366F1" }} />
          </PieChart>
        </ChartCard>

        <ChartCard title="Rendimiento Mensual">
          <LineChart data={rendimientoMensual}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="mes" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#1e1a2d", borderColor: "#6366F1" }} />
            <Line type="monotone" dataKey="visitas" stroke="#60a5fa" strokeWidth={2} />
            <Line type="monotone" dataKey="conversiones" stroke="#f472b6" strokeWidth={2} />
            <Legend />
          </LineChart>
        </ChartCard>

        <ChartCard title="Top Productos Personalizados" icon={<Star color="#fcd34d" size={18} />}>
          <BarChart data={productosTop} layout="vertical">
            <XAxis type="number" stroke="#ccc" />
            <YAxis dataKey="name" type="category" stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#1e1a2d", borderColor: "#6366F1" }} />
            <Bar dataKey="ventas" fill="#fbbf24" />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  );
}

function InfoCard({ title, icon, value, trend, color = "green", small = false }) {
  const trendColor = color === "red" ? "#f87171" : "#4ade80";
  const TrendIcon = color === "red" ? TrendingDown : TrendingUp;

  return (
    <div style={{ ...styles.card, borderLeft: `4px solid ${trendColor}` }}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>{title}</span>
        {icon}
      </div>
      <div style={{ ...styles.valueText, color: trendColor, fontSize: small ? "1rem" : "1.5rem" }}>
        {value}
      </div>
      {trend && (
        <div style={{ ...styles.trendIcon, color: trendColor }}>
          <TrendIcon size={14} /> {trend}
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, icon, children }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>{title}</span>
        {icon}
      </div>
      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
