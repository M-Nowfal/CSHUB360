
const BouncingLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-3">
        <div className="w-3 h-5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}

const SpinnerLoader = ({ size = 10, color = "emerald" }: { size?: number, color?: string }) => {

  const spinnerColor = color === "emerald" ? "border-t-emerald-600 border-b-emerald-600 border-l-emerald-600" : "border-t-white border-b-white border-l-white border-r-emerald-600";

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div
          style={{ width: size * 4, height: size * 4 }} 
          className={`border-4 ${spinnerColor} rounded-full animate-spin`}
        />
      </div>
    </div>
  );
};

export { BouncingLoader, SpinnerLoader };
