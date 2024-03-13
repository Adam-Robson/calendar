import Calendar from "./components/Calendar";
import EventControls from "./components/EventControls";
import Header from "./components/Header";

export default function App() {
 return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <Header />
      <EventControls />
      <Calendar />
    </main>
  )
}
