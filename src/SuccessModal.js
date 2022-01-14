import copy from "copy-to-clipboard";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { getColor } from "./App";
export function SuccessModal({ number, boardState }) {
  const [buttonText, setButtonText] = useState("Teilen");

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-50 bg-slate-800">
      <div className="px-16 text-center rounded-md bg-slate-900 py-14">
        <h1 className="mb-4 text-xl font-bold text-white">
          Du hast es geschafft!
        </h1>
        <button
          onClick={async () => {
            let textToCopy = `Wortnummer: ${number}\n\n`;
            for (let i = 0; i < boardState.length; i++) {
              if (boardState[i]) {
                for (let j = 0; j < boardState[i].length; j++) {
                  if (getColor(boardState[i], j) === "GREEN") {
                    textToCopy = textToCopy + "🟩";
                  } else if (getColor(boardState[i], j) === "YELLOW") {
                    textToCopy = textToCopy + "🟨";
                  } else {
                    textToCopy = textToCopy + "⬛";
                  }
                }
                textToCopy = textToCopy + "\n";
              }
            }
            if (isMobile) {
              if (navigator.share) {
                try {
                  await navigator
                    .share({
                      text: textToCopy,
                    })
                    .then(() =>
                      console.log(
                        "Hooray! Your content was shared to tha world"
                      )
                    );
                } catch (error) {
                  console.log(
                    `Oops! I couldn't share to the world because: ${error}`
                  );
                }
              }
            } else copy(textToCopy);
            setButtonText("Kopiert!");
          }}
          className="px-4 py-2 text-white bg-green-600 rounded-md text-md"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
