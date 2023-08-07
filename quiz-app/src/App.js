import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";

const initialState = {
  questions: [],

  // loading, error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataLoading":
      return { ...state, status: "loading" };
    case "dataRecieved":
      return { ...state, status: "ready", questions: action.payload };

    case "error":
      return { ...state, status: "error" };
    case "dataActive":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuiz":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { initialState, status: "restart" };
    default:
      throw new Error("unknow action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, highscore } = state;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: "dataLoading" });
        const response = await fetch("http://localhost:5000/questions");
        const data = await response.json();
        dispatch({ type: "dataRecieved", payload: data });
        console.log(data);
      } catch (err) {
        dispatch({ type: "error" });
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen
            question={questions}
            length={questions.length}
            dispatch={dispatch}
          />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              length={questions.length}
              points={points}
              maxPoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              length={questions.length}
            />
          </>
        )}
        {status === "finish" && (
          <FinishedScreen
            points={points}
            maxPoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </>
  );
}

export default App;
