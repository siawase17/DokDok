import { useState, useEffect } from 'react';
import { dokdokCalendar } from '../api/calendar.api';
import { Book } from '../models/book';
import useTokenManager from '../hooks/useTokenManager';

const useDokDokCalendar = (currentMonth: Date) => {
    const [bookReadCount, setBookReadCount] = useState(0);
    const [bookFinishCount, setBookFinishCount] = useState(0);
    const [bookFinished, setBookFinished] = useState<Book[]>([]);
    const { handleTokenError } = useTokenManager();

    const fetchCalendarData = async (year: number, month: number) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await dokdokCalendar(accessToken, year, month, handleTokenError);

            setBookReadCount(response.bookReadCount);
            setBookFinishCount(response.bookFinishCount);

            if (Array.isArray(response.bookFinished)) {
                setBookFinished(response.bookFinished);
            } else {
                console.error("bookFinished is not an array:", response.bookFinished);
            }
        } catch (error) {
            console.error("Error fetching calendar data:", error);
        }
    };

    useEffect(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        fetchCalendarData(year, month);
    }, [currentMonth]);

    return {
        bookReadCount,
        bookFinishCount,
        bookFinished,
    };
};

export default useDokDokCalendar;