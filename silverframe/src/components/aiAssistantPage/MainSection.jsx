import React, { useState } from 'react'
import http from '../../lib/http'

const MainSection = () => {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAsk = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {

      const response = await http.post('/movies/ai-assistant', { query: question }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      const cleanedHtml = response.data.answer.replace(/\n/g, '<br/>');


      setResponse(cleanedHtml)
      setLoading(false)
    } catch (err) {
      setResponse('Terjadi kesalahan.')
      setLoading(false)
    }
  }

  return (
    <div className="py-16 flex justify-center px-4 bg-gradient-to-br from-black via-[#0d0d0d] to-[#1a1a1a] text-white relative" 
    style={{
      backgroundImage: `url(https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>

      
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="w-full max-w-xl bg-[#1f1f1f]/80 backdrop-blur-md rounded-xl shadow-xl p-8 mt-16 border border-white/10 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-silver-200">Tanya AI Tentang Film</h2>
        <p className="text-sm text-center text-gray-400 mb-8">
          Tulis pertanyaanmu tentang film dan dapatkan jawaban dari AI
        </p>

        <form className="space-y-5" onSubmit={handleAsk}>
          <div>
            <label htmlFor="question" className="block text-sm text-gray-300 mb-1">
              Pertanyaan
            </label>
            <textarea
              id="question"
              rows={4}
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Contoh: Apa rekomendasi film sci-fi terbaik tahun 2020-an?"
              value={question}
              onChange={(e) => {setQuestion(e.target.value); console.log(question)}}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-400 hover:bg-slate-300 transition-colors py-2 rounded-md font-semibold text-black mt-2"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Tanyakan'}
          </button>
        </form>

        {response && (
          <div className="mt-6 bg-black/30 p-4 rounded-md text-sm text-white border border-white/10">
            <strong>Jawaban:</strong>
            <div
              className="mt-1"
              dangerouslySetInnerHTML={{ __html: response }}
            />

          </div>
        )}
      </div>
    </div>
  )
}

export default MainSection
