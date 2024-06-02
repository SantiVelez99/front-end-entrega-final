import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useProduct } from '../../context/ProductContext';
import './modal.css'
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function Modal( {title, children} ){

    const { isOpen, handleModalClose } = useProduct()

    if(!isOpen) return;
    return(
            <div className="modal-overlay" onClick={handleModalClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={handleModalClose}><FontAwesomeIcon icon={faX} /></button>
                    <div className={title? "modal-header" : "display-off"}><h2>{title}</h2></div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
    )
} 