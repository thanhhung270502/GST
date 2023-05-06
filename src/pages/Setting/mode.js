import { useEffect } from 'react';
import { useState } from 'react';
import { createSchedule, getLastClimateByType } from '~/api/api';

function Mode(props) {
    // useEffect(() => {
    //     (async () => {
    //         await getLastClimateByType().then((data) => {
    //             setData(data);
    //         });
    //     })();
    // }, []);

    const [data, setData] = useState({
        type: props.type,
        key_user_id: '1234',
        start_time: null,
        end_time: null,
        status: 'waiting',
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createSchedule(data);
        window.location.href = '../';
    };

    return (
        <div className="mode-section">
            {props.mode == 'schedule' && (
                <div className="mode-schedule-section">
                    <form onSubmit={handleSubmit}>
                        <div className="mode-title">Scheduled for Fan</div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">
                                Time to start:
                            </label>
                            <input
                                type="datetime-local"
                                class="form-control"
                                name="start_time"
                                onChange={handleChange}
                            />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">
                                Time to end:
                            </label>
                            <input type="datetime-local" class="form-control" name="end_time" onChange={handleChange} />
                        </div>
                        <button type="submit" className="mode-btn">
                            Apply
                        </button>
                    </form>
                </div>
            )}
            {props.mode == 'auto' && (
                <div className='mode-auto-section'>
                    <form>
                        <button type='submit' className='mode-btn'>Start</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Mode;
