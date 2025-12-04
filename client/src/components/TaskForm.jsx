function TaskForm() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="¿Qué necesitas hacer?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
