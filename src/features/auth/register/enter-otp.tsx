import { AuthRegisterSteps } from "@/app/(auth)/register/page";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtp } from "@/services/auth/register/verify-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";

type Props = {
  email: string;
  onChangeStep: ({
    otp,
    step,
  }: {
    otp: string;
    step: AuthRegisterSteps;
  }) => void;
};
export function EnterOtp({ email, onChangeStep }: Props) {
  const [otp, setOtp] = useState("");
  const { mutate: verifyOtp, isPending } = useVerifyOtp({
    onSuccess: (res) => {
      if (res?.data?.result?.step === "set-password") {
        onChangeStep({ otp, step: "set-password" });
      }
    },
  });
  const onSubmit = () => {
    verifyOtp({ email, otp: otp.toString() });
  };
  return (
    <div className="grid gap-7">
      <div className="flex flex-col items-center gap-1">
        <span className="text-xl font-bold">Verify Your Email Address</span>
        <span className="text-sm text-gray-500">
          Enter the code sent to your email address.
        </span>
      </div>
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          value={otp}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="grid gap-3">
        <Button type="submit" loading={isPending} onClick={onSubmit}>
          Verify OTP
        </Button>
      </div>
    </div>
  );
}
