import { Handle, Position, useReactFlow } from '@xyflow/react';

import { DynamicFilterType } from './types';

type FilterDataProp = {
  deviceId: string;
  label: string;
  filters: DynamicFilterType[];
  key: string;
};
type FilterProps = {
  id: string;
  data: FilterDataProp
};

export function KeyValueFilterNode ({ id, data: { deviceId, label, filters, key } }: FilterProps) {
  const { setNodes } = useReactFlow();

  const updateLoggerFilter = (key: string, filterValue: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setNodes(nds => {
      return nds.map(n => {
        if (n.id === `messages-${deviceId}`) {
          let f = [];
          const filtersArray = n.data.filters as DynamicFilterType[];
          const filterObj = filtersArray.find(f => f.key === key);
          const adjustedFilterValues = filterObj ? filterObj.values : [];
          if (isChecked) {
            f = [...adjustedFilterValues, filterValue];
          } else {
            f = adjustedFilterValues.filter(f => f !== filterValue);
          }
          if (filterObj) {
            filterObj.values = f;
          }
          return {
            ...n,
            data: {
              ...n.data,
              filters: [
                ...filtersArray
              ]
            }
          };
        }
        return n;
      });
    });
  };

  return (
    <>
      <Handle type='target' position={Position.Right} id='a' />
      <p className='filterHeader'>{label}</p>
      <div>
        {
          filters && filters.map((filterValue) => filterValue && (
            <div key={filterValue.key} style={{ margin: '5px 0' }}>
              <input
                id={`checkbox-${id}-${filterValue.key}`}
                type='checkbox'
                label={filterValue.key}
                key={filterValue.key}
                value={filterValue.key}
                onChange={updateLoggerFilter(key, filterValue.key)}
              />
              <label htmlFor={`checkbox-${id}-${filterValue.key}`}>
                {filterValue.key}
              </label>
            </div>
          ))
          }
      </div>
    </>
  );
}
