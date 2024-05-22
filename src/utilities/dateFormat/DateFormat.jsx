export default function DateFormat(timeStamp){

    const timeZone = new Date().getTimezoneOffset() * 60 * 1000;
    const formater = new Intl.DateTimeFormat("es-AR", {
        day:"2-digit",
        month:"2-digit",
        year:"numeric"
    })
    return formater.format(timeStamp+timeZone)
}  