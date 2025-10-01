"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
const EnterEmail = dynamic(
  () =>
    import("@/features/auth/register/enter-email").then(
      (mod) => mod.EnterEmail
    ),
  {
    ssr: false,
  }
);
const EnterOtp = dynamic(
  () =>
    import("@/features/auth/register/enter-otp").then((mod) => mod.EnterOtp),
  {
    ssr: false,
  }
);
const SetPassword = dynamic(
  () => import("@/features/auth/set-password").then((mod) => mod.SetPassword),
  {
    ssr: false,
  }
);
const EnterPassword = dynamic(
  () =>
    import("@/features/auth/enter-password").then((mod) => mod.EnterPassword),
  {
    ssr: false,
  }
);

export type AuthRegisterSteps =
  | "enter-email"
  | "enter-otp"
  | "set-password"
  | "password";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<AuthRegisterSteps>("enter-email");
  const components: Record<AuthRegisterSteps, React.ReactNode> = {
    "enter-email": (
      <EnterEmail
        onChangeStep={({ email, step }) => {
          setEmail(email);
          setStep(step);
        }}
      />
    ),
    "enter-otp": (
      <EnterOtp
        email={email}
        onChangeStep={({ otp, step }) => {
          setOtp(otp);
          setStep(step);
        }}
      />
    ),
    "set-password": <SetPassword email={email} otp={otp} />,
    password: <EnterPassword email={email} />,
  };
  return (
    <div className="bg-white rounded-xl p-6 shadow w-[450px]">
      {components[step]}
    </div>
  );
}
