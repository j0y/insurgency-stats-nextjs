function formatDate(unixTimestamp) {
    const offset = -new Date().getTimezoneOffset() * 1000 * 60
    const date = new Date((unixTimestamp * 1000) + offset);
    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let day = "0" + date.getDate();

    return date.getFullYear() +
        "-" + (date.getMonth() + 1).toString().padStart(2, '0') +
        "-" + day.substr(-2) +
        " " + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
}

export default formatDate;