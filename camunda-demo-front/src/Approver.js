import 'bootstrap/dist/css/bootstrap.min.css';
export const Approver = ({approver, sendDecision}) => {
  let decision = (
    <>
      <div className="btn-group">
        <button type="button" className="btn btn-outline-success btn-sm m-0" onClick={() => sendDecision(approver.email, 'approve')}>Approve</button>
        <button type="button" className="btn btn-outline-danger btn-sm m-0" onClick={() => sendDecision(approver.email, 'reject')}>Reject</button>
      </div>
    </>
  );
  if (approver.decision) {
    const decisionClass = [];
    if (approver.decision === 'approve') {
      decisionClass.push('text-success');
    } else {
      decisionClass.push('text-danger');
    } 
    decision = (
      <em className={decisionClass.join(' ')}>
        {approver.decision === 'approve' ? 'Approved' : 'Rejected'}
      </em>
    );
  }
  return (
    <tr>
      <td>{approver.email}</td>
      <td>{decision}</td>
    </tr>
  );
};