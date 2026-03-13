import logo from '../src/assets/images/logo.png'


function App() {

  return (
    <div className="min-h-screen bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 flex flex-col items-center justify-center px-4 relative overflow-hidden ">

      {/* Particelle animate */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">

        <div className="flex justify-center mb-8">
          <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-white/80 text-sm font-light tracking-[0.2em] border border-white/10">
            COMING SOON
          </span>
        </div>

        <h1 className="text-3xl md:text-8xl font-light text-white mb-12 tracking-tight">
          CODERS AT WORK
        </h1>

        <div className="flex justify-center">
          <img
            src={logo}
            alt="Coders at Work Logo"
            className="w-40 md:w-80  transition-opacity duration-500"
          />
        </div>
      </div>
    </div>
  )
}

export default App
