// Main Schema
interface ERC7730Schema {
  $schema: string;
  includes?: string;
  context: Context;
  metadata: Metadata;
  display: Display;
}

// Context
interface Context {
  main: BindingContext;
}

type BindingContext = ContractBindingContext | EIP712BindingContext;

interface ContractBindingContext {
  contract: {
    abi: ABI | string; // ABI can be an array or a URL
    deployments: Deployment[];
    addressMatcher?: string;
    factory?: FactoryConstraint;
  };
}

interface EIP712BindingContext {
  eip712: {
    schemas: (EIP712Schema | string)[];
    domain: {
      name: string;
    };
    domainSeparator: string;
    deployments: Deployment[];
  };
}

// Deployment
interface Deployment {
  chainId: number; // eip155 format
  address: string; // eip55 format
}

// Factory Constraint
interface FactoryConstraint {
  deployments: Deployment[];
  deployEvent: string;
}

// Metadata
interface Metadata {
  owner: string;
  info: OwnerInfo;
  token: TokenDescription;
  constants: Record<string, string>;
  enums: Record<string, Enum>;
}

interface OwnerInfo {
  legalName: string;
  lastUpdate: string; // date-time format
  url: string; // uri format
}

interface TokenDescription {
  name: string;
  ticker: string;
  decimals: number;
}

// Display
interface Display {
  definitions: Record<string, FieldFormatter>;
  formats: Record<string, StructuredDataFormat>;
}

interface FieldFormatter {
  $id?: string;
  label: string;
  format: FieldFormat;
  params?: Record<string, unknown>; // Optional parameters based on format
}

type FieldFormat =
  | "raw"
  | "addressName"
  | "calldata"
  | "amount"
  | "tokenAmount"
  | "nftName"
  | "date"
  | "duration"
  | "unit"
  | "enum";

// Structured Data Format
interface StructuredDataFormat {
  $id?: string;
  intent: Intent;
  fields: Record<string, FieldFormat>;
  required: string[];
  screens?: Record<string, Screen[]>;
}

// Intent
type Intent = string | Record<string, string>;

// EIP712 Schema
interface EIP712Schema {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EIP712Domain: any[]; // Define as needed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any[]; // Additional types
  };
  primaryType: string;
}

// ABI
type ABI = ABIEntry[];

interface ABIEntry {
  inputs: ABIParameter[];
  name: string;
  outputs: ABIParameter[];
  stateMutability: "pure" | "view" | "nonpayable" | "payable";
  type: "function" | "constructor" | "receive" | "fallback";
}

interface ABIParameter {
  name: string;
  type: string;
  internalType?: string;
  components?: ABIParameter[];
}

// Enum
type Enum = Record<string, string>;

// Example of a Metafield
interface Metafield {
  key: string;
  value: string;
  type: "string" | "number" | "boolean" | "date" | "json";
  description?: string; // Optional
}
