import fbIcon from "../../Assets/Icons/icons8-facebook.svg"
import linkedinIcon from "../../Assets/Icons/icons8-linkedin.svg"
import xIcon from "../../Assets/Icons/icons8-twitterx.svg"
import igIcon from "../../Assets/Icons/icons8-instagram.svg"
import "./Footer.scss"

function Footer() {
    return (
        <section className="footer">
            <hr />
            <section className="footer-p">
                Social
            </section>
            <section className="footer-info">
                <section className="footer-info_left">
                    &copy; ARCADEA
                </section>

                <section className="footer-info_right">
                    <img className="footer-info_right_icon" src={fbIcon} alt="" />
                    <img className="footer-info_right_icon" src={linkedinIcon} alt="" />
                    <img className="footer-info_right_icon" src={xIcon} alt="" />
                    <img className="footer-info_right_icon" src={igIcon} alt="" />
                </section>

            </section>
        </section>
    )
}

export default Footer;