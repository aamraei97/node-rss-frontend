"use client";

import { Button } from "@/components/ui/button";
import { columns } from "@/features/panel/tags/tags-list/columns";
import { TagsTable } from "@/features/panel/tags/tags-list/tags-table";
import { useGetTags } from "@/services/tags/get-tags";
import { Tag } from "@/types/global";
import Link from "next/link";

export default function TagsPage() {
  const { data } = useGetTags();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/panel/tags/create">
          <Button>Create Tag</Button>
        </Link>
      </div>

      {data?.result && data?.result.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {data?.result.map((tag) => (
            <div
              className="bg-white py-1.5 px-4 rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-300"
              key={tag._id}
            >
              <span>{tag.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
