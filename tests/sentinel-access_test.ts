import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.5.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure core scheduling functionality works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const user = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            Tx.contractCall('sentinel-access', 'create-schedule', 
                [types.principal(user.address), types.uint(100), types.uint(200), types.ascii('conference-room')], 
                deployer.address
            )
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk();
    }
});

Clarinet.test({
    name: "Prevent unauthorized schedule access",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const user = accounts.get('wallet_1')!;
        const unauthorized = accounts.get('wallet_2')!;

        let block = chain.mineBlock([
            Tx.contractCall('sentinel-access', 'check-access', 
                [types.principal(unauthorized.address), types.ascii('conference-room')], 
                deployer.address
            )
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectErr();
    }
});