import React, { useState, useEffect } from 'react';
import './DistributedTraceSpans.css';
import  '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const DistributedTraceSpans = () => {
  const [spans, setSpans] = useState([]);
  const [selectedTraceId, setSelectedTraceId] = useState(null);
  const [isFolded, setIsFolded] = useState(false);

  // Fetching data
  useEffect(() => {
  
    fetch('https://mocki.io/v1/40059489-6a19-4ca7-a41c-1c5c920e312c')
      .then((response) => response.json())
      .then((data) => setSpans(data.spans))
      .catch((error) => console.error('Error fetching data:', error));
    
  }, []);

  // Function to handle selecting a trace
  const handleTraceSelection = (traceId) => {
    setSelectedTraceId(traceId);
  };

  

  
  // Function to toggle fold/collapse all
  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

  // Function to find the slowest request in a trace
  const findSlowestRequest = (traceId) => {
    const traceSpans = spans.filter((span) => span.trace_id === traceId);
    return traceSpans.reduce((slowest, span) => {
      const latency = parseFloat(span.req_info.latency);
      return latency > slowest ? latency : slowest;
    }, 0);
  };

  // Function to check if the request path contains an error
  const hasErrorInPath = (path) => {
    const errorSpan = spans.find((span) => span.trace_id === selectedTraceId && span.req_info.error);
    return errorSpan && path.includes(errorSpan.span_id);
  };


  // Filter spans for the selected trace
  const filteredSpans = spans.filter((span,index) => span.trace_id === selectedTraceId);
  console.log(filteredSpans); 
 

  return (
    <div className='trace-spans'>
    
      <div>
        <button onClick={toggleFold}>{isFolded ? 'Expand All' : 'Fold All'}</button>
        <br /><br />
        {spans.map((item,index) => (            
          <button
            key={index}
            onClick={() => handleTraceSelection(item.trace_id)}
            className={selectedTraceId === item.trace_id ? 'selected' : ''}
          >
            {item.trace_id}
          </button>
        ))}
      </div>
      <div>
        {selectedTraceId && (
            <div className='trace_id'>
            {filteredSpans.map((span) => (

              <div key={span.span_id} >
                  <div className="span-count">            
                    <span className='span-count'> {spans.length} spans</span>  
                    {span.req_info.error && <p>Error: true</p>}
                  </div>

                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <div className='span-section'>
                        <span> {span.req_info.req_method}{span.req_info.req_path}</span>
                        <button tooltip='latency'> {span.req_info.latency} ms</button>
                        </div>
                        <br />
                        <span> {span.source} {<code>{'->'}</code>} {span.destination}</span>
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        
                      </div>
                    </div>
                  </div>
                  </div>                 
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributedTraceSpans;
