import {useEffect, useState} from "react";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {FiDelete} from "react-icons/fi";
import {HowToPlayModal} from "./HowToPlayModal";
import {SuccessModal} from "./SuccessModal";
import {words} from "./words";
import {wordList} from "./validWords";
import {WrongModal} from "./WrongModal";

const startDate = new Date("01/09/2022");
const currentDate = new Date();

const Difference_In_Time = currentDate.getTime() - startDate.getTime();

const Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

const word = words[Difference_In_Days].toLowerCase();

const wordsInLowerCase = words.map(word => word.toLowerCase());

function App() {
    const [boardState, setBoardState] = useState(
        localStorage.getItem("boardState")
            ? word === localStorage.getItem("word")
                ? localStorage.getItem("boardState").split(",")
                : ["", "", "", "", "", ""]
            : ["", "", "", "", "", ""]
    );

    const [current, setCurrent] = useState("");

    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [done, setDone] = useState(false);

    const [ruleModal, setRuleModal] = useState(false);

    const setCurrentWhenNotDone = done ? () => {
    } : setCurrent;

    useEffect(() => {
        localStorage.setItem("boardState", boardState);
        localStorage.setItem("word", word);
    }, [boardState]);

    useEffect(() => {
        if (boardState.includes(word)) {
            setSuccess(true);
            setDone(true);
        } else {
            if (boardState && boardState[boardState.length - 1] !== "") {
                setFailed(true);
                setDone(true);
            }
        }
    }, [boardState]);

    return (
        <div className="relative flex justify-center w-screen h-screen overflow-y-auto bg-gray-800">
            <HowToPlayModal
                isOpen={ruleModal}
                onRequestClose={() => {
                    setRuleModal(false);
                }}
            />
            {success && (
                <SuccessModal
                    onRequestClose={() => setSuccess(false)}
                    number={Difference_In_Days}
                    boardState={boardState}
                />
            )}
            {failed && (
                <WrongModal onRequestClose={() => setFailed(false)} word={word}/>
            )}
            <div className="flex flex-col flex-grow h-full max-w-md ">
                <div
                    className="flex items-center justify-between w-full py-2 text-3xl font-bold text-center text-white uppercase border-b border-gray-400 ju border-opacity-70 ">
                    <p>Wörtle</p>
                    <AiOutlineQuestionCircle
                        onClick={() => {
                            setRuleModal(true);
                        }}
                        className="cursor-pointer"
                    />
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
                                    style={{width: "9%"}}
                                    key={char}
                                >
                                    <CharButton
                                        boardState={boardState}
                                        setCurrent={setCurrentWhenNotDone}
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
                                    style={{width: "9%"}}
                                    key={char}
                                >
                                    <CharButton
                                        boardState={boardState}
                                        setCurrent={setCurrentWhenNotDone}
                                        current={current}
                                        char={char}
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <div className="flex justify-center w-full my-2">
                        <div className="flex px-[1%]" style={{width: "18%"}}>
                            <div
                                onClick={() => {
                                    if (
                                        !done &&
                                        current.length === 5 &&
                                        boardState.indexOf("") >= 0
                                    ) {
                                        if (!wordList.includes(current)) {
                                            console.warn(`${current} is not a valid word`)
                                            return;
                                        }
                                        let newBoardState = [...boardState];
                                        newBoardState[boardState.indexOf("")] = current;
                                        setBoardState(newBoardState);
                                        setCurrentWhenNotDone("");
                                    }
                                }}
                                className="flex items-center justify-center w-full text-white uppercase bg-gray-400 rounded-md cursor-pointer h-14"
                            >
                                Enter
                            </div>
                        </div>
                        {["y", "x", "c", "v", "b", "n", "m"].map((char) => (
                            <div className="flex px-[1%]" style={{width: "9%"}} key={char}>
                                <CharButton
                                    boardState={boardState}
                                    setCurrent={setCurrentWhenNotDone}
                                    current={current}
                                    char={char}
                                />
                            </div>
                        ))}
                        <div className="flex px-[1%]" style={{width: "18%"}}>
                            <div
                                onClick={() => {
                                    if (current.length > 0) {
                                        setCurrentWhenNotDone((prev) => {
                                            return prev.substring(0, prev.length - 1);
                                        });
                                    }
                                }}
                                className="flex items-center justify-center w-full text-white uppercase bg-gray-400 rounded-md cursor-pointer h-14"
                            >
                                <FiDelete className="w-6 h-6"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function getColor(guess, index) {
    const charInWord = word.split(guess[index]).length - 1;
    const charBeforeIndex =
        guess.substring(0, index).split(guess[index]).length - 1;

    if (guess[index] === word[index]) {
        return "GREEN";
    }
    if (
        word.includes(guess[index]) &&
        !locations(guess[index], word).every((i) => guess[i] === word[i]) &&
        charBeforeIndex < charInWord
    ) {
        return "YELLOW";
    }
    return "GRAY";
}

function WordleRow({current, currentRow, state}) {
    if (state) {
        return (
            <div className="flex items-center justify-center my-1">
                {state.split("").map((char, i) => (
                    <div className="px-1  w-[15%]" key={i}>
                        <WordTile
                            color={
                                getColor(state, i) === "GREEN"
                                    ? "rgba(0, 255, 0, 0.5)"
                                    : getColor(state, i) === "YELLOW"
                                        ? "rgba(255, 255, 0, 0.5)"
                                        : "rgba(255, 255, 255, 0.5)"
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

export function WordTile({color, children}) {
    return (
        <div
            style={{backgroundColor: color}}
            className="flex items-center justify-center w-full text-lg font-bold text-white uppercase border cursor-pointer h-14 min-w-10 bg-opacity-80 "
        >
            {children}
        </div>
    );
}

function CharButton({char, current, setCurrent, boardState}) {
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
            className={`flex items-center cursor-pointer justify-center w-full text-white uppercase ${
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

function locations(substring, string) {
    const a = [];
    let i = -1;
    while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);
    return a;
}

export default App;
