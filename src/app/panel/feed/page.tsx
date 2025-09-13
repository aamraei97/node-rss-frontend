"use client";

import { FormSelect } from "@/components/modules/form/select";
import { Button } from "@/components/ui/button";
import { columns } from "@/features/panel/feed-list/columns";
import { FeedTable } from "@/features/panel/feed-list/feed-table";
import { useGetFeed } from "@/services/feed/get-feed";
import { useIncreaseReadCount } from "@/services/feed/increase-read-count";
import { useNotInterested } from "@/services/feed/not-interested";
import { useGetSources } from "@/services/sources/get-sources";
import { Feed, Source } from "@/types/global";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FeedPage() {
  const { control, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<any>({});
  const { data } = useGetFeed({ params: filters });
  const { data: sources } = useGetSources();
  const groupSourcesBySourceCredibility = sources?.result.reduce((acc, source) => {
    acc[source.sourceCredibility] = acc[source.sourceCredibility] || [];
    acc[source.sourceCredibility].push({ ...source, image: source.favicon });

    // order by name
    acc[source.sourceCredibility].sort((a, b) => a.name.localeCompare(b.name));
    return acc;
  }, {} as Record<string, any[]>);
  const { mutate: increaseReadCount } = useIncreaseReadCount({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-feed"] });
      toast.success("Well done!");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const { mutate: notInterested } = useNotInterested({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-feed"] });
      toast.success("Well done!");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const columnWithMutations = columns({ increaseReadCount, notInterested });
  const onSubmit = (data: any) => {
    console.log({ data });
    setFilters(data);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="grid">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4">
          <FormSelect
            control={control}
            name="sourceId"
            label="Source"
            groups={Object.entries(groupSourcesBySourceCredibility || {}).map(([key, value]) => ({ label: key, options: value.map((source) => ({ label: source.name, value: source._id, image: source.image })) }))}

          />
          <div className="col-span-4">
            <Button type="submit" size="lg">Search</Button>
          </div>
        </form>
      </div>
      <FeedTable<Feed, any>
        columns={columnWithMutations}
        data={data?.results || []}

      />
    </div>
  );
}
