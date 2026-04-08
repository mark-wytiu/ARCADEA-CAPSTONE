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
                <section className="footer-info-left">
                    &copy; ARCADEA
                </section>

                <section className="footer-info-right">
                    <img className="footer-info-right-icon" src={fbIcon} alt="Facebook" />
                    <img className="footer-info-right-icon" src={linkedinIcon} alt="LinkedIn" />
                    <img className="footer-info-right-icon" src={xIcon} alt="X (Twitter)" />
                    <img className="footer-info-right-icon" src={igIcon} alt="Instagram" />
                </section>

            </section>
        </section>
    )
}

export default Footer;