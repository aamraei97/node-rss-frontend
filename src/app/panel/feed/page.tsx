"use client";

import { FormInput } from "@/components/modules/form/input";
import { FormSelect } from "@/components/modules/form/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "@/features/panel/feed-list/columns";
import { FeedTable } from "@/features/panel/feed-list/feed-table";
import { cn } from "@/lib/utils";
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
  const { control, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("default");
  const [filters, setFilters] = useState<any>({
    sourceCredibility: "very-high",
    after: new Date(2025, 0, 0).toISOString(),
  });
  const { data } = useGetFeed({ params: filters });
  const { data: sources } = useGetSources();
  const groupSourcesBySourceCredibility = sources?.result.reduce(
    (acc, source) => {
      if (activeTab === "default" && source.sourceCredibility !== "very-high") {
        return acc;
      }
      acc[source.sourceCredibility] = acc[source.sourceCredibility] || [];
      acc[source.sourceCredibility].push({ ...source, image: source.favicon });

      // order by name
      acc[source.sourceCredibility].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return acc;
    },
    {} as Record<string, any[]>
  );
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
    setFilters(
      activeTab === "default"
        ? {
            ...data,
            sourceCredibility: "very-high",
            after: new Date(2025, 0, 0).toISOString(),
          }
        : data
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl p-4 border border-gray-200 grid gap-3">
        <h3 className="text-lg font-bold">Fast Filters</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className={cn(
              "bg-gray-200 rounded-xl py-2 px-4 cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white",
              activeTab === "default" ? "bg-blue-500 text-white" : ""
            )}
            onClick={() => {
              setActiveTab("default");
              setFilters({
                sourceCredibility: "very-high",
                after: new Date(2025, 0, 0).toISOString(),
              });
            }}
          >
            Default Feed
          </button>
          <button
            className={cn(
              "bg-gray-200 rounded-xl py-2 px-4 cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white",
              activeTab === "all" ? "bg-blue-500 text-white" : ""
            )}
            onClick={() => {
              setActiveTab("all");
              setFilters({});
              reset({
                sourceId: "",
                title: "",
              });
            }}
          >
            All Feed
          </button>
        </div>
      </div>
      <div className="grid bg-white rounded-xl p-4 border border-gray-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-4 gap-x-4"
        >
          <FormSelect
            control={control}
            name="sourceId"
            label="Source"
            groups={Object.entries(groupSourcesBySourceCredibility || {}).map(
              ([key, value]) => ({
                label: key,
                options: value.map((source) => ({
                  label: source.name,
                  value: source._id,
                  image: source.image,
                })),
              })
            )}
          />
          <FormInput
            control={control}
            name="title"
            label="Title"
            placeholder="Title"
          />
          <div className="col-span-4">
            <Button type="submit" size="lg">
              Search
            </Button>
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
