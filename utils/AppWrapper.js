"use client"
import { Montserrat } from "next/font/google";
import "../app/globals.css";
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContextProvider } from "@/context/GlobalContext";
import Sidebar from "@/app/components/Sidebar";
import Player from "@/app/components/Player";
import SearchSection from "@/app/components/SearchSection";

const inter = Montserrat({ subsets: ["latin"] });

export default function AppWrapper({ children }) {

    const pathname = usePathname()



    const pathsWithoutSidebar = ['/register', '/login'];

    const shouldRenderSidebar = !pathsWithoutSidebar.includes(pathname);




    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastContainer />
                <GlobalContextProvider>
                    <div className="flex items-start justify-start gap-10 overflow-hidden h-screen w-screen">
                        {shouldRenderSidebar && (
                            <div>
                                <Sidebar />
                            </div>
                        )}
                        <div >
                            {<SearchSection />}
                            {children}
                        </div>
                    </div>
                    <Player />
                </GlobalContextProvider>
            </body>
        </html>
    );
}
