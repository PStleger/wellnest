/** Shared artwork for generated Open Graph images (rendered by Satori, so inline styles only). */
export function OgCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f7f2ec",
        color: "#2b2130",
        padding: 72,
        position: "relative",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -60,
          top: 90,
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #f2b48a 0%, #db2777 45%, #7b2d63 100%)",
          boxShadow: "0 40px 120px rgba(123,45,99,0.35)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 330,
          top: 380,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #bae6fd 0%, #38bdf8 50%, #1d4ed8 100%)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760 }}>
        <div style={{ display: "flex", fontSize: 30, color: "#7b2d63", letterSpacing: 1 }}>{eyebrow}</div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? 64 : 80,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#665869" }}>{footer}</div>
      </div>
    </div>
  );
}
