import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI_POOL_TRIPLE, ABI_UNI } from '@constants';
import axios from 'axios';
import { formatEther, parseEther } from '../../../../node_modules/ethers/lib/utils';

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

		mphPrice = parseFloat(mphPrice.data['0x8888801af4d980682e47f1a9036e589479e835c5'].usd);

		crvPrice = parseFloat(crvPrice.data['0xd533a949740bb3306d119cc777fa900ba034cd52'].usd);

		const poolContract = await new ethers.Contract(CONTRACT_ADDRESS.debaseEthPool, ABI_POOL_TRIPLE, provider);
		const debaseContract = await new ethers.Contract(CONTRACT_ADDRESS.debase, ABI_POOL_TRIPLE, provider);
		const debaseEthLpContract = await new ethers.Contract(CONTRACT_ADDRESS.debaseEthLp, ABI_POOL_TRIPLE, provider);
		const debaseDaiLpContract = await new ethers.Contract(CONTRACT_ADDRESS.debaseDaiLp, ABI_UNI, provider);
		const ethDaiPoolContract = await new ethers.Contract(CONTRACT_ADDRESS.ethDaiPool, ABI_UNI, provider);

		const wethContract = await new ethers.Contract(CONTRACT_ADDRESS.weth, ABI_POOL_TRIPLE, provider);

		const enabled = await poolContract.poolEnabled();
		const rewardPercentage = await poolContract.rewardPercentage();
		const blockDuration = await poolContract.blockDuration();
		const totalSupply = await poolContract.totalSupply();
		const debaseTotalSupply = await debaseContract.totalSupply();
		const totalSupplyLp = await debaseEthLpContract.totalSupply();
		const debaseDaiReserves = await debaseDaiLpContract.getReserves();
		const ethDaiReserves = await ethDaiPoolContract.getReserves();
		const wethBalance = await wethContract.balanceOf(CONTRACT_ADDRESS.debaseEthLp);

		const debaseAPR =
			totalSupply == 0
				? 0
				: parseFloat(
						(rewardPercentage *
							debaseTotalSupply /
							(blockDuration * 14 / 86400) *
							(debaseDaiReserves[0] / debaseDaiReserves[1]) *
							365 /
							(totalSupply * (2 * wethBalance * (ethDaiReserves[0] / ethDaiReserves[1]) / totalSupplyLp)) /
							Math.pow(10, 18) *
							100).toFixed(2)
					);

		const mphNum = 44 * mphPrice * 12;

		const mphDom =
			parseFloat(formatEther(totalSupply)) *
			(2 *
				parseFloat(formatEther(wethBalance)) *
				(parseFloat(formatEther(ethDaiReserves[0])) / parseFloat(formatEther(ethDaiReserves[1]))) /
				parseFloat(formatEther(totalSupplyLp)));

		const mphAPR = totalSupply == 0 ? 0 : mphNum / mphDom * 100;

		const crvNum = 2040 * 12 * crvPrice;

		const crvDom =
			parseFloat(formatEther(totalSupply)) *
			(2 *
				parseFloat(formatEther(wethBalance)) *
				(parseFloat(formatEther(ethDaiReserves[0])) / parseFloat(formatEther(ethDaiReserves[1]))) /
				parseFloat(formatEther(totalSupplyLp)));

		const crvAPR = totalSupply == 0 ? 0 : crvNum / crvDom * 100;

		const debaseAPY = Math.pow(1 + debaseAPR / (100 * 365), 365) * 100;
		const mphAPY = Math.pow(1 + mphAPR / (100 * 365), 365) * 100;
		const crvAPY = Math.pow(1 + crvAPR / (100 * 365), 365) * 100;

		return {
			debaseAPR: parseFloat(debaseAPR).toFixed(2) + ' %',
			mphAPR: parseFloat(mphAPR).toFixed(2) + ' %',
			crvAPR: parseFloat(crvAPR).toFixed(2) + ' %',
			apr: parseFloat(debaseAPR + mphAPR + crvAPR).toFixed(2) + ' %',
			aprVested: parseFloat(3 * debaseAPR + mphAPR + crvAPR).toFixed(2) + ' %',
			debaseAPY: parseFloat(debaseAPY).toFixed(2) + ' %',
			mphAPY: parseFloat(mphAPY).toFixed(2) + ' %',
			crvAPY: parseFloat(crvAPY).toFixed(2) + ' %',
			apy: parseFloat(debaseAPY + mphAPY + crvAPY).toFixed(2) + ' %',
			apyVested: parseFloat(3 * debaseAPY + mphAPY + crvAPY).toFixed(2) + ' %',
			enabled: enabled
		};
	} catch (err) {
		return { apr: 0, mphAPY: 0, crvAPY: 0, debaseAPY: 0, enabled: false };
	}
};
