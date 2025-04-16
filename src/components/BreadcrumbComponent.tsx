import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

interface BreadcrumbItemType {
    label: string;
}

interface BreadcrumbComponentProps {
    items: BreadcrumbItemType[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>{item.label}</BreadcrumbItem>
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbComponent;