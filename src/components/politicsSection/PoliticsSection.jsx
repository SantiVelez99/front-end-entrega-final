import { faBoxOpen, faGift, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './politicsSection.css'

export default function PoliticsSection() {
    return (
        <div className="politics-section">
            <div className="politics-container">
                <FontAwesomeIcon icon={faBoxOpen} />
                <p className="politics-text">Entrega inmediata!</p>
            </div>
            <div className="politics-container">
                <FontAwesomeIcon icon={faGift} />
                <p className="politics-text">Regalos para tus amigos!</p>
            </div>
            <div className="politics-container">
                <FontAwesomeIcon icon={faRotateLeft} />
                <p className="politics-text">Reembolsos (Ver condiciones)</p>
            </div>
        </div>
    )
}