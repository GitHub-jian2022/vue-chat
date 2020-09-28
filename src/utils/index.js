export const dateTimeFliter = (time, params = {}) => {
    const { part = 0, dateComplete = false, timeComplete = true, dateConnector = '-',
        timeConnector = ':', hour12 = false, needSecond = false } = params
    //获取当前时间戳
    const nowTimeStamp = new Date().getTime()
    let nowyear = new Date().getFullYear()
    let nowmonth = new Date().getMonth() + 1
    let nowday = new Date().getDate()
    // console.log(nowyear,nowmonth,nowday)

    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    let dateStr = ''
    let timeStr = ''

    //是否同一年
    let isThisYear = false
    if (nowyear === year) {
        isThisYear = true
    }
    //是否同一天
    let isToday = false
    if (nowyear === year && nowmonth === month && nowday === day) {
        isToday = true
    }

    //转换日期
    if (dateComplete) { //添0补齐
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
    }
    dateStr = year + dateConnector + month + dateConnector + day
    //转换时间
    //修改小时制
    if (hour12) {
        if (hour > 12) {
            hour = hour - 12
            if (timeComplete) {
                if (hour < 10) {
                    hour = '下午 ' + '0' + hour
                } else {
                    hour = '下午 ' + hour
                }
            }
        } else {
            if (timeComplete) {
                if (hour < 10) {
                    hour = '上午 ' + '0' + hour
                } else {
                    hour = '上午 ' + hour
                }
            }
        }
    }
    //判断分钟与秒
    if (timeComplete) { //添0补齐
        if (minute < 10) {
            minute = '0' + minute
        }
        if (second < 10) {
            second = '0' + second
        }
    }
    timeStr = hour + timeConnector + minute + timeConnector + second
    //合成输出值
    if (part == 0) {
        if (isToday) {
            if (!needSecond) {
                return hour + timeConnector + minute
            }
            return timeStr
        }

        if (isThisYear) {
            if (!needSecond) {
                return month + dateConnector + day + ' ' + hour + timeConnector + minute
            }
            return timeStr
        }

        if (!needSecond) {
            return dateStr + ' ' + hour + timeConnector + minute
        }
        return dateStr + ' ' + timeStr
    } else if (part == 1) {
        return dateStr
    } else if (part == 2) {
        return timeStr
    }
    return '传参有误'
}
