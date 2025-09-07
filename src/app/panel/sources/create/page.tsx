"use client";
import { FormInput } from "@/components/modules/form/input";
import { Button } from "@/components/ui/button";
import { useCreateSource } from "@/services/sources/create-source";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function CreateSourcePage() {
  const { control, handleSubmit } = useForm();
  const { mutate: createSource, isPending } = useCreateSource({
    onSuccess: () => {
      toast.success("Source created successfully");
    },
    onError: () => {
      toast.error("Failed to create source");
    },
  });

  const onSubmit = (data: any) => {
    console.log({ data });
    createSource(data);
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-8"
        >
          <FormInput control={control} name="name" label="Source Name" />
          <FormInput control={control} name="link" label="Source Link" />
          <div className="col-span-2 flex justify-end">
            <Button type="submit">Create Source</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
