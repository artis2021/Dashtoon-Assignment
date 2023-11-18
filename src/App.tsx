import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Form from './components/Form'
import Comic from './components/Comic'
import Error from './components/Error'

// type Data = {
//   inputs: string
// }

function App() {
  // const [url, setUrl] = useState<string>("")

  // const fetchImage = async (data: Data) => {
  //   console.log(data)
  //   try{
  //     const response = await fetch(
  //       "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
  //       {
  //         headers: { 
  //           "Accept": "image/png",
  //           "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
  //           "Content-Type": "application/json" 
  //         },
  //         method: "POST",
  //         body: JSON.stringify(data),
  //       }
  //     );
  //     const result = await response.blob();
  //     return result;
  //   }catch(e){
  //     console.log(e)
  //   }
  // }

  // const setImage = async (data: Data) => {
  //   const result = await fetchImage(data) as Blob;
  //   const url = URL.createObjectURL(result);
  //   setUrl(url)
  // }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Form />} />
        <Route path="/comic" element={<Comic />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
