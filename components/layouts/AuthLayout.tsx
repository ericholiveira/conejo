import ThemeChanger from '../ui/ThemeChanger'
type Props = {
  children: React.ReactNode
  heading?: string
  description?: string
}

export default function AuthLayout({ children, heading, description }: Props) {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {heading}
          </h2>
          <p className="mt-2 text-center text-sm">
            {description}
          </p>
        </div>
        {children}
        <ThemeChanger/>
      </div>
    </div>
  )
}
