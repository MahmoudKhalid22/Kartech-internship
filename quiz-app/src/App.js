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
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 45;

const initialState = {
  questions: [],

  // loading, error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataLoading":
      return { ...state, status: "loading" };
    case "dataRecieved":
      return {
        ...state,
        status: "ready",
        questions: action.payload.questions,
        secRemaining: 15 * SECS_PER_QUESTION,
      };

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
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secRemaining: state.secRemaining - 1,
        status: state.secRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("unknow action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, highscore, secRemaining } =
    state;
  console.log(secRemaining);
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: "dataLoading" });
        const response = await fetch(
          "https://raw.githubusercontent.com/MahmoudKhalid22/Kartech-internship/main/quiz-app/data/questions.json"
        );
        const data = await response.json();
        // console.log(data);
        dispatch({ type: "dataRecieved", payload: data });
        // console.log(data);
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
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                length={questions.length}
              />
            </footer>
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
