import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Công ty Cổ phần KTN";
    const category = searchParams.get("category") || "Công nghệ • Năng lượng • Xây dựng";
    const description = searchParams.get("description") || "Giải pháp công nghệ số, điện mặt trời và xây dựng cải tạo công trình.";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#0B1A3E",
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgba(6,182,212,0.25) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(249,115,22,0.25) 0%, transparent 45%)",
            padding: "50px 70px",
            fontFamily: "sans-serif",
            color: "#ffffff",
          }}
        >
          {/* Header Branding */}
          <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  backgroundColor: "#06B6D4",
                  color: "#ffffff",
                  fontSize: "24px",
                  fontWeight: "900",
                }}
              >
                KTN
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "20px", fontWeight: "900", color: "#ffffff", letterSpacing: "1px" }}>
                  CÔNG TY CỔ PHẦN KTN
                </span>
                <span style={{ fontSize: "13px", color: "#06B6D4", textTransform: "uppercase", fontWeight: "700" }}>
                  {category}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "6px 16px",
                borderRadius: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "14px",
                fontWeight: "700",
                color: "#F97316",
              }}
            >
              congtyktn.vn
            </div>
          </div>

          {/* Main Title & Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1000px" }}>
            <h1
              style={{
                fontSize: title.length > 50 ? "44px" : "54px",
                fontWeight: "900",
                color: "#ffffff",
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: "20px",
                  color: "#94A3B8",
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {description.length > 150 ? description.slice(0, 150) + "..." : description}
              </p>
            )}
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              paddingTop: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "20px", fontSize: "15px", color: "#CBD5E1", fontWeight: "700" }}>
              <span style={{ color: "#06B6D4" }}>• Công nghệ</span>
              <span style={{ color: "#F97316" }}>• Năng lượng</span>
              <span style={{ color: "#EAB308" }}>• Xây dựng &amp; Cải tạo</span>
            </div>
            <span style={{ fontSize: "14px", color: "#94A3B8", fontWeight: "600" }}>
              Giải pháp toàn diện &amp; thực tế
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG Image generation failed:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}

