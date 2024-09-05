import React from "react";

interface TabButtonProps {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}
  /**
   * A TabButton component to be used in the Tab component.
   * The component will be rendered as a button with text and a border.
   * The component will be highlighted when the active prop is true.
   * The component will call the selectTab function when clicked.
   * The component will display the children given as a prop.
   * @param {boolean} active - Whether or not the tab is active.
   * @param {function} selectTab - The function to be called when the button is clicked.
   * @param {React.ReactNode} children - The text to be displayed in the button.
   * @returns {JSX.Element} The TabButton component.
   */
const TabButton = ({ active, selectTab, children }: TabButtonProps) => {
  const buttonClasses = active
    ? "text-white border-b border-purple-500"
    : "text-[$ADB7BE]";

  return (
    <button onClick={selectTab}>
      <p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>
        {children}
      </p>
    </button>
  );
};

export default TabButton;
