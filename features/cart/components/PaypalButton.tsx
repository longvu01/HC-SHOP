import orderApi from '@/api-client/orderApi'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectUserAccessToken } from '@/features/auth/authSlice'
import { handleErrorMessage } from '@/utils'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import { cartActions, selectCartItems } from '../cartSlice'

const initialOptions = {
	'client-id': process.env.PAYPAL_CLIENT_ID || '',
	currency: 'USD',
	intent: 'capture',
}

export interface PaypalButtonProps {
	total: number
	address: string
	phoneNumber: string
}

export function PaypalButtonPurchase({ total, address, phoneNumber }: PaypalButtonProps) {
	const dispatch = useAppDispatch()

	const cartItems = useAppSelector(selectCartItems)
	const accessToken = useAppSelector(selectUserAccessToken)

	const orderData = {
		address,
		phoneNumber,
		cartItems,
		total,
	}

	return (
		<PayPalScriptProvider options={initialOptions}>
			<PayPalButtons
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: (total / 23000).toFixed(2).toString(),
								},
							},
						],
					})
				}}
				onApprove={(data, actions) => {
					return actions.order
						?.capture()
						.then(async () => {
							const res = await orderApi.add(orderData, accessToken)
							dispatch(cartActions.purchaseCart())
							toast.success(res.message)
						})
						.catch((error) => toast.error(handleErrorMessage(error)))
				}}
			/>
		</PayPalScriptProvider>
	)
}
