export default function DateFormat(timeStamp){
    const formater = new Intl.DateTimeFormat("es-AR", {
        timeZone:"UTC",
        day:"2-digit",
        month:"2-digit",
        year:"numeric"
    })
    return formater.format(timeStamp)
}  