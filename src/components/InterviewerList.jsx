import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import propTypes from 'prop-types';

export default function InterviewerList(props) {
  // console.log("LIST", props);

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewerId}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
        {...interviewer}
      />
    );
  });

  InterviewerList.propTypes = {
    interviewers: propTypes.array.isRequired
  };
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}