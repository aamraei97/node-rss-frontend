"use client";
import { FormInput } from "@/components/modules/form/input";
import { Button } from "@/components/ui/button";
import { useCreateTag } from "@/services/tags/create-tag";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function CreateTagPage() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const { mutate: createTag, isPending } = useCreateTag({
    onSuccess: () => {
      toast.success("Tag created successfully");
      router.push("/panel/tags");
    },
    onError: () => {
      toast.error("Failed to create tag");
    },
  });

  const onSubmit = (data: any) => {
    console.log({ data });
    createTag(data);
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-8"
        >
          <FormInput control={control} name="name" label="Tag Name" />

          <div className="col-span-2 flex justify-end">
            <Button type="submit" loading={isPending}>
              Create Tag
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
