import React, { useState } from 'react';
import axios from 'axios';
import TraceSpan from './TraceSpan';

const DistributedTraceViewer = () => {
  const [traceData, setTraceData] = useState([]);
  const [selectedSpanId, setSelectedSpanId] = useState(null);

  const fetchTraceData = async () => {
    try {
      const response = await axios.get('https://mocki.io/v1/40059489-6a19-4ca7-a41c-1c5c920e312c');
      console.log(response);
      setTraceData(response.data);
      console.log();
    } catch (error) {
      console.error('Error fetching trace data:', error);
    }
  };

  const handleSpanClick = (spanId) => {
    setSelectedSpanId(spanId);
  };

  const handleFoldAllClick = () => {
    // Implement logic to fold/collapse all spans
  };

  return (
    <div className="trace-viewer">
      <button onClick={fetchTraceData}>Load Trace Data</button>
      <button onClick={handleFoldAllClick}>Fold/Collapse All</button>
      <div className="trace-spans">
        {traceData.map((span) => (
          <TraceSpan
            key={span.id}
            span={span}
            selectedSpanId={selectedSpanId}
            onSpanClick={handleSpanClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DistributedTraceViewer;
