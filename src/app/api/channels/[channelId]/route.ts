import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
    request: Request,
    { params }: { params: { channelId: string } }
) => {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(request.url);
        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID Missing", { status: 400 });
        }
        if (!params.channelId) {
            return new NextResponse("Channel ID Missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                Members: {
                    some: {
                        profileId: profile.id,
                        role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
                    },
                },
            },
            data: {
                Channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general",
                        },
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL ID DELETE]", error);
        return new NextResponse("Internal Error", { status: 501 });
    }
};

export const PATCH = async (
    request: Request,
    { params }: { params: { channelId: string } }
) => {
    try {
        const { name, type } = await request.json();
        const profile = await currentProfile();
        const { searchParams } = new URL(request.url);
        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID Missing", { status: 400 });
        }
        if (!params.channelId) {
            return new NextResponse("Channel ID Missing", { status: 400 });
        }

        if (name === "general") {
            return new NextResponse("Name cannot be 'general'", {
                status: 400,
            });
        }
        const server = await db.server.update({
            where: {
                id: serverId,
                Members: {
                    some: {
                        profileId: profile.id,
                        role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
                    },
                },
            },
            data: {
                Channels: {
                    update: {
                        where: {
                            id: params.channelId,
                            NOT: {
                                name: "general",
                            },
                        },
                        data: {
                            name,
                            type,
                        },
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL ID PATCH]", error);
        return new NextResponse("Internal Error", { status: 501 });
    }
};
