import React, { useState } from 'react';
import { SearchBar } from 'react-haki';

export default () => {
  const [value, setValue] = useState('');

  const handleChange = (v: string) => {
    setValue(v);
  };

  const handleSearch = (v: string) => {
    alert(v ? `搜索的值为: ${v}` : '搜索的值为空');
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <div>
      <SearchBar
        autoFocus
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <div>
        <p>value: {value || '-'}</p>
      </div>
    </div>
  );
};
