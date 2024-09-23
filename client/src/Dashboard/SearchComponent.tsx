import React, { useState, useEffect, useRef } from 'react';

interface SearchComponentProps {
    searchQuery: (query: string) => void;
}

function SearchComponent({searchQuery}: SearchComponentProps): React.ReactElement {
  const [query, setQuery] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const handleInputChange = (event: any) => {
    const { value } = event.target;
    
    setQuery(value);
  };

  useEffect(() => {
    // Clear the previous timer if it exists
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set a new timer
    debounceRef.current = setTimeout(() => {
      // Perform the search or any other action
      performSearch(query);
      
    }, 500); // Adjust the delay as needed

    // Clean up the effect
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const performSearch = (query: string) => {
    // Replace this with the actual search logic (e.g., API call)
    // console.log('Searching for:', searchQuery);
    searchQuery(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder='Enter a search term'
      />
    </div>
  );
};

export default SearchComponent;
