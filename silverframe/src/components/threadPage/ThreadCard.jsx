import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const ThreadCard = ({thread,userId,onDelete,onUpdate}) => {
  return (
    <div key={thread.id} className="bg-slate-700/30 rounded-xl p-6 shadow-lg border border-white/10">
      <div className="flex items-center gap-3 mb-2">
        <div className="font-semibold text-green-400">{thread.User?.username || 'Unknown User'}</div>
        <div className="text-xs text-gray-300">{new Date(thread.createdAt).toLocaleString()}</div>
      </div>
      <div className="text-white mb-4">{thread.content}</div>
      {userId === thread.UserId && (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onUpdate(thread.id, thread.content)}
            className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(thread.id)}
            className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  )
}

export default ThreadCard