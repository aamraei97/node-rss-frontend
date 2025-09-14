"use client";
import { FormInput } from "@/components/modules/form/input";
import { Button } from "@/components/ui/button";
import { useCreateSource } from "@/services/sources/create-source";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormSelect } from "@/components/modules/form/select";
import { useGetTags } from "@/services/tags/get-tags";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CreateSourcePage() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const { data: tags } = useGetTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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
    createSource({
      ...data,
      tags: selectedTags,
    });
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
            multiple
          />
          <div className="col-span-4 flex flex-wrap gap-2">
            {tags?.result?.map((tag) => (
              <button
                key={tag._id}
                type="button"
                onClick={() => {
                  if (selectedTags.includes(tag._id)) {
                    setSelectedTags(
                      selectedTags.filter((id) => id !== tag._id)
                    );
                  } else {
                    setSelectedTags([...selectedTags, tag._id]);
                  }
                }}
                className={cn(
                  "bg-gray-100 rounded-md px-2 py-1 text-sm cursor-pointer hover:bg-gray-200 duration-300 transition-all",
                  selectedTags.includes(tag._id) && "bg-blue-500 text-white"
                )}
              >
                {tag.name}
              </button>
            ))}
          </div>
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
