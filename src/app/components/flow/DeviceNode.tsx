import device from '@/app/assets/android.svg';

import { Handle, Position } from '@xyflow/react';

import { DeviceNodeDataType } from './types';

type DeviceNodeDataProp = {
  data: DeviceNodeDataType
};

export function DeviceNode ({ data }: DeviceNodeDataProp) {
  return (
    <>
      <div className='device max-w-20'>
        <img className='deviceImage text-center w-10' src={device} alt='device' />
        <label htmlFor='text'>{data?.label?.split(' - ')[0]}</label>
      </div>
      <Handle type='source' position={Position.Bottom} id='a' />
      <Handle type='source' position={Position.Left} id='b' />
    </>
  );
}
