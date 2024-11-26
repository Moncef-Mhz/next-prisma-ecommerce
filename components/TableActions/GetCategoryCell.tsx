import { useEffect, useState } from "react";
import { GetAllCategories } from "@/actions/Category";
import { Category } from "@/types/types";

const CategoryCell = ({ categoryId }: { categoryId: string }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>("Unknown");

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await GetAllCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const category = categories.find((cat) => cat.id === categoryId);
    setCategoryName(category ? category.name : "Unknown");
  }, [categories, categoryId]);

  return <div className="text-right font-medium">{categoryName}</div>;
};

export default CategoryCell;
