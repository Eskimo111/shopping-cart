import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/use-auth";
import useMessage from "../../../hooks/use-message";

const SignInWithGoogleButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const message = useMessage();
  return (
    <button
      type="button"
      className="text-gray-800 bg-white border border-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full py-2.5 text-center inline-flex items-center justify-center"
      onClick={() =>
        auth
          .signinWithGoogle()
          .then(() => {
            setTimeout(() => navigate("/"), 0);
          })
          .catch((error: FirebaseError) =>
            message.showMessage(error.message, "fail")
          )
      }
    >
      <svg
        className="mr-2 -ml-1 w-4 h-4"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogleButton;
