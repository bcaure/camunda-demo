import { CAMUNDA_URL, EMAILS, PROCESS_DEF_ID } from './Constants';
const postToCamunda = (path, data) => {
  return fetch(`${CAMUNDA_URL}/${path}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  });
};

export const createNewProjectService = async (option) => {
  const projectName = 'Project-' + Math.round(Math.random() * 10000);

  const result = await postToCamunda(`process-definition/key/${PROCESS_DEF_ID}/start`, {
    businessKey: projectName,
  });
  if (result.ok) {
    const result2 = await postToCamunda(`message`, {
      messageName: 'ProjectInfo',
      businessKey: projectName,
      processVariables: {
        projectName: { value: projectName, type: 'String' },
        option: { value: option, type: 'String' },
        // for muti instance task
        approvers: {
          value: JSON.stringify(EMAILS),
          type: 'Object',
          valueInfo: {
            objectTypeName: 'java.util.ArrayList',
            serializationDataFormat: 'application/json'
          }
        },
        // for email connector
        approversString: {
          value: EMAILS.map(e => `"${e}"`).join(', '),
          type: 'String' 
        },
      }
    });
    if (result2.ok) {
      return {
        name: projectName,
        approvers: EMAILS.map(email => ({ email, decision: null })),
        option
      };
    } else {
      const apiError = await result2.json();
      throw new Error(`${apiError.type} ${apiError.message}`);
    }
  } else {
    const apiError = await result.json();
    throw new Error(`${apiError.type} ${apiError.message}`);
  }
};

export const sendDecisionService = async (project, email, decision) => {
  const decisionPayload = {
    messageName: decision === 'approve' ? 'Approval' : 'Rejection',
    businessKey: project.name,
    processVariables: {},
  };
  if (project.option === 'B') {
    decisionPayload.localCorrelationKeys = {
      customMatchVariable: { value: email, type: 'String' }
    };
  }
  const result = await postToCamunda('message', decisionPayload);
  if (result.ok) {
    const updatedIndex = project.approvers.findIndex(a => a.email === email);
    const updatedApprovers = [...project.approvers];
    updatedApprovers[updatedIndex].decision = decision;
    return { ...project, approvers: updatedApprovers };
  } else {
    const apiError = await result.json();
    throw new Error(`${apiError.type} ${apiError.message}`);
  }
};


