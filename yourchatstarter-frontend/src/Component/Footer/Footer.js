import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import './Style.css'

export class Footer extends Component {
    render() {
        return (
            <div className="footer-distributed">

			<div className="footer-left">

				<img src="logo200.png" alt="YourChatStarter" className="footer-logo" height={80} style={{marginBottom: 10}}></img>

				<p className="footer-links">
					<a href="/chat">Chat</a> · <a href="/subscribe">Dịch vụ</a> · <a href="/about">Thông tin</a>
				</p>
				<p className="footer-company-name">Nguyen Ngoc Dang @ 2021</p>

				<div className="footer-icons">
					<a href="https://www.facebook.com/ngocdang241"><FontAwesomeIcon icon={faFacebook} /></a>
					<a href="https://twitter.com/kingrfminecraft"><FontAwesomeIcon icon={faTwitter}/></a>
					<a href="https://github.com/NeroYuki"><FontAwesomeIcon icon={faGithub}/></a>
				</div>

			</div>

			<div className="footer-right">

				<p>Liên hệ chúng tôi</p>

				<form action="#" method="post">

					<input type="text" name="email" placeholder="Email"/>
					<textarea name="message" placeholder="Message"></textarea>
					<button>Gửi</button>
				</form>
			</div>
		</div>
        )
    }
}