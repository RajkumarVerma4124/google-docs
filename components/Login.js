import Button from "@material-tailwind/react/Button";
import { signIn } from "next-auth/client";
import LottieFiles from "./LottieFiles";
import Image from "next/image";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center hover:shadow-2xl max-w-sm mx-auto my-auto my-20 rounded-2xl bg-gray-100 py-8">
      <Image
        src="https://links.papareact.com/1ui"
        width={400}
        height={300}
        objectFit="contain"
      />
      <LottieFiles />
      
      <Button
        color="blue"
        className="w-44 mb-10"
        buttonType="filled"
        ripple="light"
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    </div>
  );
}

export default Login;
