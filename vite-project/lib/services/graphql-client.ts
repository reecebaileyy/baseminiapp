/**
 * Server-side GraphQL client for querying subgraphs
 * This works in Vercel serverless functions unlike the .graphclient
 */

const UNISWAP_V3_SUBGRAPH = 'https://gateway.thegraph.com/api/c5ab51524b12d713e044a8bf0ea1d5e6/subgraphs/id/Gqm2b5J85n1bhCyDMpGbtbVn4935EvvdyHdHrx3dibyj';
const AERODROME_SUBGRAPH = 'https://gateway.thegraph.com/api/c5ab51524b12d713e044a8bf0ea1d5e6/subgraphs/id/GENunSHWLBXm59mBSgPzQ8metBEp9YDfdqwFr91Av1UM';

interface GraphQLResponse<T> {
  data: T;
  errors?: any[];
}

/**
 * Execute a GraphQL query against a subgraph
 */
async function executeQuery<T>(
  endpoint: string,
  query: string,
  variables: Record<string, any> = {}
): Promise<T | null> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      console.error(`GraphQL query failed: ${response.statusText}`);
      return null;
    }

    const data: GraphQLResponse<T> = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('GraphQL query error:', error);
    return null;
  }
}

/**
 * Query Uniswap v3 subgraph
 */
export async function queryUniswapV3<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T | null> {
  return executeQuery<T>(UNISWAP_V3_SUBGRAPH, query, variables);
}

/**
 * Query Aerodrome subgraph
 */
export async function queryAerodrome<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T | null> {
  return executeQuery<T>(AERODROME_SUBGRAPH, query, variables);
}

