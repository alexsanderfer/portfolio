import React, {useState} from 'react'
import {images} from '../../constants'
import {client} from '../../client'
import './Footer.scss'
import {AppWrap, MotionWrap} from "../../wrapper";

const Footer = () => {
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [isFormSubmittted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const {name, email, message} = formData

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = () => {
        setLoading(true)
        const contact = {
            _type: 'contact',
            name: name,
            email: email,
            message: message,
        }

        client.create(contact).then(() => {
            setLoading(false)
            setIsFormSubmitted(true)
        })
    }


    return (
        <>
            <h2 className="head-text">Take a coffee & chat with me</h2>
            <div className="app__footer-cards">
                <div className="app__footer-card">
                    <img src={images.email} alt='email'/>
                    <a href='mailto:afgouveia90@gmail.com' className='p-text'>afgouveia90@gmail.com</a>
                </div>
                <div className="app__footer-card">
                    <img src={images.mobile} alt='mobile'/>
                    <a href='tel: +351 960 169 404' className='p-text'>+351 960 169 404</a>
                </div>
            </div>

            {!isFormSubmittted ?
                <div className="app__footer-form app__flex">
                    <div className="app__flex">
                        <input className='p-text' type='text' name='name' placeholder='Your Name' value={name}
                               onChange={handleChangeInput}/>
                    </div>
                    <div className="app__flex">
                        <input className='p-text' type='email' name='email' placeholder='Your E-mail' value={email}
                               onChange={handleChangeInput}/>
                    </div>

                    <div>
                    <textarea
                        className='p-text'
                        placeholder='Your Message'
                        value={message}
                        name="message"
                        onChange={handleChangeInput}
                    />
                    </div>
                    <button type='button' className='p-text'
                            onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
                </div>
                : <div>
                    <h3 className='head-text'>Thank you for getting in touch</h3>
                </div>
            }
        </>
    )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'),
    'contact',
    'app__whitebg'
)
