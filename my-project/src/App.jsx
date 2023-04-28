import { Heading, Posts, Form, Footer} from '../src/components/index'

function App() {

  return (
    <>
      <Heading/>
      <div className="section-padding w-full min-h-[80vh] grid sm:grid-cols-4 gap-6 py-10">
        <div className='col-span-3 grid sm:grid-cols-3 gap-3'>
          <Posts/> <Posts/> <Posts/>
        </div>
        <div className="sm:col-span-1 grid">
          <div className='w-full'>
            <Form/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App
