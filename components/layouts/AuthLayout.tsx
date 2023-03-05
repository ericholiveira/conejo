import ThemeChanger from '../ui/ThemeChanger'
import { useTranslation } from 'next-i18next'

type Props = {
  children: React.ReactNode
  heading?: string
  description?: string
}

export default function AuthLayout({ children, heading, description }: Props) {
  const { t } = useTranslation('common')
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {heading && t(heading)}
          </h2>
          <p className="mt-2 text-center text-sm">
            {description && t(description)}
          </p>
        </div>
        {children}
        <ThemeChanger/>
      </div>
    </div>
  )
}
