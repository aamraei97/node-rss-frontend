"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { columns } from "@/features/panel/sources/sources-list/columns";
import { SourcesTable } from "@/features/panel/sources/sources-list/sources-table";
import { useGetSources } from "@/services/sources/get-sources";
import { usePopulateFeed } from "@/services/sources/populate-feed";
import { Source } from "@/types/global";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Binoculars, LibraryBig } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

dayjs.extend(relativeTime);

export default function FeedPage() {
  const queryClient = useQueryClient();
  const { data } = useGetSources();
  const groupSourcesByCredibility = useMemo(() => {
    return data?.result.reduce((acc, source) => {
      acc[source.sourceCredibility] = acc[source.sourceCredibility] || [];
      acc[source.sourceCredibility].push(source);
      return acc;
    }, {} as Record<string, Source[]>);
  }, [data]);
  const [activeCredibility, setActiveCredibility] =
    useState<string>("very-high");
  const populateFeed = usePopulateFeed({
    onSuccess: () => {
      toast.success("Feed populated successfully");
      queryClient.invalidateQueries({ queryKey: ["get-sources"] });
    },
    onError: () => {
      toast.error("Failed to populate feed");
    },
  });

  const columnWithMutations = columns({
    populateFeed: populateFeed.mutate,
    populateFeedLoading: populateFeed.isPending,
    populateFeedId: populateFeed.variables?.sourceId || "",
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/panel/sources/create">
          <Button>Create Source</Button>
        </Link>
      </div>
      <div className="grid gap-6">
        <div className="flex items-center gap-2">
          {Object.keys(groupSourcesByCredibility || {}).map((credibility) => (
            <Button
              key={credibility}
              onClick={() => setActiveCredibility(credibility)}
              variant={
                activeCredibility === credibility ? "default" : "outline"
              }
            >
              {credibility}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-4">
          {groupSourcesByCredibility?.[activeCredibility]?.map((source) => {
            return (
              <div className="bg-white shadow-xs rounded-lg" key={source._id}>
                <div className="p-2 pr-5 border-b border-b-gray-100 flex justify-start items-center gap-2">
                  <img
                    src={source.favicon}
                    alt={source.name}
                    className="w-9 h-9 rounded-full"
                  />
                  <a
                    href={source.link}
                    target="_blank"
                    className="line-clamp-1  break-words"
                  >
                    {source.name}
                  </a>
                </div>
                <div className="p-3 py-2 flex items-center gap-4">
                  <span className="flex items-center">
                    <LibraryBig className="text-gray-300 w-5 h-5" />
                    <span
                      className={cn(
                        "text-sm font-medium",
                        source.feedCount > 0 ? "text-blue-500" : "text-gray-500"
                      )}
                    >
                      {source.feedCount}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-2 border-t border-t-gray-100 text-sm text-gray-700">
                  <span className="line-clamp-1 break-words">
                    crawled{" "}
                    {source.lastCrawl
                      ? dayjs(source.lastCrawl).fromNow()
                      : "N/A"}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    loading={
                      populateFeed.isPending &&
                      source._id === populateFeed.variables?.sourceId
                    }
                    onClick={() =>
                      populateFeed.mutate({ sourceId: source._id })
                    }
                  >
                    <Binoculars className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
