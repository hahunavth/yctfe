import React from 'react'
import './App.css'
import PrefectureList from './components/PrefectureList'
import Chart from './components/Chart'
import PrefectureProvider, { PrefectureContext } from './context/PrefectureContext'

function App() {
  return (
    <PrefectureProvider>
      <nav className='navbar'>
        <h1>Title</h1>
      </nav>
      <div className='container'>
        <div className='block'>
          <h3>部道府県</h3>
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
