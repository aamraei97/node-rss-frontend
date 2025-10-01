import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/modules/form/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLogin } from "@/services/auth/login";
const formSchema = z.object({
  password: z.string().min(8),
});

type Props = {
  email: string;
};
export function EnterPassword({ email }: Props) {
  const router = useRouter();
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { mutate: login, isPending } = useLogin({
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.result.token);
      localStorage.setItem("user", JSON.stringify(res.data.result.user));
      router.push("/panel/sources");
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    login({ email, password: data.password });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
      />
      <Button type="submit" className="mt-8" loading={isPending}>
        Login
      </Button>
    </form>
  );
}
