import ReactLoading from 'react-loading'
import './Loading.css'
import { useState, useEffect } from 'react'
import { useMemo } from 'react'

const Loading = () => {
    const messages = useMemo(() => [
        "🚀 Creating your unique comic adventure! This artistic masterpiece is in the making. Your patience is the key to an epic creation! 🎨✨ #ComicCraft",
        "⏳ Comic magic in progress! We're weaving your input into a fantastic visual tale. Thanks for your patience as we craft something extraordinary! 📖✨ #ComicWonders",
        "🌟 Your comic is on the drawing board! Our artists are working their magic. Stay tuned for a creation that's as special as you are! 🎭🎨 #ComicMagic",
        "🖌️ Brushes are swirling! Your comic is being crafted with care. Thank you for your patience as we paint a unique story just for you! 🎨✨ #ComicCanvas",
        "Please wait while we create your comic! We're working hard to craft a unique story just for you. Thanks for your patience! 🎨✨ #ComicCraft",
        "🎨 Your comic is being crafted! We're working hard to create something special just for you. Thanks for your patience! 🖌️✨ #ComicCraft",
        "🖌️ Your comic is on the drawing board! We're working hard to create something special just for you. Thanks for your patience! 🎨✨ #ComicCraft",
        "🎨 I hope you're excited! We're working hard to create something special just for you. Thanks for your patience! 🖌️✨ #Dashtoon Comic",
    ], [])

    const [message, setMessage] = useState<string>(messages[Math.floor(Math.random() * messages.length)])

    useEffect(() => {
        const interval = setInterval(() => {
            setMessage(messages[Math.floor(Math.random() * messages.length)])
        }, 5000)

        // Clear interval if the component is unmounted
        return () => clearInterval(interval)
    }, [messages])

    return (
        <div className='Loading'>
            <ReactLoading type='bars' color='white' height={200} width={200} />
            <h2>{message}</h2>
        </div>
    )
}

export default Loading
