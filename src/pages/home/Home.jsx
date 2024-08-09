import CarouselComponent from "../../components/carousel/CarouselComponent";
import PoliticsSection from "../../components/politicsSection/PoliticsSection";
import ProductsGallery from "../../components/productsGallery/ProductsGallery";

export default function Home(){

    
    return(
        <>
        <div className="main-container">
        <CarouselComponent/>
        <ProductsGallery/>
        <PoliticsSection/>
        </div>
        </>
    )
}
