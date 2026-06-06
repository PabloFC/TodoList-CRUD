import { ClipboardIcon } from "./icons";

function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <ClipboardIcon className="w-12 h-12 text-indigo-600" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Mi Lista de Tareas
        </h1>
      </div>
      <p className="text-gray-600 text-lg">
        Organiza tu día de manera eficiente
      </p>
    </header>
  );
}

export default Header;
