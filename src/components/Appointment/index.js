import React,{useEffect} from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING); // Transition to SAVING mode before calling bookInterview

    props
      .bookInterview(props.id, interview)
      .then(() => {
        // Transition to SHOW mode on successful save
        transition(SHOW);
      })
      .catch(() => {
        // Transition to ERROR_SAVE mode on save error
        transition(ERROR_SAVE, true);
      });

  }
  function cancel() {

    transition(DELETING, true); // Transition to SAVING mode before calling bookInterview

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY); // Transition to EMPTY mode when the request is complete
      })
      .catch(() => {
        // Transition to ERROR_DELETE mode on cancellation error
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <>
      <Header time={props.time} />
      <article className="appointment" data-testid="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}

          />
        )}
        {mode === CREATE && (<Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />)}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && <Confirm
          message="Delete the Appointment?"
          onConfirm={cancel}
          onCancel={() => transition(SHOW)}
        />}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
          />
        )}
        {mode === ERROR_DELETE && (<Error
          message="Could not delete appointment."
          onClose={() => back()}
        />)}
        {mode === ERROR_SAVE && (<Error
          message="Could not save appointment."
          onClose={() => back()}
        />)}

      </article>

    </>

  );
}


