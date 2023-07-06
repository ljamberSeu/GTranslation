import { createData  } from "./utils";
/*
 "consentAccountConnectDescription": "在使用这些功能之前，您需要将您的加密钱包连接到dApp的主机网站上。连接免费且不需要燃气费用。dApp是建立在去中心化网络上的应用程序，它结合了智能合约和前端用户界面。",
  "consentAccountConnectTitle": "将您的加密钱包连接到 dApp",
  "consentAccountConnectWatchOutFor": "无效的 dApp URL。",
  "consentGrantApprovalBestPractice": "请定期通过Etherscan和我们的<em>Token approval</em>选项卡查看代币授权审批。代币授权请求是允许DApp访问您的钱包并与您的代币交互的权限请求。DApp（去中心化应用程序）是建立在去中心化网络上的应用程序，它结合了智能合约和前端用户界面。",
  "consentGrantApprovalBestPractice2": "您可以通过授权 dApp 所需数量的代币来限制批准金额，以进行您打算的交易或服务。代币批准请求是允许 dApp 访问您的钱包并与您的代币交互的权限请求。dApp（去中心化应用程序）是建立在分散网络上的应用程序，结合了智能合约和前端用户界面。",
  "consentGrantApprovalBestPractice3": "请不要忘记撤销您不再使用的 dApps 的授权。",
  "consentGrantApprovalDescription": "一旦批准，您的 dApp 可以花费您设置的指定金额，无需进一步批准。",
  "consentGrantApprovalTitle": "允许此 dApp 代表您花费代币。",
  "consentGrantApprovalWatchOutFor": "直接从dApp URL接收批准请求。",
  "consentGrantApprovalWatchOutFor2": "您正在授权的金额必须正确。",
  "consentSignBestPractice": "只为您熟悉的 dApps 签名信息。",
  "consentSignDescription": "一些 dApp 需要在连接到您的钱包之前进行签名。此请求是免费的，不需要任何燃气费用。",
  "consentSignTitle": "此请求用于向 dApps 验证您的身份。",
  "consentSignTransactionBestPractice": "只允许访问您熟悉的 dApp。",
  "consentSignTransactionDescription1": "当您签署此交易时，您钱包中的代币将被转移到另一个钱包或智能合约中。请仅与您信任的地址和dApp（去中心化应用程序）进行交互。",
  "consentSignTransactionDescription2": "此交易需要支付燃气费。在签署交易前进行任何更改。燃气费是与区块链上的计算相关的财务费用。燃气是处理交易或合约所需的计算能力。燃气费以 gwei 计价，是以太币的一小部分。",
  "consentSignTransactionTitle": "此交易将从您的账户中转移代币。",
  "consentSignTransactionWatchOutFor": null,
  "consentSignWatchOutFor": "dApp URL正在向您发送签名请求，请注意。",

  
  consentAccountConnectDescription: _TL_Pre_Define({
    defaultMessage:
      'Before you can use these features, your Crypto Wallet needs to be connected to your dApp’s host website. Don’t worry — connecting is free and doesn’t require a gas fee.',
    description:
      'text for help content description in connect wallet page on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    id: 'consentAccountConnectDescription',
  }),
  consentAccountConnectTitle: _TL_Pre_Define({
    defaultMessage: 'Connect your Crypto Wallet to a dApp',
    description:
      'text for help content title in connect wallet page on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    id: 'consentAccountConnectTitle',
  }),
  consentAccountConnectWatchOutFor: _TL_Pre_Define({
    defaultMessage: 'Invalid dApp URLs',
    description:
      'text for what help content watch out in connect wallet page on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    id: 'consentAccountConnectWatchOutFor',
  }),
  consentGrantApprovalBestPractice: _TL_Pre_Define({
    defaultMessage:
      'Make sure to review token approvals regularly with Etherscan and through our <em>Token approval</em> tab.',
    description:
      'text for help content description in approve on drawer. The HTML tags <em> and </em> should be preserved. Token approval requests are permission requests that allow a DApp to access your wallet and interact with your tokens. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    id: 'consentGrantApprovalBestPractice',
  }),
  consentGrantApprovalBestPractice2: _TL_Pre_Define({
    defaultMessage:
      'You can limit the approval amount by granting a dApp the necessary amount of tokens for your intended transactions or services.',
    description:
      'text for help content description in approve on drawer. Token approval requests are permission requests that allow a DApp to access your wallet and interact with your tokens. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface.',
    id: 'consentGrantApprovalBestPractice2',
  }),
  consentGrantApprovalBestPractice3: _TL_Pre_Define({
    defaultMessage: 'Don’t forget to revoke approval to dApps you no longer use.',
    description:
      'text for help content description in approve on drawer. Token approval requests are permission requests that allow a DApp to access your wallet and interact with your tokens. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface.',
    id: 'consentGrantApprovalBestPractice3',
  }),
  consentGrantApprovalDescription: _TL_Pre_Define({
    defaultMessage:
      'Once approved, your dApp can spend up to the specified amount you set and won’t require further approval.',
    description:
      'text for help content description in approve on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    id: 'consentGrantApprovalDescription',
  }),
  consentGrantApprovalTitle: _TL_Pre_Define({
    defaultMessage: 'Let this dApp spend tokens on your behalf',
    description:
      'text for help content title in approve on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    id: 'consentGrantApprovalTitle',
  }),
  consentGrantApprovalWatchOutFor: _TL_Pre_Define({
    defaultMessage: 'Receiving an approval request directly from a dApp URL.',
    description:
      'text for help content what watch out in approve on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    id: 'consentGrantApprovalWatchOutFor',
  }),
  consentGrantApprovalWatchOutFor2: _TL_Pre_Define({
    defaultMessage: 'The correct amount for which you’re granting approval.',
    description: 'text for help content what watch out in approve on drawer',
    id: 'consentGrantApprovalWatchOutFor2',
  }),
  consentSignBestPractice: _TL_Pre_Define({
    defaultMessage: 'Only sign messages for dApps that you are familiar with',
    description:
      'text for help content description in sign signature page on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    id: 'consentSignBestPractice',
  }),
*/
export const initialRows = [
  createData(
    'addressWithCategoryText',
    'It’s $1 address.',
    '这是 $1 地址。',
    'text for risk address warning in send transaction on drawer. $1 stands for category, sample: It is webfishing address',
    'jili10@microsoft',
    ''),
  createData(
    'consentAccountConnectDescription',
    'Before you can use these features, your Crypto Wallet needs to be connected to your dApp’s host website. Don’t worry — connecting is free and doesn’t require a gas fee.',
    '在您使用这些功能之前，您的加密钱包需要连接到您的 dApp 的主机网站。不用担心 — 连接是免费的，不需要燃气费。',
    'text for help content description in connect wallet page on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    'jili10@microsoft',
    ''),
  createData(
    'consentAccountConnectTitle',
    'Connect your Crypto Wallet to a dApp',
    '将您的加密钱包连接到 dApp',
    'text for help content title in connect wallet page on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    'jili10@microsoft',
    ''),
  createData(
    'consentAccountConnectWatchOutFor',
    'Invalid dApp URLs',
    '无效的 dApp URL',
    'text for what help content watch out in connect wallet page on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    'jili10@microsoft',
    ''),
  createData(
    'consentGrantApprovalBestPractice',
    'Make sure to review token approvals regularly with Etherscan and through our <em>Token approval</em> tab.',
    '请确保定期通过 Etherscan 和我们的 <em>Token approval</em> 标签审查代币批准。',
    'text for help content description in approve on drawer. The HTML tags <em> and </em> should be preserved. Token approval requests are permission requests that allow a DApp to access your wallet and interact with your tokens. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    'jili10@microsoft',
    ''),
  createData(
    'consentGrantApprovalBestPractice2',
    'You can limit the approval amount by granting a dApp the necessary amount of tokens for your intended transactions or services.',
    '您可以通过授予 dApp 所需的代币数量来限制批准金额，以进行您打算的交易或服务。',
    'text for help content description in approve on drawer. Token approval requests are permission requests that allow a DApp to access your wallet and interact with your tokens. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface.',
    'jili10@microsoft',
    ''),
  createData(
    'consentGrantApprovalBestPractice3',
    'Don’t forget to revoke approval to dApps you no longer use.',
    '不要忘记撤销您不再使用的 dApp 的批准。',
    'text for help content description in approve on drawer. Token approval requests are permission requests that allow a DApp to access your wallet and interact with your tokens. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface.',
    'jili10@microsoft',
    ''),
  createData(
    'consentGrantApprovalDescription',
    'Once approved, your dApp can spend up to the specified amount you set and won’t require further approval.',
    '一旦批准，您的 dApp 可以花费您设置的指定金额，无需进一步批准。',
    'text for help content description in approve on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    'jili10@microsoft',
    ''),
  createData(
    'consentGrantApprovalTitle',
    'Let this dApp spend tokens on your behalf',
    '让这个 dApp 代表您花费代币',
    'text for help content title in approve on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    'jili10@microsoft',
    ''),
  createData(
    'consentGrantApprovalWatchOutFor',
    'Receiving an approval request directly from a dApp URL.',
    '直接从 dApp URL 接收批准请求。',
    'text for help content what watch out in approve on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    'jili10@microsoft',
    ''),
  createData(
    'consentGrantApprovalWatchOutFor2',
    'The correct amount for which you’re granting approval.',
    '您授予批准的正确金额。',
    'text for help content what watch out in approve on drawer',
    'jili10@microsoft',
    ''),
  createData(
    'consentSignBestPractice',
    'Only sign messages for dApps that you are familiar with',
    '只为您熟悉的 dApp 签名',
    'text for help content description in sign signature page on drawer. A dApp (decentralized application) is an application built on a decentralized network that combines a smart contract and a frontend user interface',
    'jili10@microsoft',
    ''),
  createData(
    'consentSignDescription',
    'Signing this message proves that you own this address and allows you to log in to this dApp.',
    '签署此消息证明您拥有此地址，并允许您登录此 dApp。',
    'text for help content description in sign signature page on drawer',
    'jili10@microsoft',
    ''),
  createData(
    'consentSignTitle',
    'Sign a message with your Crypto Wallet',
    '用您的加密钱包签署一条消息',
    'text for help content title in sign signature page on drawer',
    'jili10@microsoft',
    ''),
  createData(
    'consentSignWatchOutFor',
    'Receiving a signature request directly from a dApp URL.',
    '直接从 dApp URL 接收签名请求。',
    'text for help content what watch out in sign signature page on drawer',
    'jili10@microsoft',
    ''),
  createData(
    'consentSignWatchOutFor2',
    'The correct message you’re signing.',
    '您正在签名的正确消息。',
    'text for help content what watch out in sign signature page on drawer',
    'jili10@microsoft',
    ''),
  createData(
    'consentTransactionBestPractice',
    'Only send transactions for dApps that you are familiar with',
    '只为您熟悉的 dApp 发送交易',
    'text for help content description in send transaction page on drawer',
    'jili10@microsoft',
    ''),
  createData(
    'consentTransactionDescription',
    'Sending this transaction will cost you a small amount of ETH to pay for the transaction fee.',
    '发送此交易将花费您少量的 ETH 以支付交易费用。',
    'text for help content description in send transaction page on drawer',
    'jili10@microsoft',
    ''),
  createData(
    'consentTransactionTitle',
    'Send a transaction with your Crypto Wallet',
    '用您的加密钱包发送交易',
    'text for help content title in send transaction page on drawer',
    'jili10@microsoft',
    ''),
  createData(
    'consentTransactionWatchOutFor',
    'Receiving a transaction request directly from a dApp URL.',
    '直接从 dApp URL 接收交易请求。',
    'text for help content what watch out in send transaction page on drawer',
    'jili10@microsoft',
    ''),
  createData(
    'consentTransactionWatchOutFor2',
    'The correct transaction you’re sending.',
    '您正在发送的正确交易。',
    'text for help content what watch out in send transaction page on drawer',
    'jili10@microsoft',
    ''),
];
