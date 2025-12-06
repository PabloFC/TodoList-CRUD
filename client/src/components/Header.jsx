function Header() {
  return (
    <header className="text-center mb-8 animate-fade-in">
      <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 shadow-lg">
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
        Mi Lista de Tareas
      </h1>
      <p className="text-gray-600 text-lg">
        Organiza tu día de forma simple y efectiva
      </p>
    </header>
  );
}

export default Header;
