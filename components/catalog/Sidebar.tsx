'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setSearchTerm, setCategory, setPriceRange, resetFilters } from '@/lib/store/categoryFilter';
import { useGetCategoriesQuery } from '@/lib/api/productsApi';
import { Category } from '@/types/product';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  
  const { searchTerm, categoryId, minPrice, maxPrice } = useAppSelector((state) => state.filter);
  const { data: categories } = useGetCategoriesQuery();

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 0) {
      dispatch(setPriceRange({ min: val, max: maxPrice }));
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 0) {
      dispatch(setPriceRange({ min: minPrice, max: val }));
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    dispatch(setPriceRange({ min: minPrice, max: val }));
  };

  return (
    <aside className="w-full lg:w-1/4 flex-shrink-0">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 sticky top-24">
        
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-lg font-bold text-gray-800">Фільтри</h2>
          <button 
            onClick={() => dispatch(resetFilters())} 
            className="text-xs text-blue-500 font-medium hover:text-blue-700 uppercase"
          >
            Очистити
          </button>
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Пошук</label>
          <input 
            type="text" 
            placeholder="Введіть назву..." 
            className="input input-bordered input-sm w-full bg-gray-50 focus:bg-white transition-colors" 
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Категорії</h3>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {categories?.map((cat: Category) => (
              <label 
                key={cat.id} 
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${categoryId === cat.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-primary checkbox-xs rounded-sm"
                  checked={categoryId === cat.id}
                  onChange={() => dispatch(setCategory(categoryId === cat.id ? null : cat.id))}
                />
                <span className="text-sm truncate">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Ціна ($)</h3>
          
          <div className="flex items-center gap-2 mb-4">
            <input 
              type="number" 
              className="input input-bordered input-xs w-full text-center"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="0"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="number" 
              className="input input-bordered input-xs w-full text-center"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="1000"
            />
          </div>

          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="10"  
            value={maxPrice} 
            className="range range-primary range-xs" 
            onChange={handleRangeChange}
          />
          <div className="w-full flex justify-between text-xs px-2 mt-2 text-gray-400">
            <span>0</span>
            <span>500</span>
            <span>1000</span>
          </div>
        </div>

      </div>
    </aside>
  );
}