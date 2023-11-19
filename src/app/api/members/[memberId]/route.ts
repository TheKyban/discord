import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (
    request: Request,
    { params }: { params: { memberId: string } }
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

        if (!params.memberId) {
            return new NextResponse("Member Id Missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                Members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: { not: profile.id },
                    },
                },
            },
            include: {
                Members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        profileId: "asc",
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[MEMBER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 501 });
    }
};

export const PATCH = async (
    request: Request,
    { params }: { params: { memberId: string } }
) => {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(request.url);
        const serverId = searchParams.get("serverId");
        const { role } = await request.json();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID Missing", { status: 400 });
        }

        if (!params.memberId) {
            return new NextResponse("Member Id Missing", { status: 400 });
        }

        const Server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                Members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id,
                            },
                        },
                        data: {
                            role,
                        },
                    },
                },
            },
            include: {
                Members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    },
                },
            },
        });

        return NextResponse.json(Server);
    } catch (error) {
        console.log("[MEMBER_ID_PATCH]", error);
        return new NextResponse("Internal Eroor", { status: 500 });
    }
};
