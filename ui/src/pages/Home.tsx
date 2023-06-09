import React, { SyntheticEvent, useState } from 'react'
import { processText } from '../services/text'
import toast from 'react-hot-toast'

type Props = {}

const Home: React.FC = (props: Props) => {
  const [text, setText] = useState<string>('')
  const [filename, setFilename] = useState<string>('')
  const [generatedText, setGeneratedText] = useState<string>('')
  const [dragging, setDragging] = useState<boolean>(false)

  const loadFile = (e: SyntheticEvent) => {
    const { files } = e.target as HTMLInputElement
    if (files) readFile(files)
  }

  const readFile = (files: FileList) => {
    if (files && files.length > 0) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const fileContent = event?.target?.result
        setText(String(fileContent) || '')
      }
      reader.readAsText(files[0])
      setFilename(files[0].name ? files[0].name.split('.')[0] : '')
    }
  }

  const convertText = async () => {
    try {
      if (!text || text.trim() === '') return toast.error('The text is empty')
      const response = await processText({ text })
      if (response) {
        setGeneratedText(response)
        toast.success('Text converted successfully')
      }
      else toast.error('An error occurred. Try again later')
    } catch (err) { console.error(err) }
  }

  const openFileLoader = () => {
    const input = document.getElementById('file-loader')
    if (input) input.click()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const files = e.dataTransfer.files
    readFile(files)
  }

  const resetConverter = () => {
    setText('')
    setFilename('')
    setGeneratedText('')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className='home__container'>
      <div className="home__converter">
        <h2 className="home__title">HiQ Text Converter</h2>
        {!text ?
          <h4
            className="home__converter-label"
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={e => {
              e.preventDefault()
              setDragging(false)
            }}
            onDrop={handleDrop}
            style={{ backgroundColor: dragging ? '#babae0' : '' }}
            onClick={openFileLoader}>
            Choose file or drag it here
          </h4>
          : ''}
        <input type='file' id='file-loader' onChange={loadFile} style={{ height: 0 }} accept='.rtf,.txt,.md,.file' />
        {text ?
          <div className="home__converter-text-wrapper">
            <h3 className="home__converter-text-title">{filename}</h3>
            <pre className="home__converter-text">{text}</pre>
          </div>
          : ''}
        {text && !generatedText ?
          <button className='home__converter-btn' onClick={convertText}>Convert</button>
          : ''}
      </div>
      {generatedText ?
        <div className="home__converter">
          <div className="home__converter-text-wrapper">
            <h3 className="home__converter-text-title">Converted</h3>
            <pre className="home__converter-text">{generatedText}</pre>
          </div>
          <button className='home__converter-btn' onClick={resetConverter}>Reset</button>
        </div>
        : ''}
    </div>
  )
}

export default Home