import React from "react";

function NextButton({ dispatch, answer,index,length }) {
  if (answer === null) return;

  if(index < length -1){
  return (
    <>
      <button
        className="next btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    </>
  );
}
  if(index === length -1){
  return (
    <>
      <button
        className="next btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        finish
      </button>
    </>
  );
}
}

export default NextButton;
