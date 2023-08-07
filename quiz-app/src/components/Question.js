import React from "react";

function Question({ question, dispatch, answer }) {
  const isAnswered = answer !== null;
  return (
    <div>
      <h2 className="title">{question.question}</h2>
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            isAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={isAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Question;
