import { POST } from "@/app/api/ai/chat/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "Use POST /api/ai/chat for the unified AI endpoint.",
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}

export { POST };
