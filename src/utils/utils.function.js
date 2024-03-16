const checkEmailFormat = (email) => {
    const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return EmailRegex.test(email)
}

const dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const checkAfterToday = (checkDate) => {
    let today = new Date()
    checkDate = new Date(checkDate)
    return dateDiffInDays(today, checkDate) >= 0
}

const isVietnamesePhoneNumber = (number) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

function addDays(startDate, daysAsObject) {
    const date = new Date(startDate);
    const daysToAdd = daysAsObject.map((day, index) => day === 1 ? index + 1 : 0).filter(day => day !== 0);

    const newDates = daysToAdd.map(day => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + day);
        return newDate;
    });

    return newDates;
}

function convertDays(days) {
    var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var dayArray = days.split(',');
    var result = '';

    for (var i = 0; i < dayArray.length; i++) {
        if (dayArray[i] === '1') {
            result += weekdays[i] + ', ';
        }
    }

    return result.slice(0, -2);  // remove the trailing comma and space
}
function convertToTwoDigitFormat(num) {
    if (num < 10 && num >= 0) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

export {
    checkEmailFormat,
    checkAfterToday,
    dateDiffInDays,
    isVietnamesePhoneNumber,
    addDays,
    convertDays,
    convertToTwoDigitFormat
}