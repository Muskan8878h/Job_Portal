const Progress = ({ progress = 0, total = 5, color, bgColor }) => {
    const safeProgress = Math.min(total, Math.max(0, Math.round(progress)));
  return (
    <div className="flex gap-1.5">
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded transition-all ${
            index < safeProgress ? "bg-cyan-500" : "bg-cyan-100"
          }`}
          style={{
            backgroundColor:
              index < safeProgress
                ? color || "rgba(1,1,1,1)"
                : bgColor || "rgba(1,1,1,0.1)",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Progress;
