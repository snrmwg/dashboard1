import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
  );
}

function CardHeader({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-medium leading-6 text-gray-900">{children}</h3>;
}

function CardContent({ children }: { children: ReactNode }) {
  return <div className="px-4 py-5 sm:p-6">{children}</div>;
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export { Card };