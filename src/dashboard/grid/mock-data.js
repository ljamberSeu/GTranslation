export function createData(id, original, gptTranslation, devComment, stringOwner, reviewer, reviewComment) {
  return {
    id,
    original,
    gptTranslation,
    devComment,
    stringOwner,
    reviewer,
    reviewComment,
  };
}
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
