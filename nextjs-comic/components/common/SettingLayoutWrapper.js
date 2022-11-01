import AuthCheck from './AuthCheck'
import SettingSidebar from './SettingSidebar'

export default function SettingLayoutWrapper({ children }) {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-100">
        <div className="py-6">
          <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div className="col-span-9 mb-4 lg:col-span-3 lg:mb-0">
              <SettingSidebar />
            </div>
            <main className="color-bg-primary col-span-9 p-8">{children}</main>
            {/* <aside className="hidden xl:col-span-4 xl:block">
            <div className="sticky top-6 space-y-4">test13</div>
          </aside> */}
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}
