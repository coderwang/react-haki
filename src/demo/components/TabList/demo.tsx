import React, { useState } from 'react';
import { TabList } from 'react-haki';

const defaultItems = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' },
  { label: 'Tab 4', value: 'tab4' },
  { label: 'Tab 5', value: 'tab5' },
  { label: 'Tab 6', value: 'tab6' },
  { label: 'Tab 7', value: 'tab7' },
  { label: 'Tab 8', value: 'tab8' },
  { label: 'Tab 9', value: 'tab9' },
  { label: 'Tab 10', value: 'tab10' },
  { label: 'Tab 11', value: 'tab11' },
  { label: 'Tab 12', value: 'tab12' },
  { label: 'Tab 13', value: 'tab13' },
  { label: 'Tab 14', value: 'tab14' },
  { label: 'Tab 15', value: 'tab15' },
  { label: 'Tab 16', value: 'tab16' },
];

export default () => {
  const [items, setItems] = useState(defaultItems);
  const [activeKey, setActiveKey] = useState(defaultItems[0].value);

  return (
    <TabList
      items={items}
      activeKey={activeKey}
      onChange={(key) => {
        setActiveKey(key as string);
      }}
      onAdd={() => {
        setItems([
          ...items,
          { label: `Tab ${items.length + 1}`, value: `tab${items.length + 1}` },
        ]);
      }}
      scrollDistance={400}
    />
  );
};
