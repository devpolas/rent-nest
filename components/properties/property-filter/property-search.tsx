"use client";

import { memo, useCallback } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertySearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function PropertySearch({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "Search properties, locations, categories...",
  disabled = false,
  className,
}: PropertySearchProps) {
  const hasValue = value.length > 0;

  const handleClear = useCallback(() => {
    onChange("");
    onClear?.();
  }, [onChange, onClear]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onSearch();
        return;
      }

      if (event.key === "Escape" && hasValue) {
        event.preventDefault();
        handleClear();
      }
    },
    [hasValue, handleClear, onSearch],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <div
      className={["flex w-full min-w-0 items-stretch gap-2", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className='relative flex-1 min-w-0'>
        <Search
          aria-hidden='true'
          className='top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2 pointer-events-none'
        />

        <Input
          type='search'
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label='Search properties'
          autoComplete='off'
          spellCheck={false}
          className='pr-10 pl-9 w-full h-11'
        />

        {hasValue && !disabled && (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={handleClear}
            aria-label='Clear property search'
            className='top-1/2 right-1 absolute rounded-md size-9 -translate-y-1/2'
          >
            <X aria-hidden='true' className='size-4' />
          </Button>
        )}
      </div>

      <Button
        type='button'
        variant='outline'
        disabled={disabled}
        onClick={onSearch}
        className='px-4 sm:px-5 h-11 shrink-0'
      >
        <Search aria-hidden='true' className='sm:mr-2 size-4' />
        <span className='hidden sm:inline'>Search</span>
      </Button>
    </div>
  );
}

export default memo(PropertySearch);
