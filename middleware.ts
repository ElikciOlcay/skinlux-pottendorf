import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
    isLaserOktoberCampaignEnded,
    LASER_OKTOBER_PATH,
    LASER_OKTOBER_REDIRECT_PATH,
} from "@/lib/campaigns/laser-oktober";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isCampaignRoute =
        pathname === LASER_OKTOBER_PATH || pathname.startsWith(`${LASER_OKTOBER_PATH}/`);

    if (isCampaignRoute && isLaserOktoberCampaignEnded()) {
        const url = request.nextUrl.clone();
        url.pathname = LASER_OKTOBER_REDIRECT_PATH;
        url.search = "";
        return NextResponse.redirect(url, 307);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/aktion/laser-oktober", "/aktion/laser-oktober/:path*"],
};
