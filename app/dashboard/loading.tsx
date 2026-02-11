export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Banner Skeleton */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-6 bg-orange-200 dark:bg-orange-800 rounded w-3/4"></div>
            <div className="h-4 bg-orange-200 dark:bg-orange-800 rounded w-1/2"></div>
          </div>
          <div className="w-20 h-20 bg-orange-200 dark:bg-orange-800 rounded-full"></div>
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Course Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse"
          >
            <div className="p-6">
              {/* Header skeleton */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl" />
                <div className="space-y-2">
                  <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
              </div>

              {/* Title skeleton */}
              <div className="space-y-2 mb-4">
                <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-1/2 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>

              {/* Description skeleton */}
              <div className="space-y-2 mb-4">
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>

              {/* Progress skeleton */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
              </div>

              {/* Stats skeleton */}
              <div className="flex justify-between mb-4">
                <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>

              {/* Button skeleton */}
              <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
