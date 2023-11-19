import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
    params: { inviteCode: string };
}

const Page: FC<pageProps> = async ({ params }) => {
    const profile = await currentProfile();
    
    if (!profile) {
        return redirectToSignIn();
    }

    if (!params.inviteCode) {
        return redirect("/");
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            Members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            Members: {
                create: [{ profileId: profile.id }],
            },
        },
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return (
        <div>
            <h1>This is invalid Invite code</h1>
            <code>{params.inviteCode}</code>
        </div>
    );
};

export default Page;
