import { Handle, Position } from '@xyflow/react';

import device from '../assets/android.svg';

export function DeviceNode ({ data }) {
  console.warn(data);
  return (
    <>
      <div className='device' style={{ alignContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <img className='deviceImage' src={device} alt='device' style={{ width: 50 }} />
        <label htmlFor='text'>{data?.label?.split(' - ')[0]}</label>
      </div>
      <Handle type='source' position={Position.Bottom} id='a' />
      <Handle type='source' position={Position.Left} id='b' />
    </>
  );
}
