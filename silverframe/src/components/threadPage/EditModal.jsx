import React from 'react'
import Swal from 'sweetalert2'
import http from '../../lib/http'

const EditModal = ({setShowEditModal, setEditContent, setEditId, fetchThreads, editContent, editId}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] md:w-[600px] shadow-xl relative">
        <button
          onClick={() => setShowEditModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">Edit Thread</h2>
        <textarea
          rows="4"
          className="w-full p-3 rounded border border-gray-300 text-black mb-4"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <button
          onClick={async () => {
            try {
              await http.put(`/threads/${editId}`, {
                content: editContent,
              }, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
              })
              setShowEditModal(false)
              setEditContent('')
              setEditId(null)
              fetchThreads()
              Swal.fire('Success', 'Thread updated successfully', 'success')
            } catch (error) {
              Swal.fire('Error', 'Failed to update thread', 'error')
            }
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default EditModal