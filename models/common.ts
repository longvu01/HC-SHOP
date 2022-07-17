import { EmotionCache } from '@emotion/cache'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export interface ErrorResponse {
	message: string

	[key: string]: string
}

export interface LayoutProps {
	children: ReactNode

	[key: string]: any
}

export interface ListParams {}

export type NextPageWithLayout = NextPage & {
	Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
	emotionCache?: EmotionCache
}
