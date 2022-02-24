import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          // id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
      {/* {props.interview && (
        <Show
          interview={{
            student: props.interview.student,
            interviewer: props.interview.interviewer.name,
          }}
        />
      )}
      {!props.interview && <Empty />} */}
    </article>
  );
}
