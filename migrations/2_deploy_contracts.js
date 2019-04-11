const AthleteToken = artifacts.require('AthleteToken');
const CollectiblesCrowdsale = artifacts.require('CollectiblesCrowdsale');

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(
    AthleteToken,
    'College Collectible Cards',
    'CCC'
  );
  let AT = await AthleteToken.deployed()
  await deployer.deploy(
    CollectiblesCrowdsale,
    100,
    accounts[1],
    AT.address
  );
  // CollectiblesCrowdsale.autoGas = true
  // CollectiblesCrowdsale.gasMultiplier(1.5)
  let CC = await CollectiblesCrowdsale.deployed()
  await AT.addMinter(CC.address)
  let newCardArguments = [
    /** to */accounts[0],
    /** name */'Zion Wilson',
    /** birthPlace */'Salisbury, North Carolina',
    /** birthDate*/'July 6, 2000',

    /** heightCm */201,
    /** weightKg */129,

    /** college */'Duke',
    [
    /** gamesPlayed */33,
    /** gamesStarted */33,
    /** minutesPerGame */30,
    /** fieldGoalPercentage */680,
    /** threPointFieldGoalPercentage */338,
    /** freeThrowPercentage */640,
    /** reboundsPerGame */89,
    /** assistsPerGame */21,
    /** stealsPerGame */21,
    /** blocksPerGame */18,
    /** pointsPerGame */226
    ]
  ];
  console.log(await CC.valueReceived({value: 10000000}))
  let gasCost = await CC.buyTokens.estimateGas(
    ...newCardArguments,
    {
      value: 10000000
    }
  )
  console.log(gasCost)
  await CC.buyTokens(
    ...newCardArguments,
    {
      value: 10000000,
      // gas: gasCost * 2,
      // gasPrice: 20,
    }
  )
  // CC.buyTokens(

  //   /** to */'0x5D27111dc74f9450a3D2400207385A8a1e59d260',
  //   /** name */'Bam Adebayo',
  //   /** birthPlace */'Newark, New Jersey',
  //   /** birthDate*/'July 18, 1997',

  //   /** heightCm */208,
  //   /** weightKg */113,

  //   /** college */'Kentucky',
  //   [
  //   /** gamesPlayed */33,
  //   /** gamesStarted */33,
  //   /** minutesPerGame */30,
  //   /** fieldGoalPercentage */680,
  //   /** threPointFieldGoalPercentage */338,
  //   /** freeThrowPercentage */640,
  //   /** reboundsPerGame */89,
  //   /** assistsPerGame */21,
  //   /** stealsPerGame */21,
  //   /** blocksPerGame */18,
  //   /** pointsPerGame */226
  //   ],
  //   { value: 100 }

  // )
};
