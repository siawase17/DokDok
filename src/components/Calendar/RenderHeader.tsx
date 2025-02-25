import React from 'react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';

interface RenderHeaderProps {
    currentMonth: Date;
    prevMonth: () => void;
    nextMonth: () => void;
}

const RenderHeader: React.FC<RenderHeaderProps> = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-first">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
        </div>
    );
};

export default RenderHeader;
