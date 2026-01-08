import { NextResponse } from "next/server";

function joinUrl(base, path) {
  const b = String(base || "").replace(/\/$/, "");
  const p = String(path || "").replace(/^\//, "");
  return `${b}/${p}`;
}

export async function POST(req) {
  try {
    const payload = await req.json().catch(() => ({}));

    const base =
      process.env.GEO_DATA_API_URL || process.env.NEXT_PUBLIC_GEO_DATA_API_URL;

    if (!base) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing GEO_DATA_API_URL. Add GEO_DATA_API_URL=https://... to your env and restart the dev server.",
        },
        { status: 500 }
      );
    }

    const forwardUrl = joinUrl(base, "gdelt/news");

    const upstream = await fetch(forwardUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await upstream.json();
      return NextResponse.json(data, { status: upstream.status });
    }

    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": contentType || "text/plain" },
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e?.message || "Failed to fetch GDELT news" },
      { status: 500 }
    );
  }
}
