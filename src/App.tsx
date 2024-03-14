import Calendar from "./components/Calendar";
import EventControls from "./components/EventControls";
import Header from "./components/Header";

export default function App() {
 return (
   <main className="relative min-h-screen w-full flex flex-col items-center justify-center">
     <div><Header /></div>
     <div className="grid grid-cols-2">
       <div className="col-span-1">
         <EventControls />
       </div>
       <div className="col-span-1">
         <Calendar />
         </div>
      </div>
    </main>
  )
}
