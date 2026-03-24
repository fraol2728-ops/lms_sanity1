import { POST as handler } from "@/app/api/ai/chat/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = handler;
