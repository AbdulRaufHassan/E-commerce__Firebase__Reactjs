import React from "react";
import "../css/App.css";
import LOGO from "../assets/images/logo.png";
import GOOGLE_ICON from "../assets/images/google_icon.png";
import {
  GoogleAuthProvider,
  auth,
  db,
  doc,
  setDoc,
  signInWithPopup,
} from "../config";

function SigninPage() {
  const googleSignin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        await setDoc(doc(db, "users", result.user.uid), {
          name: result.user.displayName,
          uid: result.user.uid,
          emailAddress: result.user.email,
          cartItems: [],
          favouriteItems: [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-teal-500 min-h-screen max-h-fit flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img src={LOGO} className="h-44 md:h-64" />
        <button
          onClick={googleSignin}
          className="mt-6 flex items-center justify-center bg-white px-4 py-2 box-border rounded-lg"
          style={{ boxShadow: "0 0 10px 0 black" }}
        >
          <span className="montserrat-font font-medium">
            Signin With Google
          </span>
          <img src={GOOGLE_ICON} className="h-[40px] ml-2" />
        </button>
      </div>
    </div>
  );
}

export default SigninPage;
