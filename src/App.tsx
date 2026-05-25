import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { FeedPage } from './components/FeedPage'
import { MessagesPage } from './components/MessagesPage'
import { PostDetailPage } from './components/PostDetailPage'
import { MessageThread } from './components/MessageThread'
import { ComposerModal } from './components/ComposerModal'
import { JobsPage } from './components/JobsPage'
import { NotificationPage } from './components/NotificationPage'
import { usePosts } from './hooks/usePosts'
import { useStats } from './hooks/useStats'
import { useMessages } from './hooks/useMessages'
import { useJobs } from './hooks/useJobs'
import { useNotifications } from './hooks/useNotifications'
import { useTheme } from './hooks/useTheme'

function App() {
  return (
    <BrowserRouter>
      <AnonymousApp />
    </BrowserRouter>
  )
}

function AnonymousApp() {
  const navigate = useNavigate()
  const { posts, comments, addPost, deletePost, reactToPost, addComment } = usePosts()
  const { stats, incrementPosts } = useStats()
  const { messages, addReply } = useMessages()
  const { jobs, apply } = useJobs()
  const { notifications, unreadCount, markAllRead } = useNotifications()
  const { theme, toggle: toggleTheme } = useTheme()
  const [composerOpen, setComposerOpen] = useState(false)

  const openComposer = () => setComposerOpen(true)
  const closeComposer = () => setComposerOpen(false)

  const submitPost = (text: string) => {
    addPost(text)
    incrementPosts()
    setComposerOpen(false)
    navigate('/feed')
  }

  return (
    <>
      <Routes>
        <Route
          path="/feed"
          element={
            <FeedPage
              posts={posts}
              stats={stats}
              onOpenComposer={openComposer}
              onReact={reactToPost}
              onDeletePost={deletePost}
              onToggleTheme={toggleTheme}
              theme={theme}
              notificationBadge={unreadCount}
            />
          }
        />
        <Route
          path="/jobs"
          element={
            <JobsPage
              jobs={jobs}
              onOpenComposer={openComposer}
              onApply={apply}
              onToggleTheme={toggleTheme}
              theme={theme}
              notificationBadge={unreadCount}
            />
          }
        />
        <Route
          path="/notifications"
          element={
            <NotificationPage
              notifications={notifications}
              unreadCount={unreadCount}
              onOpenComposer={openComposer}
              onMarkAllRead={markAllRead}
              onToggleTheme={toggleTheme}
              theme={theme}
            />
          }
        />
        <Route
          path="/messages"
          element={
            <MessagesPage
              messages={messages}
              onOpenComposer={openComposer}
              onToggleTheme={toggleTheme}
              theme={theme}
              notificationBadge={unreadCount}
            />
          }
        />
        <Route
          path="/messages/:id"
          element={<MessageThread messages={messages} onAddReply={addReply} />}
        />
        <Route
          path="/post/:id"
          element={
            <PostDetailPage
              posts={posts}
              comments={comments}
              onReact={reactToPost}
              onAddComment={addComment}
            />
          }
        />
        <Route path="*" element={<Navigate to="/feed" replace />} />
      </Routes>

      {composerOpen && (
        <ComposerModal onSubmit={submitPost} onClose={closeComposer} />
      )}
    </>
  )
}

export default App
