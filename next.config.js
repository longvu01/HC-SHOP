/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['res.cloudinary.com'],
	},
	env: {
		BASE_URL: 'http://localhost:3000/api',
		MONGODB_URL:
			'mongodb+srv://longvu01:longvu123@cluster0.gxmpdsn.mongodb.net/HC-SHOP?retryWrites=true&w=majority',
		SALT: 12,
		ACCESS_TOKEN_KEY: '&rk`Dw_Mf&=[2er{K%]f$}sQTaXxD%tZ?$&uEnw!J;~+PDmG8~',
		REFRESH_TOKEN_KEY:
			'5Yx2-YrpP;,Lj%/%FU.2f9}hvPVp*29SpYF&MN)L=nyJ$(u#Je]C5d)uYkGZFWMkChN#s;$yqWh5sA/#',
	},
}
