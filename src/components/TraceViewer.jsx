import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TraceSpan from './TraceSpan';

const TraceViewer = () => {

    const [traceData, setTraceData] = useState([]);
    const [selectedSpanId, setSelectedSpanId] = useState(null);

    //Fetching data from API
    useEffect(() => {
        
        fetch('https://mocki.io/v1/40059489-6a19-4ca7-a41c-1c5c920e312c')
          .then((response) => response.json())
          .then((data) => setTraceData(data.spans))
          .catch((error) => console.error('Error fetching data:', error));
        
      }, []);
      console.log(traceData);

      const handleSpanClick = (spanId) => {
        setSelectedSpanId(spanId);
      };

      const filteredSpans = traceData.filter( (data) => data.trace_id === selectedSpanId );
      console.log(filteredSpans);

  return (
    <>
      <div className="trace-viewer">
      {/* <button onClick={fetchTraceData}>Load Trace Data</button>
      <button onClick={handleFoldAllClick}>Fold/Collapse All</button> */}
      <div className="trace-spans">
        {traceData.map((item,index) => (
          <div key={item}>
          
          <div>{item.trace_id}</div>
          
          {/* ... Other span details you want to display */}
        </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default TraceViewer
