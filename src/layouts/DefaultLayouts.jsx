import React, { useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'

export default function DefaultLayouts() {
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleShowModal = (task) => {
    setSelectedTask(task)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    setSelectedTask(null)
  }

  return (
    <div className="flex relative sm:flex-row flex-col h-screen bg-gray-100">
      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-40 md:hidden p-2 bg-white shadow rounded"
          onClick={() => setSidebarOpen(true)}
        >
          <MenuOutlined className="text-xl" />
        </button>
      )}

      <Sidebar
        onShowModal={handleShowModal}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 overflow-auto">
        <div className="mx-auto h-full">
          <Outlet
            context={{
              selectedTask,
              isModalVisible,
              onModalClose: handleModalClose,
            }}
          />
        </div>
      </main>
    </div>
  )
}
