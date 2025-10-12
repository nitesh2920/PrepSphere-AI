"use client"
import React, { useState, useEffect } from "react"
import SideBar from './_components/SideBar'
import DashboardHeader from './_components/DashboardHeader'
import { CourseCountContext } from "../_context/CourseCountContext";

type ProviderProps = {
    children: React.ReactNode;
};

function DashboardLayout({ children }: ProviderProps) {
    const [totalCourse, setTotalCourse] = useState(0);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Auto-collapse sidebar on mobile, but don't force it on desktop
            if (mobile && !sidebarCollapsed) {
                setSidebarCollapsed(true);
            }
        };

        // Initial check
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [sidebarCollapsed]);

    const toggleSidebar = () => {
        if (isMobile) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            setSidebarCollapsed(!sidebarCollapsed);
        }
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Desktop Sidebar */}
                <div className="hidden md:block fixed left-0 top-0 z-40 h-full">
                    <SideBar
                        isCollapsed={sidebarCollapsed}
                        onToggle={toggleSidebar}
                        isMobile={false}
                    />
                </div>

                {/* Mobile Sidebar */}
                <div className="md:hidden">
                    <SideBar
                        isMobile={true}
                        isOpen={mobileMenuOpen}
                        onClose={closeMobileMenu}
                    />
                </div>

                {/* Main Content */}
                <div
                    className="transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                        marginLeft: isMobile ? '0px' : sidebarCollapsed ? '80px' : '280px'
                    }}
                >
                    {/* Header */}
                    <DashboardHeader
                        onMenuClick={toggleSidebar}
                        showMenuButton={isMobile}
                    />

                    {/* Page Content */}
                    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                        <div className="p-4 md:p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </CourseCountContext.Provider>
    )
}

export default DashboardLayout