# Bank-Assurance DApp on Solana

A decentralized application for bank-assurance on the Solana blockchain, facilitating onboarding and premium payments between insurance companies and banks while improving transparency and productivity in the industry.

## Features

- **Decentralized Exchange for Insurance Products**: Insurance companies can list their products with detailed terms and conditions, while banks can search for suitable products for their customers.
- **User Onboarding & Identity Verification**: Secure onboarding with decentralized identity solutions (DIDs) and verifiable credentials for KYC compliance.
- **Smart Contracts for Policy Management**: Automated policy lifecycle management including premium payments, claim processing, renewals, and dispute resolution.
- **Premium Payments via Solana**: Fast, low-cost premium payments using the Solana blockchain.
- **Transparency & Auditability**: Immutable ledger for all transactions, claims, and payouts, allowing real-time tracking of payment flows and policy status.
- **Integration with Banking Systems**: APIs to connect with KYC/AML systems and traditional banking infrastructure.
- **Secure Data Storage**: All policy data, customer information, and claim history are securely stored on the Solana blockchain.

## Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           Frontend Layer (Next.js)                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Customer  │  │    Bank     │  │   Insurance │  │   Admin Dashboard   │  │
│  │   Portal    │  │   Portal    │  │  Company    │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        Application Layer (Services)                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Auth &    │  │   Policy    │  │   Payment   │  │    KYC/AML          │  │
│  │   Identity  │  │ Management  │  │  Gateway    │  │   Integration       │  │
│  │  Service    │  │   Service   │  │   Service   │  │    Service          │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         Blockchain Layer (Solana)                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Policy    │  │   Payment   │  │    Claim    │  │   User Identity     │  │
│  │  Smart      │  │   Smart     │  │   Smart     │  │   Smart Contracts   │  │
│  │ Contracts   │  │ Contracts   │  │ Contracts   │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          Storage & Data Layer                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Solana    │  │    IPFS     │  │   Cache     │  │   External APIs     │  │
│  │   Ledger    │  │   Storage   │  │   Layer     │  │ (Banking/KYC)       │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Component Architecture

#### Frontend Components
- **Customer Portal**: Policy browsing, application, and management interface
- **Bank Portal**: Product discovery, customer onboarding, and policy administration
- **Insurance Company Portal**: Product listing, underwriting, and claims management
- **Admin Dashboard**: System monitoring, analytics, and configuration

#### Smart Contracts
- **Policy Contract**: Manages policy creation, terms, and lifecycle
- **Payment Contract**: Handles premium payments and payouts using SPL tokens
- **Claim Contract**: Automates claim submission, verification, and settlement
- **Identity Contract**: Stores DID documents and verifiable credentials

#### Data Flow
1. **User Registration** → DID creation → Identity verification
2. **Product Listing** → Insurance company uploads terms → Smart contract storage
3. **Policy Application** → Customer applies → Bank verifies → Policy creation
4. **Premium Payment** → SPL token transfer → Payment contract update
5. **Claim Processing** → Claim submission → Verification → Automated payout

### Technology Stack Details

#### Frontend Technologies
- **React.js (18.2.0)**: Component-based UI framework
- **Next.js (13.4.10)**: Full-stack React framework with SSR/SSG
- **Material-UI (5.14.0)**: React component library with modern design
- **Three.js (@react-three/fiber 8.15.12)**: 3D visualizations and data displays
- **Framer Motion (12.23.24)**: Animation library for smooth transitions

#### Blockchain Integration
- **Solana Web3.js (1.78.0)**: Interface for Solana blockchain interactions
- **SPL Token (0.3.8)**: Token standard for premium payments and payouts
- **Borsh (2.0.0)**: Binary serialization for smart contract data
- **Phantom/Solflare**: Wallet integration for secure transactions

#### Development Tools
- **TypeScript (5.1.6)**: Type-safe JavaScript development
- **ESLint & Prettier**: Code quality and formatting
- **Jest**: Unit testing framework
- **Git**: Version control and collaboration

### Security Architecture

#### Multi-Layer Security
1. **Wallet Security**: Non-custodial wallet integration (Phantom, Solflare)
2. **Smart Contract Security**: Audited contracts with access controls
3. **Data Encryption**: End-to-end encryption for sensitive data
4. **Identity Verification**: DID-based authentication with verifiable credentials
5. **Network Security**: HTTPS, CORS, and rate limiting

#### Access Control
- **Role-Based Access Control (RBAC)**: Different permissions for customers, banks, and insurance companies
- **Multi-Signature Requirements**: Critical operations require multiple approvals
- **Time-Based Access**: Temporary access tokens for sensitive operations

### Performance Optimization

#### Frontend Optimization
- **Code Splitting**: Dynamic imports for reduced bundle size
- **Image Optimization**: Next.js automatic image optimization
- **Caching Strategy**: Redis-based caching for frequently accessed data
- **CDN Integration**: Content delivery for static assets

#### Blockchain Optimization
- **Batch Transactions**: Group multiple operations for reduced gas fees
- **Compression**: Data compression for on-chain storage
- **Lazy Loading**: Load data on-demand for better UX
- **Connection Pooling**: Efficient RPC connection management

## Tech Stack

- **Frontend**: React.js, Next.js, Material UI
- **Blockchain**: Solana (web3.js, SPL-tokens)
- **Identity**: DIDs and Verifiable Credentials
- **Data Serialization**: Borsh

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- A Solana wallet (Phantom, Solflare, etc.)

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/bank-assurance-dapp.git
   cd bank-assurance-dapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## User Roles

### Insurance Companies
- List insurance products on the DEX
- Manage policy issuance and claims processing through smart contracts
- Access real-time data on policy performance and customer behavior

### Banks
- Search for and select suitable insurance products for their customers
- Onboard customers and facilitate policy purchases
- Manage customer policies and process claims

### Customers
- View available insurance products through the bank's platform
- Apply for and purchase insurance policies online
- Make premium payments directly to the insurance company through the DApp
- File and track insurance claims

## Project Structure & Code Documentation

### Directory Organization
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── SuperStatCard.tsx  # Statistics display component
│   │   └── ...                # Other UI components
│   ├── layout/                # Layout components
│   ├── forms/                 # Form components
│   └── charts/                # Data visualization components
├── pages/                     # Next.js pages
│   ├── index.tsx             # Home page
│   ├── policies/             # Policy-related pages
│   ├── claims/               # Claims management pages
│   └── products/             # Product listing pages
├── contracts/                 # Solana contract interfaces
│   ├── policy.ts             # Policy contract interface
│   ├── payment.ts            # Payment contract interface
│   └── identity.ts           # Identity contract interface
├── services/                  # Business logic services
│   ├── blockchain.ts         # Blockchain interactions
│   ├── auth.ts               # Authentication service
│   ├── policy.ts             # Policy management
│   └── payment.ts            # Payment processing
├── utils/                     # Utility functions
│   ├── constants.ts          # Application constants
│   ├── helpers.ts            # Helper functions
│   └── validators.ts         # Form validators
├── hooks/                     # Custom React hooks
│   ├── useWallet.ts          # Wallet connection hook
│   ├── usePolicy.ts          # Policy management hook
│   └── useAuth.ts            # Authentication hook
├── types/                     # TypeScript type definitions
│   ├── policy.ts             # Policy-related types
│   ├── user.ts               # User-related types
│   └── transaction.ts        # Transaction types
└── styles/                    # CSS and styling files
    ├── globals.css           # Global styles
    └── theme.ts              # Material-UI theme
```

### Code Examples & Best Practices

#### Smart Contract Interaction Pattern
```typescript
// Example: Policy creation service
export class PolicyService {
  private connection: Connection;
  private wallet: Wallet;

  async createPolicy(policyData: PolicyInput): Promise<string> {
    try {
      const policyAccount = await this.createPolicyAccount();
      const transaction = new Transaction().add(
        createPolicyInstruction(policyAccount, policyData)
      );
      
      const signature = await sendTransaction(transaction, this.wallet);
      await this.connection.confirmTransaction(signature);
      
      return signature;
    } catch (error) {
      console.error('Policy creation failed:', error);
      throw new PolicyCreationError(error.message);
    }
  }
}
```

#### Component Architecture Pattern
```typescript
// Example: Reusable policy card component
interface PolicyCardProps {
  policy: Policy;
  onApply?: (policyId: string) => void;
  variant?: 'default' | 'compact';
}

export const PolicyCard: React.FC<PolicyCardProps> = ({
  policy,
  onApply,
  variant = 'default'
}) => {
  const { isConnected } = useWallet();
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{policy.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {policy.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            disabled={!isConnected}
            onClick={() => onApply?.(policy.id)}
          >
            Apply Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
```

#### State Management Pattern
```typescript
// Example: Policy management hook
export const usePolicy = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicies = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const policyService = new PolicyService();
      const fetchedPolicies = await policyService.getPolicies();
      setPolicies(fetchedPolicies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  return { policies, loading, error, refetch: fetchPolicies };
};
```

### API Documentation

#### REST API Endpoints
```
GET    /api/policies          # List all available policies
POST   /api/policies          # Create new policy (Insurance only)
GET    /api/policies/:id      # Get specific policy details
PUT    /api/policies/:id      # Update policy terms
DELETE /api/policies/:id      # Deactivate policy

GET    /api/claims            # List user claims
POST   /api/claims            # Submit new claim
GET    /api/claims/:id        # Get claim status
PUT    /api/claims/:id        # Update claim (Bank/Insurance only)

GET    /api/users/profile     # Get user profile
PUT    /api/users/profile     # Update user profile
POST   /api/users/verify      # Verify identity (KYC)
```

#### WebSocket Events
```typescript
// Real-time events for policy updates
interface PolicyEvents {
  'policy:created': (policy: Policy) => void;
  'policy:updated': (policy: Policy) => void;
  'claim:submitted': (claim: Claim) => void;
  'claim:processed': (claim: Claim) => void;
  'payment:received': (payment: Payment) => void;
}
```

### Testing Strategy

#### Unit Testing
```typescript
// Example: Policy service test
describe('PolicyService', () => {
  let policyService: PolicyService;
  let mockConnection: jest.Mocked<Connection>;

  beforeEach(() => {
    mockConnection = createMockConnection();
    policyService = new PolicyService(mockConnection);
  });

  it('should create policy successfully', async () => {
    const policyData = createMockPolicyData();
    const result = await policyService.createPolicy(policyData);
    
    expect(result).toBeDefined();
    expect(mockConnection.confirmTransaction).toHaveBeenCalled();
  });
});
```

#### Integration Testing
```typescript
// Example: End-to-end policy flow test
describe('Policy Flow Integration', () => {
  it('should complete full policy lifecycle', async () => {
    // 1. Create policy
    const policyId = await createTestPolicy();
    
    // 2. Apply for policy
    const applicationId = await applyForPolicy(policyId);
    
    // 3. Make payment
    const paymentId = await makePremiumPayment(applicationId);
    
    // 4. File claim
    const claimId = await fileClaim(policyId);
    
    // Verify all steps completed successfully
    expect(claimId).toBeDefined();
  });
});
```

### Environment Configuration

#### Development Environment
```bash
# .env.local
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PHANTOM_WALLET=true
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
```

#### Production Environment
```bash
# .env.production
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_PHANTOM_WALLET=true
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
```

### Deployment Guide

#### Vercel Deployment
1. Connect repository to Vercel
2. Configure environment variables
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Enable automatic deployments

#### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing Guidelines

### Code Standards
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write unit tests for all services and components
- Use descriptive variable and function names
- Add JSDoc comments for complex functions

### Pull Request Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request with detailed description

### Code Review Checklist
- [ ] Code follows project style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes
- [ ] Security considerations addressed

## Development Roadmap

- **Phase 1**: Core platform with DEX, user onboarding, and basic policy management
- **Phase 2**: Claims processing and premium payments
- **Phase 3**: Integration with banking systems and analytics dashboard
- **Phase 4**: Mobile applications and enhanced security features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Acknowledgements

- Solana Foundation for blockchain infrastructure
- Material UI for the UI components
- Next.js team for the React framework # -Bank-Assurance-solana
