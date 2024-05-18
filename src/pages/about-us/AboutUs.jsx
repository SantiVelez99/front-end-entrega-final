import './about-us.css'

export default function AboutUs(){
    return(
        <main className="main-container" id='aboutUsContainer'>
        <section className="about-us-section">
            <div className="underline">
                <h1>Sobre nosotros</h1>
            </div>
            <i className="fa-solid fa-dice-d20 aboutUs-icon"></i>
            <p>G4G Es un sitio de venta de juegos creado como proyecto integrador para el bootcamp fullstack engineer de EducacionIT, desarrollado por el alumno Santiago Velez</p>
        </section>
        <section className="about-dev-section">
            <div className="underline">
                <h1>Sobre mi</h1>
            </div>
            <div className="dev-profile">
                <div className="img-container">
                    <img src="src/assets/aboutUs/dev-photo.jpeg" alt="foto del desarrollador"/></div>
                <ul>
                    <li>Santiago Velez</li>
                    <li>25 años</li>
                    <li>Argentino</li>
                </ul>
            </div>
            <p>Soy Santiago, desarrollador de este proyecto, mi meta es en un futuro dedicarme completamente al desarrollo fullstack y espero lograrlo con la ayuda de este bootcamp.</p>
        </section>
    </main>
    )
}