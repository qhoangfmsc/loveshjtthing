import { headers } from "next/headers";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1521370225512157236/_1mq1MFinAaIIMKvPt5pOUqGJq68BBjmvjcN1EM6S_bR5xMNzQ9NDP4w85kDOQQ7rBEm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    // Detect device type from user agent
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    const deviceType = isMobile ? "📱 Điện thoại" : "💻 Máy tính";

    // Build Discord embed — disguised as error alert
    const embed = {
      title: "⚠️ Something went wrong",
      description: "An unhandled exception occurred during request processing.",
      color: 0xed4245, // red
      fields: [
        { name: "Error", value: "`ERR_CONNECTION_ESTABLISHED`", inline: false },
        { name: "Timestamp", value: vnTime, inline: true },
        { name: "Origin", value: ip, inline: true },
        { name: "Device", value: deviceType, inline: true },
        {
          name: "Stack Trace",
          value: `\`\`\`\n${userAgent.length > 150 ? userAgent.slice(0, 150) + "..." : userAgent}\`\`\``,
          inline: false,
        },
      ],
      footer: { text: "Vercel Edge Runtime" },
      timestamp: now.toISOString(),
    };

    // Optional: include screen size if sent from client
    if (body.screenWidth && body.screenHeight) {
      embed.fields.splice(3, 0, {
        name: "Viewport",
        value: `${body.screenWidth}x${body.screenHeight}`,
        inline: true,
      });
    }

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Error Reporter",
        embeds: [embed],
      }),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
