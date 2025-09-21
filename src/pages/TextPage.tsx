import React from "react";

interface TextPageProps {
  title: string;
  children: React.ReactNode;
}

const TextPage: React.FC<TextPageProps> = ({ title, children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
      <div className="prose dark:prose-invert max-w-none">{children}</div>
    </div>
  );
};

export default TextPage;
