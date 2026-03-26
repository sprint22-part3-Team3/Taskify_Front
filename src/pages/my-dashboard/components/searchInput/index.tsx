import { IcSearch } from '@/shared/assets/icons';
import InputField from '@/shared/components/input/input-field';
import type { SearchInputProps } from '@/pages/my-dashboard/components/searchInput/searchInput.types';

function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <IcSearch className="absolute top-1/2 left-4 w-5.5 -translate-y-1/2 text-gray-300 md:w-6" />
      <InputField
        type="search"
        className={`typo-md-regular md:typo-lg-regular h-9 py-0 pl-11 md:h-10 md:pl-12 ${className ?? ''}`}
        {...props}
      />
    </div>
  );
}

export default SearchInput;
