#!/usr/bin/env node

/**
 * Enhanced WebSocket to CryptoNote TCP Proxy for Scala Mining
 * Handles CryptoNote protocol (not Bitcoin Stratum) with proper login/job_id handshake
 * FIXED: Protocol translation details for proper CryptoNote communication
 */

const WebSocket = require('ws');
const net = require('net');
const url = require('url');
const EventEmitter = require('events');
const crypto = require('crypto');

class ScalaCryptoNoteProxy extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.wsPort = options.wsPort || 8080;
        this.connections = new Map();
        this.connectionId = 0;
        this.debug = true;
        
        // Scala mining pools - CryptoNote protocol
        this.pools = {
            'scala': { 
                host: 'mine.scalaproject.io', 
                port: 3333, 
                name: 'Scala Project Official Pool',
                algorithm: 'panthera',
                protocol: 'cryptonote'
            },
            'herominers': { 
                host: 'scala.herominers.com', 
                port: 10130, 
                name: 'HeroMiners Scala Pool',
                algorithm: 'panthera',
                protocol: 'cryptonote'
            },
            'fairpool': { 
                host: 'scala.fairpool.xyz', 
                port: 4455, 
                name: 'FairPool Scala',
                algorithm: 'panthera',
                protocol: 'cryptonote'
            }
        };
        
        this.wss = null;
        this.isRunning = false;
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
        console.log(`[${timestamp}] ${prefix} ${message}`);
    }

    /**
     * Start the proxy server
     */
    start() {
        if (this.isRunning) {
            this.log('Proxy already running', 'warning');
            return;
        }

        try {
            // Create WebSocket server with CORS support
            this.wss = new WebSocket.Server({ 
                port: this.wsPort,
                perMessageDeflate: false,
                clientTracking: true,
                verifyClient: (info, callback) => {
                    callback(true);
                }
            });

            this.wss.on('headers', (headers, request) => {
                headers.push('Access-Control-Allow-Origin: *');
                headers.push('Access-Control-Allow-Headers: *');
                headers.push('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            });

            this.wss.on('connection', (ws, req) => {
                this.handleWebSocketConnection(ws, req);
            });

            this.wss.on('error', (error) => {
                this.log(`WebSocket server error: ${error.message}`, 'error');
            });

            this.isRunning = true;
            this.log(`🚀 Enhanced Scala CryptoNote Proxy started on ws://localhost:${this.wsPort}`, 'success');
            this.log('📋 Available Scala pools (CryptoNote protocol):');
            Object.entries(this.pools).forEach(([key, pool]) => {
                console.log(`   ${key}: ${pool.name} (${pool.host}:${pool.port})`);
            });
            this.log('🔗 Connect with: ws://localhost:8080?pool=scala', 'info');
            this.log('🌍 CORS enabled - accessible from web browsers', 'info');
            
            this.startHeartbeat();
            
            process.on('SIGINT', () => {
                console.log('\n🛑 Shutting down proxy...');
                this.stop();
                process.exit(0);
            });

            process.on('SIGTERM', () => {
                console.log('\n🛑 Shutting down proxy...');
                this.stop();
                process.exit(0);
            });
            
        } catch (error) {
            this.log(`Failed to start proxy: ${error.message}`, 'error');
            process.exit(1);
        }
    }

    /**
     * Stop the proxy server
     */
    stop() {
        if (!this.isRunning) return;

        this.log('Stopping proxy server...', 'info');
        
        for (const [id, connection] of this.connections) {
            this.closeConnection(id, 'Server shutdown');
        }

        if (this.wss) {
            this.wss.close(() => {
                this.log('WebSocket server closed', 'info');
            });
            this.wss = null;
        }

        this.isRunning = false;
        this.log('Proxy stopped', 'success');
    }

    /**
     * Handle new WebSocket connection
     */
    handleWebSocketConnection(ws, req) {
        const connectionId = ++this.connectionId;
        const clientIP = req.socket.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
        const parsedUrl = url.parse(req.url, true);
        const poolName = parsedUrl.query.pool || 'scala';
        
        this.log(`🔌 New connection ${connectionId} from ${clientIP}, requesting pool: ${poolName}`, 'info');

        const pool = this.pools[poolName];
        if (!pool) {
            this.log(`Invalid pool "${poolName}" requested by connection ${connectionId}`, 'error');
            const availablePools = Object.keys(this.pools).join(', ');
            ws.close(1008, `Invalid pool: ${poolName}. Available: ${availablePools}`);
            return;
        }

        // Create connection object for CryptoNote protocol
        const connection = {
            id: connectionId,
            ws: ws,
            tcp: null,
            pool: pool,
            poolName: poolName,
            clientIP: clientIP,
            connected: false,
            loggedIn: false,
            lastActivity: Date.now(),
            tcpBuffer: '',
            jobId: null,
            currentJob: null,           // Store current job details
            difficulty: null,
            target: null,               // Store current target from pool
            loginId: null,              // Session ID from login response
            sessionId: null,            // Alias for loginId
            messageQueue: new Map(),
            pendingMessages: [],
            reconnectAttempts: 0,
            maxReconnectAttempts: 5,
            reconnectTimeout: null,
            keepaliveInterval: null,
            state: 'initializing',
            workerId: null,
            workerPass: null,
            walletAddress: null,        // Store wallet address separately
            agent: 'ScalaWebMiner/1.0',
            submittedShares: 0,         // Track shares
            acceptedShares: 0,
            rejectedShares: 0
        };

        this.connections.set(connectionId, connection);

        ws.on('message', (data) => {
            this.handleWebSocketMessage(connectionId, data);
        });

        ws.on('close', (code, reason) => {
            this.log(`🔌 WebSocket ${connectionId} closed: ${code} ${reason}`, 'info');
            this.closeConnection(connectionId, 'WebSocket closed');
        });

        ws.on('error', (error) => {
            this.log(`WebSocket ${connectionId} error: ${error.message}`, 'error');
            this.closeConnection(connectionId, `WebSocket error: ${error.message}`);
        });

        ws.on('pong', () => {
            connection.lastActivity = Date.now();
            if (this.debug) {
                this.log(`💗 Pong received from ${connectionId}`, 'info');
            }
        });

        this.sendToWebSocket(connectionId, {
            type: 'proxy_status',
            status: 'initializing',
            pool: poolName,
            host: pool.host,
            port: pool.port,
            algorithm: pool.algorithm,
            protocol: 'cryptonote'
        });

        this.connectToPool(connectionId);
    }

    /**
     * Connect to CryptoNote mining pool
     */
    connectToPool(connectionId, isReconnect = false) {
        const connection = this.connections.get(connectionId);
        if (!connection) return;

        const { pool, poolName } = connection;

        if (isReconnect) {
            connection.reconnectAttempts++;
            if (connection.reconnectAttempts > connection.maxReconnectAttempts) {
                this.log(`Max reconnection attempts reached for ${connectionId}`, 'error');
                this.closeConnection(connectionId, 'Max reconnection attempts reached');
                return;
            }
            this.log(`🔄 Reconnection attempt ${connection.reconnectAttempts}/${connection.maxReconnectAttempts} for ${connectionId}`, 'warning');
        }

        connection.state = 'connecting';
        connection.connected = false;
        connection.loggedIn = false;

        this.log(`📡 Connecting ${connectionId} to CryptoNote pool ${poolName} (${pool.host}:${pool.port})`, 'info');

        this.sendToWebSocket(connectionId, {
            type: 'proxy_status',
            status: 'connecting',
            pool: poolName,
            host: pool.host,
            port: pool.port,
            attempt: connection.reconnectAttempts,
            protocol: 'cryptonote'
        });

        try {
            const tcp = net.createConnection({
                host: pool.host,
                port: pool.port,
                timeout: 60000,
                keepAlive: true,
                keepAliveInitialDelay: 30000
            });

            connection.tcp = tcp;

            tcp.on('connect', () => {
                this.log(`Connection ${connectionId} established to CryptoNote pool ${poolName}`, 'success');
                connection.connected = true;
                connection.state = 'connected';
                connection.reconnectAttempts = 0;
                
                this.processPendingMessages(connectionId);
                this.startKeepalive(connectionId);
                
                this.sendToWebSocket(connectionId, {
                    type: 'proxy_status',
                    status: 'connected',
                    pool: poolName,
                    host: pool.host,
                    port: pool.port,
                    algorithm: pool.algorithm,
                    protocol: 'cryptonote'
                });
            });

            tcp.on('data', (data) => {
                this.handleTCPData(connectionId, data);
            });

            tcp.on('close', (hadError) => {
                this.log(`🔌 TCP connection ${connectionId} to ${poolName} closed ${hadError ? '(with error)' : ''}`, 'info');
                connection.connected = false;
                connection.loggedIn = false;
                connection.state = 'disconnected';
                
                this.stopKeepalive(connectionId);
                
                this.sendToWebSocket(connectionId, {
                    type: 'proxy_status',
                    status: 'disconnected',
                    reason: hadError ? 'Connection error' : 'Pool connection closed'
                });

                if (this.connections.has(connectionId) && connection.ws.readyState === WebSocket.OPEN) {
                    this.scheduleReconnection(connectionId);
                }
            });

            tcp.on('error', (error) => {
                this.log(`TCP connection ${connectionId} error: ${error.message}`, 'error');
                connection.connected = false;
                connection.state = 'error';
                
                this.sendToWebSocket(connectionId, {
                    type: 'proxy_status',
                    status: 'error',
                    error: error.message,
                    pool: poolName
                });
                
                if (this.connections.has(connectionId) && connection.ws.readyState === WebSocket.OPEN) {
                    this.scheduleReconnection(connectionId);
                } else {
                    this.closeConnection(connectionId, `TCP error: ${error.message}`);
                }
            });

            tcp.on('timeout', () => {
                this.log(`⏱️ TCP connection ${connectionId} timeout`, 'warning');
                if (connection.state === 'connected' && connection.loggedIn) {
                    tcp.setTimeout(60000);
                } else {
                    tcp.destroy();
                }
            });

        } catch (error) {
            this.log(`Failed to create TCP connection ${connectionId}: ${error.message}`, 'error');
            
            this.sendToWebSocket(connectionId, {
                type: 'proxy_status',
                status: 'error',
                error: `Connection failed: ${error.message}`,
                pool: poolName
            });

            if (this.connections.has(connectionId) && connection.ws.readyState === WebSocket.OPEN) {
                this.scheduleReconnection(connectionId);
            } else {
                this.closeConnection(connectionId, `Connection failed: ${error.message}`);
            }
        }
    }

    /**
     * Start keepalive for CryptoNote connection
     */
    startKeepalive(connectionId) {
        const connection = this.connections.get(connectionId);
        if (!connection) return;

        this.stopKeepalive(connectionId);

        // Send periodic keepalive every 2 minutes for CryptoNote pools
        connection.keepaliveInterval = setInterval(() => {
            if (connection.connected && connection.loggedIn) {
                // CryptoNote keepalive - send getjob request
                const keepaliveMsg = {
                    method: 'getjob',
                    params: {
                        id: connection.loginId
                    },
                    id: `keepalive_${Date.now()}`
                };
                
                if (this.debug) {
                    this.log(`💗 Sending CryptoNote keepalive to ${connectionId}`, 'info');
                }
                
                this.forwardToPool(connectionId, keepaliveMsg);
            }
        }, 120000); // 2 minutes
    }

    stopKeepalive(connectionId) {
        const connection = this.connections.get(connectionId);
        if (connection && connection.keepaliveInterval) {
            clearInterval(connection.keepaliveInterval);
            connection.keepaliveInterval = null;
        }
    }

    scheduleReconnection(connectionId) {
        const connection = this.connections.get(connectionId);
        if (!connection) return;

        if (connection.reconnectTimeout) {
            clearTimeout(connection.reconnectTimeout);
        }

        const baseDelay = 5000;
        const maxDelay = 120000;
        const backoffFactor = Math.min(connection.reconnectAttempts, 5);
        const delay = Math.min(maxDelay, baseDelay * Math.pow(1.5, backoffFactor)) + 
                     (Math.random() * 2000);

        this.log(`⏰ Scheduling reconnection for ${connectionId} in ${Math.round(delay/1000)}s`, 'info');

        connection.reconnectTimeout = setTimeout(() => {
            if (this.connections.has(connectionId)) {
                this.connectToPool(connectionId, true);
            }
        }, delay);
    }

    processPendingMessages(connectionId) {
        const connection = this.connections.get(connectionId);
        if (!connection || !connection.connected) return;

        if (connection.pendingMessages.length > 0) {
            this.log(`📨 Processing ${connection.pendingMessages.length} pending CryptoNote messages for ${connectionId}`, 'info');
            
            for (const message of connection.pendingMessages) {
                this.forwardToPool(connectionId, message);
            }
            
            connection.pendingMessages = [];
        }
    }

    /**
     * FIXED: Handle WebSocket message - Convert Stratum-like to CryptoNote
     */
    handleWebSocketMessage(connectionId, data) {
        const connection = this.connections.get(connectionId);
        if (!connection) {
            this.log(`Connection ${connectionId} not found`, 'error');
            return;
        }

        try {
            connection.lastActivity = Date.now();

            let message;
            if (Buffer.isBuffer(data)) {
                message = JSON.parse(data.toString('utf8'));
            } else {
                message = JSON.parse(data);
            }

            this.log(`📤 ${connectionId} -> Pool: ${JSON.stringify(message)}`, 'info');

            // Convert Stratum protocol to CryptoNote protocol
            const cryptoNoteMessage = this.convertToCryptoNote(connectionId, message);
            if (!cryptoNoteMessage) {
                return; // Message was handled internally (like mining.authorize)
            }

            // Track outgoing messages
            if (cryptoNoteMessage.id !== undefined && cryptoNoteMessage.id !== null) {
                connection.messageQueue.set(cryptoNoteMessage.id, {
                    method: cryptoNoteMessage.method,
                    originalMethod: message.method,
                    timestamp: Date.now(),
                    originalId: message.id
                });
            }

            if (!connection.connected) {
                this.log(`Connection ${connectionId} not connected to pool, queuing message`, 'warning');
                connection.pendingMessages.push(cryptoNoteMessage);
                
                this.sendToWebSocket(connectionId, {
                    type: 'proxy_status',
                    status: 'queued',
                    message: `Queued CryptoNote message: ${cryptoNoteMessage.method}`,
                    queueSize: connection.pendingMessages.length
                });
                
                return;
            }

            this.forwardToPool(connectionId, cryptoNoteMessage);

        } catch (error) {
            this.log(`Error processing WebSocket message ${connectionId}: ${error.message}`, 'error');
            this.sendErrorToWebSocket(connectionId, null, -1, `Invalid JSON: ${error.message}`);
        }
    }

    /**
     * FIXED: Convert Stratum-like messages to CryptoNote protocol
     */
    convertToCryptoNote(connectionId, stratumMsg) {
        const connection = this.connections.get(connectionId);
        if (!connection) return null;

        switch (stratumMsg.method) {
            case 'mining.subscribe':
                // Convert to CryptoNote login
                const walletAddress = stratumMsg.params && stratumMsg.params[0] ? stratumMsg.params[0] : null;
                if (!walletAddress) {
                    this.log(`No wallet address provided in subscribe for ${connectionId}`, 'error');
                    this.sendErrorToWebSocket(connectionId, stratumMsg.id, -1, 'Wallet address required for CryptoNote login');
                    return null;
                }
                
                // Parse wallet.worker format
                const addressParts = walletAddress.split('.');
                connection.walletAddress = addressParts[0];
                connection.workerId = addressParts.length > 1 ? addressParts[1] : 'web';
                connection.state = 'logging_in';
                
                return {
                    method: 'login',
                    params: {
                        login: connection.walletAddress,    // Just the wallet address
                        pass: connection.workerId,          // Worker name as password
                        agent: connection.agent,
                        'rigid': connection.workerId        // Some pools expect rigid field
                    },
                    id: stratumMsg.id
                };

            case 'mining.authorize':
                // CryptoNote doesn't have separate authorize - return success immediately
                this.sendToWebSocket(connectionId, {
                    id: stratumMsg.id,
                    result: true,
                    error: null
                });
                return null; // Don't forward this

            case 'mining.submit':
                // FIXED: Convert to CryptoNote submit with proper validation
                if (!stratumMsg.params || stratumMsg.params.length < 4) {
                    this.log(`Invalid mining.submit params for ${connectionId}: ${JSON.stringify(stratumMsg.params)}`, 'error');
                    this.sendErrorToWebSocket(connectionId, stratumMsg.id, -1, 'Invalid submit parameters - expected [worker, job_id, nonce, result]');
                    return null;
                }
                
                if (!connection.loginId) {
                    this.log(`No login session for ${connectionId}, cannot submit share`, 'error');
                    this.sendErrorToWebSocket(connectionId, stratumMsg.id, -1, 'Not logged in to pool');
                    return null;
                }
                
                // Stratum format: [worker_name, job_id, nonce, result]
                const [workerName, jobId, nonce, result] = stratumMsg.params;
                
                // Validate parameters
                if (!jobId || !nonce || !result) {
                    this.log(`Missing submit parameters for ${connectionId}: jobId=${jobId}, nonce=${nonce}, result=${result}`, 'error');
                    this.sendErrorToWebSocket(connectionId, stratumMsg.id, -1, 'Missing submit parameters');
                    return null;
                }
                
                connection.submittedShares++;
                
                return {
                    method: 'submit',
                    params: {
                        id: connection.loginId,        // Session ID from login response
                        job_id: jobId,                 // Job ID from current job
                        nonce: nonce,                  // 4-byte nonce as hex string
                        result: result                 // Hash result as hex string
                    },
                    id: stratumMsg.id
                };

            case 'mining.get_job':
            case 'getjob':
                // Convert to CryptoNote getjob
                if (!connection.loginId) {
                    this.log(`No login session for ${connectionId}, cannot get job`, 'error');
                    this.sendErrorToWebSocket(connectionId, stratumMsg.id, -1, 'Not logged in to pool');
                    return null;
                }
                
                return {
                    method: 'getjob',
                    params: {
                        id: connection.loginId
                    },
                    id: stratumMsg.id
                };

            default:
                // Pass through other methods as-is (with caution)
                this.log(`Unknown Stratum method: ${stratumMsg.method}, passing through`, 'warning');
                return stratumMsg;
        }
    }

    /**
     * FIXED: Convert CryptoNote messages back to Stratum format
     */
    convertFromCryptoNote(message, connectionId) {
        const connection = this.connections.get(connectionId);
        if (!connection) return null;

        // Handle CryptoNote job notification -> mining.notify
        if (message.method === 'job' && message.params) {
            const job = message.params;
            
            // Store current job details
            connection.currentJob = job;
            connection.jobId = job.job_id;
            connection.target = job.target;
            connection.difficulty = this.targetToDifficulty(job.target);
            
            // FIXED: Convert CryptoNote job to Stratum mining.notify format
            return {
                id: null,
                method: 'mining.notify',
                params: [
                    job.job_id,                         // Job ID
                    job.blob || '',                     // Block template blob
                    '',                                 // Coinbase1 (unused in CryptoNote)
                    '',                                 // Coinbase2 (unused in CryptoNote)  
                    [],                                 // Merkle branches (unused in CryptoNote)
                    job.algo || 'panthera',             // Version/algorithm
                    job.target || 'ffffffffffffffff',   // Target (inverted difficulty)
                    Math.floor(Date.now() / 1000).toString(16), // Timestamp
                    true                                // Clean jobs flag
                ]
            };
        }

        // Handle responses to our requests
        if (message.id && connection.messageQueue.has(message.id)) {
            const originalRequest = connection.messageQueue.get(message.id);
            
            // FIXED: Handle login response -> mining.subscribe response
            if (originalRequest.method === 'login' && originalRequest.originalMethod === 'mining.subscribe') {
                if (message.result && message.result.id) {
                    // Save session ID for future requests
                    connection.loginId = message.result.id;
                    connection.sessionId = message.result.id;
                    connection.loggedIn = true;
                    connection.state = 'logged_in';
                    
                    this.log(`✅ CryptoNote login successful for ${connectionId}, sessionId: ${connection.loginId}`, 'success');
                    
                    // Store job info if provided in login response
                    if (message.result.job) {
                        connection.currentJob = message.result.job;
                        connection.jobId = message.result.job.job_id;
                        connection.target = message.result.job.target;
                        connection.difficulty = this.targetToDifficulty(message.result.job.target);
                    }
                    
                    return {
                        id: originalRequest.originalId,
                        result: [
                            [['mining.notify', connection.loginId]], // Subscription details
                            connection.loginId,                      // ExtraNonce1 (use session ID)
                            4                                       // ExtraNonce2 size
                        ],
                        error: null
                    };
                } else {
                    const errorMsg = message.error ? message.error.message || 'Login failed' : 'Login failed - no session ID';
                    this.log(`❌ CryptoNote login failed for ${connectionId}: ${errorMsg}`, 'error');
                    
                    return {
                        id: originalRequest.originalId,
                        result: null,
                        error: { 
                            code: message.error ? message.error.code || -1 : -1, 
                            message: errorMsg 
                        }
                    };
                }
            }
            
            // FIXED: Handle submit response with proper error handling
            if (originalRequest.method === 'submit' && originalRequest.originalMethod === 'mining.submit') {
                const isAccepted = message.result && message.result.status === 'OK';
                
                if (isAccepted) {
                    connection.acceptedShares++;
                    this.log(`💎 CryptoNote share accepted for ${connectionId}! (${connection.acceptedShares}/${connection.submittedShares})`, 'success');
                } else {
                    connection.rejectedShares++;
                    const errorMsg = message.result ? 
                        (message.result.error || message.result.status || 'Unknown error') : 
                        (message.error ? message.error.message || 'Share rejected' : 'No result');
                    this.log(`❌ CryptoNote share rejected for ${connectionId}: ${errorMsg} (${connection.rejectedShares}/${connection.submittedShares})`, 'error');
                }
                
                return {
                    id: originalRequest.originalId,
                    result: isAccepted,
                    error: isAccepted ? null : { 
                        code: -1, 
                        message: message.result?.error || message.error?.message || 'Share rejected by pool'
                    }
                };
            }
            
            // Handle getjob response
            if (originalRequest.method === 'getjob') {
                if (message.result && message.result.job_id) {
                    // Convert new job to mining.notify
                    const job = message.result;
                    connection.currentJob = job;
                    connection.jobId = job.job_id;
                    connection.target = job.target;
                    connection.difficulty = this.targetToDifficulty(job.target);
                    
                    return {
                        id: null,
                        method: 'mining.notify',
                        params: [
                            job.job_id,
                            job.blob || '',
                            '',
                            '',
                            [],
                            job.algo || 'panthera',
                            job.target || 'ffffffffffffffff',
                            Math.floor(Date.now() / 1000).toString(16),
                            true
                        ]
                    };
                }
                return null; // Don't forward keepalive responses
            }
        }

        // Handle error responses
        if (message.error) {
            this.log(`❌ Pool error for ${connectionId}: ${message.error.message}`, 'error');
            return {
                id: message.id,
                result: null,
                error: {
                    code: message.error.code || -1,
                    message: message.error.message || 'Pool error'
                }
            };
        }

        // Pass through other messages as-is
        return message;
    }

    /**
     * Helper function to convert target to difficulty
     */
    targetToDifficulty(target) {
        if (!target) return 1;
        
        try {
            // Convert hex target to difficulty
            const targetBN = BigInt('0x' + target);
            const maxTarget = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
            const difficulty = maxTarget / targetBN;
            return Number(difficulty);
        } catch (error) {
            this.log(`Error converting target to difficulty: ${error.message}`, 'warning');
            return 1;
        }
    }

    /**
     * Forward message to CryptoNote pool
     */
    forwardToPool(connectionId, message) {
        const connection = this.connections.get(connectionId);
        if (!connection || !connection.tcp || !connection.connected) {
            this.log(`Cannot forward to pool ${connectionId}: not connected`, 'warning');
            return false;
        }

        try {
            const messageStr = JSON.stringify(message) + '\n';
            
            if (!connection.tcp.writable) {
                this.log(`TCP socket ${connectionId} not writable`, 'warning');
                return false;
            }
            
            connection.tcp.write(messageStr);
            
            this.log(`📡 ${connectionId} -> Pool (${connection.poolName}): ${message.method}`, 'success');
            if (this.debug && message.method !== 'getjob') {
                this.log(`   CryptoNote raw: ${messageStr.trim()}`, 'info');
            }
            
            return true;
        } catch (error) {
            this.log(`Error forwarding to pool ${connectionId}: ${error.message}`, 'error');
            this.sendErrorToWebSocket(connectionId, message.id, -3, `Forward error: ${error.message}`);
            return false;
        }
    }

    /**
     * Handle TCP data from CryptoNote pool
     */
    handleTCPData(connectionId, data) {
        const connection = this.connections.get(connectionId);
        if (!connection) return;

        try {
            connection.tcpBuffer += data.toString('utf8');
            
            let lines = connection.tcpBuffer.split('\n');
            connection.tcpBuffer = lines.pop() || '';
            
            for (const line of lines) {
                const messageStr = line.trim();
                if (!messageStr) continue;

                if (this.debug && !messageStr.includes('"job"')) {
                    this.log(`📥 Pool -> ${connectionId} (raw): ${messageStr}`, 'info');
                }

                try {
                    const message = JSON.parse(messageStr);
                    this.handleCryptoNoteMessage(connectionId, message);
                } catch (parseError) {
                    this.log(`Failed to parse CryptoNote message ${connectionId}: ${parseError.message}`, 'error');
                    this.log(`   Raw data: ${messageStr}`, 'error');
                }
            }

            connection.lastActivity = Date.now();

        } catch (error) {
            this.log(`Error processing TCP data ${connectionId}: ${error.message}`, 'error');
        }
    }

    /**
     * Handle parsed message from CryptoNote pool
     */
    handleCryptoNoteMessage(connectionId, message) {
        const connection = this.connections.get(connectionId);
        if (!connection) return;

        const messageType = message.method || `response-${message.id}`;
        
        if (message.method !== 'job') {
            this.log(`📨 Pool -> ${connectionId}: ${messageType}`, 'success');
            
            if (this.debug) {
                this.log(`   Full CryptoNote message: ${JSON.stringify(message)}`, 'info');
            }
        }

        // 🔄 Convert CryptoNote → Stratum
        const translated = this.convertFromCryptoNote(message, connectionId);
        if (translated) {
            try {
                // Forward to miner WS client
                this.sendToWebSocket(connectionId, translated);
            } catch (err) {
                this.log(`❌ Failed to send to miner ${connectionId}: ${err}`, 'error');
            }
        }

        // Clean up message queue
        if (message.id && connection.messageQueue.has(message.id)) {
            connection.messageQueue.delete(message.id);
        }
    }

    /**
     * Send message to WebSocket client
     */
    sendToWebSocket(connectionId, message) {
        const connection = this.connections.get(connectionId);
        if (!connection || connection.ws.readyState !== WebSocket.OPEN) {
            if (this.debug && message.method !== 'mining.notify') {
                this.log(`Cannot send to WebSocket ${connectionId}: connection closed`, 'warning');
            }
            return false;
        }

        try {
            const messageStr = JSON.stringify(message);
            connection.ws.send(messageStr);
            
            const logMsg = message.method || message.type || `response-${message.id}`;
            if (message.method !== 'mining.notify' && message.type !== 'proxy_status') {
                this.log(`📤 Sent to browser ${connectionId}: ${logMsg}`, 'success');
            }
            
            return true;
        } catch (error) {
            this.log(`Error sending to WebSocket ${connectionId}: ${error.message}`, 'error');
            this.closeConnection(connectionId, `Send error: ${error.message}`);
            return false;
        }
    }

    /**
     * Send error response to WebSocket client
     */
    sendErrorToWebSocket(connectionId, messageId, code, message) {
        this.sendToWebSocket(connectionId, {
            id: messageId,
            result: null,
            error: {
                code: code,
                message: message
            }
        });
    }

    /**
     * Close connection and cleanup
     */
    closeConnection(connectionId, reason = 'Unknown') {
        const connection = this.connections.get(connectionId);
        if (!connection) return;

        this.log(`🔌 Closing connection ${connectionId}: ${reason}`, 'info');

        if (connection.reconnectTimeout) {
            clearTimeout(connection.reconnectTimeout);
            connection.reconnectTimeout = null;
        }
        
        this.stopKeepalive(connectionId);

        if (connection.tcp) {
            try {
                connection.tcp.destroy();
            } catch (error) {
                this.log(`Error destroying TCP connection ${connectionId}: ${error.message}`, 'warning');
            }
            connection.tcp = null;
        }

        if (connection.ws && connection.ws.readyState === WebSocket.OPEN) {
            try {
                connection.ws.close(1000, reason);
            } catch (error) {
                this.log(`Error closing WebSocket ${connectionId}: ${error.message}`, 'error');
            }
        }

        connection.messageQueue.clear();
        connection.pendingMessages = [];

        this.connections.delete(connectionId);
        
        this.log(`🗑️ Connection ${connectionId} cleaned up`, 'info');
    }

    /**
     * Get connection statistics for CryptoNote protocol
     */
    getStats() {
        const stats = {
            totalConnections: this.connections.size,
            connectedPools: {},
            loggedInConnections: 0,
            connectedToPool: 0,
            readyConnections: 0,
            totalShares: 0,
            acceptedShares: 0,
            rejectedShares: 0,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            connectionStates: {}
        };

        for (const connection of this.connections.values()) {
            const poolName = connection.poolName;
            const state = connection.state;
            
            if (!stats.connectedPools[poolName]) {
                stats.connectedPools[poolName] = {
                    total: 0,
                    connected: 0,
                    loggedIn: 0,
                    ready: 0,
                    shares: { submitted: 0, accepted: 0, rejected: 0 }
                };
            }
            
            stats.connectedPools[poolName].total++;
            stats.connectedPools[poolName].shares.submitted += connection.submittedShares || 0;
            stats.connectedPools[poolName].shares.accepted += connection.acceptedShares || 0;
            stats.connectedPools[poolName].shares.rejected += connection.rejectedShares || 0;
            
            stats.totalShares += connection.submittedShares || 0;
            stats.acceptedShares += connection.acceptedShares || 0;
            stats.rejectedShares += connection.rejectedShares || 0;
            
            if (!stats.connectionStates[state]) {
                stats.connectionStates[state] = 0;
            }
            stats.connectionStates[state]++;
            
            if (connection.connected) {
                stats.connectedPools[poolName].connected++;
                stats.connectedToPool++;
            }
            if (connection.loggedIn) {
                stats.loggedInConnections++;
                stats.connectedPools[poolName].loggedIn++;
                stats.readyConnections++;
                stats.connectedPools[poolName].ready++;
            }
        }

        return stats;
    }

    /**
     * Start periodic cleanup and heartbeat
     */
    startHeartbeat() {
        const heartbeatInterval = 60000; // 1 minute
        const timeoutThreshold = 900000; // 15 minutes
        
        setInterval(() => {
            const now = Date.now();

            for (const [id, connection] of this.connections) {
                if (now - connection.lastActivity > timeoutThreshold) {
                    this.log(`⏱️ Connection ${id} timeout (inactive for ${Math.floor((now - connection.lastActivity) / 60000)}min)`, 'warning');
                    this.closeConnection(id, 'Inactive timeout');
                    continue;
                }

                if (connection.ws && connection.ws.readyState === WebSocket.OPEN) {
                    try {
                        connection.ws.ping('heartbeat');
                        if (this.debug) {
                            this.log(`💗 Ping sent to ${id}`, 'info');
                        }
                    } catch (error) {
                        this.log(`Ping error ${id}: ${error.message}`, 'error');
                        this.closeConnection(id, 'Ping failed');
                    }
                }

                // Check for stuck connections
                if (connection.connected && !connection.loggedIn && connection.state === 'connected') {
                    const timeSinceConnect = now - connection.lastActivity;
                    if (timeSinceConnect > 120000) { // 2 minutes
                        this.log(`🔧 Connection ${id} stuck in connected state, attempting recovery`, 'warning');
                        this.scheduleReconnection(id);
                    }
                }

                // Clean up old messages from queue
                for (const [msgId, msgInfo] of connection.messageQueue) {
                    if (now - msgInfo.timestamp > 300000) { // 5 minutes
                        connection.messageQueue.delete(msgId);
                        if (this.debug) {
                            this.log(`🧹 Cleaned up old message ${msgId} from ${id}`, 'info');
                        }
                    }
                }
            }

            // Log stats every 10 minutes
            if (Math.floor(now / 600000) !== Math.floor((now - heartbeatInterval) / 600000)) {
                this.logStats();
            }

        }, heartbeatInterval);
    }

    /**
     * Log detailed statistics for CryptoNote protocol
     */
    logStats() {
        const stats = this.getStats();
        this.log(`📊 === CRYPTONOTE PROXY STATISTICS ===`, 'info');
        this.log(`Total connections: ${stats.totalConnections}`, 'info');
        this.log(`Connected to pools: ${stats.connectedToPool}`, 'info');
        this.log(`Logged in: ${stats.loggedInConnections}`, 'info');
        this.log(`Ready (logged in): ${stats.readyConnections}`, 'info');
        this.log(`Shares: ${stats.totalShares} total, ${stats.acceptedShares} accepted, ${stats.rejectedShares} rejected`, 'info');
        if (stats.totalShares > 0) {
            const acceptanceRate = ((stats.acceptedShares / stats.totalShares) * 100).toFixed(1);
            this.log(`Acceptance rate: ${acceptanceRate}%`, stats.rejectedShares > 0 ? 'warning' : 'success');
        }
        this.log(`Uptime: ${Math.floor(stats.uptime / 3600)}h ${Math.floor((stats.uptime % 3600) / 60)}m`, 'info');
        this.log(`Memory: ${Math.round(stats.memoryUsage.rss / 1024 / 1024)}MB RSS, ${Math.round(stats.memoryUsage.heapUsed / 1024 / 1024)}MB Heap`, 'info');
        
        if (Object.keys(stats.connectionStates).length > 0) {
            this.log(`Connection states:`, 'info');
            Object.entries(stats.connectionStates).forEach(([state, count]) => {
                this.log(`   ${state}: ${count}`, 'info');
            });
        }
        
        Object.entries(stats.connectedPools).forEach(([pool, poolStats]) => {
            if (poolStats.total > 0) {
                this.log(`Pool ${pool}: ${poolStats.total} total, ${poolStats.connected} connected, ${poolStats.loggedIn} logged in, ${poolStats.ready} ready`, 'info');
                this.log(`   Shares: ${poolStats.shares.submitted} submitted, ${poolStats.shares.accepted} accepted, ${poolStats.shares.rejected} rejected`, 'info');
            }
        });
        this.log(`=========================================`, 'info');
    }
}

// Error handling
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Create and start proxy
const proxy = new ScalaCryptoNoteProxy({
    wsPort: process.env.WS_PORT || 8080
});

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🚀 Enhanced Scala CryptoNote Mining Proxy

Usage: node proxy.js [options]

Options:
  --port, -p <port>     WebSocket port (default: 8080)
  --debug, -d          Enable debug logging
  --help, -h           Show this help message

Environment Variables:
  WS_PORT              WebSocket port (default: 8080)

Available Pools (CryptoNote Protocol):
  scala                Scala Project Official Pool (mine.scalaproject.io:3333)
  herominers           HeroMiners Scala Pool (scala.herominers.com:10130)  
  fairpool             FairPool Scala (scala.fairpool.xyz:4455)

Connect from browser:
  ws://localhost:8080?pool=scala
  ws://localhost:8080?pool=herominers
  ws://localhost:8080?pool=fairpool

Protocol Notes:
  - Uses CryptoNote protocol, not Bitcoin Stratum
  - Converts mining.subscribe -> login
  - Converts mining.submit -> submit
  - Converts mining.notify <- job
  - Worker login format: wallet_address.worker_name
  - Fixed: Proper parameter validation and error handling
  - Fixed: Correct target/difficulty conversion
  - Fixed: Session ID tracking for submits
`);
    process.exit(0);
}

// Parse command line arguments
const portIndex = args.findIndex(arg => arg === '--port' || arg === '-p');
if (portIndex !== -1 && args[portIndex + 1]) {
    proxy.wsPort = parseInt(args[portIndex + 1]);
}

const debugIndex = args.findIndex(arg => arg === '--debug' || arg === '-d');
if (debugIndex !== -1) {
    proxy.debug = true;
}

// Start the proxy
console.log('🎯 Starting Enhanced Scala CryptoNote Proxy...');
console.log(`📋 Configured pools: ${Object.keys(proxy.pools).join(', ')}`);
console.log('🔄 Protocol: CryptoNote (login/submit/job) instead of Stratum');
console.log('✅ FIXED: Protocol translation, parameter validation, error handling');
proxy.start();

// Export for testing
module.exports = ScalaCryptoNoteProxy;