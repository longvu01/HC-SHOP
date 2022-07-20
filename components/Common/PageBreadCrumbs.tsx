import { Breadcrumbs, Link as MuiLink } from '@mui/material'
import Link from 'next/link'

export interface BreadCrumbsProps {
	data: { title: string; href: string }[]
}

export default function PageBreadCrumbs({ data }: BreadCrumbsProps) {
	const breadcrumbs = data.map((item: any) => (
		<Link key={item.title} href={item.href} passHref>
			<MuiLink>{item.title}</MuiLink>
		</Link>
	))

	return (
		<Breadcrumbs separator="›" aria-label="breadcrumb">
			{breadcrumbs}
		</Breadcrumbs>
	)
}
