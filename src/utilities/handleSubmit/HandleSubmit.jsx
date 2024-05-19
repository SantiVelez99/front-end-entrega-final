export default function HandleSubmit(e) {
    let formObj = {}
    e.preventDefault()
    const [...elements] = e.target.elements;
    elements.forEach(element => {
        if(element.tagName != "BUTTON")
        objectCreator(element.name, element.value)
    });
    
    function objectCreator(propName, value){
        formObj[propName] = value;
    }
    return formObj
}
