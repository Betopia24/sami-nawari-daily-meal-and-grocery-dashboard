"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonPagination } from "@/components/common/CommonPagination";

import { ContentItem } from "./types";
import { ContentTable } from "./_components/ContentTable";
import { ContentActionDialogs } from "./_components/ContentActionDialogs";
import { ContentEditSheet } from "./_components/ContentEditSheet";

const mockContent: ContentItem[] = [
  // Recipes
  { id: 1, title: "Classic Chicken Biryani Recipe", status: "Published", date: "Aug 1", type: "Recipes" },
  { id: 2, title: "Easy 15-Minute Pasta", status: "Draft", date: "Aug 3", type: "Recipes" },
  { id: 3, title: "Healthy Smoothie Bowl", status: "Published", date: "Jul 28", type: "Recipes" },
  { id: 4, title: "Traditional Hummus", status: "Archived", date: "Jul 10", type: "Recipes" },
  
  // Healthy Tips
  { id: 5, title: "5 Tips for Meal Preparing", status: "Published", date: "Aug 2", type: "Healthy Tips" },
  { id: 6, title: "How to Store Fresh Herbs", status: "Published", date: "Jul 30", type: "Healthy Tips" },
  { id: 7, title: "Reducing Food Waste at Home", status: "Draft", date: "Aug 5", type: "Healthy Tips" },

  // Nutrition Guides
  { id: 8, title: "Nutrition Guide for New Moms", status: "Published", date: "Jul 25", type: "Nutrition Guides" },
  { id: 9, title: "Teen Athlete Nutrition 101", status: "Published", date: "Jul 20", type: "Nutrition Guides" },
  { id: 10, title: "Weight Loss without Starving", status: "Draft", date: "Aug 4", type: "Nutrition Guides" },
  { id: 11, title: "Diabetic-Friendly Meal Plan", status: "Archived", date: "Jun 15", type: "Nutrition Guides" },
];

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [activeTab, setActiveTab] = useState("Recipes");
  
  const [currentPage, setCurrentPage] = useState(1);
  const CONTENT_PER_PAGE = 5;

  // Dialog and Sheet states
  const [itemToArchive, setItemToArchive] = useState<ContentItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<ContentItem | null>(null);
  const [itemToEdit, setItemToEdit] = useState<ContentItem | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const filteredContent = content.filter(item => item.type === activeTab);

  const totalPages = Math.ceil(filteredContent.length / CONTENT_PER_PAGE);
  const paginatedContent = filteredContent.slice((currentPage - 1) * CONTENT_PER_PAGE, currentPage * CONTENT_PER_PAGE);

  const handleEdit = (item: ContentItem) => {
    setItemToEdit(item);
    setIsEditSheetOpen(true);
  };

  const handleSaveEdit = (updatedItem: ContentItem) => {
    setContent(content.map(c => c.id === updatedItem.id ? updatedItem : c));
  };

  const handleToggleArchive = (item: ContentItem) => {
    setItemToArchive(item);
  };

  const confirmArchive = (id: number) => {
    setContent(content.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === "Archived" ? "Published" : "Archived" };
      }
      return c;
    }));
  };

  const handleDelete = (item: ContentItem) => {
    setItemToDelete(item);
  };

  const confirmDelete = (id: number) => {
    setContent(content.filter(c => c.id !== id));
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader 
        title="Content" 
        description="Manage recipes, tips & guides" 
      />

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent gap-3 h-auto p-0 flex-wrap">
            {["Recipes", "Healthy Tips", "Nutrition Guides"].map((tab) => (
              <TabsTrigger 
                key={tab} 
                value={tab}
                className="rounded-full cursor-pointer px-5 py-2 bg-card border border-border shadow-sm text-[13px] font-semibold transition-all duration-300 ease-out hover:bg-muted data-active:bg-primary data-active:text-primary-foreground data-active:border-primary"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <ContentTable 
          content={paginatedContent} 
          onEdit={handleEdit}
          onToggleArchive={handleToggleArchive}
          onDelete={handleDelete}
        />
        
        <CommonPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>

      <ContentActionDialogs 
        itemToArchive={itemToArchive}
        itemToDelete={itemToDelete}
        onCloseArchive={() => setItemToArchive(null)}
        onCloseDelete={() => setItemToDelete(null)}
        onConfirmArchive={confirmArchive}
        onConfirmDelete={confirmDelete}
      />

      <ContentEditSheet 
        itemToEdit={itemToEdit}
        isOpen={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
