import { ReactNode, useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/outline";

export interface AccordionProps {
  /**
   *
   */
  allowMultiple?: boolean;
  /**
   *
   */
  items: {
    id: string;
    text: string;
    content: ReactNode;
  }[];

  handleClick: (itemId: string) => void;
}

const Accordion = ({
  allowMultiple = true,
  items,
  handleClick,
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleClickInternal = (id: string) => {
    if (openItems.find((oi) => oi === id)) {
      setOpenItems((state) => state.filter((a) => a !== id));
      return;
    }

    if (!allowMultiple) setOpenItems([id]);

    setOpenItems((state) => [...state, id]);

    if (handleClick) handleClick(id);
  };

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item) => {
        const isOpen = openItems.find((id) => item.id === id);

        return (
          <div key={item.id} className="py-6">
            <>
              <div className="text-lg">
                <button
                  className={clsx(
                    "text-left w-full flex justify-between items-start text-gray-400",
                    "focus:outline-none focus:underline"
                  )}
                  onClick={() => handleClickInternal(item.id)}
                >
                  <span className="font-medium text-gray-900">{item.text}</span>
                  <span className="ml-6 h-7 flex items-center">
                    <ChevronDownIcon
                      className={clsx(
                        isOpen ? "-rotate-180" : "rotate-0",
                        "h-6 w-6 transform"
                      )}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </div>
              {isOpen && <dd className="mt-2 pr-12">{item.content}</dd>}
            </>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
