import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        <FaSun size={22} />
      ) : (
        <FaMoon size={22} />
      )}
    </button>
  );
}

export default ThemeToggle;