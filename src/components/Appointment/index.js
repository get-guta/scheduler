import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING); // Transition to SAVING mode before calling bookInterview

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW); // Transition to SHOW mode when the request is complete
      })
      .catch((error) => {
        console.error(error);
        // Handle error if the request fails
      });

  }
  function cancel() {

    transition(DELETING); // Transition to SAVING mode before calling bookInterview

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY); // Transition to EMPTY mode when the request is complete
      })
      .catch((error) => {
        console.error(error);
        // Handle error if the request fails
      });
  }

  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
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

      </article>

    </>

  );
}