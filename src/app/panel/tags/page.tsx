"use client";

import { Button } from "@/components/ui/button";
import { columns } from "@/features/panel/tags/tags-list/columns";
import { TagsTable } from "@/features/panel/tags/tags-list/tags-table";
import { useGetTags } from "@/services/tags/get-tags";
import { Tag } from "@/types/global";
import Link from "next/link";

export default function TagsPage() {
  const { data } = useGetTags();


  const columnWithMutations = columns({});
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/panel/tags/create">
          <Button>Create Tag</Button>
        </Link>
      </div>
      <TagsTable<Tag, any>
        columns={columnWithMutations}
        data={data?.result || []}
      />
    </div>
  );
}
