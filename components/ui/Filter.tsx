"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/types";

type FilterFormProps = {
  categories: Category[];
  onFilterChange?: (selectedCategories: string[]) => void;
};

const FilterForm: React.FC<FilterFormProps> = ({
  categories,
  onFilterChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxToggle = (categoryId: string) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      // Use a microtask to avoid immediate triggering during render
      Promise.resolve().then(() => {
        onFilterChange?.(updatedCategories);
      });

      return updatedCategories;
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="text-lg font-medium">Filter by Category</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <label className="flex items-center cursor-pointer">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCheckboxToggle(category.id)}
              />
              <span className="ml-2 text-sm font-normal">{category.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterForm;
