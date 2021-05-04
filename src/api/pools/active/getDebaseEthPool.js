import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI_POOL_TRIPLE, ABI_UNI } from '@constants';
import axios from 'axios';

export default async () => {
	try {
		const provider = await new ethers.providers.EtherscanProvider(
			'homestead',
			'WSEBKEYQAFZ8AUGMFAKJR7GPCNYZ9Q3AIE'
		);

		let mphPrice = await axios.get(
			'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x8888801af4d980682e47f1a9036e589479e835c5&vs_currencies=usd'
		);
		let crvPrice = await axios.get(
			'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xd533a949740bb3306d119cc777fa900ba034cd52&vs_currencies=usd'
		);

		mphPrice = mphPrice.data['0x8888801af4d980682e47f1a9036e589479e835c5'].usd;

		crvPrice = crvPrice.data['0xd533a949740bb3306d119cc777fa900ba034cd52'].usd;

		const poolContract = await new ethers.Contract(CONTRACT_ADDRESS.debaseEthPool, ABI_POOL_TRIPLE, provider);
		const debaseContract = await new ethers.Contract(CONTRACT_ADDRESS.debase, ABI_POOL_TRIPLE, provider);
		const degovEthLpContract = await new ethers.Contract(CONTRACT_ADDRESS.degovEthLp, ABI_POOL_TRIPLE, provider);
		const debaseDaiLpContract = await new ethers.Contract(CONTRACT_ADDRESS.debaseDaiLp, ABI_UNI, provider);
		const ethDaiPoolContract = await new ethers.Contract(CONTRACT_ADDRESS.ethDaiPool, ABI_UNI, provider);

		const wethContract = await new ethers.Contract(CONTRACT_ADDRESS.weth, ABI_POOL_TRIPLE, provider);

		const enabled = await poolContract.poolEnabled();
		const rewardPercentage = await poolContract.rewardPercentage();
		const blockDuration = await poolContract.blockDuration();
		const totalSupply = await poolContract.totalSupply();
		const debaseTotalSupply = await debaseContract.totalSupply();
		const totalSupplyLp = await degovEthLpContract.totalSupply();
		const debaseDaiReserves = await debaseDaiLpContract.getReserves();
		const ethDaiReserves = await ethDaiPoolContract.getReserves();
		const wethBalance = await wethContract.balanceOf(CONTRACT_ADDRESS.debaseEthLp);

		const debaseAPR =
			totalSupply == 0
				? 0
				: (rewardPercentage *
						debaseTotalSupply /
						(blockDuration * 14 / 86400) *
						(debaseDaiReserves[0] / debaseDaiReserves[1]) *
						365 /
						(totalSupply * (2 * wethBalance * (ethDaiReserves[0] / ethDaiReserves[1]) / totalSupplyLp)) /
						Math.pow(10, 18) *
						100).toFixed(2);

		const mphAPR =
			totalSupply == 0
				? 0
				: (20.97 /
						(blockDuration * 14 / 86400) *
						mphPrice *
						365 /
						(totalSupply * (2 * wethBalance * (ethDaiReserves[0] / ethDaiReserves[1]) / totalSupplyLp)) /
						Math.pow(10, 18) *
						100).toFixed(2);

		const crvAPR =
			totalSupply == 0
				? 0
				: (1012 /
						(blockDuration * 14 / 86400) *
						crvPrice *
						365 /
						(totalSupply * (2 * wethBalance * (ethDaiReserves[0] / ethDaiReserves[1]) / totalSupplyLp)) /
						Math.pow(10, 18) *
						100).toFixed(2);

		return {
			debaseAPR,
			mphAPR,
			crvAPR,
			apr: debaseAPR + mphAPR + crvAPR,
			enabled: enabled
		};
	} catch (err) {
		return { apr: 0, mphAPR: 0, crvAPR: 0, debaseAPR: 0, enabled: false };
	}
};