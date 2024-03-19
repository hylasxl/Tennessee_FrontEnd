import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { LocationOn,Phone,Email,Alarm } from "@mui/icons-material"
const Contact = () => {
    return (
        <>
            <Header />
            <div style={{ margin: '10px 20px' }}>
                <div className="row d-flex">
                    <div className="col col-6">
                        <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6107846098653!2d106.6533927748048!3d10.764449989383582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752959abdde3dd%3A0xa1ae728c26f860be!2sVTC%20Academy%20Plus!5e0!3m2!1sen!2s!4v1710814023987!5m2!1sen!2s" style={{ border: 0, width: '700px', height: '500px' }}
                            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="col col-6">
                        <h4 style={{ fontWeight: 'bold' }}>OUR LOCATION</h4>
                        <div style={{ marginLeft: '30px', marginTop:'20px' }}>
                            <h5 style={{ fontWeight: 'bold',color:'#d31245' }}>Where are we?</h5>
                            <p><span style={{marginRight:'5px'}}><LocationOn/></span>The Emporium Tower, 184 St.Le Dai Hanh, Ward 15, District 11, Ho Chi Minh City</p>
                            <h5 style={{ fontWeight: 'bold',color:'#d31245' }}>Contacts</h5>
                            <p style={{textDecoration:'underline'}}><span style={{marginRight:'5px'}}><Phone/></span>0827836949</p>
                            <p style={{textDecoration:'underline'}}><span style={{marginRight:'5px'}}><Email/></span>vietpham06262@gmail.com</p>
                            <h5 style={{ fontWeight: 'bold',color:'#d31245' }}>Reception Hours</h5>
                            <p><span style={{marginRight:'5px'}}><Alarm/></span>8:15am – 4:15pm Monday – Saturday</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact