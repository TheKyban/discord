import { FC, ReactNode } from "react";

interface pageProps {
    children: ReactNode;
}

const Page: FC<pageProps> = ({ children }) => {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            {children}
        </div>
    );
};

export default Page;
