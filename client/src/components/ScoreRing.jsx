export default function ScoreRing({ score, size = "large" }) {
  const dimension = size === "small" ? "h-24 w-24" : "h-44 w-44";
  const textSize = size === "small" ? "text-2xl" : "text-5xl";
  return (
    <div className={`${dimension} score-ring relative grid place-items-center rounded-full`} style={{ "--score": score }}>
      <div className="grid h-[84%] w-[84%] place-items-center rounded-full bg-white text-center">
        <div>
          <span className={`${textSize} block font-black tracking-tight text-navy`}>{score}</span>
          <span className="text-[10px] font-bold uppercase tracking-[.17em] text-ink/55">out of 100</span>
        </div>
      </div>
    </div>
  );
}
