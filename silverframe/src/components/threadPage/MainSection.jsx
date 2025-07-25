import React, { useEffect, useState } from 'react'
import http from '../../lib/http'
import Swal from 'sweetalert2'
import EditModal from './EditModal'
import ThreadCard from './ThreadCard'


const ThreadsPage = () => {
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [form, setForm] = useState({
    content: ''
  })
  const [showEditModal, setShowEditModal] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [editId, setEditId] = useState(null)


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const fetchThreads = async () => {
    
    try {
      const response = await http.get(`/threads?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setThreads(response.data.data || response.data)
      setUserId(response.data.userId || null)
      setTotalPages(response.data.totalPages || 1)
    } catch (error) {
      // Handle error
    }
  }

  useEffect(() => { 
    fetchThreads()
  }, [page])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this thread!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) return
    try {
      await http.delete(`/threads/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setThreads(threads.filter(t => t.id !== id))

      Swal.fire({
        title: 'Success',
        text: 'Thread deleted successfully',
        icon: 'success',
        confirmButtonText: 'Close'
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed delete thread ',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }

  const handleUpdate = (id, content) => {
    setEditId(id)
    setEditContent(content)
    setShowEditModal(true)
    
  }


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  return (
    <div
      className="min-h-screen w-full relative py-24 px-4 md:px-16"
      style={{
        backgroundImage: `url(https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/90 z-0"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="mb-10 bg-white/10 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-white mb-4">Create a New Thread</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              

              try {
                const res = await http.post(
                  '/threads/add',
                  form,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                  }
                );
                fetchThreads()
                setForm({ content: '' });
                document.getElementById('content-textarea').value = '';
                Swal.fire({
                  title: 'Success',
                  text: 'Thread created successfully',
                  icon: 'success',
                  confirmButtonText: 'Close'
                })
              } catch (err) {
                Swal.fire({
                  title: 'Error!',
                  text: 'Failed to create thread',
                  icon: 'error',
                  confirmButtonText: 'Close'
                })
              }
            }}
          >
            <textarea
              id='content-textarea'
              name="content"
              rows="4"
              className="w-full p-3 rounded bg-gray-800 text-white border border-white/20 mb-4"
              placeholder="Write something..."
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 cursor-pointer hover:bg-green-600 text-white rounded"
            >
              Post Thread
            </button>
          </form>
        </div>

        <h1 className="text-4xl font-bold text-white mb-8 text-center">All Threads</h1>
        <div
          className="flex flex-col gap-8 overflow-y-auto"
          style={{
            maxHeight: '90vh',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {threads.length === 0 && (
            <div className="text-white text-center">No threads found.</div>
          )}
          {threads.map(thread => (
            <ThreadCard 
              key={thread.id}
              thread={thread}
              userId={userId}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}

          {showEditModal && (
            <EditModal
              setShowEditModal={setShowEditModal}
              setEditContent={setEditContent}
              setEditId={setEditId}
              fetchThreads={fetchThreads}
              editContent={editContent}
              editId={editId}
            />
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${page === idx + 1 ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'}`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThreadsPage