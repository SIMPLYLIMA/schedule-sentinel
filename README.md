# Schedule Sentinel

A blockchain-based access management system for scheduling and monitoring time-sensitive permissions and activities.

## Overview

Schedule Sentinel provides a robust, secure platform for managing complex access schedules and permissions using blockchain technology. By leveraging the Stacks blockchain, the system offers fine-grained, auditable, and time-bound access control mechanisms that can be applied across various domains such as healthcare, enterprise, and event management.

### Key Features

- User-controlled data access permissions
- Secure device registration system
- Verified consumer authentication
- Comprehensive access audit trail
- Support for multiple health data types

## Architecture

The PulseLink system is built around a core smart contract that manages:
- User registration and authentication
- Device registration and management
- Access control and permissions
- Consumer verification
- Access history and auditing

```mermaid
graph TD
    A[User] --> B[PulseLink Core Contract]
    C[Healthcare Provider] --> B
    D[Research Institution] --> B
    E[Wearable Device] --> A
    B --> F[Access Registry]
    B --> G[Permissions System]
    B --> H[Audit Trail]
```

## Contract Documentation

### PulseLink Core Contract

The main contract (`pulselink-core.clar`) handles all core functionality for the PulseLink system.

#### Data Types Supported
- Heart Rate
- Blood Pressure
- Sleep Data
- Activity Metrics
- Glucose Levels
- Oxygen Levels
- Temperature
- Weight

#### Key Components

1. **User Management**
   - User registration
   - Device registration and management
   
2. **Access Control**
   - Permission granting/revoking
   - Consumer verification
   - Access request handling

3. **Audit System**
   - Comprehensive access logging
   - Historical access tracking

## Getting Started

### Prerequisites
- Clarinet
- Stacks wallet
- Access to the Stacks blockchain

### Basic Usage

1. **Create a Schedule**
```clarity
(contract-call? .sentinel-access create-schedule 
    'SP2JXKH6B14RMT7PP51439ZPWZQYNB3HB5J2289WB 
    u100 
    u200 
    "conference-room")
```

2. **Grant Temporary Access**
```clarity
(contract-call? .sentinel-access grant-scheduled-access 
    'SP3DX3H4V3WHRZY3H6BVHP9535MWMWWZBQWQBW7 
    "board-meeting" 
    (some u500))
```

3. **Verify Access Permissions**
```clarity
(contract-call? .sentinel-access check-access 
    'SP3DX3H4V3WHRZY3H6BVHP9535MWMWWZBQWQBW7 
    "board-meeting")
```

## Function Reference

### Public Functions

#### User Management
```clarity
(define-public (register-user))
(define-public (register-device (device-id (string-ascii 64)) (device-type (string-ascii 64))))
(define-public (remove-device (device-id (string-ascii 64))))
```

#### Access Control
```clarity
(define-public (grant-data-access (consumer principal) (data-type (string-ascii 64)) (expiry (optional uint))))
(define-public (revoke-data-access (consumer principal) (data-type (string-ascii 64))))
(define-public (request-data-access (user principal) (data-type (string-ascii 64)) (purpose (string-ascii 128))))
```

### Read-Only Functions
```clarity
(define-read-only (check-user-registration (user principal)))
(define-read-only (get-user-devices (user principal)))
(define-read-only (check-consumer-verification (consumer principal)))
(define-read-only (check-data-access (user principal) (consumer principal) (data-type (string-ascii 64))))
(define-read-only (get-access-details (access-id uint)))
```

## Development

### Testing
1. Clone the repository
2. Install Clarinet
3. Run tests:
```bash
clarinet test
```

### Local Development
1. Start Clarinet console:
```bash
clarinet console
```
2. Deploy contracts:
```clarity
(contract-call? .pulselink-core register-user)
```

## Security Considerations

### Data Privacy
- No actual health data is stored on-chain
- Only access permissions and audit logs are maintained on-chain
- All sensitive data should be stored off-chain with appropriate encryption

### Access Control
- Implement additional verification for consumer registration in production
- Regular audit of access logs
- Time-bound access permissions recommended
- Immediate access revocation available

### Best Practices
- Always verify consumer identity off-chain
- Regularly review and update access permissions
- Monitor access history for unauthorized attempts
- Use time-limited access grants when possible