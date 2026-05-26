export default function Topbar() {
  return (
    <div
      className="
      h-[72px]
      flex items-center justify-between
      border-b border-white/5
      px-8
      bg-black
      sticky top-0 z-40
    "
    >
      <div>
        <h1
          className="
          text-3xl font-bold
          bg-gradient-to-r
          from-white
          via-blue-400
          to-purple-500
          bg-clip-text text-transparent
        "
        >
          Dashboard
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          AI Recruitment Intelligence Platform
        </p>
      </div>
    </div>
  );
}