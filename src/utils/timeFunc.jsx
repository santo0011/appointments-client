export const timeFormat = (hour, minute, minuteDiff) => {
    function padWithZero(num) {
        return num < 10 ? '0' + num : num;
    }
    const intervals = [];


    for (let i = 0; i <= minuteDiff; i++) { // 2 hours * 4 (15-minute intervals)
        intervals.push({
            value: `${padWithZero(hour)}:${padWithZero(minute)}`,
            label: `${padWithZero(hour)}:${padWithZero(minute)}`,
            isDisabled: false
        });

        // Increment time by 15 minutes
        minute += 15;
        if (minute === 60) {
            minute = 0;
            hour++;
        }
    }

    return intervals;
}
