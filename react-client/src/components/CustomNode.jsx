import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function CustomNode({ data }) {
    return (
      <div className="px-4 py-2 shadow-md rounded-md bg-blue-600 text-white max-w-[180px] break-words break-all">
        <div className="flex">
            <div className="text-xl font-bold flex-wrap whitespace break-words break-all">
              <p className='break-words break-all'>{data.name}</p>
            </div>
        </div>
  
        <Handle
          type="target"
          position={Position.Top}
          className="w-16 !bg-teal-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-teal-500"
        />
      </div>
    );
  }
export default memo(CustomNode);