import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import { getAppointmentsForDay } from "../helper/selectors";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview);
    transition(SHOW);
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
          />
        )}
        {mode === CREATE && (<Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel ={() => back(EMPTY)}
        />)}
      </article>

    </>

  );
}