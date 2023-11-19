import { FC } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface pageProps {
    src?: string;
    className?: string;
}

export const UserAvatar: FC<pageProps> = ({ className, src }) => {
    return (
        <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
            <AvatarImage src={src} />
        </Avatar>
    );
};

