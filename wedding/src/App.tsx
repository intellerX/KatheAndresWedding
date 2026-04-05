import {
  AttendanceConfirm,
  CeremonyCard,
  Horarios,
  LocationHeader,
  MenuChoice,
  Preguntas,
  ReceptionCard,
  Section1,
  StoryPhoto,
  StoryText,
} from './components/invitation'

function App() {
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
      <MenuChoice />
      <AttendanceConfirm />
    </main>
  )
}

export default App
