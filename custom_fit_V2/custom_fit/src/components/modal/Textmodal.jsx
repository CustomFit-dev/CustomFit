import React, { useEffect, useRef } from "react";

/**
 Props esperadas:
 - show, setShow
 - newText, setNewText
 - textFont, setTextFont
 - textSize, setTextSize
 - textColor, setTextColor
 - handleAddText
*/
const GOOGLE_FONT_LIST = [
  // fonts que vamos a poder cargar desde Google Fonts
  "Poppins",
  "Montserrat",
  "Roboto",
  "Lato",
  "Open Sans",
  "Raleway",
  "Oswald",
  "Merriweather",
  "Playfair Display",
  "Nunito",
  "Fira Sans",
  "Source Sans Pro",
  "Inter",
  "Rubik",
  "Dancing Script",
  "Pacifico",
  "Lobster",
  "Great Vibes",
  "Satisfy",
  "Indie Flower",
  "Permanent Marker",
  "Shadows Into Light",
  "Handlee",
  "Press Start 2P",
  "Staatliches",
  "Josefin Sans",
  "PT Sans",
  "Noto Sans",
  "Abril Fatface",
  "Cinzel",
  "Comfortaa"
];

const SYSTEM_FONTS = [
  // fuentes de sistema / web-safe
  "Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Lucida Console",
  "Cursive",
  "Fantasy",
  "Monospace",
  "Comic Sans MS",
  "Impact"
];

const ALL_FONTS = [...SYSTEM_FONTS, ...GOOGLE_FONT_LIST];

function toGoogleFamilyParam(name) {
  // convierte "Playfair Display" => "Playfair+Display"
  // si quieres agregar weights p.ej: +":wght@400;700" lo puedes hacer aquí.
  return name.replace(/\s+/g, "+");
}

function getFallback(font) {
  // fallback básico por tipo
  const mono = ['Courier New', 'Lucida Console', 'Monospace', 'Monospace'];
  const serif = ['Georgia', 'Times New Roman', 'Merriweather', 'Playfair Display', 'Cinzel', 'Abril Fatface'];
  if (mono.includes(font)) return "monospace";
  if (serif.includes(font)) return "serif";
  return "sans-serif";
}

export default function TextEditorModal({
  show,
  setShow,
  newText,
  setNewText,
  textFont,
  setTextFont,
  textSize,
  setTextSize,
  textColor,
  setTextColor,
  textCurve,
  setTextCurve,
  handleAddText
}) {
  const loadedRef = useRef(new Set());

  // cargar la fuente seleccionada desde Google Fonts si está en la lista
  useEffect(() => {
    if (!show) return;
    if (!textFont) return;

    if (GOOGLE_FONT_LIST.includes(textFont) && !loadedRef.current.has(textFont)) {
      const family = toGoogleFamilyParam(textFont);
      const id = `gf-${family}`;

      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
        document.head.appendChild(link);

        // opcional: también crear preconnect
        if (!document.getElementById("gf-preconnect")) {
          const pre = document.createElement("link");
          pre.id = "gf-preconnect";
          pre.rel = "preconnect";
          pre.href = "https://fonts.gstatic.com";
          pre.crossOrigin = "anonymous";
          document.head.appendChild(pre);
        }
      }

      loadedRef.current.add(textFont);
    }
  }, [textFont, show]);

  if (!show) return null;

  const onApply = () => {
    if (typeof handleAddText === "function") handleAddText();
    // no cerramos forzosamente, deja al padre decidir; si quieres cerrarlo aquí: setShow(false);
  };

  const fontFamilyStyle = (font) => {
    // asegura comillas y fallback correctos
    const fallback = getFallback(font);
    // si el nombre contiene comillas o comas, lo rodeamos en ""
    const safeName = font.includes(",") || font.includes(" ") ? `"${font}"` : font;
    return `${safeName}, ${fallback}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setShow(false)} // clic en overlay cierra
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        padding: 20
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: 980,
          background: "#2b2b2b",
          borderRadius: 14,
          boxShadow: "0 14px 40px rgba(0,0,0,0.6)",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: 28,
          padding: 22
        }}
      >
        {/* --- Panel controles (izquierda) --- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ color: "#fff", fontSize: 13 }}>Texto</label>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "none",
              fontSize: 14
            }}
          />

          <label style={{ color: "#fff", fontSize: 13, marginTop: 8 }}>Fuente</label>
          <select
            value={textFont}
            onChange={(e) => setTextFont(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "none",
              fontSize: 14
            }}
          >
            {ALL_FONTS.map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>
                {f}
              </option>
            ))}
          </select>

          <label style={{ color: "#fff", fontSize: 13, marginTop: 8 }}>Tamaño (px)</label>
          <input
            type="number"
            value={textSize}
            onChange={(e) => setTextSize(Number(e.target.value))}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "none",
              fontSize: 14
            }}
          />

          <label style={{ color: "#fff", fontSize: 13, marginTop: 8 }}>Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            style={{
              width: 56,
              height: 36,
              border: "none",
              padding: 4,
              borderRadius: 8,
              cursor: "pointer"
            }}
          />

          <label style={{ color: "#fff", fontSize: 13, marginTop: 8 }}>Curvatura: {textCurve}</label>
          <input
            type="range"
            min="-100"
            max="100"
            value={textCurve}
            onChange={(e) => setTextCurve(Number(e.target.value))}
            style={{
              width: "100%",
              cursor: "pointer"
            }}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              type="button"
              onClick={() => setShow(false)}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 8,
                border: "none",
                background: "#444",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              ❌ Cancelar
            </button>

            <button
              type="button"
              onClick={onApply}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(135deg,#5564eb,#3a4bd9)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              ✅ Aplicar
            </button>
          </div>
        </div>

        {/* --- Panel vista previa (derecha) --- */}
        <div
          style={{
            background: "linear-gradient(180deg,#ffffff,#f7f9fc)",
            borderRadius: 10,
            padding: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 260,
            border: "1px solid #e6e9ef",
            textAlign: "center"
          }}
        >
          <div style={{ maxWidth: "100%", wordBreak: "break-word" }}>
            {/* Vista previa con tamaño fijo (20px) */}
            <div
              style={{
                fontFamily: fontFamilyStyle(textFont),
                fontSize: "20px",
                color: textColor,
                fontWeight: 500,
                lineHeight: 1.2
              }}
            >
              {textCurve !== 0 ? (
                <svg width="200" height="100" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
                  <path id="preview-curve" d={`M 0 50 Q 100 ${50 - (textCurve * 0.5)} 200 50`} fill="transparent" />
                  <text width="200" style={{
                    fontFamily: fontFamilyStyle(textFont),
                    fontSize: "20px",
                    fill: textColor,
                    textAnchor: "middle"
                  }}>
                    <textPath xlinkHref="#preview-curve" startOffset="50%">
                      {newText || "Tu texto"}
                    </textPath>
                  </text>
                </svg>
              ) : (
                newText || "Tu texto aparecerá aquí"
              )}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
              Fuente: {textFont} · Vista previa (tamaño fijo)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
