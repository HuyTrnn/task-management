import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../BaseInput/SearchInput";
import { navItems } from "../../constants/sidebar";
import { getTasks } from "../../services/taskService";

export default function Sidebar({ onShowModal, isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
    setFilteredTasks(loadedTasks);
  }, []);

  const handleSearch = (values) => {
    const { title, priority } = values;
    let filtered = tasks;

    if (title) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (priority) {
      filtered = filtered.filter((task) => task.priority === priority);
    }

    setFilteredTasks(filtered);
  };

  return (
    <aside
      className={`fixed md:relative z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out h-full overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}
    >
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end p-2">
        <button onClick={onClose} className="text-gray-600">✕</button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <SearchInput
            onSearch={handleSearch}
            tasks={filteredTasks}
            onShowModal={onShowModal}
          />
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center px-4 py-3 cursor-pointer ${
                location.pathname === item.key
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => {
                navigate(item.key)
                onClose?.()
              }}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
