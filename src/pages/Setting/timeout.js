import { useEffect, useState } from 'react';

function TimeOut(props) {
    const [timeLeft, setTimeLeft] = useState(props.time);

    useEffect(() => {
        console.log(props.time);
        const timerId = timeLeft > 0 && setInterval(() => {
            setTimeLeft((prev) => prev - 1);
            console.log('Countdown...');
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const convertTime = (datetime) => {
        console.log(datetime);
        let start_time = '';
        if (datetime) {
            start_time =
                datetime.start_time.substr(11, 8) +
                ' ' +
                datetime.start_time.substr(8, 2) +
                '-' +
                datetime.start_time.substr(5, 2) +
                '-' +
                datetime.start_time.substr(0, 4);
        }
        return start_time;
    };

    return <div>${convertTime(timeLeft)}</div>;
}

export default TimeOut;
