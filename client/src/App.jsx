import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Header />
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </>
  );
}

export default App;
