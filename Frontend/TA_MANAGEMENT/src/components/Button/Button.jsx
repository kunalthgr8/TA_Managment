import React from "react";

function Button({width="auto", children, className = "w-full", ...props }) {
  return (
    <div className={width}>
      <button className={`px-3 py-2 transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 bg-button-color hover:bg-text-green ${className}`} {...props} >
        {children}
      </button>
    </div>
  );
}

// const NamedButton = React.forwardRef(Button);
export default Button;