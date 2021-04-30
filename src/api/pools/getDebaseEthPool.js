import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI_POOL, ABI_UNI } from '@constants';

export default async () => {
	try {
		const provider = await new ethers.providers.EtherscanProvider(
			'homestead',
			'WSEBKEYQAFZ8AUGMFAKJR7GPCNYZ9Q3AIE'
		);

		const poolContract = await new ethers.Contract(CONTRACT_ADDRESS.debaseEthPool, ABI_POOL, provider);
		// const debaseContract = await new ethers.Contract(CONTRACT_ADDRESS.debase, ABI_POOL, provider);
		// const degovEthLpContract = await new ethers.Contract(CONTRACT_ADDRESS.degovEthLp, ABI_POOL, provider);
		// const debaseDaiLpContract = await new ethers.Contract(CONTRACT_ADDRESS.debaseDaiLp, ABI_UNI, provider);
		// const ethDaiPoolContract = await new ethers.Contract(CONTRACT_ADDRESS.ethDaiPool, ABI_UNI, provider);
		// const wethContract = await new ethers.Contract(CONTRACT_ADDRESS.weth, ABI_POOL, provider);

		const enabled = await poolContract.poolEnabled();
		// const rewardPercentage = await poolContract.rewardPercentage();
		// const blockDuration = await poolContract.blockDuration();
		// const totalSupply = await poolContract.totalSupply();
		// const debaseTotalSupply = await debaseContract.totalSupply();
		// const totalSupplyLp = await degovEthLpContract.totalSupply();
		// const debaseDaiReserves = await debaseDaiLpContract.getReserves();
		// const ethDaiReserves = await ethDaiPoolContract.getReserves();
		// const wethBalance = await wethContract.balanceOf(CONTRACT_ADDRESS.degovEthLp);

		return {
			apr: 0,
			enabled: enabled
		};
	} catch (err) {
		return { apr: 0, enabled: false };
	}
};
