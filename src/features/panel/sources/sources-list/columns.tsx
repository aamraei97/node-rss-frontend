"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Source } from "@/types/global";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { PopulateFeedRequestType } from "@/services/sources/populate-feed/types";
import dayjs from "dayjs";

export const columns: (props: {
  populateFeed: (args: PopulateFeedRequestType) => void;
  populateFeedLoading: boolean;
  populateFeedId: string;
}) => ColumnDef<Source>[] = (props) => [
  {
    accessorKey: "name",
    header: "Source",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <img
            src={row.original.favicon}
            alt={row.original.name}
            className="w-10 h-10"
          />
          <span className="line-clamp-1">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "sourceCredibility",
    header: "Credibility",
    cell: ({ row }) => {
      return row.original.sourceCredibility;
    },
  },
  {
    accessorKey: "lastCrawl",
    header: "Last Crawl",
    cell: ({ row }) => {
      return row.original.lastCrawl
        ? dayjs(row.original.lastCrawl).format("YYYY-MM-DD HH:mm")
        : "N/A";
    },
  },
  {
    accessorKey: "url",
    header: "Link",
    cell: ({ row }) => {
      return (
        <a href={row.original.link} target="_blank">
          <Button size="icon" variant="outline">
            <LinkIcon className="w-4 h-4" />
          </Button>
        </a>
      );
    },
  },
  {
    header: "Operations",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            loading={
              props.populateFeedLoading &&
              row.original._id === props.populateFeedId
            }
            onClick={() => props.populateFeed({ sourceId: row.original._id })}
          >
            Populate Feed
          </Button>
        </div>
      );
    },
  },
];
