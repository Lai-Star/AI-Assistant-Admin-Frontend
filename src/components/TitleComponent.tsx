import React, { ReactNode } from 'react';

interface TitleComponentProps {
    children: ReactNode;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ children }) => {
    return <h1 className="text-black font-bold text-3xl">{children}</h1>;
};

export default TitleComponent;