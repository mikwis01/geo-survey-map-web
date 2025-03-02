'use client'

import { LANGUAGES } from '@/constants/constants'
import { useAppContext } from '@/context/AppContext'
import { cn } from '@/lib/utils'
const actionButtonStyles =
	'bg-white border-2 border-gray rounded-lg w-14 h-14 flex flex-col justify-center items-center hover:bg-zinc-100 transition-all pointer-events-auto'

export const LanguageButton: React.FC<{ size?: string }> = ({ size = '14' }) => {
	const { appState, setLanguage } = useAppContext()

	return (
		<button className={cn(actionButtonStyles, size ? `w-${size} h-${size}` : '', 'text-align-last-center')}>
			<select
				className={cn('appearance-none h-full text-center cursor-pointer font-bold text-xs bg-transparent', size ? `w-${size}` : '')}
				value={appState.language}
				onChange={(e) => setLanguage(e.target.value as any)}>
				{LANGUAGES.map((lang) => (
					<option key={lang} className="text-[6px]" value={lang}>
						{lang.toUpperCase()}
					</option>
				))}
			</select>
		</button>
	)
}
