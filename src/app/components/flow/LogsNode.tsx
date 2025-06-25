import { Handle, Position } from '@xyflow/react';

import { MessagesNodeDataType } from './types';

const formatLogEntry = (message:string, logger:string, timestamp:string) => {
  return `<span class='timestamp'>${new Date(timestamp).toLocaleTimeString('en-US')}</span>  <span class='loggerName'>${logger}</span>  <span class='log'>${message}</span>`;
};
const getIntersection = (array1:string[], array2:string[]) => {
  return array1.filter(value => array2.includes(value));
};

export function LogsNode ({ data }: { data: MessagesNodeDataType }) {
  const filters = data.filters || [];
  const copiedRawLogs = [...data.rawLogs || []].filter(log => {
    if (filters.length === 0) return true; // No filters, show all logs

    const filterIntersection = getIntersection(Object.keys(log), filters.map(f => f.key));

    if (filterIntersection.length === 0) return true; // no keys that require filtering are present on the log object

    return !filterIntersection.map(fi => {
      return filters.find(f => f.key === fi).values.includes(log[fi]);
    }).some(v => v);
  });

  return (
    <>
      <Handle type='target' position={Position.Top} id='a' />
      <div className='wrapper gradient'>
        <div className='inner'>
          <div className='body nowheel text-sm font-light'>
            {
              copiedRawLogs.reverse().map((log, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: formatLogEntry(log.message, log.name, log.timestamp) }} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}
