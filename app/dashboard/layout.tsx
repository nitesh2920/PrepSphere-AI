import React from "react"
import SideBar from './_components/SideBar'
import DashboardHeader from './_components/DashboardHeader'

type ProviderProps = {
    children: React.ReactNode;
};

function DashboardLayout({ children }: ProviderProps) {
    return (
        <div>
            <div className="md:w-65 hidden md:block fixed">
                <SideBar/>                      
            </div>

            <div className="md:ml-65">
                <DashboardHeader/>
                <div className="p-5">       
                    {children}
                </div>
            </div>
            
        </div>
    )
}

export default DashboardLayout