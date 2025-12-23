import Heading from "@/components/typography/heading";
import React from "react";

interface TitleProps {
  text: string;
  drawLineText?: string;
  isDrawLine?: boolean;
    className?: string;
}

const Title: React.FC<TitleProps> = ({ text, drawLineText, isDrawLine, className = "" }) => {
  return (
    <>
      <Heading variant={"h2"} className={className}>
        <span className="text-black">{text} </span>
        {isDrawLine && (
          <span className="text-red-400 relative">
            <span>{drawLineText}</span>
            <div data-svg-wrapper className="left-0 absolute -bottom-3">
              <svg
                width="231"
                height="14"
                viewBox="0 0 231 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 12.5C58.459 4.89071 183.802 -6.34513 229.5 9.5858"
                  stroke="#FF765E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </span>
        )}
      </Heading>
    </>
  );
};

export default Title;
