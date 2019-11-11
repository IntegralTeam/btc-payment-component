import staticAxios, { AxiosInstance } from 'axios';

/**
 * RPC Client for bitcoin-like nodes
 */
export default class BitcoinRPC {
    private readonly axios: AxiosInstance;

    /**
     *
     * @param host - bitcoind RPC host
     * @param rpcUser - bitcoind RPC user
     * @param rpcPassword - bitcoind RPC password
     */
    constructor(host: string, rpcUser: string, rpcPassword: string) {
        this.axios = staticAxios.create({
            baseURL: host,
            timeout: 30 * 1000,
            auth: {
                username: rpcUser,
                password: rpcPassword,
            },
            validateStatus: () => true,
        });
    }

    public readonly getBlockchainInfo = async (): Promise<BlockchainInfo> => {
        return (await this.makeRPCRequest('getblockchaininfo', [])) as BlockchainInfo;
    };

    public readonly getWalletInfo = async () => {
        return (await this.makeRPCRequest('getwalletinfo', []));
    };

    public readonly getNetworkInfo = async (): Promise<NetworkInfo> => {
        return (await this.makeRPCRequest('getnetworkinfo', [])) as NetworkInfo;
    };

    public readonly getBlockHash = async (blockNumber: number): Promise<string> => {
        return (await this.makeRPCRequest('getblockhash', [blockNumber])) as string;
    };

    public readonly getBlock = async (hash: string): Promise<string> => {
        return (await this.makeRPCRequest('getblock', [hash, 0])) as string;
    };

    public readonly getBlockVerbose = async (hash: string): Promise<VerboseBlock> => {
        return (await this.makeRPCRequest('getblock', [hash, 1])) as VerboseBlock;
    };

    public readonly getBlockSuperVerbose = async (hash: string): Promise<SuperVerboseBlock> => {
        return (await this.makeRPCRequest('getblock', [hash, 2])) as SuperVerboseBlock;
    };

    public readonly estimateSmartFee = async (blocks: number = 10): Promise<SmartFee> => {
        return (await this.makeRPCRequest('estimatesmartfee', [blocks])) as SmartFee;
    };

    public readonly sendRawTransaction = async (transaction: string): Promise<string> => {
        return (await this.makeRPCRequest('sendrawtransaction', [transaction])) as string;
    };

    public readonly getNewAddress = async (label: string = null) => {
        return (await this.makeRPCRequest('getnewaddress', []));
    };

    public readonly listUnspent = async (request: ListUnspentRequest): Promise<ListUnspent[]> => {
        return (await this.makeRPCRequest('listunspent', [
            request.minconf,
            request.maxconf,
            request.addresses,
            false,
        ])) as ListUnspent[];
    };

    protected readonly makeRPCRequest = async (
        method: string,
        params: any[],
        id?: string,
    ): Promise<unknown> => {
        const request: RPCRequest = {
            method,
            params,
            id,
        };

        const response = await this.axios.post('', request);
        const rpcResponse: BaseRPCResponse = response.data;
        if (rpcResponse.error) {
            throw new Error(rpcResponse.error.message);
        }

        return rpcResponse.result;
    };

    public readonly setHdSeed = async (newkeypool: boolean = true, masterPrivateKey: string) => {
        return (await this.makeRPCRequest('sethdseed', [
            newkeypool,
            masterPrivateKey
        ]));
    };

    public readonly getAddressInfo = async (address: string) => {
        return (await this.makeRPCRequest('getaddressinfo', [
            address
        ]));
    };

    public readonly getReceivedByAddress = async (address: string, minConfirmsNumber: number) => {
        return (await this.makeRPCRequest('getreceivedbyaddress', [
            address,
            minConfirmsNumber
        ]));
    };
}

interface RPCRequest {
    method: string;
    params: any[];
    id: string;
}

interface BaseRPCResponse {
    error?: RPCError;
    id?: string;
    result?: unknown;
}

interface RPCError {
    code: number;
    message: string;
}

interface BlockchainInfo {
    chain: string;
    blocks: number;
}

interface NetworkInfo {
    relayfee: number;
}

interface SmartFee {
    feerate: number;
    blocks: number;
}

interface BaseBlock {
    hash: string;
    confirmations: number;
    strippedsize: number;
    size: number;
    weight: number;
    version: number;
    versionHex: string;
    merkleroot: string;
    time: number;
    mediantime: number;
    nonce: number;
    bits: string;
    difficulty: number;
    chainWork: string;
    nTx: number;
    previousblockhash: string;
    nextblockhash: string;
}

interface VerboseBlock extends BaseBlock {
    tx: string[];
}

interface SuperVerboseBlock extends BaseBlock {
    tx: Transaction[];
}

interface Transaction {
    txid: string;
    hash: string;
    version: number;
    size: number;
    vsize: number;
    weight: number;
    locktime: number;
    hex: string;
    vout: TransactionOutput[];
}

interface TransactionOutput {
    value: number;
    n: number;
    scriptPubKey: ScriptPublicKey;
}

interface ScriptPublicKey {
    asm: string;
    hex: string;
    reqSigs: string;
    type: 'pubkeyhash' | 'scripthash' | 'nulldata' | 'multisig';
    addresses?: string[];
}

interface ListUnspentRequest {
    minconf: number;
    maxconf?: number;
    addresses: string[];
}

interface ListUnspent {
    txid: string;
    vout: number;
    address: string;
    amount: number;
}
