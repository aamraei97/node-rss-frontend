"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Feed } from "@/types/global";
import { Button } from "@/components/ui/button";
import { Check, EyeIcon, LinkIcon } from "lucide-react";
import dayjs from "dayjs";
import { IncreaseReadCountRequestType } from "@/services/feed/increase-read-count/types";
import { NotInterestedRequestType } from "@/services/feed/not-interested/types";

export const columns: (props: {
  increaseReadCount: (args: IncreaseReadCountRequestType) => void;
  notInterested: (args: NotInterestedRequestType) => void;
}) => ColumnDef<Feed>[] = (props) => [
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <img
            src={row.original.source.favicon}
            alt={row.original.source.name}
            className="w-10 h-10"
          />
          <span>{row.original.source.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "publishDate",
    header: "Published Date",
    cell: ({ row }) => {
      return <div>{dayjs(row.original.publishedAt).format("YYYY-MM-DD")}</div>;
    },
  },
  {
    accessorKey: "link",
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
    accessorKey: "readCount",
    header: "Operations",
    cell: ({ row }) => {
      return row.original.readCount > 0 ? (
        <Check className="w-6 h-6" />
      ) : (
        <div className="flex items-center gap-2">
          <Button
            onClick={() =>
              props.increaseReadCount({ feedId: row.original._id })
            }
          >
            Read it right now
          </Button>
          <Button
            variant="outline"
            onClick={() => props.notInterested({ feedId: row.original._id })}
          >
            Not Interested
          </Button>
        </div>
      );
    },
  },
];
