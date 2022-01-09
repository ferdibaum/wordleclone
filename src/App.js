import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { words } from "./words";

const startDate = new Date("01/09/2022");
const currentDate = new Date();

const Difference_In_Time = currentDate.getTime() - startDate.getTime();

const Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

const word = words[Difference_In_Days];

function App() {
  const [boardState, setBoardState] = useState(["", "", "", "", "", ""]);

  const [current, setCurrent] = useState("");

  const [done, setDone] = useState(false);

  useEffect(() => {
    if (boardState.includes(word)) {
      setDone(true);
    }
  }, [boardState]);

  return (
    <div className="relative flex justify-center w-screen h-screen overflow-y-auto bg-gray-800">
      {done && <Modal number={Difference_In_Days} boardState={boardState} />}
      <div className="flex flex-col flex-grow h-full max-w-md ">
        <div className="w-full py-2 text-3xl font-bold text-center text-white uppercase border-b border-gray-400 border-opacity-70 ">
          Wordle
        </div>
        <div className="flex flex-col items-center justify-center flex-grow w-full py-3 ">
          {boardState.map((state, index) => (
            <div className="w-full" key={`state-${index}`}>
              <WordleRow
                currentRow={index === boardState.indexOf("")}
                current={current}
                state={state}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-center w-full my-2">
            {["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"].map(
              (char) => (
                <div
                  className="flex px-[1%]"
                  style={{ width: "9%" }}
                  key={char}
                >
                  <CharButton
                    boardState={boardState}
                    setCurrent={setCurrent}
                    current={current}
                    char={char}
                  />
                </div>
              )
            )}
          </div>
          <div className="flex justify-center w-full my-2">
            {["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"].map(
              (char) => (
                <div
                  className="flex px-[1%]"
                  style={{ width: "9%" }}
                  key={char}
                >
                  <CharButton
                    boardState={boardState}
                    setCurrent={setCurrent}
                    current={current}
                    char={char}
                  />
                </div>
              )
            )}
          </div>
          <div className="flex justify-center w-full my-2">
            <div className="flex px-[1%]" style={{ width: "18%" }}>
              <div
                onClick={() => {
                  if (current.length === 5 && boardState.indexOf("") >= 0) {
                    let newBoardState = [...boardState];
                    newBoardState[boardState.indexOf("")] = current;
                    setBoardState(newBoardState);
                    setCurrent("");
                  }
                }}
                className="flex items-center justify-center w-full text-white uppercase bg-gray-400 rounded-md h-14"
              >
                Enter
              </div>
            </div>
            {["y", "x", "c", "v", "b", "n", "m"].map((char) => (
              <div className="flex px-[1%]" style={{ width: "9%" }} key={char}>
                <CharButton
                  boardState={boardState}
                  setCurrent={setCurrent}
                  current={current}
                  char={char}
                />
              </div>
            ))}
            <div className="flex px-[1%]" style={{ width: "18%" }}>
              <div
                onClick={() => {
                  if (current.length > 0) {
                    setCurrent((prev) => {
                      return prev.substring(0, prev.length - 1);
                    });
                  }
                }}
                className="flex items-center justify-center w-full text-white uppercase bg-gray-400 rounded-md h-14"
              >
                <FiDelete className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ number, boardState }) {
  const [buttonText, setButtonText] = useState("Teilen");

  return (
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div class="bg-slate-900 px-16 py-14 rounded-md text-center">
        <h1 class="text-xl mb-4 font-bold text-white">Du hast es geschafft!</h1>
        <button
          onClick={() => {
            let textToCopy = `Wortnummer: ${number}\n\n`;
            for (let i = 0; i < boardState.length; i++) {
              if (boardState[i]) {
                for (let j = 0; j < boardState[i].length; j++) {
                  if (boardState[i][j] === word[j]) {
                    textToCopy = textToCopy + "🟩";
                  } else if (word.includes(boardState[i][j])) {
                    textToCopy = textToCopy + "🟨";
                  } else {
                    textToCopy = textToCopy + "⬛";
                  }
                }
                textToCopy = textToCopy + "\n";
              }
            }
            copy(textToCopy);
            setButtonText("Kopiert!");
          }}
          class="bg-green-600 px-4 py-2 rounded-md text-md text-white"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function WordleRow({ current, currentRow, state }) {
  if (state) {
    return (
      <div className="flex items-center justify-center my-1">
        {state.split("").map((char, i) => (
          <div className="px-1  w-[15%]" key={i}>
            <WordTile
              color={
                char === word[i]
                  ? "rgba(0, 255, 0, 0.5)"
                  : word.includes(char)
                  ? "rgba(255, 255, 0, 0.5)"
                  : "transparent"
              }
            >
              {char}
            </WordTile>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center my-1">
        {[...Array(5).keys()].map((i) => (
          <div className=" px-1  w-[15%]" key={i}>
            <WordTile color="transparent">
              {currentRow && current[i] ? current[i] : ""}
            </WordTile>
          </div>
        ))}
      </div>
    );
  }
}

function WordTile({ color, children }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="flex items-center justify-center w-full text-lg font-bold text-white uppercase border cursor-pointer h-14 min-w-10 bg-opacity-80 "
    >
      {children}
    </div>
  );
}

function CharButton({ char, current, setCurrent, boardState }) {
  return (
    <div
      onClick={() => {
        if (
          current.length < 5 &&
          !boardState.some((e) => {
            return e.includes(char) && !word.includes(char);
          })
        ) {
          setCurrent((prev) => {
            return prev + char;
          });
        }
      }}
      className={`flex items-center justify-center w-full text-white uppercase ${
        boardState.some((e) => {
          for (let i = 0; i < e.length; i++) {
            if (e[i] === word[i] && e[i] === char) {
              return true;
            }
          }
          return false;
        })
          ? "bg-green-600"
          : boardState.some((e) => {
              return e.includes(char) && word.includes(char);
            })
          ? "bg-yellow-400"
          : boardState.some((e) => {
              return e.includes(char) && !word.includes(char);
            })
          ? "bg-gray-900"
          : "bg-gray-400"
      } rounded-md h-14`}
    >
      {char}
    </div>
  );
}

export default App;
