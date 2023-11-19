import { FC } from "react";

interface serverProps {
    params: { serverId: string };
}

const Server: FC<serverProps> = ({ params }) => {
    return (
        <div>
            <h1>this is server </h1>
            <h1>{params.serverId}</h1>
        </div>
    );
};

export default Server;
