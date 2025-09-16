import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/modules/form/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSetPassword } from "@/services/auth/set-password";
const formSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type Props = {
  email: string;
  otp: string;
};
export function SetPassword({ email, otp }: Props) {
  const router = useRouter();
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { mutate: setPassword, isPending } = useSetPassword({
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setPassword({ email, otp, ...data });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Password"
      />
      <FormInput
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Password"
      />

      <div className="grid gap-3">
        <Button type="submit" className="mt-8" loading={isPending}>
          Set Password
        </Button>
      </div>
    </form>
  );
}
