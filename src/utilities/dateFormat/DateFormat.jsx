export default function DateFormat(timeStamp){
    const formater = new Intl.DateTimeFormat("es-AR", {
        timeZone:"UTC",
        day:"2-digit",
        month:"short",
        year:"numeric"
    })
    return formater.format(timeStamp)
}  