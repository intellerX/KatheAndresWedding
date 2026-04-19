import {
  AttendanceConfirm,
  CeremonyCard,
  DressCodeTeaserCard,
  Horarios,
  LocationHeader,
  PostEventPhotosTeaserCard,
  Preguntas,
  ReceptionCard,
  Section1,
  StoryPhoto,
  StoryText,
} from './components/invitation'

export function InvitationPage() {
  return (
    <main className="invitation">
      <Section1 />
      <StoryPhoto />
      <StoryText />
      <LocationHeader />
      <div className="location-row">
        <CeremonyCard />
        <ReceptionCard />
      </div>
      <Horarios />
      <Preguntas />
      <AttendanceConfirm />
      <DressCodeTeaserCard />
      <PostEventPhotosTeaserCard />
    </main>
  )
}
