import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            console.log('Search value:', searchValue);
        }
    };

    return (
        <div className="flex w-full">
            <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                required
                className="input w-full outline-none focus:outline-none focus:ring-0 rounded-r-none"
            />
            <button
                onClick={handleSearch}
                className="bg-black p-2 text-base-100 rounded-r-lg"
            >
                <SearchIcon />
            </button>
        </div>
    );
}
