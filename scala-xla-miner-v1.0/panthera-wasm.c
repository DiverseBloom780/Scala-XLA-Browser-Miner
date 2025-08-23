#include <emscripten/emscripten.h>
#include <stdint.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Panthera algorithm constants (Scala XLA specific)
#define PANTHERA_MEMORY_SIZE (2 * 1024 * 1024)  // 2MB scratchpad
#define PANTHERA_ITERATIONS 524288
#define PANTHERA_HASH_SIZE 32

// Hash result structure
typedef struct {
    uint8_t data[PANTHERA_HASH_SIZE];
} panthera_hash_t;

// Mining job structure for Scala XLA
typedef struct {
    uint8_t blob[84];  // Scala uses 84-byte blocks
    uint8_t target[32];
    uint64_t height;
    char job_id[64];
    uint32_t nonce_offset;
    uint64_t difficulty;
} scala_job_t;

// Global mining state
static int mining_active = 0;
static uint64_t hash_count = 0;
static uint32_t current_nonce = 0;
static scala_job_t current_job;
static double hash_rate = 0.0;
static int mining_intensity = 50; // 0-100 scale
static uint8_t* scratchpad = NULL;

// Function declarations
int check_target(const panthera_hash_t* hash, const uint8_t* target);

// Panthera-inspired hash function (simplified for WebAssembly)
// In production, this would be the full Panthera implementation
void compute_panthera_hash(const uint8_t* input, size_t input_len, uint32_t nonce, panthera_hash_t* output) {
    // Initialize Panthera state
    uint64_t state[8] = {
        0x6a09e667f3bcc908ULL, 0xbb67ae8584caa73bULL, 
        0x3c6ef372fe94f82bULL, 0xa54ff53a5f1d36f1ULL,
        0x510e527fade682d1ULL, 0x9b05688c2b3e6c1fULL,
        0x1f83d9abfb41bd6bULL, 0x5be0cd19137e2179ULL
    };
    
    // Process input data with nonce
    for (size_t i = 0; i < input_len; i++) {
        state[i % 8] ^= input[i];
        state[i % 8] = (state[i % 8] << 13) | (state[i % 8] >> 51);
    }
    
    // Mix in nonce (Scala-specific)
    state[0] ^= nonce;
    state[1] ^= nonce >> 8;
    state[2] ^= nonce >> 16;
    state[3] ^= nonce >> 24;
    
    // Panthera memory-hard operations (simplified)
    if (scratchpad) {
        for (int round = 0; round < 16; round++) {
            for (int i = 0; i < 8; i++) {
                uint32_t addr = (state[i] % (PANTHERA_MEMORY_SIZE / 8)) * 8;
                uint64_t* mem_ptr = (uint64_t*)(scratchpad + addr);
                
                state[i] ^= *mem_ptr;
                *mem_ptr = state[i];
                
                // Panthera mixing function
                state[i] = (state[i] << 7) | (state[i] >> 57);
                state[i] *= 0x9e3779b97f4a7c15ULL;
                state[i] ^= state[(i + 1) % 8];
            }
        }
    }
    
    // Final mixing rounds
    for (int round = 0; round < 12; round++) {
        for (int i = 0; i < 8; i++) {
            state[i] ^= state[(i + 1) % 8];
            state[i] = (state[i] << 11) | (state[i] >> 53);
            state[i] += 0x9e3779b97f4a7c15ULL;
        }
    }
    
    // Output hash (first 32 bytes)
    memcpy(output->data, state, PANTHERA_HASH_SIZE);
}

// Initialize Panthera scratchpad
EMSCRIPTEN_KEEPALIVE
int init_panthera() {
    if (scratchpad) {
        free(scratchpad);
    }
    
    scratchpad = (uint8_t*)malloc(PANTHERA_MEMORY_SIZE);
    if (!scratchpad) {
        printf("Failed to allocate Panthera scratchpad\n");
        return 0;
    }
    
    // Initialize scratchpad with pseudo-random data
    for (size_t i = 0; i < PANTHERA_MEMORY_SIZE; i += 8) {
        uint64_t* ptr = (uint64_t*)(scratchpad + i);
        *ptr = 0x9e3779b97f4a7c15ULL * (i / 8);
    }
    
    printf("Panthera algorithm initialized with %d MB scratchpad\n", PANTHERA_MEMORY_SIZE / (1024 * 1024));
    return 1;
}

EMSCRIPTEN_KEEPALIVE
void start_mining() {
    mining_active = 1;
    printf("Scala XLA mining started with Panthera algorithm\n");
}

EMSCRIPTEN_KEEPALIVE
void stop_mining() {
    mining_active = 0;
    printf("Scala XLA mining stopped\n");
}

EMSCRIPTEN_KEEPALIVE
int is_mining() {
    return mining_active;
}

EMSCRIPTEN_KEEPALIVE
uint64_t get_hash_count() {
    return hash_count;
}

EMSCRIPTEN_KEEPALIVE
void reset_hash_count() {
    hash_count = 0;
}

EMSCRIPTEN_KEEPALIVE
double get_hash_rate() {
    return hash_rate;
}

EMSCRIPTEN_KEEPALIVE
void set_hash_rate(double rate) {
    hash_rate = rate;
}

EMSCRIPTEN_KEEPALIVE
void set_mining_intensity(int intensity) {
    if (intensity >= 0 && intensity <= 100) {
        mining_intensity = intensity;
        printf("Mining intensity set to %d%%\n", intensity);
    }
}

EMSCRIPTEN_KEEPALIVE
int get_mining_intensity() {
    return mining_intensity;
}

EMSCRIPTEN_KEEPALIVE
void set_scala_job(uint8_t* blob, size_t blob_size, uint8_t* target, uint64_t height, uint64_t difficulty, const char* job_id) {
    if (blob_size <= sizeof(current_job.blob)) {
        memcpy(current_job.blob, blob, blob_size);
        memcpy(current_job.target, target, 32);
        current_job.height = height;
        current_job.difficulty = difficulty;
        strncpy(current_job.job_id, job_id, sizeof(current_job.job_id) - 1);
        current_job.job_id[sizeof(current_job.job_id) - 1] = '\0';
        
        // Scala nonce offset (typically at offset 39)
        current_job.nonce_offset = 39;
        
        printf("New Scala job set: %s (difficulty: %llu)\n", job_id, difficulty);
    }
}

// Background mining step with intensity control
EMSCRIPTEN_KEEPALIVE
uint32_t mine_step_background(uint32_t max_iterations) {
    if (!mining_active || !scratchpad) {
        return 0;
    }
    
    // Adjust iterations based on mining intensity
    uint32_t iterations = (max_iterations * mining_intensity) / 100;
    if (iterations == 0) iterations = 1;
    
    panthera_hash_t result_hash;
    uint32_t local_nonce = current_nonce;
    
    for (uint32_t i = 0; i < iterations && mining_active; i++) {
        // Update nonce in blob
        if (current_job.nonce_offset + 4 <= sizeof(current_job.blob)) {
            *((uint32_t*)(current_job.blob + current_job.nonce_offset)) = local_nonce;
        }
        
        // Compute Panthera hash
        compute_panthera_hash(current_job.blob, sizeof(current_job.blob), local_nonce, &result_hash);
        hash_count++;
        
        // Check if we found a valid hash
        if (check_target(&result_hash, current_job.target)) {
            current_nonce = local_nonce;
            printf("Found valid Scala share! Nonce: %u, Job: %s\n", local_nonce, current_job.job_id);
            return local_nonce;
        }
        
        local_nonce++;
    }
    
    current_nonce = local_nonce;
    return 0; // No valid hash found
}

// Check if hash meets difficulty target
int check_target(const panthera_hash_t* hash, const uint8_t* target) {
    // Compare hash with target (little-endian)
    for (int i = 31; i >= 0; i--) {
        if (hash->data[i] < target[i]) return 1;
        if (hash->data[i] > target[i]) return 0;
    }
    return 1; // Equal is also valid
}

EMSCRIPTEN_KEEPALIVE
void set_nonce(uint32_t nonce) {
    current_nonce = nonce;
}

EMSCRIPTEN_KEEPALIVE
uint32_t get_nonce() {
    return current_nonce;
}

EMSCRIPTEN_KEEPALIVE
uint8_t* get_current_hash() {
    static panthera_hash_t last_hash;
    
    if (current_job.nonce_offset + 4 <= sizeof(current_job.blob)) {
        *((uint32_t*)(current_job.blob + current_job.nonce_offset)) = current_nonce;
    }
    
    compute_panthera_hash(current_job.blob, sizeof(current_job.blob), current_nonce, &last_hash);
    return last_hash.data;
}

EMSCRIPTEN_KEEPALIVE
const char* get_current_job_id() {
    return current_job.job_id;
}

EMSCRIPTEN_KEEPALIVE
uint64_t get_current_difficulty() {
    return current_job.difficulty;
}

EMSCRIPTEN_KEEPALIVE
uint64_t get_current_height() {
    return current_job.height;
}

// CryptoTab-style continuous mining
EMSCRIPTEN_KEEPALIVE
void enable_background_mining(int enable) {
    if (enable) {
        printf("Background mining enabled (CryptoTab style)\n");
    } else {
        printf("Background mining disabled\n");
    }
}

int main() {
    printf("Scala XLA WebAssembly Miner loaded\n");
    printf("Panthera algorithm support initialized\n");
    
    // Initialize Panthera algorithm
    if (!init_panthera()) {
        printf("Failed to initialize Panthera algorithm\n");
        return 1;
    }
    
    // Initialize default target (very low difficulty for testing)
    memset(current_job.target, 0xFF, 32);
    current_job.target[31] = 0x0F; // Very low difficulty
    current_job.difficulty = 1000;
    
    strcpy(current_job.job_id, "scala_default");
    
    printf("Ready for Scala XLA mining\n");
    return 0;
}