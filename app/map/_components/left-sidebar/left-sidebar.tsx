'use client'

import { Box } from '@/components/box'
import React, { useEffect } from 'react'
import { LeftSidebarFilters } from './left-sidebar-filters'
import { Logo } from '@/components/logo'
import { useAppContext } from '@/context/AppContext'
import { ChevronLeft, LogIn } from 'lucide-react'
import { LoginLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useTranslations } from '@/hooks/useTranslations'
import { toast } from 'react-toastify'

export const LeftSidebar = () => {
	const { translations } = useTranslations()
	const { isAuthenticated } = useKindeBrowserClient()
	const { appState, handleLeftSidebarToggle, handleRightSidebarToggle, toggleHideFilters, handleCenterOnUser } = useAppContext()
	const { isLeftSideBarShown } = appState
	const hideSidebarStyles = isLeftSideBarShown ? '' : '-translate-x-[13rem] sm:-translate-x-[19rem]'
	const isBanned = appState.userStatus === 'BANNED'

	useEffect(() => {
		const mapZoomControl = document.querySelector('.leaflet-control-zoom')
		if (mapZoomControl) {
			if (isLeftSideBarShown) {
				mapZoomControl.classList.remove('hide-left-sidebar')
			} else {
				mapZoomControl.classList.add('hide-left-sidebar')
			}
		}
	}, [isLeftSideBarShown])

	const handleAdd = () => {
		handleLeftSidebarToggle()
		handleRightSidebarToggle()
		toggleHideFilters()
		handleCenterOnUser(true)
		toast(translations.dragMarkerMessage, { type: 'info' })
	}

	return (
		<div className={`absolute z-800 py-4 sm:p-4 flex h-full ${hideSidebarStyles} transition-all pointer-events-none`}>
			<Box className="flex flex-col gap-4 max-w-52 sm:max-w-72 p-4 h-full overflow-y-auto pointer-events-auto">
				<div className="flex justify-center">
					<Logo />
				</div>
				<p>{translations.filtersDescription}</p>
				<LeftSidebarFilters />
				{!isAuthenticated ? (
					<LoginLink
						className="mt-auto bg-primary hover:bg-primary/90 rounded-lg text-white mx-8 py-2 font-bold text-center"
						authUrlParams={{
							lang: appState.language
						}}>
						{translations.login}
					</LoginLink>
				) : (
					<button
						className={`mt-auto bg-primary hover:bg-primary/90 rounded-lg text-white mx-8 py-2 font-bold ${
							!isAuthenticated || isBanned ? 'opacity-50' : ''
						}`}
						onClick={handleAdd}
						disabled={!isAuthenticated || isBanned}>
						{translations.addPoint}
					</button>
				)}
				{!isAuthenticated ? <small className="mx-8 text-center">{translations.notAuthenticatedModal.message}</small> : ''}
				{isBanned ? <small className="mx-8 text-center text-red-600 font-bold">{translations.notAuthenticatedModal.message}</small> : ''}
			</Box>
			<ToggleLeftSidebarButton />
		</div>
	)
}

const ToggleLeftSidebarButton = () => {
	const { appState, handleLeftSidebarToggle } = useAppContext()
	const { isLeftSideBarShown, isRightSideBarShown } = appState
	const rotateButtonStyles = isLeftSideBarShown ? '' : 'rotate-180'
	const disabledButtonStyles = isRightSideBarShown ? 'bg-[#f4f4f4] text-[#bbbbbb]' : ''

	return (
		<button
			className={`${disabledButtonStyles} rounded border-gray bg-white h-[34px] w-[34px] border-2 ms-[-2px] ${
				isLeftSideBarShown ? '' : 'ms-[calc(1rem-2px)]'
			} sm:ms-4 grid place-items-center hover:bg-zinc-100 ${rotateButtonStyles} pointer-events-auto`}
			disabled={isRightSideBarShown}
			onClick={handleLeftSidebarToggle}>
			<ChevronLeft size={21} strokeWidth={3} />
		</button>
	)
}
