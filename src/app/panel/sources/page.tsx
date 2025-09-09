"use client";

import { Button } from "@/components/ui/button";
import { columns } from "@/features/panel/sources/sources-list/columns";
import { SourcesTable } from "@/features/panel/sources/sources-list/sources-table";
import { useGetSources } from "@/services/sources/get-sources";
import { usePopulateFeed } from "@/services/sources/populate-feed";
import { Source } from "@/types/global";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

export default function FeedPage() {
  const queryClient = useQueryClient();
  const { data } = useGetSources();
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
      <SourcesTable<Source, any>
        columns={columnWithMutations}
        data={data?.result || []}
      />
    </div>
  );
}
