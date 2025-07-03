export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const initialTasks = [
        {
          id: 1,
          title: "Learn React",
          description: "Hooks lesson",
          completed: false,
        },
        {
          id: 2,
          title: "Read Book",
          description: "Chapter 5",
          completed: true,
        },
      ];
      setTasks(initialTasks);
    }, 1500);
  }, []);

  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: Date.now(), completed: false },
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTask = (id, updated) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
