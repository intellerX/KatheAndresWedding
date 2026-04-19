import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { InvitationPage } from './InvitationPage'
import { PostEventGalleryPage } from './components/invitation/PostEventGalleryPage/PostEventGalleryPage'
import { POST_EVENT_GALLERY_PATH } from './components/invitation/AttendanceConfirm/postEventGalleryPath'

function routerBasename(): string | undefined {
  const base = import.meta.env?.BASE
  if (typeof base !== 'string' || base === '' || base === '/') {
    return undefined
  }
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path={POST_EVENT_GALLERY_PATH} element={<PostEventGalleryPage />} />
      </Routes>
    </BrowserRouter>
  )
}
