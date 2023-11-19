"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfiles } from "../../../types";
import { FC } from "react";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface serverSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles;
}
export const ServerSection: FC<serverSectionProps> = ({
    label,
    sectionType,
    channelType,
    role,
    server,
}) => {
    const { onOpen } = useModal();
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
                        onClick={() =>
                            onOpen("createChannel", { server, channelType })
                        }
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label="Manage members" side="top">
                    <button
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
                        onClick={() => onOpen("members", { server })}
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    );
};
