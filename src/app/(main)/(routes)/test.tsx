import { ModeToggle } from "../../../components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";

export default function Home() {
    return (
        <div>
            <h1 className="text-red-700">This is protected route</h1>
            <UserButton afterSignOutUrl="/login" />
            <ModeToggle />
        </div>
    );
}
