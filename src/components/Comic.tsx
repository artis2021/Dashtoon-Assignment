import React from 'react'
import './Comic.css'
import {Link, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { CiStickyNote } from "react-icons/ci";


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

const Comic : React.FC = () => {
    // get state from the router
    const location = useLocation()
    const state = location.state

    // State to store the comic image url
    const [urls, setUrls] = useState<string[]>([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    // useEfect to fetch the comic images
    useEffect(() => {
        // if there are no questions, return
        if(!state || !state.questions || state.questions.length == 0){
            setFetching(() => false)
            setError("No prompts provided!")    
            return
        }

        // fetch the images
        const fetchImages = async () => {
            try{
                
                // set fetching to true
                setFetching(() => true)
                // set error to null
                setError(() => '')
                // create an array of promises
                const promises = state?.questions.map(async (question: {inputs: string}) => {
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
                    return url
                })
                // wait for all the promises to resolve
                const urls = await Promise.all(promises)
                // set fetching to false
                setFetching(() => false)
                // set the urls
                setUrls(urls)
            }catch(e){
                setFetching(() => false)
                setError("Something went wrong")
            }
        }
        // call the function
        fetchImages()
        // unsubscribe: reset the state
        return () => {
            setUrls(() => [])
            setFetching(() => false)
            setError(() => '')
        }
    }, [state])
    return (
        <div className='Comic'>
            <h1 className='title'> <CiStickyNote/> Your Comic </h1>
            {fetching && <Loading/>}
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
                    prevArrow={<GrLinkPrevious className='prev-arrow'/>}
                    nextArrow={<GrLinkNext className='next-arrow'/>}

                >
                    {
                        urls.map((url: string, index: number) => (
                            <div className="each-slide" key={index}>
                                <div style={{'backgroundImage': `url(${url})`}}>
                                    {/* <span>Slide {index + 1}</span> */}
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
        </div>
    )
}

export default Comic