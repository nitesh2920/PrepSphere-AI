export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20">
      <div className="text-center">
        {/* Optimized loading skeleton that matches hero section */}
        <div className="max-w-5xl mx-auto px-4">
          {/* Badge skeleton */}
          <div className="mb-8 flex justify-center">
            <div className="h-8 w-48 bg-orange-100 dark:bg-orange-900/20 rounded-full animate-pulse"></div>
          </div>
          
          {/* Title skeleton */}
          <div className="mb-6 space-y-4">
            <div className="h-12 sm:h-16 md:h-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mx-auto max-w-4xl"></div>
            <div className="h-12 sm:h-16 md:h-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mx-auto max-w-3xl"></div>
          </div>
          
          {/* Subtitle skeleton - LCP element */}
          <div className="mb-8 space-y-3">
            <div className="h-6 sm:h-8 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse mx-auto max-w-3xl"></div>
            <div className="h-6 sm:h-8 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse mx-auto max-w-2xl"></div>
          </div>
          
          {/* Button skeleton */}
          <div className="flex justify-center">
            <div className="h-14 sm:h-16 w-64 sm:w-80 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}