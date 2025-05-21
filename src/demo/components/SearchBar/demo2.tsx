import React, { useRef } from 'react';
import { HakiSearchBarRef, SearchBar } from 'react-haki';

export default () => {
  const inputRef = useRef<HakiSearchBarRef>(null);

  const handleSearch = (v: string) => {
    alert(`搜索的值为: ${v}`);
  };

  return (
    <div>
      <SearchBar ref={inputRef} onSearch={handleSearch} />
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="button" onClick={() => inputRef.current?.blur()}>
          失去焦点
        </button>
        <button type="button" onClick={() => inputRef.current?.focus()}>
          获得焦点
        </button>
        <button type="button" onClick={() => inputRef.current?.clear()}>
          清空内容
        </button>
        <button
          type="button"
          onClick={() => alert(inputRef.current?.nativeElement?.value)}
        >
          alert当前值
        </button>
      </div>
    </div>
  );
};
