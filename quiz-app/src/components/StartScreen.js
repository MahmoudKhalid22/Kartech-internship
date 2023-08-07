import React from "react";

function StartScreen({ dispatch, length }) {
  return (
    <div className="options">
      <h2 className="title">Welcome to The React Quiz!</h2>
      <p>{length} questions to test your React mastery</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "dataActive" })}
      >
        Start now
      </button>
    </div>
  );
}

export default StartScreen;
