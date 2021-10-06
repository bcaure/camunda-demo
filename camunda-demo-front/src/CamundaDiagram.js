import BpmnViewer from 'bpmn-js';
import { useState, useEffect } from 'react';
import { CAMUNDA_URL, PROCESS_DEF_ID } from './Constants';
export const CamundaDiagram = ({tick}) => {
  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    setViewer(new BpmnViewer({
      container: '#camundadiagram'
    }));
  }, []);
  useEffect(() => {
    if (viewer) {
      fetch(`${CAMUNDA_URL}/process-definition/key/${PROCESS_DEF_ID}`).then((res) => res.json()).then((processDefinition) => {
        fetch(CAMUNDA_URL + '/process-definition/' + processDefinition.id + '/xml').then((res) => res.json()).then((data) => {
          console.log(data);
          // show it in bpmn.io
          viewer.importXML(data.bpmn20Xml, (err) => {
            if (err) {
              console.log('error rendering', err);
            } else {
              const canvas = viewer.get('canvas');
              // zoom to fit full viewport
              canvas.zoom('fit-viewport');
              // add marker
              // canvas.addMarker(marker.taskDefinitionKey, 'highlight');
            }
          });
        });  
      });
    }
  }, [viewer, tick]);
  return null;
};
