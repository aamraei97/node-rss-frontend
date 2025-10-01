"use client";

import { FeedCard } from "@/components/modules/feed-card";
import { FormInput } from "@/components/modules/form/input";
import { FormSelect } from "@/components/modules/form/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetFeed } from "@/services/feed/get-feed";
import { useGetSources } from "@/services/sources/get-sources";
import { useQueryClient } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FeedPage() {
  const { control, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("default");
  const [filters, setFilters] = useState<any>({
    sourceCredibility: "very-high",
    after: new Date(2025, 0, 0).toISOString(),
  });
  const { data: feedData, isLoading } = useGetFeed({ params: filters });
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
    <div className="grid grid-cols-[400px_1fr] gap-4 items-start relative">
      <div className="grid gap-4 sticky top-4">
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
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>
        </div>
      </div>
      <div className="grid gap-4">
        {isLoading && (
          <div className="h-20 w-full bg-gray-200 rounded-lg animate-pulse" />
        )}
        {!isLoading && (
          <>
            <h3 className="font-bold text-lg opacity-80 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              We found
              <span className="text-green-600">
                &nbsp;{feedData?.totalCount}&nbsp;
              </span>{" "}
              posts in your search
            </h3>
            {feedData?.data.map((item) => (
              <FeedCard
                key={item._id}
                feed={item}
                onRemove={() => {
                  queryClient.invalidateQueries({ queryKey: ["get-feed"] });
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
