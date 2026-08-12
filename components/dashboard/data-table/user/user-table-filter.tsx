"use client";

import { useState } from "react";
import { ReactTable, RowData } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableFeatures } from "../shared/table-features";

interface UserTableFilterProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export function UserTableFilter<TData extends RowData>({
  table,
}: UserTableFilterProps<TData>) {
  const [field, setField] = useState<"name" | "email">("name");

  const handleFieldChange = (value: "name" | "email") => {
    setField(value);
    table.setGlobalFilter("");
  };

  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center'>
        <Button
          type='button'
          size='sm'
          variant={field === "name" ? "secondary" : "ghost"}
          onClick={() => handleFieldChange("name")}
        >
          Name
        </Button>

        <Button
          type='button'
          size='sm'
          variant={field === "email" ? "secondary" : "ghost"}
          onClick={() => handleFieldChange("email")}
        >
          Email
        </Button>
      </div>

      <Input
        value={table.state.globalFilter ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        placeholder={`Search ${field}...`}
        className='w-64'
      />
    </div>
  );
}
