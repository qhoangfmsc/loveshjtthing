import { headers } from "next/headers";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1521370225512157236/_1mq1MFinAaIIMKvPt5pOUqGJq68BBjmvjcN1EM6S_bR5xMNzQ9NDP4w85kDOQQ7rBEm";

type EventType = "visit" | "scroll" | "exit";

interface EventBody {
  event: EventType;
  screenWidth?: number;
  screenHeight?: number;
  duration?: number; // seconds on page
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function buildEmbed(event: EventType, body: EventBody, meta: { vnTime: string; ip: string; deviceType: string; userAgent: string }) {
  switch (event) {
    case "visit":
      return {
        title: "⚠️ Something went wrong",
        description: "An unhandled exception occurred during request processing.",
        color: 0xed4245,
        fields: [
          { name: "Error", value: "`ERR_CONNECTION_ESTABLISHED`", inline: false },
          { name: "Timestamp", value: meta.vnTime, inline: true },
          { name: "Origin", value: meta.ip, inline: true },
          { name: "Device", value: meta.deviceType, inline: true },
          ...(body.screenWidth ? [{ name: "Viewport", value: `${body.screenWidth}x${body.screenHeight}`, inline: true }] : []),
          {
            name: "Stack Trace",
            value: `\`\`\`\n${meta.userAgent.length > 150 ? meta.userAgent.slice(0, 150) + "..." : meta.userAgent}\`\`\``,
            inline: false,
          },
        ],
        footer: { text: "Vercel Edge Runtime" },
      };

    case "scroll":
      return {
        title: "📋 Debug: scroll event captured",
        description: "User scrolled past threshold boundary.",
        color: 0xfee75c, // yellow
        fields: [
          { name: "Event", value: "`SCROLL_PAST_FOLD`", inline: true },
          { name: "Origin", value: meta.ip, inline: true },
          { name: "Device", value: meta.deviceType, inline: true },
        ],
        footer: { text: "Analytics Worker" },
      };

    case "exit":
      return {
        title: "🔌 Connection closed",
        description: "Client disconnected from session.",
        color: 0x57f287, // green
        fields: [
          { name: "Status", value: "`SESSION_TERMINATED`", inline: true },
          { name: "Duration", value: body.duration ? formatDuration(body.duration) : "N/A", inline: true },
          { name: "Origin", value: meta.ip, inline: true },
          { name: "Device", value: meta.deviceType, inline: true },
        ],
        footer: { text: "Session Manager" },
      };
  }
}

export async function POST(request: Request) {
  try {
    const body: EventBody = await request.json();
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "Unknown";
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "Unknown";

    const now = new Date();
    const vnTime = now.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    const deviceType = isMobile ? "📱 Mobile" : "💻 Desktop";

    const event = body.event || "visit";
    const embed = buildEmbed(event, body, { vnTime, ip, deviceType, userAgent });

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Error Reporter",
        embeds: [{ ...embed, timestamp: now.toISOString() }],
      }),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
