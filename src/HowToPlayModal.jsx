import { WordTile } from "./App";

export function HowToPlayModal({ isOpen, onRequestClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onRequestClose}
          className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-50 bg-slate-800"
        >
          <div
            onClick={function (e) {
              e.stopPropagation();
            }}
            className="px-3 text-center rounded-md max-w-md bg-slate-900 py-4"
          >
            <div>
              <h1 className="mb-4 text-xl font-bold text-white">Regeln:</h1>
              <p className="text-white mb-3">
                Errate das WÖRTLE in 6 Versuchen. Nach jedem Versuch zeigen dir
                die Farben der Kacheln, wie nah dein Versuch an der Lösung war.
              </p>
              <div className="flex items-center justify-center my-1">
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>A</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={"rgba(0, 255, 0, 0.5)"}>B</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>A</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>R</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>T</WordTile>
                </div>
              </div>
              <p className="text-white mb-3">
                Der Buchstabe B ist im Wort enthalten und ist an der richtigen
                Position.
              </p>
              <div className="flex items-center justify-center my-1">
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>H</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>Ä</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={"rgba(255, 255, 0, 0.5)"}>R</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>T</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>E</WordTile>
                </div>
              </div>
              <p className="text-white mb-3">
                Der Buchstabe R ist im Wort enthalten, ist aber an der falschen
                Position.
              </p>
              <div className="flex items-center justify-center my-1">
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>T</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>I</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>T</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={"rgba(255, 255, 255, 0.5)"}>A</WordTile>
                </div>
                <div className="px-1  w-[15%]">
                  <WordTile color={""}>N</WordTile>
                </div>
              </div>
              <p className="text-white mb-3">
                Der Buchstabe A ist nicht im Wort enthalten.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
