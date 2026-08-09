import { NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  try {
    const { title, body } = await request.json();

    const { data: subscriptions, error } = await supabase
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth");

    if (error) {
      console.error("Abonelikler alınamadı:", error);
      return NextResponse.json(
        { error: "Abonelikler alınamadı" },
        { status: 500 }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Kayıtlı push aboneliği bulunamadı.",
      });
    }

    const payload = JSON.stringify({
      title: title || "Barber Pro",
      body: body || "Yeni bir bildirim var.",
    });

    const results = await Promise.allSettled(
      subscriptions.map((subscription) =>
        webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          payload
        )
      )
    );

    const successful = results.filter(
      (result) => result.status === "fulfilled"
    ).length;

    const failed = results.filter(
      (result) => result.status === "rejected"
    ).length;

    return NextResponse.json({
      success: true,
      sent: successful,
      failed,
    });
  } catch (error) {
    console.error("Bildirim gönderme hatası:", error);

    return NextResponse.json(
      { error: "Bildirim gönderilemedi" },
      { status: 500 }
    );
  }
}