"use client";

import { Button } from "@/components/ui/button";
import { usePopulateFeed } from "@/services/sources/populate-feed";

export default function FeedPage() {
  const { mutate: populateFeed, isPending } = usePopulateFeed();
  return (
    <div>
      <Button
        onClick={() => populateFeed({ sourceId: "68bd8dc4a550b6fefb162edb" })}
      >
        Populate Feed
      </Button>
    </div>
  );
}
