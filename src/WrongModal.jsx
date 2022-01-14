export function WrongModal({ word }) {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-50 bg-slate-800">
      <div className="px-16 text-center rounded-md bg-slate-900 py-14">
        <h1 className="mb-4 text-xl font-bold text-white">
          Du hast es leider nicht geschafft! :(
        </h1>
        <h1 className="mb-4 text-xl font-bold text-white">
          {`Die Lösung war: ${word.toUpperCase()}`}
        </h1>
      </div>
    </div>
  );
}
