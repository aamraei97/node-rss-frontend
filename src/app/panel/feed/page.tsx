"use client";

import { Button } from "@/components/ui/button";
import { columns } from "@/features/panel/feed-list/columns";
import { FeedTable } from "@/features/panel/feed-list/feed-table";
import { useGetFeed } from "@/services/feed/get-feed";
import { useIncreaseReadCount } from "@/services/feed/increase-read-count";
import { useNotInterested } from "@/services/feed/not-interested";
import { usePopulateFeed } from "@/services/sources/populate-feed";
import { Feed } from "@/types/global";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function FeedPage() {
  const queryClient = useQueryClient();
  const { data } = useGetFeed();
  const { mutate: populateFeed, isPending } = usePopulateFeed();
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
  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => populateFeed({ sourceId: "68beda69d9a3620d6fdba4d5" })}
      >
        Populate Feed
      </Button>
      <FeedTable<Feed, any>
        columns={columnWithMutations}
        data={data?.results || []}
      />
    </div>
  );
}
