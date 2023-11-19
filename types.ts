import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
    Members: (Member & { profile: Profile })[];
};
