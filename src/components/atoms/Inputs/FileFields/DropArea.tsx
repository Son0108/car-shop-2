import { DragEvent, DragEventHandler, ReactNode, useState } from "react";

/**
 * Props definition of the render-props rendered in the DropArea component
 */
export interface DropAreaRenderProp {
  /**
   * Define if there is a drag action above the area
   */
  active: boolean;
}

/**
 * Props definition for the DropArea Component
 */
interface DropAreaProps {
  /**
   * Render prop to pass the active state of the drop area to it's children
   */
  children?: { ({ active }: DropAreaRenderProp): ReactNode };
  /**
   * handler for the drag event when a file is dragged onto the field
   */
  handleDrop: DragEventHandler;
}

/**
 * DropAre is a wrapper that transforms it's children into a drop-area
 * for file inputs.
 */
const DropArea = ({ children, handleDrop }: DropAreaProps) => {
  // State of the drop area, when the mouse is dragging something
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  return (
    <div className="relative w-full">
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children && children({ active })}
      </div>
    </div>
  );
};

export default DropArea;
