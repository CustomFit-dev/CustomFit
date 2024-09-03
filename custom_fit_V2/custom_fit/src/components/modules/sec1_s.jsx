import Carso from './carrosel';
import Sto from './Storecontent';
const Section = () => {
    return (
        <section className='sec1_s' id='inicio'>
            <div className='container'>
                <Carso />
                <br /><br />
                <Sto />
            </div>
        </section>
    );
};

export default Section;
