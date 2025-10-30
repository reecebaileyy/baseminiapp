// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { UniswapV4Base_3Types } from './sources/uniswap-v4-base-3/types';
import type { AerodromeBaseFullTypes } from './sources/aerodrome-base-full/types';
import * as importedModule$0 from "./sources/uniswap-v4-base-3/introspectionSchema";
import * as importedModule$1 from "./sources/aerodrome-base-full/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Query = {
  poolManager?: Maybe<PoolManager>;
  poolManagers: Array<PoolManager>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  tick?: Maybe<Tick>;
  ticks: Array<Tick>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  modifyLiquidity?: Maybe<ModifyLiquidity>;
  modifyLiquidities: Array<ModifyLiquidity>;
  uniswapDayData?: Maybe<UniswapDayData>;
  uniswapDayDatas: Array<UniswapDayData>;
  poolDayData?: Maybe<PoolDayData>;
  poolDayDatas: Array<PoolDayData>;
  poolHourData?: Maybe<PoolHourData>;
  poolHourDatas: Array<PoolHourData>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokenHourData?: Maybe<TokenHourData>;
  tokenHourDatas: Array<TokenHourData>;
  position?: Maybe<Position>;
  positions: Array<Position>;
  subscribe?: Maybe<Subscribe>;
  subscribes: Array<Subscribe>;
  unsubscribe?: Maybe<Unsubscribe>;
  unsubscribes: Array<Unsubscribe>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  arrakisHook?: Maybe<ArrakisHook>;
  arrakisHooks: Array<ArrakisHook>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  factory?: Maybe<Factory>;
  factories: Array<Factory>;
  positionSnapshot?: Maybe<PositionSnapshot>;
  positionSnapshots: Array<PositionSnapshot>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  collect?: Maybe<Collect>;
  collects: Array<Collect>;
  flash?: Maybe<Flash>;
  flashes: Array<Flash>;
  tickHourData?: Maybe<TickHourData>;
  tickHourDatas: Array<TickHourData>;
  tickDayData?: Maybe<TickDayData>;
  tickDayDatas: Array<TickDayData>;
};


export type QuerypoolManagerArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolManagersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolManager_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolManager_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybundleArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybundlesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bundle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bundle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytickArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryticksArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Tick_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Tick_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymodifyLiquidityArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymodifyLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ModifyLiquidity_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ModifyLiquidity_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuniswapDayDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuniswapDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UniswapDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UniswapDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolDayDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolHourDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolHourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolHourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenDayDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenHourDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenHourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenHourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypositionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypositionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Position_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Position_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubscribeArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubscribesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Subscribe_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subscribe_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunsubscribeArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunsubscribesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Unsubscribe_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Unsubscribe_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransfersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryarrakisHookArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryarrakisHooksArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ArrakisHook_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ArrakisHook_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};


export type QueryfactoryArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfactoriesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Factory_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Factory_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypositionSnapshotArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypositionSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PositionSnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PositionSnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryburnArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryburnsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Burn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Burn_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Collect_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Collect_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryflashArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryflashesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Flash_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Flash_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytickHourDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytickHourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TickHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TickHourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytickDayDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytickDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TickDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TickDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type ArrakisHook = {
  id: Scalars['ID']['output'];
  module: Scalars['Bytes']['output'];
  salt: Scalars['Bytes']['output'];
  createdAtTimestamp: Scalars['BigInt']['output'];
  createdAtBlockNumber: Scalars['BigInt']['output'];
};

export type ArrakisHook_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  module?: InputMaybe<Scalars['Bytes']['input']>;
  module_not?: InputMaybe<Scalars['Bytes']['input']>;
  module_gt?: InputMaybe<Scalars['Bytes']['input']>;
  module_lt?: InputMaybe<Scalars['Bytes']['input']>;
  module_gte?: InputMaybe<Scalars['Bytes']['input']>;
  module_lte?: InputMaybe<Scalars['Bytes']['input']>;
  module_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  module_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  module_contains?: InputMaybe<Scalars['Bytes']['input']>;
  module_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  salt?: InputMaybe<Scalars['Bytes']['input']>;
  salt_not?: InputMaybe<Scalars['Bytes']['input']>;
  salt_gt?: InputMaybe<Scalars['Bytes']['input']>;
  salt_lt?: InputMaybe<Scalars['Bytes']['input']>;
  salt_gte?: InputMaybe<Scalars['Bytes']['input']>;
  salt_lte?: InputMaybe<Scalars['Bytes']['input']>;
  salt_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  salt_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  salt_contains?: InputMaybe<Scalars['Bytes']['input']>;
  salt_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ArrakisHook_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ArrakisHook_filter>>>;
};

export type ArrakisHook_orderBy =
  | 'id'
  | 'module'
  | 'salt'
  | 'createdAtTimestamp'
  | 'createdAtBlockNumber';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Bundle = {
  id: Scalars['ID']['output'];
  ethPriceUSD: Scalars['BigDecimal']['output'];
};

export type Bundle_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  ethPriceUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  ethPriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bundle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bundle_filter>>>;
};

export type Bundle_orderBy =
  | 'id'
  | 'ethPriceUSD';

export type ModifyLiquidity = {
  id: Scalars['ID']['output'];
  transaction: Transaction;
  timestamp: Scalars['BigInt']['output'];
  pool: Pool;
  token0: Token;
  token1: Token;
  sender?: Maybe<Scalars['Bytes']['output']>;
  origin: Scalars['Bytes']['output'];
  amount: Scalars['BigInt']['output'];
  amount0: Scalars['BigDecimal']['output'];
  amount1: Scalars['BigDecimal']['output'];
  amountUSD?: Maybe<Scalars['BigDecimal']['output']>;
  tickLower: Scalars['BigInt']['output'];
  tickUpper: Scalars['BigInt']['output'];
  logIndex?: Maybe<Scalars['BigInt']['output']>;
};

export type ModifyLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_filter>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_filter>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  origin?: InputMaybe<Scalars['Bytes']['input']>;
  origin_not?: InputMaybe<Scalars['Bytes']['input']>;
  origin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  origin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  origin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  origin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  origin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  origin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  origin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  origin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tickLower?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickLower_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ModifyLiquidity_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ModifyLiquidity_filter>>>;
};

export type ModifyLiquidity_orderBy =
  | 'id'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'timestamp'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__tickSpacing'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'pool__hooks'
  | 'token0'
  | 'token0__id'
  | 'token0__symbol'
  | 'token0__name'
  | 'token0__decimals'
  | 'token0__totalSupply'
  | 'token0__volume'
  | 'token0__volumeUSD'
  | 'token0__untrackedVolumeUSD'
  | 'token0__feesUSD'
  | 'token0__txCount'
  | 'token0__poolCount'
  | 'token0__totalValueLocked'
  | 'token0__totalValueLockedUSD'
  | 'token0__totalValueLockedUSDUntracked'
  | 'token0__derivedETH'
  | 'token1'
  | 'token1__id'
  | 'token1__symbol'
  | 'token1__name'
  | 'token1__decimals'
  | 'token1__totalSupply'
  | 'token1__volume'
  | 'token1__volumeUSD'
  | 'token1__untrackedVolumeUSD'
  | 'token1__feesUSD'
  | 'token1__txCount'
  | 'token1__poolCount'
  | 'token1__totalValueLocked'
  | 'token1__totalValueLockedUSD'
  | 'token1__totalValueLockedUSDUntracked'
  | 'token1__derivedETH'
  | 'sender'
  | 'origin'
  | 'amount'
  | 'amount0'
  | 'amount1'
  | 'amountUSD'
  | 'tickLower'
  | 'tickUpper'
  | 'logIndex';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Pool = {
  id: Scalars['ID']['output'];
  createdAtTimestamp: Scalars['BigInt']['output'];
  createdAtBlockNumber: Scalars['BigInt']['output'];
  token0: Token;
  token1: Token;
  feeTier: Scalars['BigInt']['output'];
  liquidity: Scalars['BigInt']['output'];
  sqrtPrice: Scalars['BigInt']['output'];
  token0Price: Scalars['BigDecimal']['output'];
  token1Price: Scalars['BigDecimal']['output'];
  tick?: Maybe<Scalars['BigInt']['output']>;
  tickSpacing: Scalars['BigInt']['output'];
  observationIndex: Scalars['BigInt']['output'];
  volumeToken0: Scalars['BigDecimal']['output'];
  volumeToken1: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
  collectedFeesToken0: Scalars['BigDecimal']['output'];
  collectedFeesToken1: Scalars['BigDecimal']['output'];
  collectedFeesUSD: Scalars['BigDecimal']['output'];
  totalValueLockedToken0: Scalars['BigDecimal']['output'];
  totalValueLockedToken1: Scalars['BigDecimal']['output'];
  totalValueLockedETH: Scalars['BigDecimal']['output'];
  totalValueLockedUSD: Scalars['BigDecimal']['output'];
  totalValueLockedUSDUntracked: Scalars['BigDecimal']['output'];
  liquidityProviderCount: Scalars['BigInt']['output'];
  poolHourData: Array<PoolHourData>;
  poolDayData: Array<PoolDayData>;
  hooks: Scalars['String']['output'];
  modifyLiquiditys: Array<ModifyLiquidity>;
  swaps: Array<Swap>;
  ticks: Array<Tick>;
  feeGrowthGlobal0X128: Scalars['BigInt']['output'];
  feeGrowthGlobal1X128: Scalars['BigInt']['output'];
  mints: Array<Mint>;
  burns: Array<Burn>;
  collects: Array<Collect>;
};


export type PoolpoolHourDataArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolHourData_filter>;
};


export type PoolpoolDayDataArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolDayData_filter>;
};


export type PoolmodifyLiquiditysArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ModifyLiquidity_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ModifyLiquidity_filter>;
};


export type PoolswapsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
};


export type PoolticksArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Tick_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Tick_filter>;
};


export type PoolmintsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
};


export type PoolburnsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Burn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Burn_filter>;
};


export type PoolcollectsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Collect_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Collect_filter>;
};

export type PoolDayData = {
  id: Scalars['ID']['output'];
  date: Scalars['Int']['output'];
  pool: Pool;
  liquidity: Scalars['BigInt']['output'];
  sqrtPrice: Scalars['BigInt']['output'];
  token0Price: Scalars['BigDecimal']['output'];
  token1Price: Scalars['BigDecimal']['output'];
  tick?: Maybe<Scalars['BigInt']['output']>;
  tvlUSD: Scalars['BigDecimal']['output'];
  volumeToken0: Scalars['BigDecimal']['output'];
  volumeToken1: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
  open: Scalars['BigDecimal']['output'];
  high: Scalars['BigDecimal']['output'];
  low: Scalars['BigDecimal']['output'];
  close: Scalars['BigDecimal']['output'];
  feeGrowthGlobal0X128: Scalars['BigInt']['output'];
  feeGrowthGlobal1X128: Scalars['BigInt']['output'];
};

export type PoolDayData_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sqrtPrice?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token0Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tick?: InputMaybe<Scalars['BigInt']['input']>;
  tick_not?: InputMaybe<Scalars['BigInt']['input']>;
  tick_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tick_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tvlUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  open?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolDayData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PoolDayData_filter>>>;
  feeGrowthGlobal0X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthGlobal0X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthGlobal1X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthGlobal1X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type PoolDayData_orderBy =
  | 'id'
  | 'date'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__tickSpacing'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'pool__hooks'
  | 'liquidity'
  | 'sqrtPrice'
  | 'token0Price'
  | 'token1Price'
  | 'tick'
  | 'tvlUSD'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'feesUSD'
  | 'txCount'
  | 'open'
  | 'high'
  | 'low'
  | 'close'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'feeGrowthGlobal0X128'
  | 'feeGrowthGlobal1X128';

export type PoolHourData = {
  id: Scalars['ID']['output'];
  periodStartUnix: Scalars['Int']['output'];
  pool: Pool;
  liquidity: Scalars['BigInt']['output'];
  sqrtPrice: Scalars['BigInt']['output'];
  token0Price: Scalars['BigDecimal']['output'];
  token1Price: Scalars['BigDecimal']['output'];
  tick?: Maybe<Scalars['BigInt']['output']>;
  tvlUSD: Scalars['BigDecimal']['output'];
  volumeToken0: Scalars['BigDecimal']['output'];
  volumeToken1: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
  open: Scalars['BigDecimal']['output'];
  high: Scalars['BigDecimal']['output'];
  low: Scalars['BigDecimal']['output'];
  close: Scalars['BigDecimal']['output'];
  feeGrowthGlobal0X128: Scalars['BigInt']['output'];
  feeGrowthGlobal1X128: Scalars['BigInt']['output'];
};

export type PoolHourData_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  periodStartUnix?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_not?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_gt?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_lt?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_gte?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_lte?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodStartUnix_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sqrtPrice?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token0Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tick?: InputMaybe<Scalars['BigInt']['input']>;
  tick_not?: InputMaybe<Scalars['BigInt']['input']>;
  tick_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tick_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tvlUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  open?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolHourData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PoolHourData_filter>>>;
  feeGrowthGlobal0X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthGlobal0X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthGlobal1X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthGlobal1X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type PoolHourData_orderBy =
  | 'id'
  | 'periodStartUnix'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__tickSpacing'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'pool__hooks'
  | 'liquidity'
  | 'sqrtPrice'
  | 'token0Price'
  | 'token1Price'
  | 'tick'
  | 'tvlUSD'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'feesUSD'
  | 'txCount'
  | 'open'
  | 'high'
  | 'low'
  | 'close'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'feeGrowthGlobal0X128'
  | 'feeGrowthGlobal1X128';

export type PoolManager = {
  id: Scalars['ID']['output'];
  poolCount: Scalars['BigInt']['output'];
  txCount: Scalars['BigInt']['output'];
  totalVolumeUSD: Scalars['BigDecimal']['output'];
  totalVolumeETH: Scalars['BigDecimal']['output'];
  totalFeesUSD: Scalars['BigDecimal']['output'];
  totalFeesETH: Scalars['BigDecimal']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
  totalValueLockedUSD: Scalars['BigDecimal']['output'];
  totalValueLockedETH: Scalars['BigDecimal']['output'];
  totalValueLockedUSDUntracked: Scalars['BigDecimal']['output'];
  totalValueLockedETHUntracked: Scalars['BigDecimal']['output'];
  owner: Scalars['ID']['output'];
};

export type PoolManager_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  poolCount?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSDUntracked?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSDUntracked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETHUntracked?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETHUntracked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  owner?: InputMaybe<Scalars['ID']['input']>;
  owner_not?: InputMaybe<Scalars['ID']['input']>;
  owner_gt?: InputMaybe<Scalars['ID']['input']>;
  owner_lt?: InputMaybe<Scalars['ID']['input']>;
  owner_gte?: InputMaybe<Scalars['ID']['input']>;
  owner_lte?: InputMaybe<Scalars['ID']['input']>;
  owner_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolManager_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PoolManager_filter>>>;
};

export type PoolManager_orderBy =
  | 'id'
  | 'poolCount'
  | 'txCount'
  | 'totalVolumeUSD'
  | 'totalVolumeETH'
  | 'totalFeesUSD'
  | 'totalFeesETH'
  | 'untrackedVolumeUSD'
  | 'totalValueLockedUSD'
  | 'totalValueLockedETH'
  | 'totalValueLockedUSDUntracked'
  | 'totalValueLockedETHUntracked'
  | 'owner';

export type Pool_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_filter>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_filter>;
  feeTier?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeTier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sqrtPrice?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token0Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tick?: InputMaybe<Scalars['BigInt']['input']>;
  tick_not?: InputMaybe<Scalars['BigInt']['input']>;
  tick_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tick_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickSpacing?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickSpacing_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  observationIndex?: InputMaybe<Scalars['BigInt']['input']>;
  observationIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  observationIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  observationIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  observationIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  observationIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  observationIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  observationIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collectedFeesToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSDUntracked?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSDUntracked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidityProviderCount?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityProviderCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolHourData_?: InputMaybe<PoolHourData_filter>;
  poolDayData_?: InputMaybe<PoolDayData_filter>;
  hooks?: InputMaybe<Scalars['String']['input']>;
  hooks_not?: InputMaybe<Scalars['String']['input']>;
  hooks_gt?: InputMaybe<Scalars['String']['input']>;
  hooks_lt?: InputMaybe<Scalars['String']['input']>;
  hooks_gte?: InputMaybe<Scalars['String']['input']>;
  hooks_lte?: InputMaybe<Scalars['String']['input']>;
  hooks_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hooks_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hooks_contains?: InputMaybe<Scalars['String']['input']>;
  hooks_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hooks_not_contains?: InputMaybe<Scalars['String']['input']>;
  hooks_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hooks_starts_with?: InputMaybe<Scalars['String']['input']>;
  hooks_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hooks_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hooks_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hooks_ends_with?: InputMaybe<Scalars['String']['input']>;
  hooks_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hooks_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hooks_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  modifyLiquiditys_?: InputMaybe<ModifyLiquidity_filter>;
  swaps_?: InputMaybe<Swap_filter>;
  ticks_?: InputMaybe<Tick_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pool_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Pool_filter>>>;
  feeGrowthGlobal0X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal0X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthGlobal0X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthGlobal1X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthGlobal1X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthGlobal1X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mints_?: InputMaybe<Mint_filter>;
  burns_?: InputMaybe<Burn_filter>;
  collects_?: InputMaybe<Collect_filter>;
};

export type Pool_orderBy =
  | 'id'
  | 'createdAtTimestamp'
  | 'createdAtBlockNumber'
  | 'token0'
  | 'token0__id'
  | 'token0__symbol'
  | 'token0__name'
  | 'token0__decimals'
  | 'token0__totalSupply'
  | 'token0__volume'
  | 'token0__volumeUSD'
  | 'token0__untrackedVolumeUSD'
  | 'token0__feesUSD'
  | 'token0__txCount'
  | 'token0__poolCount'
  | 'token0__totalValueLocked'
  | 'token0__totalValueLockedUSD'
  | 'token0__totalValueLockedUSDUntracked'
  | 'token0__derivedETH'
  | 'token1'
  | 'token1__id'
  | 'token1__symbol'
  | 'token1__name'
  | 'token1__decimals'
  | 'token1__totalSupply'
  | 'token1__volume'
  | 'token1__volumeUSD'
  | 'token1__untrackedVolumeUSD'
  | 'token1__feesUSD'
  | 'token1__txCount'
  | 'token1__poolCount'
  | 'token1__totalValueLocked'
  | 'token1__totalValueLockedUSD'
  | 'token1__totalValueLockedUSDUntracked'
  | 'token1__derivedETH'
  | 'feeTier'
  | 'liquidity'
  | 'sqrtPrice'
  | 'token0Price'
  | 'token1Price'
  | 'tick'
  | 'tickSpacing'
  | 'observationIndex'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'untrackedVolumeUSD'
  | 'feesUSD'
  | 'txCount'
  | 'collectedFeesToken0'
  | 'collectedFeesToken1'
  | 'collectedFeesUSD'
  | 'totalValueLockedToken0'
  | 'totalValueLockedToken1'
  | 'totalValueLockedETH'
  | 'totalValueLockedUSD'
  | 'totalValueLockedUSDUntracked'
  | 'liquidityProviderCount'
  | 'poolHourData'
  | 'poolDayData'
  | 'hooks'
  | 'modifyLiquiditys'
  | 'swaps'
  | 'ticks'
  | 'token0__version'
  | 'token1__version'
  | 'feeGrowthGlobal0X128'
  | 'feeGrowthGlobal1X128'
  | 'mints'
  | 'burns'
  | 'collects';

export type Position = {
  id: Scalars['ID']['output'];
  tokenId: Scalars['BigInt']['output'];
  owner: Scalars['Bytes']['output'];
  origin: Scalars['String']['output'];
  createdAtTimestamp: Scalars['BigInt']['output'];
  subscriptions: Array<Subscribe>;
  unsubscriptions: Array<Unsubscribe>;
  transfers: Array<Transfer>;
  pool: Pool;
  token0: Token;
  token1: Token;
  tickLower: Tick;
  tickUpper: Tick;
  liquidity: Scalars['BigInt']['output'];
  depositedToken0: Scalars['BigDecimal']['output'];
  depositedToken1: Scalars['BigDecimal']['output'];
  withdrawnToken0: Scalars['BigDecimal']['output'];
  withdrawnToken1: Scalars['BigDecimal']['output'];
  collectedToken0: Scalars['BigDecimal']['output'];
  collectedToken1: Scalars['BigDecimal']['output'];
  collectedFeesToken0: Scalars['BigDecimal']['output'];
  collectedFeesToken1: Scalars['BigDecimal']['output'];
  transaction: Transaction;
  feeGrowthInside0LastX128: Scalars['BigInt']['output'];
  feeGrowthInside1LastX128: Scalars['BigInt']['output'];
};


export type PositionsubscriptionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Subscribe_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subscribe_filter>;
};


export type PositionunsubscriptionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Unsubscribe_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Unsubscribe_filter>;
};


export type PositiontransfersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
};

export type Position_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  origin_not?: InputMaybe<Scalars['String']['input']>;
  origin_gt?: InputMaybe<Scalars['String']['input']>;
  origin_lt?: InputMaybe<Scalars['String']['input']>;
  origin_gte?: InputMaybe<Scalars['String']['input']>;
  origin_lte?: InputMaybe<Scalars['String']['input']>;
  origin_in?: InputMaybe<Array<Scalars['String']['input']>>;
  origin_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  origin_contains?: InputMaybe<Scalars['String']['input']>;
  origin_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_contains?: InputMaybe<Scalars['String']['input']>;
  origin_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_starts_with?: InputMaybe<Scalars['String']['input']>;
  origin_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  origin_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_ends_with?: InputMaybe<Scalars['String']['input']>;
  origin_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  origin_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subscriptions_?: InputMaybe<Subscribe_filter>;
  unsubscriptions_?: InputMaybe<Unsubscribe_filter>;
  transfers_?: InputMaybe<Transfer_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Position_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Position_filter>>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_filter>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_filter>;
  tickLower?: InputMaybe<Scalars['String']['input']>;
  tickLower_not?: InputMaybe<Scalars['String']['input']>;
  tickLower_gt?: InputMaybe<Scalars['String']['input']>;
  tickLower_lt?: InputMaybe<Scalars['String']['input']>;
  tickLower_gte?: InputMaybe<Scalars['String']['input']>;
  tickLower_lte?: InputMaybe<Scalars['String']['input']>;
  tickLower_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tickLower_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tickLower_contains?: InputMaybe<Scalars['String']['input']>;
  tickLower_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tickLower_not_contains?: InputMaybe<Scalars['String']['input']>;
  tickLower_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tickLower_starts_with?: InputMaybe<Scalars['String']['input']>;
  tickLower_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickLower_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tickLower_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickLower_ends_with?: InputMaybe<Scalars['String']['input']>;
  tickLower_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickLower_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tickLower_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickLower_?: InputMaybe<Tick_filter>;
  tickUpper?: InputMaybe<Scalars['String']['input']>;
  tickUpper_not?: InputMaybe<Scalars['String']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['String']['input']>;
  tickUpper_lt?: InputMaybe<Scalars['String']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['String']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['String']['input']>;
  tickUpper_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tickUpper_contains?: InputMaybe<Scalars['String']['input']>;
  tickUpper_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tickUpper_not_contains?: InputMaybe<Scalars['String']['input']>;
  tickUpper_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tickUpper_starts_with?: InputMaybe<Scalars['String']['input']>;
  tickUpper_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickUpper_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tickUpper_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickUpper_ends_with?: InputMaybe<Scalars['String']['input']>;
  tickUpper_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickUpper_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tickUpper_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickUpper_?: InputMaybe<Tick_filter>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositedToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  depositedToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  depositedToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  depositedToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  withdrawnToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  withdrawnToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  withdrawnToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  withdrawnToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  feeGrowthInside0LastX128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthInside0LastX128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthInside1LastX128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthInside1LastX128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type Position_orderBy =
  | 'id'
  | 'tokenId'
  | 'owner'
  | 'origin'
  | 'createdAtTimestamp'
  | 'subscriptions'
  | 'unsubscriptions'
  | 'transfers'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'token0'
  | 'token0__id'
  | 'token0__symbol'
  | 'token0__name'
  | 'token0__decimals'
  | 'token0__totalSupply'
  | 'token0__volume'
  | 'token0__volumeUSD'
  | 'token0__untrackedVolumeUSD'
  | 'token0__feesUSD'
  | 'token0__txCount'
  | 'token0__poolCount'
  | 'token0__totalValueLocked'
  | 'token0__totalValueLockedUSD'
  | 'token0__totalValueLockedUSDUntracked'
  | 'token0__derivedETH'
  | 'token0__version'
  | 'token1'
  | 'token1__id'
  | 'token1__symbol'
  | 'token1__name'
  | 'token1__decimals'
  | 'token1__totalSupply'
  | 'token1__volume'
  | 'token1__volumeUSD'
  | 'token1__untrackedVolumeUSD'
  | 'token1__feesUSD'
  | 'token1__txCount'
  | 'token1__poolCount'
  | 'token1__totalValueLocked'
  | 'token1__totalValueLockedUSD'
  | 'token1__totalValueLockedUSDUntracked'
  | 'token1__derivedETH'
  | 'token1__version'
  | 'tickLower'
  | 'tickLower__id'
  | 'tickLower__poolAddress'
  | 'tickLower__tickIdx'
  | 'tickLower__liquidityGross'
  | 'tickLower__liquidityNet'
  | 'tickLower__price0'
  | 'tickLower__price1'
  | 'tickLower__volumeToken0'
  | 'tickLower__volumeToken1'
  | 'tickLower__volumeUSD'
  | 'tickLower__untrackedVolumeUSD'
  | 'tickLower__feesUSD'
  | 'tickLower__collectedFeesToken0'
  | 'tickLower__collectedFeesToken1'
  | 'tickLower__collectedFeesUSD'
  | 'tickLower__createdAtTimestamp'
  | 'tickLower__createdAtBlockNumber'
  | 'tickLower__liquidityProviderCount'
  | 'tickLower__feeGrowthOutside0X128'
  | 'tickLower__feeGrowthOutside1X128'
  | 'tickUpper'
  | 'tickUpper__id'
  | 'tickUpper__poolAddress'
  | 'tickUpper__tickIdx'
  | 'tickUpper__liquidityGross'
  | 'tickUpper__liquidityNet'
  | 'tickUpper__price0'
  | 'tickUpper__price1'
  | 'tickUpper__volumeToken0'
  | 'tickUpper__volumeToken1'
  | 'tickUpper__volumeUSD'
  | 'tickUpper__untrackedVolumeUSD'
  | 'tickUpper__feesUSD'
  | 'tickUpper__collectedFeesToken0'
  | 'tickUpper__collectedFeesToken1'
  | 'tickUpper__collectedFeesUSD'
  | 'tickUpper__createdAtTimestamp'
  | 'tickUpper__createdAtBlockNumber'
  | 'tickUpper__liquidityProviderCount'
  | 'tickUpper__feeGrowthOutside0X128'
  | 'tickUpper__feeGrowthOutside1X128'
  | 'liquidity'
  | 'depositedToken0'
  | 'depositedToken1'
  | 'withdrawnToken0'
  | 'withdrawnToken1'
  | 'collectedToken0'
  | 'collectedToken1'
  | 'collectedFeesToken0'
  | 'collectedFeesToken1'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'feeGrowthInside0LastX128'
  | 'feeGrowthInside1LastX128';

export type Subscribe = {
  id: Scalars['ID']['output'];
  tokenId: Scalars['BigInt']['output'];
  address: Scalars['String']['output'];
  transaction: Transaction;
  logIndex: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  origin: Scalars['String']['output'];
  position: Position;
};

export type Subscribe_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  origin?: InputMaybe<Scalars['String']['input']>;
  origin_not?: InputMaybe<Scalars['String']['input']>;
  origin_gt?: InputMaybe<Scalars['String']['input']>;
  origin_lt?: InputMaybe<Scalars['String']['input']>;
  origin_gte?: InputMaybe<Scalars['String']['input']>;
  origin_lte?: InputMaybe<Scalars['String']['input']>;
  origin_in?: InputMaybe<Array<Scalars['String']['input']>>;
  origin_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  origin_contains?: InputMaybe<Scalars['String']['input']>;
  origin_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_contains?: InputMaybe<Scalars['String']['input']>;
  origin_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_starts_with?: InputMaybe<Scalars['String']['input']>;
  origin_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  origin_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_ends_with?: InputMaybe<Scalars['String']['input']>;
  origin_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  origin_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Subscribe_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Subscribe_filter>>>;
};

export type Subscribe_orderBy =
  | 'id'
  | 'tokenId'
  | 'address'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'logIndex'
  | 'timestamp'
  | 'origin'
  | 'position'
  | 'position__id'
  | 'position__tokenId'
  | 'position__owner'
  | 'position__origin'
  | 'position__createdAtTimestamp';

export type Swap = {
  id: Scalars['ID']['output'];
  transaction: Transaction;
  timestamp: Scalars['BigInt']['output'];
  pool: Pool;
  token0: Token;
  token1: Token;
  sender: Scalars['Bytes']['output'];
  origin: Scalars['Bytes']['output'];
  amount0: Scalars['BigDecimal']['output'];
  amount1: Scalars['BigDecimal']['output'];
  amountUSD: Scalars['BigDecimal']['output'];
  sqrtPriceX96: Scalars['BigInt']['output'];
  tick: Scalars['BigInt']['output'];
  logIndex?: Maybe<Scalars['BigInt']['output']>;
  recipient: Scalars['Bytes']['output'];
};

export type Swap_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_filter>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_filter>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  origin?: InputMaybe<Scalars['Bytes']['input']>;
  origin_not?: InputMaybe<Scalars['Bytes']['input']>;
  origin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  origin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  origin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  origin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  origin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  origin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  origin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  origin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  sqrtPriceX96?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPriceX96_not?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPriceX96_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPriceX96_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPriceX96_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPriceX96_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPriceX96_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sqrtPriceX96_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tick?: InputMaybe<Scalars['BigInt']['input']>;
  tick_not?: InputMaybe<Scalars['BigInt']['input']>;
  tick_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tick_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Swap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Swap_filter>>>;
  recipient?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_lt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipient_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
};

export type Swap_orderBy =
  | 'id'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'timestamp'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__tickSpacing'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'pool__hooks'
  | 'token0'
  | 'token0__id'
  | 'token0__symbol'
  | 'token0__name'
  | 'token0__decimals'
  | 'token0__totalSupply'
  | 'token0__volume'
  | 'token0__volumeUSD'
  | 'token0__untrackedVolumeUSD'
  | 'token0__feesUSD'
  | 'token0__txCount'
  | 'token0__poolCount'
  | 'token0__totalValueLocked'
  | 'token0__totalValueLockedUSD'
  | 'token0__totalValueLockedUSDUntracked'
  | 'token0__derivedETH'
  | 'token1'
  | 'token1__id'
  | 'token1__symbol'
  | 'token1__name'
  | 'token1__decimals'
  | 'token1__totalSupply'
  | 'token1__volume'
  | 'token1__volumeUSD'
  | 'token1__untrackedVolumeUSD'
  | 'token1__feesUSD'
  | 'token1__txCount'
  | 'token1__poolCount'
  | 'token1__totalValueLocked'
  | 'token1__totalValueLockedUSD'
  | 'token1__totalValueLockedUSDUntracked'
  | 'token1__derivedETH'
  | 'sender'
  | 'origin'
  | 'amount0'
  | 'amount1'
  | 'amountUSD'
  | 'sqrtPriceX96'
  | 'tick'
  | 'logIndex'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'token0__version'
  | 'token1__version'
  | 'recipient';

export type Tick = {
  id: Scalars['ID']['output'];
  poolAddress?: Maybe<Scalars['String']['output']>;
  tickIdx: Scalars['BigInt']['output'];
  pool: Pool;
  liquidityGross: Scalars['BigInt']['output'];
  liquidityNet: Scalars['BigInt']['output'];
  price0: Scalars['BigDecimal']['output'];
  price1: Scalars['BigDecimal']['output'];
  createdAtTimestamp: Scalars['BigInt']['output'];
  createdAtBlockNumber: Scalars['BigInt']['output'];
  volumeToken0: Scalars['BigDecimal']['output'];
  volumeToken1: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
  collectedFeesToken0: Scalars['BigDecimal']['output'];
  collectedFeesToken1: Scalars['BigDecimal']['output'];
  collectedFeesUSD: Scalars['BigDecimal']['output'];
  liquidityProviderCount: Scalars['BigInt']['output'];
  feeGrowthOutside0X128: Scalars['BigInt']['output'];
  feeGrowthOutside1X128: Scalars['BigInt']['output'];
};

export type Tick_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  poolAddress?: InputMaybe<Scalars['String']['input']>;
  poolAddress_not?: InputMaybe<Scalars['String']['input']>;
  poolAddress_gt?: InputMaybe<Scalars['String']['input']>;
  poolAddress_lt?: InputMaybe<Scalars['String']['input']>;
  poolAddress_gte?: InputMaybe<Scalars['String']['input']>;
  poolAddress_lte?: InputMaybe<Scalars['String']['input']>;
  poolAddress_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolAddress_contains?: InputMaybe<Scalars['String']['input']>;
  poolAddress_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  poolAddress_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolAddress_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolAddress_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickIdx?: InputMaybe<Scalars['BigInt']['input']>;
  tickIdx_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickIdx_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickIdx_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickIdx_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickIdx_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickIdx_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickIdx_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  liquidityGross?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityGross_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityNet?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityNet_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price0?: InputMaybe<Scalars['BigDecimal']['input']>;
  price0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  price0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  price0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  price0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  price0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  price0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  price0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  price1?: InputMaybe<Scalars['BigDecimal']['input']>;
  price1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  price1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  price1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  price1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  price1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  price1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  price1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Tick_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Tick_filter>>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidityProviderCount?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityProviderCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthOutside0X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthOutside0X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthOutside1X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthOutside1X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type Tick_orderBy =
  | 'id'
  | 'poolAddress'
  | 'tickIdx'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__tickSpacing'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'pool__hooks'
  | 'liquidityGross'
  | 'liquidityNet'
  | 'price0'
  | 'price1'
  | 'createdAtTimestamp'
  | 'createdAtBlockNumber'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'untrackedVolumeUSD'
  | 'feesUSD'
  | 'collectedFeesToken0'
  | 'collectedFeesToken1'
  | 'collectedFeesUSD'
  | 'liquidityProviderCount'
  | 'feeGrowthOutside0X128'
  | 'feeGrowthOutside1X128';

export type Token = {
  id: Scalars['ID']['output'];
  symbol: Scalars['String']['output'];
  name: Scalars['String']['output'];
  decimals: Scalars['BigInt']['output'];
  totalSupply: Scalars['BigInt']['output'];
  volume: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
  poolCount: Scalars['BigInt']['output'];
  totalValueLocked: Scalars['BigDecimal']['output'];
  totalValueLockedUSD: Scalars['BigDecimal']['output'];
  totalValueLockedUSDUntracked: Scalars['BigDecimal']['output'];
  derivedETH: Scalars['BigDecimal']['output'];
  whitelistPools: Array<Pool>;
  tokenDayData: Array<TokenDayData>;
  version?: Maybe<Scalars['Int']['output']>;
};


export type TokenwhitelistPoolsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
};


export type TokentokenDayDataArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenDayData_filter>;
};

export type TokenDayData = {
  id: Scalars['ID']['output'];
  date: Scalars['Int']['output'];
  token: Token;
  volume: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
  totalValueLocked: Scalars['BigDecimal']['output'];
  totalValueLockedUSD: Scalars['BigDecimal']['output'];
  priceUSD: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
  open: Scalars['BigDecimal']['output'];
  high: Scalars['BigDecimal']['output'];
  low: Scalars['BigDecimal']['output'];
  close: Scalars['BigDecimal']['output'];
};

export type TokenDayData_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_filter>;
  volume?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLocked?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLocked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  priceUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenDayData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokenDayData_filter>>>;
};

export type TokenDayData_orderBy =
  | 'id'
  | 'date'
  | 'token'
  | 'token__id'
  | 'token__symbol'
  | 'token__name'
  | 'token__decimals'
  | 'token__totalSupply'
  | 'token__volume'
  | 'token__volumeUSD'
  | 'token__untrackedVolumeUSD'
  | 'token__feesUSD'
  | 'token__txCount'
  | 'token__poolCount'
  | 'token__totalValueLocked'
  | 'token__totalValueLockedUSD'
  | 'token__totalValueLockedUSDUntracked'
  | 'token__derivedETH'
  | 'volume'
  | 'volumeUSD'
  | 'untrackedVolumeUSD'
  | 'totalValueLocked'
  | 'totalValueLockedUSD'
  | 'priceUSD'
  | 'feesUSD'
  | 'open'
  | 'high'
  | 'low'
  | 'close'
  | 'token__version';

export type TokenHourData = {
  id: Scalars['ID']['output'];
  periodStartUnix: Scalars['Int']['output'];
  token: Token;
  volume: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
  totalValueLocked: Scalars['BigDecimal']['output'];
  totalValueLockedUSD: Scalars['BigDecimal']['output'];
  priceUSD: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
  open: Scalars['BigDecimal']['output'];
  high: Scalars['BigDecimal']['output'];
  low: Scalars['BigDecimal']['output'];
  close: Scalars['BigDecimal']['output'];
};

export type TokenHourData_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  periodStartUnix?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_not?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_gt?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_lt?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_gte?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_lte?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodStartUnix_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_filter>;
  volume?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLocked?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLocked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  priceUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenHourData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokenHourData_filter>>>;
};

export type TokenHourData_orderBy =
  | 'id'
  | 'periodStartUnix'
  | 'token'
  | 'token__id'
  | 'token__symbol'
  | 'token__name'
  | 'token__decimals'
  | 'token__totalSupply'
  | 'token__volume'
  | 'token__volumeUSD'
  | 'token__untrackedVolumeUSD'
  | 'token__feesUSD'
  | 'token__txCount'
  | 'token__poolCount'
  | 'token__totalValueLocked'
  | 'token__totalValueLockedUSD'
  | 'token__totalValueLockedUSDUntracked'
  | 'token__derivedETH'
  | 'volume'
  | 'volumeUSD'
  | 'untrackedVolumeUSD'
  | 'totalValueLocked'
  | 'totalValueLockedUSD'
  | 'priceUSD'
  | 'feesUSD'
  | 'open'
  | 'high'
  | 'low'
  | 'close'
  | 'token__version';

export type Token_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  decimals?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_lt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  volume?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolCount?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalValueLocked?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLocked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLocked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSDUntracked?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSDUntracked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  derivedETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  derivedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  whitelistPools?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_not?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_?: InputMaybe<Pool_filter>;
  tokenDayData_?: InputMaybe<TokenDayData_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Token_filter>>>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_not?: InputMaybe<Scalars['Int']['input']>;
  version_gt?: InputMaybe<Scalars['Int']['input']>;
  version_lt?: InputMaybe<Scalars['Int']['input']>;
  version_gte?: InputMaybe<Scalars['Int']['input']>;
  version_lte?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Token_orderBy =
  | 'id'
  | 'symbol'
  | 'name'
  | 'decimals'
  | 'totalSupply'
  | 'volume'
  | 'volumeUSD'
  | 'untrackedVolumeUSD'
  | 'feesUSD'
  | 'txCount'
  | 'poolCount'
  | 'totalValueLocked'
  | 'totalValueLockedUSD'
  | 'totalValueLockedUSDUntracked'
  | 'derivedETH'
  | 'whitelistPools'
  | 'tokenDayData'
  | 'version';

export type Transaction = {
  id: Scalars['ID']['output'];
  blockNumber: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  gasPrice: Scalars['BigInt']['output'];
  modifyLiquiditys: Array<Maybe<ModifyLiquidity>>;
  swaps: Array<Maybe<Swap>>;
  transfers: Array<Maybe<Transfer>>;
  subscriptions: Array<Maybe<Subscribe>>;
  unsubscriptions: Array<Maybe<Unsubscribe>>;
  mints: Array<Maybe<Mint>>;
  burns: Array<Maybe<Burn>>;
  flashed: Array<Maybe<Flash>>;
  collects: Array<Maybe<Collect>>;
};


export type TransactionmodifyLiquiditysArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ModifyLiquidity_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ModifyLiquidity_filter>;
};


export type TransactionswapsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
};


export type TransactiontransfersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
};


export type TransactionsubscriptionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Subscribe_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subscribe_filter>;
};


export type TransactionunsubscriptionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Unsubscribe_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Unsubscribe_filter>;
};


export type TransactionmintsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
};


export type TransactionburnsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Burn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Burn_filter>;
};


export type TransactionflashedArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Flash_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Flash_filter>;
};


export type TransactioncollectsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Collect_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Collect_filter>;
};

export type Transaction_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  modifyLiquiditys_?: InputMaybe<ModifyLiquidity_filter>;
  swaps_?: InputMaybe<Swap_filter>;
  transfers_?: InputMaybe<Transfer_filter>;
  subscriptions_?: InputMaybe<Subscribe_filter>;
  unsubscriptions_?: InputMaybe<Unsubscribe_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transaction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transaction_filter>>>;
  mints_?: InputMaybe<Mint_filter>;
  burns_?: InputMaybe<Burn_filter>;
  flashed_?: InputMaybe<Flash_filter>;
  collects_?: InputMaybe<Collect_filter>;
};

export type Transaction_orderBy =
  | 'id'
  | 'blockNumber'
  | 'timestamp'
  | 'gasUsed'
  | 'gasPrice'
  | 'modifyLiquiditys'
  | 'swaps'
  | 'transfers'
  | 'subscriptions'
  | 'unsubscriptions'
  | 'mints'
  | 'burns'
  | 'flashed'
  | 'collects';

export type Transfer = {
  id: Scalars['ID']['output'];
  tokenId: Scalars['BigInt']['output'];
  from: Scalars['String']['output'];
  to: Scalars['String']['output'];
  transaction: Transaction;
  logIndex: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  origin: Scalars['String']['output'];
  position: Position;
};

export type Transfer_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  origin?: InputMaybe<Scalars['String']['input']>;
  origin_not?: InputMaybe<Scalars['String']['input']>;
  origin_gt?: InputMaybe<Scalars['String']['input']>;
  origin_lt?: InputMaybe<Scalars['String']['input']>;
  origin_gte?: InputMaybe<Scalars['String']['input']>;
  origin_lte?: InputMaybe<Scalars['String']['input']>;
  origin_in?: InputMaybe<Array<Scalars['String']['input']>>;
  origin_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  origin_contains?: InputMaybe<Scalars['String']['input']>;
  origin_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_contains?: InputMaybe<Scalars['String']['input']>;
  origin_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_starts_with?: InputMaybe<Scalars['String']['input']>;
  origin_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  origin_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_ends_with?: InputMaybe<Scalars['String']['input']>;
  origin_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  origin_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
};

export type Transfer_orderBy =
  | 'id'
  | 'tokenId'
  | 'from'
  | 'to'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'logIndex'
  | 'timestamp'
  | 'origin'
  | 'position'
  | 'position__id'
  | 'position__tokenId'
  | 'position__owner'
  | 'position__origin'
  | 'position__createdAtTimestamp';

export type UniswapDayData = {
  id: Scalars['ID']['output'];
  date: Scalars['Int']['output'];
  volumeETH: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  volumeUSDUntracked: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
  tvlUSD: Scalars['BigDecimal']['output'];
};

export type UniswapDayData_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSDUntracked?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSDUntracked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSDUntracked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSDUntracked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSDUntracked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSDUntracked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSDUntracked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSDUntracked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tvlUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tvlUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UniswapDayData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UniswapDayData_filter>>>;
};

export type UniswapDayData_orderBy =
  | 'id'
  | 'date'
  | 'volumeETH'
  | 'volumeUSD'
  | 'volumeUSDUntracked'
  | 'feesUSD'
  | 'txCount'
  | 'tvlUSD';

export type Unsubscribe = {
  id: Scalars['ID']['output'];
  tokenId: Scalars['BigInt']['output'];
  address: Scalars['String']['output'];
  transaction: Transaction;
  logIndex: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  origin: Scalars['String']['output'];
  position: Position;
};

export type Unsubscribe_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  origin?: InputMaybe<Scalars['String']['input']>;
  origin_not?: InputMaybe<Scalars['String']['input']>;
  origin_gt?: InputMaybe<Scalars['String']['input']>;
  origin_lt?: InputMaybe<Scalars['String']['input']>;
  origin_gte?: InputMaybe<Scalars['String']['input']>;
  origin_lte?: InputMaybe<Scalars['String']['input']>;
  origin_in?: InputMaybe<Array<Scalars['String']['input']>>;
  origin_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  origin_contains?: InputMaybe<Scalars['String']['input']>;
  origin_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_contains?: InputMaybe<Scalars['String']['input']>;
  origin_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_starts_with?: InputMaybe<Scalars['String']['input']>;
  origin_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  origin_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_ends_with?: InputMaybe<Scalars['String']['input']>;
  origin_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  origin_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  origin_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Unsubscribe_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Unsubscribe_filter>>>;
};

export type Unsubscribe_orderBy =
  | 'id'
  | 'tokenId'
  | 'address'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'logIndex'
  | 'timestamp'
  | 'origin'
  | 'position'
  | 'position__id'
  | 'position__tokenId'
  | 'position__owner'
  | 'position__origin'
  | 'position__createdAtTimestamp';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type Burn = {
  id: Scalars['ID']['output'];
  transaction: Transaction;
  pool: Pool;
  token0: Token;
  token1: Token;
  timestamp: Scalars['BigInt']['output'];
  owner?: Maybe<Scalars['Bytes']['output']>;
  origin: Scalars['Bytes']['output'];
  amount: Scalars['BigInt']['output'];
  amount0: Scalars['BigDecimal']['output'];
  amount1: Scalars['BigDecimal']['output'];
  amountUSD?: Maybe<Scalars['BigDecimal']['output']>;
  tickLower: Scalars['BigInt']['output'];
  tickUpper: Scalars['BigInt']['output'];
  logIndex?: Maybe<Scalars['BigInt']['output']>;
};

export type Burn_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_filter>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  origin?: InputMaybe<Scalars['Bytes']['input']>;
  origin_not?: InputMaybe<Scalars['Bytes']['input']>;
  origin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  origin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  origin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  origin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  origin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  origin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  origin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  origin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tickLower?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickLower_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Burn_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Burn_filter>>>;
};

export type Burn_orderBy =
  | 'id'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'token0'
  | 'token0__id'
  | 'token0__symbol'
  | 'token0__name'
  | 'token0__decimals'
  | 'token0__totalSupply'
  | 'token0__volume'
  | 'token0__volumeUSD'
  | 'token0__untrackedVolumeUSD'
  | 'token0__feesUSD'
  | 'token0__txCount'
  | 'token0__poolCount'
  | 'token0__totalValueLocked'
  | 'token0__totalValueLockedUSD'
  | 'token0__totalValueLockedUSDUntracked'
  | 'token0__derivedETH'
  | 'token0__version'
  | 'token1'
  | 'token1__id'
  | 'token1__symbol'
  | 'token1__name'
  | 'token1__decimals'
  | 'token1__totalSupply'
  | 'token1__volume'
  | 'token1__volumeUSD'
  | 'token1__untrackedVolumeUSD'
  | 'token1__feesUSD'
  | 'token1__txCount'
  | 'token1__poolCount'
  | 'token1__totalValueLocked'
  | 'token1__totalValueLockedUSD'
  | 'token1__totalValueLockedUSDUntracked'
  | 'token1__derivedETH'
  | 'token1__version'
  | 'timestamp'
  | 'owner'
  | 'origin'
  | 'amount'
  | 'amount0'
  | 'amount1'
  | 'amountUSD'
  | 'tickLower'
  | 'tickUpper'
  | 'logIndex';

export type Collect = {
  id: Scalars['ID']['output'];
  transaction: Transaction;
  timestamp: Scalars['BigInt']['output'];
  pool: Pool;
  owner?: Maybe<Scalars['Bytes']['output']>;
  amount0: Scalars['BigDecimal']['output'];
  amount1: Scalars['BigDecimal']['output'];
  amountUSD?: Maybe<Scalars['BigDecimal']['output']>;
  tickLower: Scalars['BigInt']['output'];
  tickUpper: Scalars['BigInt']['output'];
  logIndex?: Maybe<Scalars['BigInt']['output']>;
};

export type Collect_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tickLower?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickLower_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Collect_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Collect_filter>>>;
};

export type Collect_orderBy =
  | 'id'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'timestamp'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'owner'
  | 'amount0'
  | 'amount1'
  | 'amountUSD'
  | 'tickLower'
  | 'tickUpper'
  | 'logIndex';

export type Factory = {
  id: Scalars['ID']['output'];
  poolCount: Scalars['BigInt']['output'];
  txCount: Scalars['BigInt']['output'];
  totalVolumeUSD: Scalars['BigDecimal']['output'];
  totalVolumeETH: Scalars['BigDecimal']['output'];
  totalFeesUSD: Scalars['BigDecimal']['output'];
  totalFeesETH: Scalars['BigDecimal']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
  totalValueLockedUSD: Scalars['BigDecimal']['output'];
  totalValueLockedETH: Scalars['BigDecimal']['output'];
  totalValueLockedUSDUntracked: Scalars['BigDecimal']['output'];
  totalValueLockedETHUntracked: Scalars['BigDecimal']['output'];
  owner: Scalars['ID']['output'];
};

export type Factory_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  poolCount?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalFeesETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalFeesETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSDUntracked?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSDUntracked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSDUntracked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETHUntracked?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETHUntracked_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETHUntracked_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  owner?: InputMaybe<Scalars['ID']['input']>;
  owner_not?: InputMaybe<Scalars['ID']['input']>;
  owner_gt?: InputMaybe<Scalars['ID']['input']>;
  owner_lt?: InputMaybe<Scalars['ID']['input']>;
  owner_gte?: InputMaybe<Scalars['ID']['input']>;
  owner_lte?: InputMaybe<Scalars['ID']['input']>;
  owner_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Factory_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Factory_filter>>>;
};

export type Factory_orderBy =
  | 'id'
  | 'poolCount'
  | 'txCount'
  | 'totalVolumeUSD'
  | 'totalVolumeETH'
  | 'totalFeesUSD'
  | 'totalFeesETH'
  | 'untrackedVolumeUSD'
  | 'totalValueLockedUSD'
  | 'totalValueLockedETH'
  | 'totalValueLockedUSDUntracked'
  | 'totalValueLockedETHUntracked'
  | 'owner';

export type Flash = {
  id: Scalars['ID']['output'];
  transaction: Transaction;
  timestamp: Scalars['BigInt']['output'];
  pool: Pool;
  sender: Scalars['Bytes']['output'];
  recipient: Scalars['Bytes']['output'];
  amount0: Scalars['BigDecimal']['output'];
  amount1: Scalars['BigDecimal']['output'];
  amountUSD: Scalars['BigDecimal']['output'];
  amount0Paid: Scalars['BigDecimal']['output'];
  amount1Paid: Scalars['BigDecimal']['output'];
  logIndex?: Maybe<Scalars['BigInt']['output']>;
};

export type Flash_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipient?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_lt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipient_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0Paid?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Paid_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Paid_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Paid_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Paid_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Paid_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0Paid_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0Paid_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1Paid?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Paid_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Paid_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Paid_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Paid_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Paid_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1Paid_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1Paid_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Flash_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Flash_filter>>>;
};

export type Flash_orderBy =
  | 'id'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'timestamp'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'sender'
  | 'recipient'
  | 'amount0'
  | 'amount1'
  | 'amountUSD'
  | 'amount0Paid'
  | 'amount1Paid'
  | 'logIndex';

export type Mint = {
  id: Scalars['ID']['output'];
  transaction: Transaction;
  timestamp: Scalars['BigInt']['output'];
  pool: Pool;
  token0: Token;
  token1: Token;
  owner: Scalars['Bytes']['output'];
  sender?: Maybe<Scalars['Bytes']['output']>;
  origin: Scalars['Bytes']['output'];
  amount: Scalars['BigInt']['output'];
  amount0: Scalars['BigDecimal']['output'];
  amount1: Scalars['BigDecimal']['output'];
  amountUSD?: Maybe<Scalars['BigDecimal']['output']>;
  tickLower: Scalars['BigInt']['output'];
  tickUpper: Scalars['BigInt']['output'];
  logIndex?: Maybe<Scalars['BigInt']['output']>;
};

export type Mint_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_filter>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_filter>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  origin?: InputMaybe<Scalars['Bytes']['input']>;
  origin_not?: InputMaybe<Scalars['Bytes']['input']>;
  origin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  origin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  origin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  origin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  origin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  origin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  origin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  origin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tickLower?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickLower_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Mint_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Mint_filter>>>;
};

export type Mint_orderBy =
  | 'id'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'timestamp'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'token0'
  | 'token0__id'
  | 'token0__symbol'
  | 'token0__name'
  | 'token0__decimals'
  | 'token0__totalSupply'
  | 'token0__volume'
  | 'token0__volumeUSD'
  | 'token0__untrackedVolumeUSD'
  | 'token0__feesUSD'
  | 'token0__txCount'
  | 'token0__poolCount'
  | 'token0__totalValueLocked'
  | 'token0__totalValueLockedUSD'
  | 'token0__totalValueLockedUSDUntracked'
  | 'token0__derivedETH'
  | 'token0__version'
  | 'token1'
  | 'token1__id'
  | 'token1__symbol'
  | 'token1__name'
  | 'token1__decimals'
  | 'token1__totalSupply'
  | 'token1__volume'
  | 'token1__volumeUSD'
  | 'token1__untrackedVolumeUSD'
  | 'token1__feesUSD'
  | 'token1__txCount'
  | 'token1__poolCount'
  | 'token1__totalValueLocked'
  | 'token1__totalValueLockedUSD'
  | 'token1__totalValueLockedUSDUntracked'
  | 'token1__derivedETH'
  | 'token1__version'
  | 'owner'
  | 'sender'
  | 'origin'
  | 'amount'
  | 'amount0'
  | 'amount1'
  | 'amountUSD'
  | 'tickLower'
  | 'tickUpper'
  | 'logIndex';

export type PositionSnapshot = {
  id: Scalars['ID']['output'];
  owner: Scalars['Bytes']['output'];
  pool: Pool;
  position: Position;
  blockNumber: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  liquidity: Scalars['BigInt']['output'];
  depositedToken0: Scalars['BigDecimal']['output'];
  depositedToken1: Scalars['BigDecimal']['output'];
  withdrawnToken0: Scalars['BigDecimal']['output'];
  withdrawnToken1: Scalars['BigDecimal']['output'];
  collectedFeesToken0: Scalars['BigDecimal']['output'];
  collectedFeesToken1: Scalars['BigDecimal']['output'];
  transaction: Transaction;
  feeGrowthInside0LastX128: Scalars['BigInt']['output'];
  feeGrowthInside1LastX128: Scalars['BigInt']['output'];
};

export type PositionSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositedToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  depositedToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  depositedToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  depositedToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  depositedToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  withdrawnToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  withdrawnToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  withdrawnToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  withdrawnToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  withdrawnToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collectedFeesToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collectedFeesToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_filter>;
  feeGrowthInside0LastX128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside0LastX128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthInside0LastX128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthInside1LastX128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthInside1LastX128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthInside1LastX128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PositionSnapshot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PositionSnapshot_filter>>>;
};

export type PositionSnapshot_orderBy =
  | 'id'
  | 'owner'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'position'
  | 'position__id'
  | 'position__owner'
  | 'position__liquidity'
  | 'position__depositedToken0'
  | 'position__depositedToken1'
  | 'position__withdrawnToken0'
  | 'position__withdrawnToken1'
  | 'position__collectedToken0'
  | 'position__collectedToken1'
  | 'position__collectedFeesToken0'
  | 'position__collectedFeesToken1'
  | 'position__feeGrowthInside0LastX128'
  | 'position__feeGrowthInside1LastX128'
  | 'blockNumber'
  | 'timestamp'
  | 'liquidity'
  | 'depositedToken0'
  | 'depositedToken1'
  | 'withdrawnToken0'
  | 'withdrawnToken1'
  | 'collectedFeesToken0'
  | 'collectedFeesToken1'
  | 'transaction'
  | 'transaction__id'
  | 'transaction__blockNumber'
  | 'transaction__timestamp'
  | 'transaction__gasUsed'
  | 'transaction__gasPrice'
  | 'feeGrowthInside0LastX128'
  | 'feeGrowthInside1LastX128';

export type TickDayData = {
  id: Scalars['ID']['output'];
  date: Scalars['Int']['output'];
  pool: Pool;
  tick: Tick;
  liquidityGross: Scalars['BigInt']['output'];
  liquidityNet: Scalars['BigInt']['output'];
  volumeToken0: Scalars['BigDecimal']['output'];
  volumeToken1: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
  feeGrowthOutside0X128: Scalars['BigInt']['output'];
  feeGrowthOutside1X128: Scalars['BigInt']['output'];
};

export type TickDayData_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  tick?: InputMaybe<Scalars['String']['input']>;
  tick_not?: InputMaybe<Scalars['String']['input']>;
  tick_gt?: InputMaybe<Scalars['String']['input']>;
  tick_lt?: InputMaybe<Scalars['String']['input']>;
  tick_gte?: InputMaybe<Scalars['String']['input']>;
  tick_lte?: InputMaybe<Scalars['String']['input']>;
  tick_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tick_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tick_contains?: InputMaybe<Scalars['String']['input']>;
  tick_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_not_contains?: InputMaybe<Scalars['String']['input']>;
  tick_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_starts_with?: InputMaybe<Scalars['String']['input']>;
  tick_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tick_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_ends_with?: InputMaybe<Scalars['String']['input']>;
  tick_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tick_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_?: InputMaybe<Tick_filter>;
  liquidityGross?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityGross_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityNet?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityNet_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feeGrowthOutside0X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside0X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthOutside0X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthOutside1X128?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeGrowthOutside1X128_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeGrowthOutside1X128_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TickDayData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TickDayData_filter>>>;
};

export type TickDayData_orderBy =
  | 'id'
  | 'date'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'tick'
  | 'tick__id'
  | 'tick__poolAddress'
  | 'tick__tickIdx'
  | 'tick__liquidityGross'
  | 'tick__liquidityNet'
  | 'tick__price0'
  | 'tick__price1'
  | 'tick__volumeToken0'
  | 'tick__volumeToken1'
  | 'tick__volumeUSD'
  | 'tick__untrackedVolumeUSD'
  | 'tick__feesUSD'
  | 'tick__collectedFeesToken0'
  | 'tick__collectedFeesToken1'
  | 'tick__collectedFeesUSD'
  | 'tick__createdAtTimestamp'
  | 'tick__createdAtBlockNumber'
  | 'tick__liquidityProviderCount'
  | 'tick__feeGrowthOutside0X128'
  | 'tick__feeGrowthOutside1X128'
  | 'liquidityGross'
  | 'liquidityNet'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'feesUSD'
  | 'feeGrowthOutside0X128'
  | 'feeGrowthOutside1X128';

export type TickHourData = {
  id: Scalars['ID']['output'];
  periodStartUnix: Scalars['Int']['output'];
  pool: Pool;
  tick: Tick;
  liquidityGross: Scalars['BigInt']['output'];
  liquidityNet: Scalars['BigInt']['output'];
  volumeToken0: Scalars['BigDecimal']['output'];
  volumeToken1: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  feesUSD: Scalars['BigDecimal']['output'];
};

export type TickHourData_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  periodStartUnix?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_not?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_gt?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_lt?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_gte?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_lte?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodStartUnix_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_filter>;
  tick?: InputMaybe<Scalars['String']['input']>;
  tick_not?: InputMaybe<Scalars['String']['input']>;
  tick_gt?: InputMaybe<Scalars['String']['input']>;
  tick_lt?: InputMaybe<Scalars['String']['input']>;
  tick_gte?: InputMaybe<Scalars['String']['input']>;
  tick_lte?: InputMaybe<Scalars['String']['input']>;
  tick_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tick_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tick_contains?: InputMaybe<Scalars['String']['input']>;
  tick_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_not_contains?: InputMaybe<Scalars['String']['input']>;
  tick_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_starts_with?: InputMaybe<Scalars['String']['input']>;
  tick_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tick_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_ends_with?: InputMaybe<Scalars['String']['input']>;
  tick_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tick_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tick_?: InputMaybe<Tick_filter>;
  liquidityGross?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityGross_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityGross_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityNet?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityNet_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityNet_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TickHourData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TickHourData_filter>>>;
};

export type TickHourData_orderBy =
  | 'id'
  | 'periodStartUnix'
  | 'pool'
  | 'pool__id'
  | 'pool__createdAtTimestamp'
  | 'pool__createdAtBlockNumber'
  | 'pool__feeTier'
  | 'pool__liquidity'
  | 'pool__sqrtPrice'
  | 'pool__feeGrowthGlobal0X128'
  | 'pool__feeGrowthGlobal1X128'
  | 'pool__token0Price'
  | 'pool__token1Price'
  | 'pool__tick'
  | 'pool__observationIndex'
  | 'pool__volumeToken0'
  | 'pool__volumeToken1'
  | 'pool__volumeUSD'
  | 'pool__untrackedVolumeUSD'
  | 'pool__feesUSD'
  | 'pool__txCount'
  | 'pool__collectedFeesToken0'
  | 'pool__collectedFeesToken1'
  | 'pool__collectedFeesUSD'
  | 'pool__totalValueLockedToken0'
  | 'pool__totalValueLockedToken1'
  | 'pool__totalValueLockedETH'
  | 'pool__totalValueLockedUSD'
  | 'pool__totalValueLockedUSDUntracked'
  | 'pool__liquidityProviderCount'
  | 'tick'
  | 'tick__id'
  | 'tick__poolAddress'
  | 'tick__tickIdx'
  | 'tick__liquidityGross'
  | 'tick__liquidityNet'
  | 'tick__price0'
  | 'tick__price1'
  | 'tick__volumeToken0'
  | 'tick__volumeToken1'
  | 'tick__volumeUSD'
  | 'tick__untrackedVolumeUSD'
  | 'tick__feesUSD'
  | 'tick__collectedFeesToken0'
  | 'tick__collectedFeesToken1'
  | 'tick__collectedFeesUSD'
  | 'tick__createdAtTimestamp'
  | 'tick__createdAtBlockNumber'
  | 'tick__liquidityProviderCount'
  | 'tick__feeGrowthOutside0X128'
  | 'tick__feeGrowthOutside1X128'
  | 'liquidityGross'
  | 'liquidityNet'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'feesUSD';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Aggregation_interval: Aggregation_interval;
  ArrakisHook: ResolverTypeWrapper<ArrakisHook>;
  ArrakisHook_filter: ArrakisHook_filter;
  ArrakisHook_orderBy: ArrakisHook_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bundle: ResolverTypeWrapper<Bundle>;
  Bundle_filter: Bundle_filter;
  Bundle_orderBy: Bundle_orderBy;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  ModifyLiquidity: ResolverTypeWrapper<ModifyLiquidity>;
  ModifyLiquidity_filter: ModifyLiquidity_filter;
  ModifyLiquidity_orderBy: ModifyLiquidity_orderBy;
  OrderDirection: OrderDirection;
  Pool: ResolverTypeWrapper<Pool>;
  PoolDayData: ResolverTypeWrapper<PoolDayData>;
  PoolDayData_filter: PoolDayData_filter;
  PoolDayData_orderBy: PoolDayData_orderBy;
  PoolHourData: ResolverTypeWrapper<PoolHourData>;
  PoolHourData_filter: PoolHourData_filter;
  PoolHourData_orderBy: PoolHourData_orderBy;
  PoolManager: ResolverTypeWrapper<PoolManager>;
  PoolManager_filter: PoolManager_filter;
  PoolManager_orderBy: PoolManager_orderBy;
  Pool_filter: Pool_filter;
  Pool_orderBy: Pool_orderBy;
  Position: ResolverTypeWrapper<Position>;
  Position_filter: Position_filter;
  Position_orderBy: Position_orderBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscribe: ResolverTypeWrapper<Subscribe>;
  Subscribe_filter: Subscribe_filter;
  Subscribe_orderBy: Subscribe_orderBy;
  Swap: ResolverTypeWrapper<Swap>;
  Swap_filter: Swap_filter;
  Swap_orderBy: Swap_orderBy;
  Tick: ResolverTypeWrapper<Tick>;
  Tick_filter: Tick_filter;
  Tick_orderBy: Tick_orderBy;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Token: ResolverTypeWrapper<Token>;
  TokenDayData: ResolverTypeWrapper<TokenDayData>;
  TokenDayData_filter: TokenDayData_filter;
  TokenDayData_orderBy: TokenDayData_orderBy;
  TokenHourData: ResolverTypeWrapper<TokenHourData>;
  TokenHourData_filter: TokenHourData_filter;
  TokenHourData_orderBy: TokenHourData_orderBy;
  Token_filter: Token_filter;
  Token_orderBy: Token_orderBy;
  Transaction: ResolverTypeWrapper<Transaction>;
  Transaction_filter: Transaction_filter;
  Transaction_orderBy: Transaction_orderBy;
  Transfer: ResolverTypeWrapper<Transfer>;
  Transfer_filter: Transfer_filter;
  Transfer_orderBy: Transfer_orderBy;
  UniswapDayData: ResolverTypeWrapper<UniswapDayData>;
  UniswapDayData_filter: UniswapDayData_filter;
  UniswapDayData_orderBy: UniswapDayData_orderBy;
  Unsubscribe: ResolverTypeWrapper<Unsubscribe>;
  Unsubscribe_filter: Unsubscribe_filter;
  Unsubscribe_orderBy: Unsubscribe_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  Burn: ResolverTypeWrapper<Burn>;
  Burn_filter: Burn_filter;
  Burn_orderBy: Burn_orderBy;
  Collect: ResolverTypeWrapper<Collect>;
  Collect_filter: Collect_filter;
  Collect_orderBy: Collect_orderBy;
  Factory: ResolverTypeWrapper<Factory>;
  Factory_filter: Factory_filter;
  Factory_orderBy: Factory_orderBy;
  Flash: ResolverTypeWrapper<Flash>;
  Flash_filter: Flash_filter;
  Flash_orderBy: Flash_orderBy;
  Mint: ResolverTypeWrapper<Mint>;
  Mint_filter: Mint_filter;
  Mint_orderBy: Mint_orderBy;
  PositionSnapshot: ResolverTypeWrapper<PositionSnapshot>;
  PositionSnapshot_filter: PositionSnapshot_filter;
  PositionSnapshot_orderBy: PositionSnapshot_orderBy;
  TickDayData: ResolverTypeWrapper<TickDayData>;
  TickDayData_filter: TickDayData_filter;
  TickDayData_orderBy: TickDayData_orderBy;
  TickHourData: ResolverTypeWrapper<TickHourData>;
  TickHourData_filter: TickHourData_filter;
  TickHourData_orderBy: TickHourData_orderBy;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  ArrakisHook: ArrakisHook;
  ArrakisHook_filter: ArrakisHook_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bundle: Bundle;
  Bundle_filter: Bundle_filter;
  Bytes: Scalars['Bytes']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  ModifyLiquidity: ModifyLiquidity;
  ModifyLiquidity_filter: ModifyLiquidity_filter;
  Pool: Pool;
  PoolDayData: PoolDayData;
  PoolDayData_filter: PoolDayData_filter;
  PoolHourData: PoolHourData;
  PoolHourData_filter: PoolHourData_filter;
  PoolManager: PoolManager;
  PoolManager_filter: PoolManager_filter;
  Pool_filter: Pool_filter;
  Position: Position;
  Position_filter: Position_filter;
  String: Scalars['String']['output'];
  Subscribe: Subscribe;
  Subscribe_filter: Subscribe_filter;
  Swap: Swap;
  Swap_filter: Swap_filter;
  Tick: Tick;
  Tick_filter: Tick_filter;
  Timestamp: Scalars['Timestamp']['output'];
  Token: Token;
  TokenDayData: TokenDayData;
  TokenDayData_filter: TokenDayData_filter;
  TokenHourData: TokenHourData;
  TokenHourData_filter: TokenHourData_filter;
  Token_filter: Token_filter;
  Transaction: Transaction;
  Transaction_filter: Transaction_filter;
  Transfer: Transfer;
  Transfer_filter: Transfer_filter;
  UniswapDayData: UniswapDayData;
  UniswapDayData_filter: UniswapDayData_filter;
  Unsubscribe: Unsubscribe;
  Unsubscribe_filter: Unsubscribe_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
  Burn: Burn;
  Burn_filter: Burn_filter;
  Collect: Collect;
  Collect_filter: Collect_filter;
  Factory: Factory;
  Factory_filter: Factory_filter;
  Flash: Flash;
  Flash_filter: Flash_filter;
  Mint: Mint;
  Mint_filter: Mint_filter;
  PositionSnapshot: PositionSnapshot;
  PositionSnapshot_filter: PositionSnapshot_filter;
  TickDayData: TickDayData;
  TickDayData_filter: TickDayData_filter;
  TickHourData: TickHourData;
  TickHourData_filter: TickHourData_filter;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  poolManager?: Resolver<Maybe<ResolversTypes['PoolManager']>, ParentType, ContextType, RequireFields<QuerypoolManagerArgs, 'id' | 'subgraphError'>>;
  poolManagers?: Resolver<Array<ResolversTypes['PoolManager']>, ParentType, ContextType, RequireFields<QuerypoolManagersArgs, 'skip' | 'first' | 'subgraphError'>>;
  bundle?: Resolver<Maybe<ResolversTypes['Bundle']>, ParentType, ContextType, RequireFields<QuerybundleArgs, 'id' | 'subgraphError'>>;
  bundles?: Resolver<Array<ResolversTypes['Bundle']>, ParentType, ContextType, RequireFields<QuerybundlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: Resolver<Maybe<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolArgs, 'id' | 'subgraphError'>>;
  pools?: Resolver<Array<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tick?: Resolver<Maybe<ResolversTypes['Tick']>, ParentType, ContextType, RequireFields<QuerytickArgs, 'id' | 'subgraphError'>>;
  ticks?: Resolver<Array<ResolversTypes['Tick']>, ParentType, ContextType, RequireFields<QueryticksArgs, 'skip' | 'first' | 'subgraphError'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QuerytransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QuerytransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  swap?: Resolver<Maybe<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QueryswapArgs, 'id' | 'subgraphError'>>;
  swaps?: Resolver<Array<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QueryswapsArgs, 'skip' | 'first' | 'subgraphError'>>;
  modifyLiquidity?: Resolver<Maybe<ResolversTypes['ModifyLiquidity']>, ParentType, ContextType, RequireFields<QuerymodifyLiquidityArgs, 'id' | 'subgraphError'>>;
  modifyLiquidities?: Resolver<Array<ResolversTypes['ModifyLiquidity']>, ParentType, ContextType, RequireFields<QuerymodifyLiquiditiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  uniswapDayData?: Resolver<Maybe<ResolversTypes['UniswapDayData']>, ParentType, ContextType, RequireFields<QueryuniswapDayDataArgs, 'id' | 'subgraphError'>>;
  uniswapDayDatas?: Resolver<Array<ResolversTypes['UniswapDayData']>, ParentType, ContextType, RequireFields<QueryuniswapDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolDayData?: Resolver<Maybe<ResolversTypes['PoolDayData']>, ParentType, ContextType, RequireFields<QuerypoolDayDataArgs, 'id' | 'subgraphError'>>;
  poolDayDatas?: Resolver<Array<ResolversTypes['PoolDayData']>, ParentType, ContextType, RequireFields<QuerypoolDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolHourData?: Resolver<Maybe<ResolversTypes['PoolHourData']>, ParentType, ContextType, RequireFields<QuerypoolHourDataArgs, 'id' | 'subgraphError'>>;
  poolHourDatas?: Resolver<Array<ResolversTypes['PoolHourData']>, ParentType, ContextType, RequireFields<QuerypoolHourDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenDayData?: Resolver<Maybe<ResolversTypes['TokenDayData']>, ParentType, ContextType, RequireFields<QuerytokenDayDataArgs, 'id' | 'subgraphError'>>;
  tokenDayDatas?: Resolver<Array<ResolversTypes['TokenDayData']>, ParentType, ContextType, RequireFields<QuerytokenDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenHourData?: Resolver<Maybe<ResolversTypes['TokenHourData']>, ParentType, ContextType, RequireFields<QuerytokenHourDataArgs, 'id' | 'subgraphError'>>;
  tokenHourDatas?: Resolver<Array<ResolversTypes['TokenHourData']>, ParentType, ContextType, RequireFields<QuerytokenHourDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  position?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType, RequireFields<QuerypositionArgs, 'id' | 'subgraphError'>>;
  positions?: Resolver<Array<ResolversTypes['Position']>, ParentType, ContextType, RequireFields<QuerypositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subscribe?: Resolver<Maybe<ResolversTypes['Subscribe']>, ParentType, ContextType, RequireFields<QuerysubscribeArgs, 'id' | 'subgraphError'>>;
  subscribes?: Resolver<Array<ResolversTypes['Subscribe']>, ParentType, ContextType, RequireFields<QuerysubscribesArgs, 'skip' | 'first' | 'subgraphError'>>;
  unsubscribe?: Resolver<Maybe<ResolversTypes['Unsubscribe']>, ParentType, ContextType, RequireFields<QueryunsubscribeArgs, 'id' | 'subgraphError'>>;
  unsubscribes?: Resolver<Array<ResolversTypes['Unsubscribe']>, ParentType, ContextType, RequireFields<QueryunsubscribesArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: Resolver<Maybe<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransferArgs, 'id' | 'subgraphError'>>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  arrakisHook?: Resolver<Maybe<ResolversTypes['ArrakisHook']>, ParentType, ContextType, RequireFields<QueryarrakisHookArgs, 'id' | 'subgraphError'>>;
  arrakisHooks?: Resolver<Array<ResolversTypes['ArrakisHook']>, ParentType, ContextType, RequireFields<QueryarrakisHooksArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
  factory?: Resolver<Maybe<ResolversTypes['Factory']>, ParentType, ContextType, RequireFields<QueryfactoryArgs, 'id' | 'subgraphError'>>;
  factories?: Resolver<Array<ResolversTypes['Factory']>, ParentType, ContextType, RequireFields<QueryfactoriesArgs, 'skip' | 'first' | 'subgraphError'>>;
  positionSnapshot?: Resolver<Maybe<ResolversTypes['PositionSnapshot']>, ParentType, ContextType, RequireFields<QuerypositionSnapshotArgs, 'id' | 'subgraphError'>>;
  positionSnapshots?: Resolver<Array<ResolversTypes['PositionSnapshot']>, ParentType, ContextType, RequireFields<QuerypositionSnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  mint?: Resolver<Maybe<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<QuerymintArgs, 'id' | 'subgraphError'>>;
  mints?: Resolver<Array<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<QuerymintsArgs, 'skip' | 'first' | 'subgraphError'>>;
  burn?: Resolver<Maybe<ResolversTypes['Burn']>, ParentType, ContextType, RequireFields<QueryburnArgs, 'id' | 'subgraphError'>>;
  burns?: Resolver<Array<ResolversTypes['Burn']>, ParentType, ContextType, RequireFields<QueryburnsArgs, 'skip' | 'first' | 'subgraphError'>>;
  collect?: Resolver<Maybe<ResolversTypes['Collect']>, ParentType, ContextType, RequireFields<QuerycollectArgs, 'id' | 'subgraphError'>>;
  collects?: Resolver<Array<ResolversTypes['Collect']>, ParentType, ContextType, RequireFields<QuerycollectsArgs, 'skip' | 'first' | 'subgraphError'>>;
  flash?: Resolver<Maybe<ResolversTypes['Flash']>, ParentType, ContextType, RequireFields<QueryflashArgs, 'id' | 'subgraphError'>>;
  flashes?: Resolver<Array<ResolversTypes['Flash']>, ParentType, ContextType, RequireFields<QueryflashesArgs, 'skip' | 'first' | 'subgraphError'>>;
  tickHourData?: Resolver<Maybe<ResolversTypes['TickHourData']>, ParentType, ContextType, RequireFields<QuerytickHourDataArgs, 'id' | 'subgraphError'>>;
  tickHourDatas?: Resolver<Array<ResolversTypes['TickHourData']>, ParentType, ContextType, RequireFields<QuerytickHourDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  tickDayData?: Resolver<Maybe<ResolversTypes['TickDayData']>, ParentType, ContextType, RequireFields<QuerytickDayDataArgs, 'id' | 'subgraphError'>>;
  tickDayDatas?: Resolver<Array<ResolversTypes['TickDayData']>, ParentType, ContextType, RequireFields<QuerytickDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export type ArrakisHookResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ArrakisHook'] = ResolversParentTypes['ArrakisHook']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  module?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  salt?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtBlockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BundleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bundle'] = ResolversParentTypes['Bundle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ethPriceUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type ModifyLiquidityResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ModifyLiquidity'] = ResolversParentTypes['ModifyLiquidity']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amount1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountUSD?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  tickLower?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tickUpper?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  logIndex?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pool'] = ResolversParentTypes['Pool']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtBlockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  feeTier?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sqrtPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  token0Price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  token1Price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  tick?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  tickSpacing?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  observationIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  untrackedVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collectedFeesToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedFeesToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedFeesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSDUntracked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  liquidityProviderCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  poolHourData?: Resolver<Array<ResolversTypes['PoolHourData']>, ParentType, ContextType, RequireFields<PoolpoolHourDataArgs, 'skip' | 'first'>>;
  poolDayData?: Resolver<Array<ResolversTypes['PoolDayData']>, ParentType, ContextType, RequireFields<PoolpoolDayDataArgs, 'skip' | 'first'>>;
  hooks?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  modifyLiquiditys?: Resolver<Array<ResolversTypes['ModifyLiquidity']>, ParentType, ContextType, RequireFields<PoolmodifyLiquiditysArgs, 'skip' | 'first'>>;
  swaps?: Resolver<Array<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<PoolswapsArgs, 'skip' | 'first'>>;
  ticks?: Resolver<Array<ResolversTypes['Tick']>, ParentType, ContextType, RequireFields<PoolticksArgs, 'skip' | 'first'>>;
  feeGrowthGlobal0X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeGrowthGlobal1X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  mints?: Resolver<Array<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<PoolmintsArgs, 'skip' | 'first'>>;
  burns?: Resolver<Array<ResolversTypes['Burn']>, ParentType, ContextType, RequireFields<PoolburnsArgs, 'skip' | 'first'>>;
  collects?: Resolver<Array<ResolversTypes['Collect']>, ParentType, ContextType, RequireFields<PoolcollectsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolDayDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PoolDayData'] = ResolversParentTypes['PoolDayData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sqrtPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  token0Price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  token1Price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  tick?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  tvlUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  high?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  low?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  close?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feeGrowthGlobal0X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeGrowthGlobal1X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolHourDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PoolHourData'] = ResolversParentTypes['PoolHourData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  periodStartUnix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sqrtPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  token0Price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  token1Price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  tick?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  tvlUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  high?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  low?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  close?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feeGrowthGlobal0X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeGrowthGlobal1X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolManagerResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PoolManager'] = ResolversParentTypes['PoolManager']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalVolumeETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalFeesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalFeesETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  untrackedVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSDUntracked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedETHUntracked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subscriptions?: Resolver<Array<ResolversTypes['Subscribe']>, ParentType, ContextType, RequireFields<PositionsubscriptionsArgs, 'skip' | 'first'>>;
  unsubscriptions?: Resolver<Array<ResolversTypes['Unsubscribe']>, ParentType, ContextType, RequireFields<PositionunsubscriptionsArgs, 'skip' | 'first'>>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<PositiontransfersArgs, 'skip' | 'first'>>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  tickLower?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  tickUpper?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  depositedToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  depositedToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  withdrawnToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  withdrawnToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedFeesToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedFeesToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  feeGrowthInside0LastX128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeGrowthInside1LastX128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscribeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscribe'] = ResolversParentTypes['Subscribe']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SwapResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Swap'] = ResolversParentTypes['Swap']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amount1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  sqrtPriceX96?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tick?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  logIndex?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TickResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Tick'] = ResolversParentTypes['Tick']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tickIdx?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  liquidityGross?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidityNet?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  price1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtBlockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  untrackedVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedFeesToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedFeesToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedFeesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  liquidityProviderCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeGrowthOutside0X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeGrowthOutside1X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  untrackedVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  poolCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalValueLocked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSDUntracked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  derivedETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  whitelistPools?: Resolver<Array<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<TokenwhitelistPoolsArgs, 'skip' | 'first'>>;
  tokenDayData?: Resolver<Array<ResolversTypes['TokenDayData']>, ParentType, ContextType, RequireFields<TokentokenDayDataArgs, 'skip' | 'first'>>;
  version?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenDayDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenDayData'] = ResolversParentTypes['TokenDayData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  untrackedVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLocked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  priceUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  high?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  low?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  close?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenHourDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenHourData'] = ResolversParentTypes['TokenHourData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  periodStartUnix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  untrackedVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLocked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  priceUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  high?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  low?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  close?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasUsed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  modifyLiquiditys?: Resolver<Array<Maybe<ResolversTypes['ModifyLiquidity']>>, ParentType, ContextType, RequireFields<TransactionmodifyLiquiditysArgs, 'skip' | 'first'>>;
  swaps?: Resolver<Array<Maybe<ResolversTypes['Swap']>>, ParentType, ContextType, RequireFields<TransactionswapsArgs, 'skip' | 'first'>>;
  transfers?: Resolver<Array<Maybe<ResolversTypes['Transfer']>>, ParentType, ContextType, RequireFields<TransactiontransfersArgs, 'skip' | 'first'>>;
  subscriptions?: Resolver<Array<Maybe<ResolversTypes['Subscribe']>>, ParentType, ContextType, RequireFields<TransactionsubscriptionsArgs, 'skip' | 'first'>>;
  unsubscriptions?: Resolver<Array<Maybe<ResolversTypes['Unsubscribe']>>, ParentType, ContextType, RequireFields<TransactionunsubscriptionsArgs, 'skip' | 'first'>>;
  mints?: Resolver<Array<Maybe<ResolversTypes['Mint']>>, ParentType, ContextType, RequireFields<TransactionmintsArgs, 'skip' | 'first'>>;
  burns?: Resolver<Array<Maybe<ResolversTypes['Burn']>>, ParentType, ContextType, RequireFields<TransactionburnsArgs, 'skip' | 'first'>>;
  flashed?: Resolver<Array<Maybe<ResolversTypes['Flash']>>, ParentType, ContextType, RequireFields<TransactionflashedArgs, 'skip' | 'first'>>;
  collects?: Resolver<Array<Maybe<ResolversTypes['Collect']>>, ParentType, ContextType, RequireFields<TransactioncollectsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UniswapDayDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UniswapDayData'] = ResolversParentTypes['UniswapDayData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  volumeETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSDUntracked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tvlUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnsubscribeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Unsubscribe'] = ResolversParentTypes['Unsubscribe']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BurnResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Burn'] = ResolversParentTypes['Burn']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amount1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountUSD?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  tickLower?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tickUpper?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  logIndex?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Collect'] = ResolversParentTypes['Collect']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  amount0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amount1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountUSD?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  tickLower?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tickUpper?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  logIndex?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FactoryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Factory'] = ResolversParentTypes['Factory']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalVolumeETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalFeesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalFeesETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  untrackedVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedUSDUntracked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalValueLockedETHUntracked?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FlashResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Flash'] = ResolversParentTypes['Flash']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amount1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amount0Paid?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amount1Paid?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  logIndex?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MintResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mint'] = ResolversParentTypes['Mint']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amount1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountUSD?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  tickLower?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tickUpper?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  logIndex?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionSnapshotResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PositionSnapshot'] = ResolversParentTypes['PositionSnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  depositedToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  depositedToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  withdrawnToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  withdrawnToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedFeesToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  collectedFeesToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  feeGrowthInside0LastX128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeGrowthInside1LastX128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TickDayDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TickDayData'] = ResolversParentTypes['TickDayData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  tick?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  liquidityGross?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidityNet?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feeGrowthOutside0X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeGrowthOutside1X128?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TickHourDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TickHourData'] = ResolversParentTypes['TickHourData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  periodStartUnix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  tick?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  liquidityGross?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidityNet?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  feesUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  ArrakisHook?: ArrakisHookResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bundle?: BundleResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  ModifyLiquidity?: ModifyLiquidityResolvers<ContextType>;
  Pool?: PoolResolvers<ContextType>;
  PoolDayData?: PoolDayDataResolvers<ContextType>;
  PoolHourData?: PoolHourDataResolvers<ContextType>;
  PoolManager?: PoolManagerResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  Subscribe?: SubscribeResolvers<ContextType>;
  Swap?: SwapResolvers<ContextType>;
  Tick?: TickResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Token?: TokenResolvers<ContextType>;
  TokenDayData?: TokenDayDataResolvers<ContextType>;
  TokenHourData?: TokenHourDataResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  Transfer?: TransferResolvers<ContextType>;
  UniswapDayData?: UniswapDayDataResolvers<ContextType>;
  Unsubscribe?: UnsubscribeResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  Burn?: BurnResolvers<ContextType>;
  Collect?: CollectResolvers<ContextType>;
  Factory?: FactoryResolvers<ContextType>;
  Flash?: FlashResolvers<ContextType>;
  Mint?: MintResolvers<ContextType>;
  PositionSnapshot?: PositionSnapshotResolvers<ContextType>;
  TickDayData?: TickDayDataResolvers<ContextType>;
  TickHourData?: TickHourDataResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = UniswapV4Base_3Types.Context & AerodromeBaseFullTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/uniswap-v4-base-3/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    case ".graphclient/sources/aerodrome-base-full/introspectionSchema":
      return Promise.resolve(importedModule$1) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const uniswapV4Base_3Transforms = [];
const aerodromeBaseFullTransforms = [];
const additionalTypeDefs = [] as any[];
const uniswapV4Base_3Handler = new GraphqlHandler({
              name: "uniswap-v4-base-3",
              config: {"endpoint":"https://gateway.thegraph.com/api/c5ab51524b12d713e044a8bf0ea1d5e6/subgraphs/id/Gqm2b5J85n1bhCyDMpGbtbVn4935EvvdyHdHrx3dibyj"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("uniswap-v4-base-3"),
              logger: logger.child("uniswap-v4-base-3"),
              importFn,
            });
const aerodromeBaseFullHandler = new GraphqlHandler({
              name: "aerodrome-base-full",
              config: {"endpoint":"https://gateway.thegraph.com/api/c5ab51524b12d713e044a8bf0ea1d5e6/subgraphs/id/GENunSHWLBXm59mBSgPzQ8metBEp9YDfdqwFr91Av1UM"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("aerodrome-base-full"),
              logger: logger.child("aerodrome-base-full"),
              importFn,
            });
sources[0] = {
          name: 'uniswap-v4-base-3',
          handler: uniswapV4Base_3Handler,
          transforms: uniswapV4Base_3Transforms
        }
sources[1] = {
          name: 'aerodrome-base-full',
          handler: aerodromeBaseFullHandler,
          transforms: aerodromeBaseFullTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })
const documentHashMap = {
        "e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f": GetPoolManagersDocument,
"e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f": GetTokenByAddressDocument,
"e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f": GetTokenStatsDocument,
"e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f": GetTokenHourDataDocument,
"e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f": GetNewPoolsDocument,
"e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f": GetUniAndAeroDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetPoolManagersDocument,
        get rawSDL() {
          return printWithCache(GetPoolManagersDocument);
        },
        location: 'GetPoolManagersDocument.graphql',
        sha256Hash: 'e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f'
      },{
        document: GetTokenByAddressDocument,
        get rawSDL() {
          return printWithCache(GetTokenByAddressDocument);
        },
        location: 'GetTokenByAddressDocument.graphql',
        sha256Hash: 'e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f'
      },{
        document: GetTokenStatsDocument,
        get rawSDL() {
          return printWithCache(GetTokenStatsDocument);
        },
        location: 'GetTokenStatsDocument.graphql',
        sha256Hash: 'e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f'
      },{
        document: GetTokenHourDataDocument,
        get rawSDL() {
          return printWithCache(GetTokenHourDataDocument);
        },
        location: 'GetTokenHourDataDocument.graphql',
        sha256Hash: 'e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f'
      },{
        document: GetNewPoolsDocument,
        get rawSDL() {
          return printWithCache(GetNewPoolsDocument);
        },
        location: 'GetNewPoolsDocument.graphql',
        sha256Hash: 'e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f'
      },{
        document: GetUniAndAeroDocument,
        get rawSDL() {
          return printWithCache(GetUniAndAeroDocument);
        },
        location: 'GetUniAndAeroDocument.graphql',
        sha256Hash: 'e27600ed958d6db7ccce23705cb672b73d0ce18c9f1fd4232f544568ca0cdc8f'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type GetPoolManagersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPoolManagersQuery = { poolManagers: Array<Pick<PoolManager, 'id' | 'poolCount' | 'txCount' | 'totalVolumeUSD'>>, bundles: Array<Pick<Bundle, 'id' | 'ethPriceUSD'>> };

export type GetTokenByAddressQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTokenByAddressQuery = { token?: Maybe<Pick<Token, 'id' | 'symbol' | 'name' | 'decimals' | 'totalSupply' | 'volume' | 'volumeUSD' | 'untrackedVolumeUSD' | 'feesUSD' | 'txCount' | 'poolCount' | 'totalValueLocked' | 'totalValueLockedUSD' | 'totalValueLockedUSDUntracked' | 'derivedETH'>> };

export type GetTokenStatsQueryVariables = Exact<{
  tokenId: Scalars['ID']['input'];
  dayDataFirst: Scalars['Int']['input'];
}>;


export type GetTokenStatsQuery = { token?: Maybe<(
    Pick<Token, 'id' | 'symbol' | 'name' | 'decimals' | 'totalSupply' | 'volume' | 'volumeUSD' | 'feesUSD' | 'txCount' | 'poolCount' | 'totalValueLockedUSD' | 'derivedETH'>
    & { tokenDayData: Array<Pick<TokenDayData, 'id' | 'date' | 'volume' | 'volumeUSD' | 'untrackedVolumeUSD' | 'totalValueLocked' | 'totalValueLockedUSD' | 'priceUSD' | 'feesUSD' | 'open' | 'high' | 'low' | 'close'>> }
  )> };

export type GetTokenHourDataQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
  first: Scalars['Int']['input'];
}>;


export type GetTokenHourDataQuery = { tokenHourDatas: Array<Pick<TokenHourData, 'id' | 'periodStartUnix' | 'volume' | 'volumeUSD' | 'untrackedVolumeUSD' | 'totalValueLocked' | 'totalValueLockedUSD' | 'priceUSD' | 'feesUSD' | 'open' | 'high' | 'low' | 'close'>> };

export type GetNewPoolsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderBy: Pool_orderBy;
  orderDirection: OrderDirection;
}>;


export type GetNewPoolsQuery = { pools: Array<(
    Pick<Pool, 'id' | 'createdAtTimestamp' | 'createdAtBlockNumber' | 'feeTier' | 'liquidity' | 'sqrtPrice' | 'token0Price' | 'token1Price' | 'tick' | 'volumeToken0' | 'volumeToken1' | 'volumeUSD' | 'feesUSD' | 'txCount' | 'totalValueLockedToken0' | 'totalValueLockedToken1' | 'totalValueLockedUSD' | 'liquidityProviderCount'>
    & { token0: Pick<Token, 'id' | 'symbol' | 'name' | 'decimals'>, token1: Pick<Token, 'id' | 'symbol' | 'name' | 'decimals'>, poolDayData: Array<Pick<PoolDayData, 'id' | 'date' | 'volumeUSD' | 'feesUSD' | 'tvlUSD'>>, poolHourData: Array<Pick<PoolHourData, 'id' | 'periodStartUnix' | 'volumeUSD' | 'feesUSD' | 'tvlUSD'>> }
  )> };

export type GetUniAndAeroQueryVariables = Exact<{
  tokenId: Scalars['ID']['input'];
  aeroFirst: Scalars['Int']['input'];
}>;


export type GetUniAndAeroQuery = { token?: Maybe<Pick<Token, 'id' | 'symbol' | 'name' | 'derivedETH' | 'totalValueLockedUSD'>>, aeroPools: Array<(
    Pick<Pool, 'id' | 'volumeUSD' | 'totalValueLockedUSD'>
    & { token0: Pick<Token, 'id' | 'symbol' | 'name'>, token1: Pick<Token, 'id' | 'symbol' | 'name'> }
  )> };


export const GetPoolManagersDocument = gql`
    query GetPoolManagers {
  poolManagers(first: 5) {
    id
    poolCount
    txCount
    totalVolumeUSD
  }
  bundles(first: 5) {
    id
    ethPriceUSD
  }
}
    ` as unknown as DocumentNode<GetPoolManagersQuery, GetPoolManagersQueryVariables>;
export const GetTokenByAddressDocument = gql`
    query GetTokenByAddress($id: ID!) {
  token(id: $id) {
    id
    symbol
    name
    decimals
    totalSupply
    volume
    volumeUSD
    untrackedVolumeUSD
    feesUSD
    txCount
    poolCount
    totalValueLocked
    totalValueLockedUSD
    totalValueLockedUSDUntracked
    derivedETH
  }
}
    ` as unknown as DocumentNode<GetTokenByAddressQuery, GetTokenByAddressQueryVariables>;
export const GetTokenStatsDocument = gql`
    query GetTokenStats($tokenId: ID!, $dayDataFirst: Int!) {
  token(id: $tokenId) {
    id
    symbol
    name
    decimals
    totalSupply
    volume
    volumeUSD
    feesUSD
    txCount
    poolCount
    totalValueLockedUSD
    derivedETH
    tokenDayData(first: $dayDataFirst, orderBy: date, orderDirection: desc) {
      id
      date
      volume
      volumeUSD
      untrackedVolumeUSD
      totalValueLocked
      totalValueLockedUSD
      priceUSD
      feesUSD
      open
      high
      low
      close
    }
  }
}
    ` as unknown as DocumentNode<GetTokenStatsQuery, GetTokenStatsQueryVariables>;
export const GetTokenHourDataDocument = gql`
    query GetTokenHourData($tokenId: String!, $first: Int!) {
  tokenHourDatas(
    first: $first
    where: {token: $tokenId}
    orderBy: periodStartUnix
    orderDirection: desc
  ) {
    id
    periodStartUnix
    volume
    volumeUSD
    untrackedVolumeUSD
    totalValueLocked
    totalValueLockedUSD
    priceUSD
    feesUSD
    open
    high
    low
    close
  }
}
    ` as unknown as DocumentNode<GetTokenHourDataQuery, GetTokenHourDataQueryVariables>;
export const GetNewPoolsDocument = gql`
    query GetNewPools($first: Int!, $orderBy: Pool_orderBy!, $orderDirection: OrderDirection!) {
  pools(
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: {liquidity_gt: "0"}
  ) {
    id
    createdAtTimestamp
    createdAtBlockNumber
    token0 {
      id
      symbol
      name
      decimals
    }
    token1 {
      id
      symbol
      name
      decimals
    }
    feeTier
    liquidity
    sqrtPrice
    token0Price
    token1Price
    tick
    volumeToken0
    volumeToken1
    volumeUSD
    feesUSD
    txCount
    totalValueLockedToken0
    totalValueLockedToken1
    totalValueLockedUSD
    liquidityProviderCount
    poolDayData(first: 1, orderBy: date, orderDirection: desc) {
      id
      date
      volumeUSD
      feesUSD
      tvlUSD
    }
    poolHourData(first: 1, orderBy: periodStartUnix, orderDirection: desc) {
      id
      periodStartUnix
      volumeUSD
      feesUSD
      tvlUSD
    }
  }
}
    ` as unknown as DocumentNode<GetNewPoolsQuery, GetNewPoolsQueryVariables>;
export const GetUniAndAeroDocument = gql`
    query GetUniAndAero($tokenId: ID!, $aeroFirst: Int!) {
  token(id: $tokenId) @source(name: "uniswap-v4-base-3") {
    id
    symbol
    name
    derivedETH
    totalValueLockedUSD
  }
  aeroPools: pools(first: $aeroFirst, orderBy: volumeUSD, orderDirection: desc) @source(name: "aerodrome-base-full") {
    id
    volumeUSD
    totalValueLockedUSD
    token0 {
      id
      symbol
      name
    }
    token1 {
      id
      symbol
      name
    }
  }
}
    ` as unknown as DocumentNode<GetUniAndAeroQuery, GetUniAndAeroQueryVariables>;







export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetPoolManagers(variables?: GetPoolManagersQueryVariables, options?: C): Promise<GetPoolManagersQuery> {
      return requester<GetPoolManagersQuery, GetPoolManagersQueryVariables>(GetPoolManagersDocument, variables, options) as Promise<GetPoolManagersQuery>;
    },
    GetTokenByAddress(variables: GetTokenByAddressQueryVariables, options?: C): Promise<GetTokenByAddressQuery> {
      return requester<GetTokenByAddressQuery, GetTokenByAddressQueryVariables>(GetTokenByAddressDocument, variables, options) as Promise<GetTokenByAddressQuery>;
    },
    GetTokenStats(variables: GetTokenStatsQueryVariables, options?: C): Promise<GetTokenStatsQuery> {
      return requester<GetTokenStatsQuery, GetTokenStatsQueryVariables>(GetTokenStatsDocument, variables, options) as Promise<GetTokenStatsQuery>;
    },
    GetTokenHourData(variables: GetTokenHourDataQueryVariables, options?: C): Promise<GetTokenHourDataQuery> {
      return requester<GetTokenHourDataQuery, GetTokenHourDataQueryVariables>(GetTokenHourDataDocument, variables, options) as Promise<GetTokenHourDataQuery>;
    },
    GetNewPools(variables: GetNewPoolsQueryVariables, options?: C): Promise<GetNewPoolsQuery> {
      return requester<GetNewPoolsQuery, GetNewPoolsQueryVariables>(GetNewPoolsDocument, variables, options) as Promise<GetNewPoolsQuery>;
    },
    GetUniAndAero(variables: GetUniAndAeroQueryVariables, options?: C): Promise<GetUniAndAeroQuery> {
      return requester<GetUniAndAeroQuery, GetUniAndAeroQueryVariables>(GetUniAndAeroDocument, variables, options) as Promise<GetUniAndAeroQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;