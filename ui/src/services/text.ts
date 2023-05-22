import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL

const processText = async (data: { [key: string | number]: any }) => {
    try {
        const text = await axios.post(`${API_URL}/api/processText`, data)
        return text.data
    } catch (err) { console.error(err) }
}

export {
    processText
}