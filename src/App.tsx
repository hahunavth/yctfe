import React from 'react'
import '@/App.css'
import PrefectureProvider, { PrefectureContext } from '@/context/PrefectureContext'
import PrefectureList from '@/components/PrefectureList'
import Chart from '@/components/Chart'

function App() {
  return (
    <PrefectureProvider>
      {/* Nav bar */}
      <nav className='navbar'>
        <h1>Title</h1>
      </nav>
      {/* List of prefectures */}
      <div className='container'>
        <div className='block'>
          <h3>ι¨ιεΊη</h3>
          <PrefectureContext.Consumer>
            {(context) => (
              <PrefectureList
                prefList={context.prefList}
                reqStt={context.reqStt}
                setPrefList={context.setPrefList}
                setReqStt={context.setReqStt}
              />
            )}
          </PrefectureContext.Consumer>
        </div>
        {/* chart */}
        <div className='block block--chart'>
          <PrefectureContext.Consumer>
            {(context) => (
              <Chart prefectureList={context.prefList.filter((pre) => pre.selected === true)} />
            )}
          </PrefectureContext.Consumer>
        </div>
      </div>
    </PrefectureProvider>
  )
}

export default App
