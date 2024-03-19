import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import Tags from "../../components/Tags/Tags"
const AboutUs = () => {
    const mainPic = require('../../assets/aaaa.jpg')
    return (
        <>
            <Header />
            <img
                className="mainPic w-100 position-relative"
                style={{
                    height:'500px',
                    objectFit:'cover'
                }}
                src={mainPic}
                alt="Main Pic"
            ></img>
            <Tags
                side="left"
                imgpath={require("../../assets/vision.jpg")}
                maintopic="Vision and Values"
                desc="Celebrating diversity and promoting relationships built on mutual respect is at the heart of all we do at Tennessee Language Center "
            />
            <Tags
                side="right"
                imgpath={require("../../assets/diff.jpg")}
                maintopic="Tennessian Differences"
                desc="The Tennessian education aims to equip childrens with the knowledge, skills and attitudes to become good language user and honest citizens."
            />
            <Tags
                side="left"
                imgpath={require("../../assets/history.png")}
                maintopic="History"
                desc="In 1957, a group of dedicated people with a clear vision brought St John Bosco’s pastoral vision to Melbourne."
            />
            <Tags
                side="right"
                imgpath={require("../../assets/employment.jpg")}
                maintopic="Employment"
                desc="We are committed to recruiting staff who embody our community’s high expectations, and who support our mission to develop our students’ intellectual, physical, spiritual and artistic skills."
            />

            <Footer />
        </>
    )
}

export default AboutUs