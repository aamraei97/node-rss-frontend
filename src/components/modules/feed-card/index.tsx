import { Button } from "@/components/ui/button";
import { useNotInterested } from "@/services/feed/not-interested";
import { Feed } from "@/types/global";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Clock, Trash } from "lucide-react";
import { toast } from "sonner";

export function FeedCard({
  feed,
  isRead,
  onRemove,
}: {
  feed: Feed;
  isRead?: boolean;
  onRemove?: (feedId: string) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate: notInterested, isPending } = useNotInterested({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-feed"] });
      toast.success("Article removed from your feed");
      onRemove?.(feed._id);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return (
    <div className="bg-white border border-gray-200 rounded-lg grid">
      <div className="flex items-center gap-2 justify-between p-3">
        <a href={feed.link} target="_blank" className="">
          <h3 className="text-lg font-medium">{feed.title}</h3>
        </a>
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            loading={isPending}
            onClick={() => notInterested({ feedId: feed._id })}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between border-t border-gray-200 p-3">
        <a
          href={feed.source.link}
          target="_blank"
          className="flex items-center gap-2"
        >
          <img
            src={feed.source.favicon}
            alt={feed.source.name}
            className="w-7 h-7 rounded-full"
          />
          <span className="text-sm font-medium">{feed.source.name}</span>
        </a>
        {isRead ? (
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-4 h-4 opacity-80" />
            <div className="flex items-center">
              Read at&nbsp;
              {feed.lastReadAt ? (
                dayjs(feed.lastReadAt).format("DD/MM/YYYY HH:mm")
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-4 h-4 opacity-80" />
            <div className="flex items-center">
              Published at&nbsp;
              {feed.publishedAt ? (
                dayjs(feed.publishedAt).format("DD/MM/YYYY HH:mm")
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
