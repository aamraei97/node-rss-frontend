import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/modules/form/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSendOtpToEmail } from "@/services/auth/register/send-otp-to-email";
import { AuthRegisterSteps } from "@/app/(auth)/register/page";
const formSchema = z.object({
  email: z.email(),
});

type Props = {
  onChangeStep: ({
    step,
    email,
  }: {
    step: AuthRegisterSteps;
    email: string;
  }) => void;
};
export function EnterEmail({ onChangeStep }: Props) {
  const router = useRouter();
  const { control, handleSubmit, getValues } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
  });
  const { mutate: sendOtpToEmail, isPending } = useSendOtpToEmail({
    onSuccess: (res) => {
      if (res?.data?.result?.step === "otp") {
        onChangeStep({ step: "enter-otp", email: getValues("email") });
      }
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    sendOtpToEmail(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="Email"
      />

      <div className="grid gap-3">
        <Button type="submit" className="mt-8" loading={isPending}>
          Send OTP
        </Button>
        <span className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            className="underline underline-offset-5 text-red-500  transition-all duration-300 font-medium"
            href="/login"
          >
            Login
          </Link>
        </span>
      </div>
    </form>
  );
}
