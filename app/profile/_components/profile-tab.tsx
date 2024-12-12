import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { useTranslations } from '@/hooks/useTranslations'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { User } from 'lucide-react'
import { useGetUsersSurveys } from 'geo-survey-map-shared-modules'
import { formatDateTime, resolveImagePath } from '@/lib/utils'
import { categoryToAssets } from '@/components/icons'
import Image from 'next/image'
import { Loader } from '@/components/loader'

export const ProfileTab = () => {
	const { translations } = useTranslations()
	const { user, isLoading } = useKindeBrowserClient()
	const { data, isFetching } = useGetUsersSurveys()

	return (
		<TabsContent value="profile" className="space-y-6">
			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col items-center space-y-4">
						<Avatar className="h-20 w-20 bg-primary">
							<AvatarFallback>
								<User />
							</AvatarFallback>
						</Avatar>
						<div className="text-center">
							{isLoading || isFetching ? (
								<Loader />
							) : (
								<>
									<div className="text-gray-600">{user?.email}</div>
									<div className="text-xl font-semibold">
										{translations.userProfile.pts} {data?.length}
									</div>
								</>
							)}
						</div>
					</div>

					<div className="mt-8 space-y-6">
						<div className="space-y-4">
							<h3 className="text-lg font-medium">{translations.userProfile.manageAccount}</h3>
							<Button variant="destructive" className="w-full">
								{translations.userProfile.removeAccount}
							</Button>
						</div>
						<div className="space-y-4">
							<h3 className="text-lg font-medium">{translations.pointsList.title}</h3>
							<div className="space-y-3">
								{isFetching ? (
									<Loader />
								) : data?.length ? (
									data.map((point) => (
										<PointItem
											key={point.id!}
											name={point.location.name!}
											category={point.category}
											createdAt={point.createdAt}
										/>
									))
								) : (
									<NoPointsAddedFallback />
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	)
}

const PointItem: React.FC<{ category: string; createdAt: string; name: string }> = ({ category, createdAt, name }) => {
	return (
		<div className="flex items-center justify-between gap-4 rounded-lg border bg-white">
			<div className="flex gap-4 p-4">
				<Image src={categoryToAssets[category].iconUrl} alt={'Icon of category'} width={45} height={45} className="rounded-full" />
				<div>
					<div className="font-medium">{name}</div>
					<div className="text-sm text-gray-600">{formatDateTime(createdAt)}</div>
				</div>
			</div>
		</div>
	)
}

const NoPointsAddedFallback = () => {
	const { translations } = useTranslations()

	return (
		<div className="flex items-center justify-center h-12 w-full bg-white rounded-lg border">
			<p>{translations.pointsList.noPoints}</p>
		</div>
	)
}
