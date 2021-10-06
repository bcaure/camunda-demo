import Toast from 'react-bootstrap/Toast';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { useState } from 'react';
import { Approver } from './Approver';
import { CamundaDiagram } from './CamundaDiagram';
import { createNewProjectService, sendDecisionService } from './Service';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const [tick, setTick] = useState(0);
  const [showDiagram, setShowDiagram] = useState(false);

  const createNewProject = async (option) => {
    try {
      const projectResult = await createNewProjectService(option);
      setProject(projectResult);
    } catch (catchedError) {
      setError(catchedError.message ? catchedError.message : catchedError.toString());
    }
  };

  const sendDecision = async (email, decision) => {
    try {
      const projectResult = await sendDecisionService(project, email, decision);
      setProject(projectResult);
      setTick(tick + 1);
    } catch (catchedError) {
      setError(catchedError.message ? catchedError.message : catchedError.toString());
    }
  };

  const projectApprovers = project ? project.approvers
    .map((approver) => <Approver key={approver.email} approver={approver} sendDecision={sendDecision} />)
    : '';

  const projectResultCaption = project?.result ? ` - ${project.result}` : '';
  const projectSection = project ? (
    <section className="col">
      <section className="my-3 p-3 rounded box-shadow" style={{ textAlign: 'left', margin: '40px' }}>
        <figure>
          <blockquote className="blockquote">
            <p>{project.name}</p>
          </blockquote>
          <figcaption className="blockquote-footer bg-white">
            Option {project.option} {projectResultCaption}
          </figcaption>
        </figure>
        <table className="table">
          <tbody>{projectApprovers}</tbody>
        </table>
      </section>
    </section>
  ) : '';

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Innovation Projects
        </h1>
        <p className="fs-6 text-start">
            Step 1: Use Option A or Option B tab to start a new innovation project: the app sends a request to Camunda endpoint to start the process<br />
            Step 2: the app sends a message to a Camunda endpoint with the relevant parameters for the project<br />
            Step 3: An email is sent to multiple approvers (these approvers were sent in the call of step 1)<br />
            Step 4: BPM analyzes the parameters of the call and depending on the type of project decides to go for option A or option B (the option is determined by the parameters of the step 2<br />
            Step 5A: The process is waiting for at least 1 approval or 1 rejection. Use the Approve/Reject button<br />
            Step 5B: The process is waiting for all approvers decision. Use the Approve/Reject button <br />
            Step 6: A message is posted to the demo-back API and logged in the console. <br />
        </p>
        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowDiagram(true)}>Show Diagram</button>
      </header>
      <Offcanvas show={showDiagram} onHide={() => setShowDiagram(false)} placement="bottom" style={{height: '900px'}}>
        <Offcanvas.Body>
          <div id="camundadiagram" style={{width: '1000px', height: '800px'}}></div>
          <CamundaDiagram tick={tick}></CamundaDiagram>
        </Offcanvas.Body>
      </Offcanvas>
      <main className="container align-items-center p-3 my-3 rounded box-shadow">
        <Nav variant="tabs">
          <Nav.Item><Nav.Link onClick={() => createNewProject('A')}>Option A</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link onClick={() => createNewProject('B')}>Option B</Nav.Link></Nav.Item>
        </Nav>
        <section className="row">{projectSection}</section>
        <Toast className="row" onClose={() => setError(null)} show={!!error} delay={10000} autohide>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </main>
    </div>
  );
}

export default App;
