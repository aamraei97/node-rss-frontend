"use client";
import { FormInput } from "@/components/modules/form/input";
import { Button } from "@/components/ui/button";
import { useCreateSource } from "@/services/sources/create-source";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormSelect } from "@/components/modules/form/select";

export default function CreateSourcePage() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const { mutate: createSource, isPending } = useCreateSource({
    onSuccess: () => {
      toast.success("Source created successfully");
      router.push("/panel/sources");
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
          <FormInput
            control={control}
            name="hrefSelector"
            label="Href selector"
          />
          <FormInput
            control={control}
            name="titleSelector"
            label="Title selector"
          />
          <FormInput
            control={control}
            name="timeSelector"
            label="Time selector"
          />
          <FormSelect
            control={control}
            name="sourceCredibility"
            label="Source Credibility"
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
              { label: "Very High", value: "very-high" },
            ]}
          />
          <div className="col-span-2 flex justify-end">
            <Button type="submit" loading={isPending}>
              Create Source
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
