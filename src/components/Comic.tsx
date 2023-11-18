import React from 'react'
import './Comic.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { CiStickyNote } from "react-icons/ci";
import {
    FaWhatsapp,
    FaPinterest,
    FaTelegram
} from 'react-icons/fa'
import { MdOutlineAttachEmail } from "react-icons/md";
import { EmailShareButton, PinterestShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share'



const responsiveSettings = [
    {
        breakpoint: 1030, // This will be applied to screen sizes greater than 800px
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    },
];

const indicators = () => (<div className="indicator"></div>);

const image = [
    {
        url: 'https://images.unsplash.com/photo-1682685795557-976f03aca7b2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'This is a test'
    },
    {
        url: 'https://images.unsplash.com/photo-1682685795557-976f03aca7b2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'This is a test'
    },
]

type imageInfo = {
    url: string,
    text: string
}

const Comic: React.FC = () => {
    // get state from the router
    const location = useLocation()
    const state = location.state

    // State to store the comic image url and text
    const [images, setImages] = useState<imageInfo[]>([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    // useEfect to fetch the comic images
    useEffect(() => {
        // if there are no questions, return
        if (!state || !state.questions || state.questions.length == 0) {
            setFetching(() => false)
            setError("No prompts provided!")
            return
        }

        // fetch the images
        const fetchImages = async () => {
            try {

                // set fetching to true
                setFetching(() => true)
                // set error to null
                setError(() => '')
                // create an array of promises
                const promises = state?.questions.map(async (question: { inputs: string }) => {
                    // fetch the image
                    const response = await fetch(
                        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                        {
                            headers: {
                                "Accept": "image/png",
                                "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                                "Content-Type": "application/json"
                            },
                            method: "POST",
                            body: JSON.stringify(question),
                        }
                    );
                    const result = await response.blob();
                    const url = URL.createObjectURL(result);
                    return {
                        url,
                        text: question.inputs
                    }
                })
                // wait for all the promises to resolve
                const images = await Promise.all(promises)
                // set fetching to false
                setFetching(() => false)
                // set the images
                setImages(images)
            } catch (e) {
                setFetching(() => false)
                setError("Something went wrong")
            }
        }
        // call the function
        // fetchImages()
        setImages(() => image)
        // unsubscribe: reset the state
        return () => {
            setImages(() => [])
            setFetching(() => false)
            setError(() => '')
        }
    }, [state])

    return (
        <div className='Comic'>
            <h1 className='title'> <CiStickyNote /> Your Comic </h1>
            {fetching && <Loading />}
            {
                !fetching && error == '' &&
                <Slide
                    easing="ease"
                    indicators={indicators}
                    arrows={true}
                    autoplay={true}
                    infinite={true}
                    transitionDuration={500}
                    cssClass='slide'
                    slidesToScroll={1}
                    responsive={responsiveSettings}
                    pauseOnHover={true}
                    prevArrow={<GrLinkPrevious className='prev-arrow' />}
                    nextArrow={<GrLinkNext className='next-arrow' />}

                >
                    {
                        images.map((image: imageInfo, index: number) => (
                            <div className="each-slide" key={index}>
                                <div className='image' style={{ 'backgroundImage': `url(${image.url})` }}>
                                    <div className='overlay'>
                                        <p>{image.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Slide>
            }
            {
                error && <div className='error'>
                    <h1>{error}</h1>
                    <Link className='button' to='/'>Go back to home</Link>
                </div>
            }
            {
                images && images.length > 0 &&
                <div className='share'>
                    {/* Join links of all images */}
                    <WhatsappShareButton url={images.map((image: imageInfo, idx) => {
                        return `${idx + 1}. ${image.url}`
                    }).join('\n')} title='Check out my comic!'>
                        <FaWhatsapp className='button' />
                    </WhatsappShareButton>

                    {/* Share on instagram */}
                    <TelegramShareButton url={images.map((image: imageInfo, idx) => {
                        return `${idx + 1}. ${image.url}`
                    }).join('\n')} title='Check out my comic!'>
                        <FaTelegram className='button' />
                    </TelegramShareButton>
                    <PinterestShareButton media={images.map((image: imageInfo, idx) => {
                        return `${idx + 1}. ${image.url}`
                    }).join('\n')} title='Check out my comic!' url={images.map((image: imageInfo, idx) => {
                        return `${idx + 1}. ${image.url}`
                    }
                    ).join('\n')}>
                        <FaPinterest className='button' />
                    </PinterestShareButton>
                    <EmailShareButton subject='Check out my comic!'  url={images.map((image: imageInfo, idx) => {
                        return `${idx + 1}. ${image.url}`
                    }
                    ).join('\n')}>
                        <MdOutlineAttachEmail className='button' />
                    </EmailShareButton>
                </div>
            }
        </div>
    )
}

export default Comic