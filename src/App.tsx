import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { ComposerModal } from './components/ComposerModal'
import { usePosts } from './hooks/usePosts'
import { useStats } from './hooks/useStats'
import { useMessages } from './hooks/useMessages'
import { useJobs } from './hooks/useJobs'
import { useNotifications } from './hooks/useNotifications'
import { useTheme } from './hooks/useTheme'

const FeedPage = lazy(() => import('./components/FeedPage').then((m) => ({ default: m.FeedPage })))
const JobsPage = lazy(() => import('./components/JobsPage').then((m) => ({ default: m.JobsPage })))
const NotificationPage = lazy(() => import('./components/NotificationPage').then((m) => ({ default: m.NotificationPage })))
const MessagesPage = lazy(() => import('./components/MessagesPage').then((m) => ({ default: m.MessagesPage })))
const PostDetailPage = lazy(() => import('./components/PostDetailPage').then((m) => ({ default: m.PostDetailPage })))
const MessageThread = lazy(() => import('./components/MessageThread').then((m) => ({ default: m.MessageThread })))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <AnonymousApp />
      </Suspense>
    </BrowserRouter>
  )
}

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--color-bg)' }}>
      <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--color-text-muted)' }}>
        <div
          className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
          style={{ borderColor: 'var(--color-text-muted)', borderTopColor: 'transparent' }}
        />
        Loading...
      </div>
    </div>
  )
}

function AnonymousApp() {
  const navigate = useNavigate()
  const { posts, comments, loading, loadingMore, hasMore, loadMore, refresh, hashtagResults, searchByHashtag, clearHashtagFilter, addPost, deletePost, reactToPost, addComment } = usePosts()
  const { stats, incrementPosts } = useStats()
  const { messages, loading: messagesLoading, addReply } = useMessages()
  const { jobs, loading: jobsLoading, apply } = useJobs()
  const { notifications, unreadCount, loading: notifsLoading, markAllRead } = useNotifications()
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
              loadMore={loadMore}
              hasMore={hasMore}
              loadingMore={loadingMore}
              loading={loading}
              onRefresh={refresh}
              hashtagResults={hashtagResults}
              onSearchHashtag={searchByHashtag}
              onClearHashtag={clearHashtagFilter}
            />
          }
        />
        <Route
          path="/jobs"
          element={
            <JobsPage
              jobs={jobs}
              loading={jobsLoading}
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
              loading={notifsLoading}
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
              loading={messagesLoading}
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
