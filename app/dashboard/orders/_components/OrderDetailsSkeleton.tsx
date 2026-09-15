import React from 'react';

export function OrderDetailsSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-6 w-full animate-pulse">
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="h-20 rounded-2xl bg-card border border-border/40"></div>
        <div className="h-20 rounded-2xl bg-card border border-border/40"></div>
      </div>
      <div className="h-48 rounded-2xl bg-card border border-border/40"></div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="h-20 rounded-2xl bg-card border border-border/40"></div>
        <div className="h-20 rounded-2xl bg-card border border-border/40"></div>
      </div>
      <div className="h-32 rounded-2xl bg-card border border-border/40"></div>
    </div>
  );
}
