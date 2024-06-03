export function formatTimeStampToInputDate(timeStamp){
    const collator = new Intl.DateTimeFormat("en-CA", {
        timeZone: "UTC",
        year:"numeric",
        month:"2-digit",
        day:"2-digit"
    });
    return collator.format(timeStamp);
}