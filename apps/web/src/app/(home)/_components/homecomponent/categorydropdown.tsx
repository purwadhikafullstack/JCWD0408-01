import { HomePageCategory } from "@/types/homeproduct";

interface CategoryDropDownProps {
  categories: HomePageCategory[];
}

export default function CategoryDropDown({ categories }: CategoryDropDownProps) {
  return (
    <div className="relative">
      <button className="bg-main px-4 py-2 rounded">Select Category</button>
      <div className="absolute bg-white border mt-2 w-full shadow-lg z-10">
        {categories.map(({ category_id, category_name, category_url, description }) => (
          <div key={category_id} className="p-2 hover:bg-gray-100">
            <a href={category_url} className="flex items-center space-x-2">
              <span>{category_name}</span>
              <p className="text-sm text-gray-500">{description}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
