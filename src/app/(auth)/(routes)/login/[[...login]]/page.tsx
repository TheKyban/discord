import { FC } from "react";
import { SignIn } from "@clerk/nextjs";

interface pageProps {}

const Signin: FC<pageProps> = ({}) => {
    return <SignIn />;
};

export default Signin;
