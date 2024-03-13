import Calendar from "./components/Calendar";
import EventControls from "./components/EventControls";
import Header from "./components/Header";

export default function App() {
 return (
   <main className="relative min-h-screen w-full flex flex-col items-center justify-center">
     <div><Header /></div>
      <EventControls />
      <Calendar />
    </main>
  )
}
