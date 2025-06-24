export type KeyValue = {
  key: string;
  value: string;
};

export type RawLogDataType = {
  timestamp: string;
  message: string;
  deviceId: string;
  deviceName: string;
  osVersion: string;
};

export type DynamicFilterType = {
  key: string;
  label: string;
  type: string;
  values?: string[];
};
export type Position = {
  x: number;
  y: number;
};
export type MessageNode = {
  id: string;
  type: string;
  position: Position;
  data: MessagesNodeDataType;
};

export type MessageNodeFilterType = {
  key: string;
  values: string[];
};
export type MessagesNodeDataType = {
  rawLogs: RawLogDataType[];
  filters: MessageNodeFilterType[];
};

export type DeviceNodeDataType = {
  label: string;
};
export type DeviceNodeType = {
  id: string;
  type: string;
  position: Position;
  data: DeviceNodeDataType
};
