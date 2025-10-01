"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Tag } from "@/types/global";



export const columns: (props: {}) => ColumnDef<Tag>[] = (props) => [
  {
    accessorKey: "name",
    header: "Tag",
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
  },
];
