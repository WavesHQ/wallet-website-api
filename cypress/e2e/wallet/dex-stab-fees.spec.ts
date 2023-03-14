describe("Wallet - Dex Stabilisation Fee", () => {
  it("should be able to return actual data", () => {
    const pairs = [
      {
        data: {
          apr: {
            commission: 0,
            reward: 41.801625,
            total: 41.801625,
          },
          commission: "0",
          creation: {
            height: 139,
            tx: "da308b254dae662aa245b13f878c97047086dcf9db68f002712c3e7a4aa04a39",
          },
          displaySymbol: "dBTC-DFI",
          id: "18",
          name: "Playground BTC-Default Defi token",
          ownerAddress: "mswsMVsyGMj1FzDMbbxw2QW3KvQAv2FKiy",
          priceRatio: {
            ab: "1",
            ba: "1",
          },
          rewardLoanPct: "0",
          rewardPct: "0.0625",
          status: true,
          tokenA: {
            symbol: "BTC",
            displaySymbol: "dBTC",
            id: "1",
            name: "Playground BTC",
            reserve: "1000",
            blockCommission: "0",
          },
          tokenB: {
            symbol: "DFI",
            displaySymbol: "DFI",
            id: "0",
            name: "Default Defi token",
            reserve: "1000",
            blockCommission: "0",
          },
          totalLiquidity: { token: "1000", usd: "20000000" },
          tradeEnabled: true,
          volume: { h24: 0, d30: 0 },
        },
        type: "available",
      },
      {
        data: {
          apr: {
            commission: 0,
            reward: 41.801625,
            total: 41.801625,
          },
          commission: "0",
          creation: {
            height: 139,
            tx: "da308b254dae662aa245b13f878c97047086dcf9db68f002712c3e7a4aa04a39",
          },
          displaySymbol: "DUSD-DFI",
          id: "18",
          name: "Playground BTC-Default Defi token",
          ownerAddress: "mswsMVsyGMj1FzDMbbxw2QW3KvQAv2FKiy",
          priceRatio: {
            ab: "1",
            ba: "1",
          },
          rewardLoanPct: "0",
          rewardPct: "0.0625",
          status: true,
          tokenA: {
            symbol: "DUSD",
            displaySymbol: "DUSD",
            id: "1",
            name: "Playground BTC",
            reserve: "1000",
            blockCommission: "0",
          },
          tokenB: {
            symbol: "DFI",
            displaySymbol: "DFI",
            id: "0",
            name: "Default Defi token",
            reserve: "1000",
            blockCommission: "0",
            fee: {
              pct: "0.001",
              inPct: "0.001",
              outPct: "0.001",
            },
          },
          totalLiquidity: { token: "1000", usd: "20000000" },
          tradeEnabled: true,
          volume: { h24: 0, d30: 0 },
        },
        type: "available",
      },
    ];

    cy.request(
      "POST",
      "/api/wallet/dex-stab-fees",
      JSON.stringify({
        tokenADisplaySymbol: "DUSD",
        tokenBDisplaySymbol: "DFI",
        pairs: pairs,
      })
    ).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.deep.equal("0.10");
    });
  });
});
