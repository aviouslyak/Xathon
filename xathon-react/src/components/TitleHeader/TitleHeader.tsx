import React from "react";

interface Props {
  text: string;
}
const TitleHeader: React.FC<Props> = ({ text }) => {
  return (
    <h1 className={`text-center mx-2 text-4xl font-light accent-text`}>
      {text}
    </h1>
  );
};

export default TitleHeader;
