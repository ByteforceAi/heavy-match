import { NextResponse } from "next/server";
import crypto from "crypto";

interface SmsRequest {
  to: string;
  content: string;
}

/**
 * Naver Cloud SMS API 발송
 */
export async function POST(request: Request) {
  try {
    const body: SmsRequest = await request.json();
    const { to, content } = body;

    const accessKey = process.env.NAVER_CLOUD_ACCESS_KEY;
    const secretKey = process.env.NAVER_CLOUD_SECRET_KEY;
    const serviceId = process.env.NAVER_CLOUD_SMS_SERVICE_ID;
    const fromNumber = process.env.NAVER_CLOUD_SMS_FROM_NUMBER;

    if (!accessKey || !secretKey || !serviceId || !fromNumber) {
      // SMS 키 미설정 시 로그만 남기고 성공 응답
      console.log(`[SMS MOCK] To: ${to}, Content: ${content}`);
      return NextResponse.json({ success: true, mock: true });
    }

    const timestamp = Date.now().toString();
    const url = `/sms/v2/services/${serviceId}/messages`;

    // Naver Cloud signature 생성
    const hmac = crypto.createHmac("sha256", secretKey);
    const message = `POST ${url}\n${timestamp}\n${accessKey}`;
    hmac.update(message);
    const signature = hmac.digest("base64");

    const response = await fetch(
      `https://sens.apigw.ntruss.com${url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-ncp-apigw-timestamp": timestamp,
          "x-ncp-iam-access-key": accessKey,
          "x-ncp-apigw-signature-v2": signature,
        },
        body: JSON.stringify({
          type: "SMS",
          from: fromNumber,
          content,
          messages: [{ to: to.replace(/-/g, "") }],
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "SMS 발송 실패");
    }

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "SMS 발송 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
