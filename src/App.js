import { useState } from "react";
import "./App.css";
const ShortUniqueId = require("short-unique-id");

function App() {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [qno, setQno] = useState(1);
  const [date, setDate] = useState("");
  const [dropdownoptions, setDropdownoptions] = useState([]);
  const [ques, setQues] = useState("");
  const [hint, setHint] = useState("");
  const [answer, setAnswer] = useState("");
  const [quiz, setQuiz] = useState([]);

  const addToQuiz = () => {
    const uid = new ShortUniqueId({ length: 24 });
    const optionArray = [];
    if (
      ques.length !== 0 &&
      answer.length !== 0 &&
      dropdownoptions.length !== 0
    ) {
      setQno(qno + 1);
      dropdownoptions.map((option) => {
        optionArray.push({ value: option, opted_by: 0 });
      });

      quiz.push({
        options: optionArray,
        question: ques,
        answer: answer,
        hint: hint,
        answered_by: 0,
        _id: uid(),
      });
      document.getElementById("quiz-input").reset();
    }
  };

  //setting options for dropdown dynamically
  const settingOptions = () => {
    setDropdownoptions([option1, option2, option3, option4]);
  };

  const submitData = async (e) => {
    addToQuiz();
    console.log(quiz);

    //sending data frontend to backend
    await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quiz, date }),
    }).then(() => {
      console.log("data sent");
    });
  };

  return (
    <div className="App">
      <div className="quiz">
        <form className="quiz-form" id="quiz-input" onSubmit={submitData}>
          <input
            type="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <h1>{`Question ${qno}`}</h1>
          <input
            type="text"
            id="question"
            placeholder="Question"
            required
            onChange={(e) => {
              setQues(e.target.value);
            }}
          />
          <input
            type="text"
            className="options"
            placeholder="First option"
            name="option1"
            required
            onChange={(e) => setOption1(e.target.value)}
          />
          <input
            type="text"
            className="options"
            placeholder="Second option"
            name="option2"
            required
            onChange={(e) => setOption2(e.target.value)}
          />
          <input
            type="text"
            className="options"
            placeholder="Third option"
            name="option3"
            required
            onChange={(e) => setOption3(e.target.value)}
          />
          <input
            type="text"
            className="options"
            placeholder="Fourth option"
            name="option4"
            required
            onChange={(e) => setOption4(e.target.value)}
          />
          <select
            name="answer"
            id="ans-dropdown"
            required
            defaultValue={"default"}
            onClick={settingOptions}
            onChange={(e) => {
              setAnswer(dropdownoptions.indexOf(e.target.value) + 1);
            }}
          >
            <option value={"default"} disabled hidden>
              Select Answer
            </option>
            {dropdownoptions.map((e, key) => {
              if (e.length !== 0) {
                return (
                  <option key={key} value={e}>
                    {e}
                  </option>
                );
              }
            })}
          </select>
          <textarea
            type="text"
            id="hint"
            placeholder="Hint"
            onChange={(e) => {
              setHint(e.target.value);
            }}
          />
          <input type="file" id="file" />
          <input type="button" value="Delete" id="del-btn" />
          <input
            type="submit"
            value="Add Question"
            className="add-remove-ques-btn"
            onClick={addToQuiz}
          />
          <input
            type="button"
            value="Remove Last Question"
            className="add-remove-ques-btn"
          />
          <input type="submit" id="submit-btn" />
        </form>
      </div>
    </div>
  );
}

export default App;
