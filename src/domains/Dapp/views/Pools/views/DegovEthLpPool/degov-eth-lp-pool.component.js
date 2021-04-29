import { Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';

import { CONTRACT_ADDRESS } from '@constants';
import { Section, Grid, PoolStake, DisconnectedWalletCard } from '@dapp/components';
import { ABI_INCENTIVIZER } from '@constants/index';

const DebaseEthLpPool = () => {
	const { active } = useWeb3React();

	return (
		<Fragment>
			<Section label="Degov Eth Lp Pool" info="**update**">
				{!active ? (
					<DisconnectedWalletCard />
				) : (
					<Grid>
						<PoolStake
							poolAddress={CONTRACT_ADDRESS.degovEthPool}
							lpAddress={CONTRACT_ADDRESS.degovEthLp}
							stakeText="DEGOV/ETH LP"
							poolABI={ABI_INCENTIVIZER}
						/>
					</Grid>
				)}
			</Section>
		</Fragment>
	);
};

export default DebaseEthLpPool;
