(module
  (type (;0;) (func (param i32) (result i32)))
  (type (;1;) (func (result i32)))
  (type (;2;) (func (param i32)))
  (type (;3;) (func (param i32 i32 i32) (result i32)))
  (type (;4;) (func))
  (type (;5;) (func (result i64)))
  (type (;6;) (func (param i32 i32 i32)))
  (type (;7;) (func (param i32 i32)))
  (type (;8;) (func (param i32 i32) (result i32)))
  (type (;9;) (func (param i32 i32 i32 i32) (result i32)))
  (type (;10;) (func (result f64)))
  (type (;11;) (func (param f64)))
  (type (;12;) (func (param i32 i32 i32 i64 i64 i32)))
  (type (;13;) (func (param i32 i64 i32) (result i64)))
  (type (;14;) (func (param i32 i32 i32 i32 i32) (result i32)))
  (type (;15;) (func (param i32 i32 i32 i32 i32)))
  (import "wasi_snapshot_preview1" "fd_write" (func (;0;) (type 9)))
  (import "env" "emscripten_resize_heap" (func (;1;) (type 0)))
  (func (;2;) (type 4)
    i32.const 3716
    i32.const 3596
    i32.store
    i32.const 3676
    i32.const 65536
    i32.store
    i32.const 3672
    i32.const 69792
    i32.store
    i32.const 3644
    i32.const 42
    i32.store
    i32.const 3680
    i32.const 2248
    i32.load
    i32.store)
  (func (;3;) (type 7) (param i32 i32)
    (local i32 i32 i32 i32 i32 i64 i64 i64 i64 i64 i64 i64 i64 i64 i64 i64 i64 i64 i64 i64)
    global.get 0
    i32.const -64
    i32.add
    local.tee 2
    i32.const 1080
    i64.load
    i64.store offset=56
    local.get 2
    i32.const 1072
    i64.load
    i64.store offset=48
    local.get 2
    i32.const 1064
    i64.load
    i64.store offset=40
    local.get 2
    i32.const 1056
    i64.load
    i64.store offset=32
    local.get 2
    i32.const 1048
    i64.load
    i64.store offset=24
    local.get 2
    i32.const 1040
    i64.load
    i64.store offset=16
    local.get 2
    i32.const 1032
    i64.load
    i64.store offset=8
    local.get 2
    i32.const 1024
    i64.load
    i64.store
    loop  ;; label = @1
      local.get 2
      local.get 4
      i32.const 6
      i32.and
      i32.const 3
      i32.shl
      i32.add
      local.tee 5
      local.get 5
      i64.load
      local.get 4
      i32.const 2280
      i32.add
      i64.load8_u
      i64.xor
      i64.const 13
      i64.rotl
      i64.store
      local.get 2
      local.get 4
      i32.const 1
      i32.or
      local.tee 5
      i32.const 7
      i32.and
      i32.const 3
      i32.shl
      i32.add
      local.tee 6
      local.get 6
      i64.load
      local.get 5
      i32.const 2280
      i32.add
      i64.load8_u
      i64.xor
      i64.const 13
      i64.rotl
      i64.store
      local.get 4
      i32.const 2
      i32.add
      local.set 4
      local.get 3
      i32.const 2
      i32.add
      local.tee 3
      i32.const 84
      i32.ne
      br_if 0 (;@1;)
    end
    local.get 2
    i64.load offset=16
    local.set 8
    local.get 2
    i64.load offset=8
    local.set 9
    local.get 2
    i64.load
    local.set 7
    local.get 2
    local.get 2
    i64.load offset=24
    local.get 0
    i32.const 24
    i32.shr_u
    i64.extend_i32_u
    i64.xor
    local.tee 10
    i64.store offset=24
    local.get 2
    local.get 8
    local.get 0
    i32.const 16
    i32.shr_u
    i64.extend_i32_u
    i64.xor
    local.tee 8
    i64.store offset=16
    local.get 2
    local.get 9
    local.get 0
    i32.const 8
    i32.shr_u
    i64.extend_i32_u
    i64.xor
    local.tee 9
    i64.store offset=8
    local.get 7
    local.get 0
    i64.extend_i32_u
    i64.xor
    local.set 7
    i32.const 0
    local.set 0
    block  ;; label = @1
      i32.const 2256
      i32.load
      local.tee 4
      i32.eqz
      if  ;; label = @2
        local.get 2
        i64.load offset=56
        local.set 15
        br 1 (;@1;)
      end
      local.get 2
      i64.load offset=56
      local.set 11
      local.get 2
      i64.load offset=48
      local.set 12
      local.get 2
      i64.load offset=40
      local.set 13
      local.get 2
      i64.load offset=32
      local.set 14
      local.get 2
      i64.load offset=24
      local.set 10
      local.get 2
      i64.load offset=16
      local.set 8
      local.get 2
      i64.load offset=8
      local.set 9
      loop  ;; label = @2
        local.get 4
        local.get 7
        i32.wrap_i64
        i32.const 3
        i32.shl
        i32.const 2097144
        i32.and
        i32.add
        local.tee 3
        local.get 3
        i64.load
        local.get 7
        i64.xor
        local.tee 7
        i64.store
        local.get 4
        local.get 9
        i32.wrap_i64
        i32.const 3
        i32.shl
        i32.const 2097144
        i32.and
        i32.add
        local.tee 3
        local.get 3
        i64.load
        local.get 9
        i64.xor
        local.tee 15
        i64.store
        local.get 4
        local.get 8
        i32.wrap_i64
        i32.const 3
        i32.shl
        i32.const 2097144
        i32.and
        i32.add
        local.tee 3
        local.get 3
        i64.load
        local.get 8
        i64.xor
        local.tee 16
        i64.store
        local.get 4
        local.get 10
        i32.wrap_i64
        i32.const 3
        i32.shl
        i32.const 2097144
        i32.and
        i32.add
        local.tee 3
        local.get 3
        i64.load
        local.get 10
        i64.xor
        local.tee 17
        i64.store
        local.get 4
        local.get 14
        i32.wrap_i64
        i32.const 3
        i32.shl
        i32.const 2097144
        i32.and
        i32.add
        local.tee 3
        local.get 3
        i64.load
        local.get 14
        i64.xor
        local.tee 18
        i64.store
        local.get 4
        local.get 13
        i32.wrap_i64
        i32.const 3
        i32.shl
        i32.const 2097144
        i32.and
        i32.add
        local.tee 3
        local.get 3
        i64.load
        local.get 13
        i64.xor
        local.tee 19
        i64.store
        local.get 4
        local.get 12
        i32.wrap_i64
        i32.const 3
        i32.shl
        i32.const 2097144
        i32.and
        i32.add
        local.tee 3
        local.get 3
        i64.load
        local.get 12
        i64.xor
        local.tee 20
        i64.store
        local.get 4
        local.get 11
        i32.wrap_i64
        i32.const 3
        i32.shl
        i32.const 2097144
        i32.and
        i32.add
        local.tee 3
        local.get 3
        i64.load
        local.get 11
        i64.xor
        local.tee 21
        i64.store
        local.get 9
        local.get 7
        i64.const 7
        i64.rotl
        i64.const -7046029254386353131
        i64.mul
        i64.xor
        local.set 7
        local.get 8
        local.get 15
        i64.const 7
        i64.rotl
        i64.const -7046029254386353131
        i64.mul
        i64.xor
        local.set 9
        local.get 10
        local.get 16
        i64.const 7
        i64.rotl
        i64.const -7046029254386353131
        i64.mul
        i64.xor
        local.set 8
        local.get 14
        local.get 17
        i64.const 7
        i64.rotl
        i64.const -7046029254386353131
        i64.mul
        i64.xor
        local.set 10
        local.get 13
        local.get 18
        i64.const 7
        i64.rotl
        i64.const -7046029254386353131
        i64.mul
        i64.xor
        local.set 14
        local.get 12
        local.get 19
        i64.const 7
        i64.rotl
        i64.const -7046029254386353131
        i64.mul
        i64.xor
        local.set 13
        local.get 11
        local.get 20
        i64.const 7
        i64.rotl
        i64.const -7046029254386353131
        i64.mul
        i64.xor
        local.set 12
        local.get 7
        local.get 21
        i64.const 7
        i64.rotl
        i64.const -7046029254386353131
        i64.mul
        i64.xor
        local.tee 15
        local.set 11
        local.get 0
        i32.const 1
        i32.add
        local.tee 0
        i32.const 16
        i32.ne
        br_if 0 (;@2;)
      end
      local.get 2
      local.get 15
      i64.store offset=56
      local.get 2
      local.get 12
      i64.store offset=48
      local.get 2
      local.get 13
      i64.store offset=40
      local.get 2
      local.get 14
      i64.store offset=32
      local.get 2
      local.get 10
      i64.store offset=24
      local.get 2
      local.get 8
      i64.store offset=16
      local.get 2
      local.get 7
      i64.store
      local.get 2
      local.get 9
      i64.store offset=8
    end
    i32.const 0
    local.set 4
    local.get 2
    i64.load offset=48
    local.set 12
    local.get 2
    i64.load offset=40
    local.set 13
    local.get 2
    i64.load offset=32
    local.set 14
    loop  ;; label = @1
      local.get 12
      local.get 15
      i64.xor
      local.set 11
      local.get 12
      local.get 13
      i64.xor
      local.set 16
      local.get 13
      local.get 14
      i64.xor
      local.set 17
      local.get 10
      local.get 14
      i64.xor
      local.set 18
      local.get 8
      local.get 10
      i64.xor
      local.set 19
      local.get 8
      local.get 9
      i64.xor
      local.set 20
      local.get 15
      local.get 7
      local.get 9
      i64.xor
      i64.const 11
      i64.rotl
      i64.const 7046029254386353131
      i64.sub
      local.tee 7
      i64.xor
      i64.const 11
      i64.rotl
      i64.const 7046029254386353131
      i64.sub
      local.set 15
      local.get 11
      i64.const 11
      i64.rotl
      i64.const 7046029254386353131
      i64.sub
      local.set 12
      local.get 16
      i64.const 11
      i64.rotl
      i64.const 7046029254386353131
      i64.sub
      local.set 13
      local.get 17
      i64.const 11
      i64.rotl
      i64.const 7046029254386353131
      i64.sub
      local.set 14
      local.get 18
      i64.const 11
      i64.rotl
      i64.const 7046029254386353131
      i64.sub
      local.tee 11
      local.set 10
      local.get 19
      i64.const 11
      i64.rotl
      i64.const 7046029254386353131
      i64.sub
      local.tee 16
      local.set 8
      local.get 20
      i64.const 11
      i64.rotl
      i64.const 7046029254386353131
      i64.sub
      local.tee 17
      local.set 9
      local.get 4
      i32.const 1
      i32.add
      local.tee 4
      i32.const 12
      i32.ne
      br_if 0 (;@1;)
    end
    local.get 2
    local.get 11
    i64.store offset=24
    local.get 2
    local.get 16
    i64.store offset=16
    local.get 2
    local.get 17
    i64.store offset=8
    local.get 2
    local.get 7
    i64.store
    local.get 1
    local.get 11
    i64.store offset=24 align=1
    local.get 1
    local.get 16
    i64.store offset=16 align=1
    local.get 1
    local.get 17
    i64.store offset=8 align=1
    local.get 1
    local.get 7
    i64.store align=1)
  (func (;4;) (type 1) (result i32)
    (local i32 i32 i64 i64)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 1
    global.set 0
    i32.const 2256
    i32.load
    local.tee 0
    if  ;; label = @1
      local.get 0
      call 40
    end
    i32.const 2256
    call 39
    local.tee 0
    i32.store
    block (result i32)  ;; label = @1
      local.get 0
      if  ;; label = @2
        loop  ;; label = @3
          local.get 0
          local.get 2
          i32.wrap_i64
          i32.add
          local.get 2
          i64.const 3
          i64.shr_u
          i64.const -7046029254386353131
          i64.mul
          i64.store
          local.get 0
          local.get 2
          i64.const 8
          i64.or
          local.tee 3
          i32.wrap_i64
          i32.add
          local.get 3
          i64.const 3
          i64.shr_u
          i64.const -7046029254386353131
          i64.mul
          i64.store
          local.get 0
          local.get 2
          i64.const 16
          i64.or
          local.tee 3
          i32.wrap_i64
          i32.add
          local.get 3
          i64.const 3
          i64.shr_u
          i64.const -7046029254386353131
          i64.mul
          i64.store
          local.get 0
          local.get 2
          i64.const 24
          i64.or
          local.tee 3
          i32.wrap_i64
          i32.add
          local.get 3
          i64.const 3
          i64.shr_u
          i64.const -7046029254386353131
          i64.mul
          i64.store
          local.get 2
          i64.const 32
          i64.add
          local.set 2
          local.get 3
          i64.const 2097144
          i64.lt_u
          br_if 0 (;@3;)
        end
        local.get 1
        i32.const 2
        i32.store
        i32.const 1489
        local.get 1
        call 24
        i32.const 1
        br 1 (;@1;)
      end
      i32.const 1354
      call 27
      i32.const 0
    end
    local.set 0
    local.get 1
    i32.const 16
    i32.add
    global.set 0
    local.get 0)
  (func (;5;) (type 4)
    i32.const 2260
    i32.const 1
    i32.store8
    i32.const 1112
    call 27)
  (func (;6;) (type 4)
    i32.const 2260
    i32.const 0
    i32.store8
    i32.const 1267
    call 27)
  (func (;7;) (type 1) (result i32)
    i32.const 2260
    i32.load8_u)
  (func (;8;) (type 5) (result i64)
    i32.const 2264
    i64.load)
  (func (;9;) (type 4)
    i32.const 2264
    i64.const 0
    i64.store)
  (func (;10;) (type 10) (result f64)
    i32.const 2272
    f64.load)
  (func (;11;) (type 11) (param f64)
    i32.const 2272
    local.get 0
    f64.store)
  (func (;12;) (type 2) (param i32)
    (local i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 1
    global.set 0
    local.get 0
    i32.const 100
    i32.le_u
    if  ;; label = @1
      i32.const 2096
      local.get 0
      i32.store
      local.get 1
      local.get 0
      i32.store
      i32.const 1585
      local.get 1
      call 24
    end
    local.get 1
    i32.const 16
    i32.add
    global.set 0)
  (func (;13;) (type 1) (result i32)
    i32.const 2096
    i32.load)
  (func (;14;) (type 12) (param i32 i32 i32 i64 i64 i32)
    (local i32 i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 7
    global.set 0
    local.get 1
    i32.const 84
    i32.le_u
    if  ;; label = @1
      local.get 1
      if  ;; label = @2
        i32.const 2280
        local.get 0
        local.get 1
        memory.copy
      end
      i32.const 2388
      local.get 2
      i64.load offset=24 align=1
      i64.store align=4
      i32.const 2380
      local.get 2
      i64.load offset=16 align=1
      i64.store align=4
      i32.const 2372
      local.get 2
      i64.load offset=8 align=1
      i64.store align=4
      i32.const 2364
      local.get 2
      i64.load align=1
      i64.store align=4
      i32.const 2480
      local.get 4
      i64.store
      i32.const 2400
      local.get 3
      i64.store
      i32.const 63
      local.set 1
      i32.const 2408
      local.set 6
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              local.get 5
              local.tee 0
              i32.const 2408
              i32.xor
              i32.const 3
              i32.and
              br_if 0 (;@5;)
              i32.const 1
              local.set 2
              block  ;; label = @6
                local.get 0
                i32.const 3
                i32.and
                i32.eqz
                br_if 0 (;@6;)
                loop  ;; label = @7
                  local.get 6
                  local.get 0
                  i32.load8_u
                  local.tee 2
                  i32.store8
                  local.get 2
                  i32.eqz
                  br_if 5 (;@2;)
                  local.get 6
                  i32.const 1
                  i32.add
                  local.set 6
                  local.get 1
                  i32.const 1
                  i32.sub
                  local.tee 1
                  i32.const 0
                  i32.ne
                  local.set 2
                  local.get 0
                  i32.const 1
                  i32.add
                  local.tee 0
                  i32.const 3
                  i32.and
                  i32.eqz
                  br_if 1 (;@6;)
                  local.get 1
                  br_if 0 (;@7;)
                end
              end
              local.get 2
              i32.eqz
              br_if 2 (;@3;)
              local.get 0
              i32.load8_u
              i32.eqz
              br_if 3 (;@2;)
              local.get 1
              i32.const 4
              i32.lt_u
              br_if 0 (;@5;)
              loop  ;; label = @6
                i32.const 16843008
                local.get 0
                i32.load
                local.tee 2
                i32.sub
                local.get 2
                i32.or
                i32.const -2139062144
                i32.and
                i32.const -2139062144
                i32.ne
                br_if 2 (;@4;)
                local.get 6
                local.get 2
                i32.store
                local.get 6
                i32.const 4
                i32.add
                local.set 6
                local.get 0
                i32.const 4
                i32.add
                local.set 0
                local.get 1
                i32.const 4
                i32.sub
                local.tee 1
                i32.const 3
                i32.gt_u
                br_if 0 (;@6;)
              end
            end
            local.get 1
            i32.eqz
            br_if 1 (;@3;)
          end
          loop  ;; label = @4
            local.get 6
            local.get 0
            i32.load8_u
            local.tee 2
            i32.store8
            local.get 2
            i32.eqz
            br_if 2 (;@2;)
            local.get 6
            i32.const 1
            i32.add
            local.set 6
            local.get 0
            i32.const 1
            i32.add
            local.set 0
            local.get 1
            i32.const 1
            i32.sub
            local.tee 1
            br_if 0 (;@4;)
          end
        end
        i32.const 0
        local.set 1
      end
      local.get 6
      i32.const 0
      local.get 1
      call 31
      i32.const 2472
      i32.const 39
      i32.store
      i32.const 2471
      i32.const 0
      i32.store8
      local.get 7
      local.get 5
      i32.store
      local.get 7
      local.get 4
      i64.store offset=8
      i32.const 1543
      local.get 7
      call 24
    end
    local.get 7
    i32.const 16
    i32.add
    global.set 0)
  (func (;15;) (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    i32.const 48
    i32.sub
    local.tee 2
    global.set 0
    block  ;; label = @1
      i32.const 2260
      i32.load8_u
      i32.eqz
      br_if 0 (;@1;)
      i32.const 2256
      i32.load
      i32.eqz
      br_if 0 (;@1;)
      i32.const 2488
      i32.load
      local.set 1
      block  ;; label = @2
        block  ;; label = @3
          i32.const 1
          i32.const 2096
          i32.load
          local.get 0
          i32.mul
          local.tee 0
          i32.const 100
          i32.div_u
          local.get 0
          i32.const 100
          i32.lt_u
          select
          local.tee 6
          i32.eqz
          br_if 0 (;@3;)
          loop  ;; label = @4
            i32.const 2472
            i32.load
            local.tee 0
            i32.const 4
            i32.add
            i32.const 84
            i32.le_u
            if  ;; label = @5
              local.get 0
              local.get 1
              i32.store offset=2280
            end
            local.get 1
            local.get 2
            i32.const 16
            i32.add
            call 3
            i32.const 2264
            i32.const 2264
            i64.load
            i64.const 1
            i64.add
            i64.store
            i32.const 31
            local.set 0
            loop  ;; label = @5
              local.get 2
              i32.const 16
              i32.add
              local.get 0
              i32.add
              i32.load8_u
              local.tee 3
              local.get 0
              i32.load8_u offset=2364
              local.tee 4
              i32.lt_u
              br_if 3 (;@2;)
              block  ;; label = @6
                local.get 3
                local.get 4
                i32.gt_u
                br_if 0 (;@6;)
                local.get 0
                i32.const 1
                i32.sub
                local.tee 7
                local.get 2
                i32.const 16
                i32.add
                i32.add
                i32.load8_u
                local.tee 3
                local.get 0
                i32.const 2363
                i32.add
                i32.load8_u
                local.tee 4
                i32.lt_u
                br_if 4 (;@2;)
                local.get 3
                local.get 4
                i32.gt_u
                br_if 0 (;@6;)
                local.get 0
                i32.const 2
                i32.sub
                local.set 0
                local.get 7
                i32.eqz
                br_if 4 (;@2;)
                br 1 (;@5;)
              end
            end
            local.get 1
            i32.const 1
            i32.add
            local.set 1
            local.get 5
            i32.const 1
            i32.add
            local.tee 5
            local.get 6
            i32.ge_u
            br_if 1 (;@3;)
            i32.const 2260
            i32.load8_u
            i32.const 1
            i32.and
            br_if 0 (;@4;)
          end
        end
        i32.const 2488
        local.get 1
        i32.store
        i32.const 0
        local.set 1
        br 1 (;@1;)
      end
      i32.const 2488
      local.get 1
      i32.store
      local.get 2
      local.get 1
      i32.store
      local.get 2
      i32.const 2408
      i32.store offset=4
      i32.const 1444
      local.get 2
      call 24
    end
    local.get 2
    i32.const 48
    i32.add
    global.set 0
    local.get 1)
  (func (;16;) (type 2) (param i32)
    i32.const 2488
    local.get 0
    i32.store)
  (func (;17;) (type 1) (result i32)
    i32.const 2488
    i32.load)
  (func (;18;) (type 1) (result i32)
    (local i32 i32)
    i32.const 2488
    i32.load
    local.set 0
    i32.const 2472
    i32.load
    local.tee 1
    i32.const 4
    i32.add
    i32.const 84
    i32.le_u
    if  ;; label = @1
      local.get 1
      local.get 0
      i32.store offset=2280
    end
    local.get 0
    i32.const 2492
    call 3
    i32.const 2492)
  (func (;19;) (type 1) (result i32)
    i32.const 2408)
  (func (;20;) (type 5) (result i64)
    i32.const 2480
    i64.load)
  (func (;21;) (type 5) (result i64)
    i32.const 2400
    i64.load)
  (func (;22;) (type 2) (param i32)
    i32.const 1400
    i32.const 1292
    local.get 0
    select
    call 27)
  (func (;23;) (type 8) (param i32 i32) (result i32)
    (local i64 i64 i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 4
    global.set 0
    i32.const 1319
    call 27
    i32.const 1228
    call 27
    i32.const 2256
    i32.load
    local.tee 0
    if  ;; label = @1
      local.get 0
      call 40
    end
    i32.const 2256
    call 39
    local.tee 0
    i32.store
    block (result i32)  ;; label = @1
      local.get 0
      if  ;; label = @2
        loop  ;; label = @3
          local.get 0
          local.get 2
          i32.wrap_i64
          i32.add
          local.get 2
          i64.const 3
          i64.shr_u
          i64.const -7046029254386353131
          i64.mul
          i64.store
          local.get 0
          local.get 2
          i64.const 8
          i64.or
          local.tee 3
          i32.wrap_i64
          i32.add
          local.get 3
          i64.const 3
          i64.shr_u
          i64.const -7046029254386353131
          i64.mul
          i64.store
          local.get 0
          local.get 2
          i64.const 16
          i64.or
          local.tee 3
          i32.wrap_i64
          i32.add
          local.get 3
          i64.const 3
          i64.shr_u
          i64.const -7046029254386353131
          i64.mul
          i64.store
          local.get 0
          local.get 2
          i64.const 24
          i64.or
          local.tee 3
          i32.wrap_i64
          i32.add
          local.get 3
          i64.const 3
          i64.shr_u
          i64.const -7046029254386353131
          i64.mul
          i64.store
          local.get 2
          i64.const 32
          i64.add
          local.set 2
          local.get 3
          i64.const 2097144
          i64.lt_u
          br_if 0 (;@3;)
        end
        local.get 4
        i32.const 2
        i32.store
        i32.const 1489
        local.get 4
        call 24
        i32.const 2388
        i64.const -1
        i64.store align=4
        i32.const 2380
        i64.const -1
        i64.store align=4
        i32.const 2372
        i64.const -1
        i64.store align=4
        i32.const 2364
        i64.const -1
        i64.store align=4
        i32.const 2480
        i64.const 1000
        i64.store
        i32.const 2395
        i32.const 15
        i32.store8
        i32.const 2408
        i32.const 1098
        i64.load align=1
        i64.store
        i32.const 2414
        i32.const 1104
        i64.load align=1
        i64.store align=2
        i32.const 1201
        local.set 1
        i32.const 0
        br 1 (;@1;)
      end
      i32.const 1354
      call 27
      i32.const 1161
      local.set 1
      i32.const 1
    end
    local.set 0
    local.get 1
    call 27
    local.get 4
    i32.const 16
    i32.add
    global.set 0
    local.get 0)
  (func (;24;) (type 7) (param i32 i32)
    (local i32 i32 i32 i32 i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 4
    global.set 0
    local.get 4
    local.get 1
    i32.store offset=12
    global.get 0
    i32.const 208
    i32.sub
    local.tee 2
    global.set 0
    local.get 2
    local.get 1
    i32.store offset=204
    local.get 2
    i32.const 160
    i32.add
    i32.const 0
    i32.const 40
    memory.fill
    local.get 2
    local.get 2
    i32.load offset=204
    i32.store offset=200
    block  ;; label = @1
      i32.const 0
      local.get 0
      local.get 2
      i32.const 200
      i32.add
      local.get 2
      i32.const 80
      i32.add
      local.get 2
      i32.const 160
      i32.add
      call 32
      i32.const 0
      i32.lt_s
      br_if 0 (;@1;)
      i32.const 2180
      i32.load
      i32.const 0
      i32.lt_s
      local.set 5
      i32.const 2104
      i32.const 2104
      i32.load
      local.tee 6
      i32.const -33
      i32.and
      i32.store
      block (result i32)  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            i32.const 2152
            i32.load
            i32.eqz
            if  ;; label = @5
              i32.const 2152
              i32.const 80
              i32.store
              i32.const 2132
              i32.const 0
              i32.store
              i32.const 2120
              i64.const 0
              i64.store
              i32.const 2148
              i32.load
              local.set 3
              i32.const 2148
              local.get 2
              i32.store
              br 1 (;@4;)
            end
            i32.const 2120
            i32.load
            br_if 1 (;@3;)
          end
          i32.const -1
          i32.const 2104
          call 25
          br_if 1 (;@2;)
          drop
        end
        i32.const 2104
        local.get 0
        local.get 2
        i32.const 200
        i32.add
        local.get 2
        i32.const 80
        i32.add
        local.get 2
        i32.const 160
        i32.add
        call 32
      end
      local.set 1
      local.get 6
      i32.const 32
      i32.and
      local.set 0
      local.get 3
      if (result i32)  ;; label = @2
        i32.const 2104
        i32.const 0
        i32.const 0
        i32.const 2140
        i32.load
        call_indirect (type 3)
        drop
        i32.const 2152
        i32.const 0
        i32.store
        i32.const 2148
        local.get 3
        i32.store
        i32.const 2132
        i32.const 0
        i32.store
        i32.const 2124
        i32.load
        drop
        i32.const 2120
        i64.const 0
        i64.store
        i32.const 0
      else
        local.get 1
      end
      drop
      i32.const 2104
      i32.const 2104
      i32.load
      local.get 0
      i32.or
      i32.store
      local.get 5
      br_if 0 (;@1;)
    end
    local.get 2
    i32.const 208
    i32.add
    global.set 0
    local.get 4
    i32.const 16
    i32.add
    global.set 0)
  (func (;25;) (type 0) (param i32) (result i32)
    (local i32)
    local.get 0
    local.get 0
    i32.load offset=72
    local.tee 1
    i32.const 1
    i32.sub
    local.get 1
    i32.or
    i32.store offset=72
    local.get 0
    i32.load
    local.tee 1
    i32.const 8
    i32.and
    if  ;; label = @1
      local.get 0
      local.get 1
      i32.const 32
      i32.or
      i32.store
      i32.const -1
      return
    end
    local.get 0
    i64.const 0
    i64.store offset=4 align=4
    local.get 0
    local.get 0
    i32.load offset=44
    local.tee 1
    i32.store offset=28
    local.get 0
    local.get 1
    i32.store offset=20
    local.get 0
    local.get 1
    local.get 0
    i32.load offset=48
    i32.add
    i32.store offset=16
    i32.const 0)
  (func (;26;) (type 3) (param i32 i32 i32) (result i32)
    (local i32 i32 i32 i32 i32)
    block  ;; label = @1
      local.get 2
      i32.load offset=16
      local.tee 5
      if (result i32)  ;; label = @2
        local.get 5
      else
        local.get 2
        call 25
        br_if 1 (;@1;)
        local.get 2
        i32.load offset=16
      end
      local.get 2
      i32.load offset=20
      local.tee 4
      i32.sub
      local.get 1
      i32.lt_u
      if  ;; label = @2
        local.get 2
        local.get 0
        local.get 1
        local.get 2
        i32.load offset=36
        call_indirect (type 3)
        return
      end
      block  ;; label = @2
        block  ;; label = @3
          local.get 2
          i32.load offset=80
          i32.const 0
          i32.lt_s
          br_if 0 (;@3;)
          local.get 1
          i32.eqz
          br_if 0 (;@3;)
          local.get 1
          local.set 5
          loop  ;; label = @4
            local.get 0
            local.get 5
            i32.add
            local.tee 3
            i32.const 1
            i32.sub
            i32.load8_u
            i32.const 10
            i32.ne
            if  ;; label = @5
              local.get 5
              i32.const 1
              i32.sub
              local.tee 5
              br_if 1 (;@4;)
              br 2 (;@3;)
            end
          end
          local.get 2
          local.get 0
          local.get 5
          local.get 2
          i32.load offset=36
          call_indirect (type 3)
          local.tee 4
          local.get 5
          i32.lt_u
          br_if 2 (;@1;)
          local.get 1
          local.get 5
          i32.sub
          local.set 1
          local.get 2
          i32.load offset=20
          local.set 4
          br 1 (;@2;)
        end
        local.get 0
        local.set 3
        i32.const 0
        local.set 5
      end
      block  ;; label = @2
        local.get 1
        local.tee 0
        i32.const 512
        i32.ge_u
        if  ;; label = @3
          local.get 0
          if  ;; label = @4
            local.get 4
            local.get 3
            local.get 0
            memory.copy
          end
          br 1 (;@2;)
        end
        local.get 0
        local.get 4
        i32.add
        local.set 6
        block  ;; label = @3
          local.get 3
          local.get 4
          i32.xor
          i32.const 3
          i32.and
          i32.eqz
          if  ;; label = @4
            block  ;; label = @5
              local.get 4
              i32.const 3
              i32.and
              i32.eqz
              if  ;; label = @6
                local.get 4
                local.set 0
                br 1 (;@5;)
              end
              local.get 0
              i32.eqz
              if  ;; label = @6
                local.get 4
                local.set 0
                br 1 (;@5;)
              end
              local.get 4
              local.set 0
              loop  ;; label = @6
                local.get 0
                local.get 3
                i32.load8_u
                i32.store8
                local.get 3
                i32.const 1
                i32.add
                local.set 3
                local.get 0
                i32.const 1
                i32.add
                local.tee 0
                i32.const 3
                i32.and
                i32.eqz
                br_if 1 (;@5;)
                local.get 0
                local.get 6
                i32.lt_u
                br_if 0 (;@6;)
              end
            end
            local.get 6
            i32.const -4
            i32.and
            local.set 7
            block  ;; label = @5
              local.get 6
              i32.const 64
              i32.lt_u
              br_if 0 (;@5;)
              local.get 0
              local.get 7
              i32.const -64
              i32.add
              local.tee 4
              i32.gt_u
              br_if 0 (;@5;)
              loop  ;; label = @6
                local.get 0
                local.get 3
                i32.load
                i32.store
                local.get 0
                local.get 3
                i32.load offset=4
                i32.store offset=4
                local.get 0
                local.get 3
                i32.load offset=8
                i32.store offset=8
                local.get 0
                local.get 3
                i32.load offset=12
                i32.store offset=12
                local.get 0
                local.get 3
                i32.load offset=16
                i32.store offset=16
                local.get 0
                local.get 3
                i32.load offset=20
                i32.store offset=20
                local.get 0
                local.get 3
                i32.load offset=24
                i32.store offset=24
                local.get 0
                local.get 3
                i32.load offset=28
                i32.store offset=28
                local.get 0
                local.get 3
                i32.load offset=32
                i32.store offset=32
                local.get 0
                local.get 3
                i32.load offset=36
                i32.store offset=36
                local.get 0
                local.get 3
                i32.load offset=40
                i32.store offset=40
                local.get 0
                local.get 3
                i32.load offset=44
                i32.store offset=44
                local.get 0
                local.get 3
                i32.load offset=48
                i32.store offset=48
                local.get 0
                local.get 3
                i32.load offset=52
                i32.store offset=52
                local.get 0
                local.get 3
                i32.load offset=56
                i32.store offset=56
                local.get 0
                local.get 3
                i32.load offset=60
                i32.store offset=60
                local.get 3
                i32.const -64
                i32.sub
                local.set 3
                local.get 0
                i32.const -64
                i32.sub
                local.tee 0
                local.get 4
                i32.le_u
                br_if 0 (;@6;)
              end
            end
            local.get 0
            local.get 7
            i32.ge_u
            br_if 1 (;@3;)
            loop  ;; label = @5
              local.get 0
              local.get 3
              i32.load
              i32.store
              local.get 3
              i32.const 4
              i32.add
              local.set 3
              local.get 0
              i32.const 4
              i32.add
              local.tee 0
              local.get 7
              i32.lt_u
              br_if 0 (;@5;)
            end
            br 1 (;@3;)
          end
          local.get 6
          i32.const 4
          i32.lt_u
          if  ;; label = @4
            local.get 4
            local.set 0
            br 1 (;@3;)
          end
          local.get 0
          i32.const 4
          i32.lt_u
          if  ;; label = @4
            local.get 4
            local.set 0
            br 1 (;@3;)
          end
          local.get 6
          i32.const 4
          i32.sub
          local.set 7
          local.get 4
          local.set 0
          loop  ;; label = @4
            local.get 0
            local.get 3
            i32.load8_u
            i32.store8
            local.get 0
            local.get 3
            i32.load8_u offset=1
            i32.store8 offset=1
            local.get 0
            local.get 3
            i32.load8_u offset=2
            i32.store8 offset=2
            local.get 0
            local.get 3
            i32.load8_u offset=3
            i32.store8 offset=3
            local.get 3
            i32.const 4
            i32.add
            local.set 3
            local.get 0
            i32.const 4
            i32.add
            local.tee 0
            local.get 7
            i32.le_u
            br_if 0 (;@4;)
          end
        end
        local.get 0
        local.get 6
        i32.lt_u
        if  ;; label = @3
          loop  ;; label = @4
            local.get 0
            local.get 3
            i32.load8_u
            i32.store8
            local.get 3
            i32.const 1
            i32.add
            local.set 3
            local.get 0
            i32.const 1
            i32.add
            local.tee 0
            local.get 6
            i32.ne
            br_if 0 (;@4;)
          end
        end
      end
      local.get 2
      local.get 2
      i32.load offset=20
      local.get 1
      i32.add
      i32.store offset=20
      local.get 1
      local.get 5
      i32.add
      local.set 4
    end
    local.get 4)
  (func (;27;) (type 2) (param i32)
    (local i32 i32 i32)
    i32.const 2180
    i32.load
    drop
    block  ;; label = @1
      block (result i32)  ;; label = @2
        block (result i32)  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              local.get 0
              local.tee 2
              i32.const 3
              i32.and
              i32.eqz
              br_if 0 (;@5;)
              i32.const 0
              local.get 0
              i32.load8_u
              i32.eqz
              br_if 2 (;@3;)
              drop
              loop  ;; label = @6
                local.get 0
                i32.const 1
                i32.add
                local.tee 0
                i32.const 3
                i32.and
                i32.eqz
                br_if 1 (;@5;)
                local.get 0
                i32.load8_u
                br_if 0 (;@6;)
              end
              br 1 (;@4;)
            end
            loop  ;; label = @5
              local.get 0
              local.tee 1
              i32.const 4
              i32.add
              local.set 0
              i32.const 16843008
              local.get 1
              i32.load
              local.tee 3
              i32.sub
              local.get 3
              i32.or
              i32.const -2139062144
              i32.and
              i32.const -2139062144
              i32.eq
              br_if 0 (;@5;)
            end
            loop  ;; label = @5
              local.get 1
              local.tee 0
              i32.const 1
              i32.add
              local.set 1
              local.get 0
              i32.load8_u
              br_if 0 (;@5;)
            end
          end
          local.get 0
          local.get 2
          i32.sub
        end
        local.tee 0
        local.get 0
        block (result i32)  ;; label = @3
          i32.const 2180
          i32.load
          i32.const 0
          i32.lt_s
          if  ;; label = @4
            local.get 2
            local.get 0
            i32.const 2104
            call 26
            br 1 (;@3;)
          end
          local.get 2
          local.get 0
          i32.const 2104
          call 26
        end
        local.tee 2
        i32.eq
        br_if 0 (;@2;)
        drop
        local.get 2
      end
      local.get 0
      i32.ne
      br_if 0 (;@1;)
      block  ;; label = @2
        i32.const 2184
        i32.load
        i32.const 10
        i32.eq
        br_if 0 (;@2;)
        i32.const 2124
        i32.load
        local.tee 0
        i32.const 2120
        i32.load
        i32.eq
        br_if 0 (;@2;)
        i32.const 2124
        local.get 0
        i32.const 1
        i32.add
        i32.store
        local.get 0
        i32.const 10
        i32.store8
        br 1 (;@1;)
      end
      global.get 0
      i32.const 16
      i32.sub
      local.tee 0
      global.set 0
      local.get 0
      i32.const 10
      i32.store8 offset=15
      block  ;; label = @2
        block  ;; label = @3
          i32.const 2120
          i32.load
          local.tee 1
          if (result i32)  ;; label = @4
            local.get 1
          else
            i32.const 2104
            call 25
            br_if 2 (;@2;)
            i32.const 2120
            i32.load
          end
          i32.const 2124
          i32.load
          local.tee 1
          i32.eq
          br_if 0 (;@3;)
          i32.const 2184
          i32.load
          i32.const 10
          i32.eq
          br_if 0 (;@3;)
          i32.const 2124
          local.get 1
          i32.const 1
          i32.add
          i32.store
          local.get 1
          i32.const 10
          i32.store8
          br 1 (;@2;)
        end
        i32.const 2104
        local.get 0
        i32.const 15
        i32.add
        i32.const 1
        i32.const 2140
        i32.load
        call_indirect (type 3)
        i32.const 1
        i32.ne
        br_if 0 (;@2;)
        local.get 0
        i32.load8_u offset=15
        drop
      end
      local.get 0
      i32.const 16
      i32.add
      global.set 0
    end)
  (func (;28;) (type 3) (param i32 i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    i32.const 32
    i32.sub
    local.tee 3
    global.set 0
    local.get 3
    local.get 0
    i32.load offset=28
    local.tee 4
    i32.store offset=16
    local.get 0
    i32.load offset=20
    local.set 5
    local.get 3
    local.get 2
    i32.store offset=28
    local.get 3
    local.get 1
    i32.store offset=24
    local.get 3
    local.get 5
    local.get 4
    i32.sub
    local.tee 1
    i32.store offset=20
    local.get 1
    local.get 2
    i32.add
    local.set 6
    local.get 3
    i32.const 16
    i32.add
    local.set 4
    i32.const 2
    local.set 7
    block (result i32)  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            local.get 0
            i32.load offset=60
            local.get 3
            i32.const 16
            i32.add
            i32.const 2
            local.get 3
            i32.const 12
            i32.add
            call 0
            call 37
            if  ;; label = @5
              local.get 4
              local.set 5
              br 1 (;@4;)
            end
            loop  ;; label = @5
              local.get 6
              local.get 3
              i32.load offset=12
              local.tee 1
              i32.eq
              br_if 2 (;@3;)
              local.get 1
              i32.const 0
              i32.lt_s
              if  ;; label = @6
                local.get 4
                local.set 5
                br 4 (;@2;)
              end
              local.get 4
              i32.const 8
              i32.const 0
              local.get 1
              local.get 4
              i32.load offset=4
              local.tee 8
              i32.gt_u
              local.tee 9
              select
              i32.add
              local.tee 5
              local.get 1
              local.get 8
              i32.const 0
              local.get 9
              select
              i32.sub
              local.tee 8
              local.get 5
              i32.load
              i32.add
              i32.store
              local.get 4
              i32.const 12
              i32.const 4
              local.get 9
              select
              i32.add
              local.tee 4
              local.get 4
              i32.load
              local.get 8
              i32.sub
              i32.store
              local.get 6
              local.get 1
              i32.sub
              local.set 6
              local.get 0
              i32.load offset=60
              local.get 5
              local.tee 4
              local.get 7
              local.get 9
              i32.sub
              local.tee 7
              local.get 3
              i32.const 12
              i32.add
              call 0
              call 37
              i32.eqz
              br_if 0 (;@5;)
            end
          end
          local.get 6
          i32.const -1
          i32.ne
          br_if 1 (;@2;)
        end
        local.get 0
        local.get 0
        i32.load offset=44
        local.tee 1
        i32.store offset=28
        local.get 0
        local.get 1
        i32.store offset=20
        local.get 0
        local.get 1
        local.get 0
        i32.load offset=48
        i32.add
        i32.store offset=16
        local.get 2
        br 1 (;@1;)
      end
      local.get 0
      i32.const 0
      i32.store offset=28
      local.get 0
      i64.const 0
      i64.store offset=16
      local.get 0
      local.get 0
      i32.load
      i32.const 32
      i32.or
      i32.store
      i32.const 0
      local.get 7
      i32.const 2
      i32.eq
      br_if 0 (;@1;)
      drop
      local.get 2
      local.get 5
      i32.load offset=4
      i32.sub
    end
    local.set 1
    local.get 3
    i32.const 32
    i32.add
    global.set 0
    local.get 1)
  (func (;29;) (type 0) (param i32) (result i32)
    i32.const 0)
  (func (;30;) (type 13) (param i32 i64 i32) (result i64)
    i64.const 0)
  (func (;31;) (type 6) (param i32 i32 i32)
    (local i32 i32 i64)
    block  ;; label = @1
      local.get 2
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      local.get 1
      i32.store8
      local.get 0
      local.get 2
      i32.add
      local.tee 3
      i32.const 1
      i32.sub
      local.get 1
      i32.store8
      local.get 2
      i32.const 3
      i32.lt_u
      br_if 0 (;@1;)
      local.get 0
      local.get 1
      i32.store8 offset=2
      local.get 0
      local.get 1
      i32.store8 offset=1
      local.get 3
      i32.const 3
      i32.sub
      local.get 1
      i32.store8
      local.get 3
      i32.const 2
      i32.sub
      local.get 1
      i32.store8
      local.get 2
      i32.const 7
      i32.lt_u
      br_if 0 (;@1;)
      local.get 0
      local.get 1
      i32.store8 offset=3
      local.get 3
      i32.const 4
      i32.sub
      local.get 1
      i32.store8
      local.get 2
      i32.const 9
      i32.lt_u
      br_if 0 (;@1;)
      local.get 0
      i32.const 0
      local.get 0
      i32.sub
      i32.const 3
      i32.and
      local.tee 4
      i32.add
      local.tee 3
      local.get 1
      i32.const 255
      i32.and
      i32.const 16843009
      i32.mul
      local.tee 1
      i32.store
      local.get 3
      local.get 2
      local.get 4
      i32.sub
      i32.const -4
      i32.and
      local.tee 4
      i32.add
      local.tee 2
      i32.const 4
      i32.sub
      local.get 1
      i32.store
      local.get 4
      i32.const 9
      i32.lt_u
      br_if 0 (;@1;)
      local.get 3
      local.get 1
      i32.store offset=8
      local.get 3
      local.get 1
      i32.store offset=4
      local.get 2
      i32.const 8
      i32.sub
      local.get 1
      i32.store
      local.get 2
      i32.const 12
      i32.sub
      local.get 1
      i32.store
      local.get 4
      i32.const 25
      i32.lt_u
      br_if 0 (;@1;)
      local.get 3
      local.get 1
      i32.store offset=24
      local.get 3
      local.get 1
      i32.store offset=20
      local.get 3
      local.get 1
      i32.store offset=16
      local.get 3
      local.get 1
      i32.store offset=12
      local.get 2
      i32.const 16
      i32.sub
      local.get 1
      i32.store
      local.get 2
      i32.const 20
      i32.sub
      local.get 1
      i32.store
      local.get 2
      i32.const 24
      i32.sub
      local.get 1
      i32.store
      local.get 2
      i32.const 28
      i32.sub
      local.get 1
      i32.store
      local.get 4
      local.get 3
      i32.const 4
      i32.and
      i32.const 24
      i32.or
      local.tee 4
      i32.sub
      local.tee 2
      i32.const 32
      i32.lt_u
      br_if 0 (;@1;)
      local.get 1
      i64.extend_i32_u
      i64.const 4294967297
      i64.mul
      local.set 5
      local.get 3
      local.get 4
      i32.add
      local.set 1
      loop  ;; label = @2
        local.get 1
        local.get 5
        i64.store offset=24
        local.get 1
        local.get 5
        i64.store offset=16
        local.get 1
        local.get 5
        i64.store offset=8
        local.get 1
        local.get 5
        i64.store
        local.get 1
        i32.const 32
        i32.add
        local.set 1
        local.get 2
        i32.const 32
        i32.sub
        local.tee 2
        i32.const 31
        i32.gt_u
        br_if 0 (;@2;)
      end
    end)
  (func (;32;) (type 14) (param i32 i32 i32 i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i64 i64 i64)
    global.get 0
    i32.const -64
    i32.add
    local.tee 6
    global.set 0
    local.get 6
    local.get 1
    i32.store offset=60
    local.get 6
    i32.const 41
    i32.add
    local.set 22
    local.get 6
    i32.const 39
    i32.add
    local.set 23
    local.get 6
    i32.const 40
    i32.add
    local.set 17
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            loop  ;; label = @5
              i32.const 0
              local.set 5
              loop  ;; label = @6
                local.get 1
                local.set 11
                local.get 5
                local.get 13
                i32.const 2147483647
                i32.xor
                i32.gt_s
                br_if 2 (;@4;)
                local.get 5
                local.get 13
                i32.add
                local.set 13
                block  ;; label = @7
                  block  ;; label = @8
                    block  ;; label = @9
                      block  ;; label = @10
                        local.get 1
                        local.tee 5
                        i32.load8_u
                        local.tee 10
                        if  ;; label = @11
                          loop  ;; label = @12
                            block  ;; label = @13
                              block  ;; label = @14
                                local.get 10
                                i32.const 255
                                i32.and
                                local.tee 10
                                i32.eqz
                                if  ;; label = @15
                                  local.get 5
                                  local.set 1
                                  br 1 (;@14;)
                                end
                                local.get 10
                                i32.const 37
                                i32.ne
                                br_if 1 (;@13;)
                                local.get 5
                                local.set 10
                                loop  ;; label = @15
                                  local.get 10
                                  i32.load8_u offset=1
                                  i32.const 37
                                  i32.ne
                                  if  ;; label = @16
                                    local.get 10
                                    local.set 1
                                    br 2 (;@14;)
                                  end
                                  local.get 5
                                  i32.const 1
                                  i32.add
                                  local.set 5
                                  local.get 10
                                  i32.load8_u offset=2
                                  local.set 7
                                  local.get 10
                                  i32.const 2
                                  i32.add
                                  local.tee 1
                                  local.set 10
                                  local.get 7
                                  i32.const 37
                                  i32.eq
                                  br_if 0 (;@15;)
                                end
                              end
                              local.get 5
                              local.get 11
                              i32.sub
                              local.tee 5
                              local.get 13
                              i32.const 2147483647
                              i32.xor
                              local.tee 10
                              i32.gt_s
                              br_if 9 (;@4;)
                              local.get 0
                              if  ;; label = @14
                                local.get 0
                                local.get 11
                                local.get 5
                                call 33
                              end
                              local.get 5
                              br_if 7 (;@6;)
                              local.get 6
                              local.get 1
                              i32.store offset=60
                              local.get 1
                              i32.const 1
                              i32.add
                              local.set 5
                              i32.const -1
                              local.set 15
                              block  ;; label = @14
                                local.get 1
                                i32.load8_s offset=1
                                i32.const 48
                                i32.sub
                                local.tee 7
                                i32.const 9
                                i32.gt_u
                                br_if 0 (;@14;)
                                local.get 1
                                i32.load8_u offset=2
                                i32.const 36
                                i32.ne
                                br_if 0 (;@14;)
                                local.get 1
                                i32.const 3
                                i32.add
                                local.set 5
                                i32.const 1
                                local.set 18
                                local.get 7
                                local.set 15
                              end
                              local.get 6
                              local.get 5
                              i32.store offset=60
                              i32.const 0
                              local.set 8
                              block  ;; label = @14
                                local.get 5
                                i32.load8_s
                                local.tee 12
                                i32.const 32
                                i32.sub
                                local.tee 1
                                i32.const 31
                                i32.gt_u
                                if  ;; label = @15
                                  local.get 5
                                  local.set 7
                                  br 1 (;@14;)
                                end
                                local.get 5
                                local.set 7
                                i32.const 1
                                local.get 1
                                i32.shl
                                local.tee 1
                                i32.const 75913
                                i32.and
                                i32.eqz
                                br_if 0 (;@14;)
                                loop  ;; label = @15
                                  local.get 6
                                  local.get 5
                                  i32.const 1
                                  i32.add
                                  local.tee 7
                                  i32.store offset=60
                                  local.get 1
                                  local.get 8
                                  i32.or
                                  local.set 8
                                  local.get 5
                                  i32.load8_s offset=1
                                  local.tee 12
                                  i32.const 32
                                  i32.sub
                                  local.tee 1
                                  i32.const 32
                                  i32.ge_u
                                  br_if 1 (;@14;)
                                  local.get 7
                                  local.set 5
                                  i32.const 1
                                  local.get 1
                                  i32.shl
                                  local.tee 1
                                  i32.const 75913
                                  i32.and
                                  br_if 0 (;@15;)
                                end
                              end
                              block  ;; label = @14
                                local.get 12
                                i32.const 42
                                i32.eq
                                if  ;; label = @15
                                  block (result i32)  ;; label = @16
                                    block  ;; label = @17
                                      local.get 7
                                      i32.load8_s offset=1
                                      i32.const 48
                                      i32.sub
                                      local.tee 5
                                      i32.const 9
                                      i32.gt_u
                                      br_if 0 (;@17;)
                                      local.get 7
                                      i32.load8_u offset=2
                                      i32.const 36
                                      i32.ne
                                      br_if 0 (;@17;)
                                      block (result i32)  ;; label = @18
                                        local.get 0
                                        i32.eqz
                                        if  ;; label = @19
                                          local.get 4
                                          local.get 5
                                          i32.const 2
                                          i32.shl
                                          i32.add
                                          i32.const 10
                                          i32.store
                                          i32.const 0
                                          br 1 (;@18;)
                                        end
                                        local.get 3
                                        local.get 5
                                        i32.const 3
                                        i32.shl
                                        i32.add
                                        i32.load
                                      end
                                      local.set 14
                                      local.get 7
                                      i32.const 3
                                      i32.add
                                      local.set 1
                                      i32.const 1
                                      br 1 (;@16;)
                                    end
                                    local.get 18
                                    br_if 6 (;@10;)
                                    local.get 7
                                    i32.const 1
                                    i32.add
                                    local.set 1
                                    local.get 0
                                    i32.eqz
                                    if  ;; label = @17
                                      local.get 6
                                      local.get 1
                                      i32.store offset=60
                                      i32.const 0
                                      local.set 18
                                      i32.const 0
                                      local.set 14
                                      br 3 (;@14;)
                                    end
                                    local.get 2
                                    local.get 2
                                    i32.load
                                    local.tee 5
                                    i32.const 4
                                    i32.add
                                    i32.store
                                    local.get 5
                                    i32.load
                                    local.set 14
                                    i32.const 0
                                  end
                                  local.set 18
                                  local.get 6
                                  local.get 1
                                  i32.store offset=60
                                  local.get 14
                                  i32.const 0
                                  i32.ge_s
                                  br_if 1 (;@14;)
                                  i32.const 0
                                  local.get 14
                                  i32.sub
                                  local.set 14
                                  local.get 8
                                  i32.const 8192
                                  i32.or
                                  local.set 8
                                  br 1 (;@14;)
                                end
                                local.get 6
                                i32.const 60
                                i32.add
                                call 34
                                local.tee 14
                                i32.const 0
                                i32.lt_s
                                br_if 10 (;@4;)
                                local.get 6
                                i32.load offset=60
                                local.set 1
                              end
                              i32.const 0
                              local.set 5
                              i32.const -1
                              local.set 9
                              block (result i32)  ;; label = @14
                                i32.const 0
                                local.get 1
                                i32.load8_u
                                i32.const 46
                                i32.ne
                                br_if 0 (;@14;)
                                drop
                                local.get 1
                                i32.load8_u offset=1
                                i32.const 42
                                i32.eq
                                if  ;; label = @15
                                  block (result i32)  ;; label = @16
                                    block  ;; label = @17
                                      local.get 1
                                      i32.load8_s offset=2
                                      i32.const 48
                                      i32.sub
                                      local.tee 7
                                      i32.const 9
                                      i32.gt_u
                                      br_if 0 (;@17;)
                                      local.get 1
                                      i32.load8_u offset=3
                                      i32.const 36
                                      i32.ne
                                      br_if 0 (;@17;)
                                      local.get 1
                                      i32.const 4
                                      i32.add
                                      local.set 1
                                      block (result i32)  ;; label = @18
                                        local.get 0
                                        i32.eqz
                                        if  ;; label = @19
                                          local.get 4
                                          local.get 7
                                          i32.const 2
                                          i32.shl
                                          i32.add
                                          i32.const 10
                                          i32.store
                                          i32.const 0
                                          br 1 (;@18;)
                                        end
                                        local.get 3
                                        local.get 7
                                        i32.const 3
                                        i32.shl
                                        i32.add
                                        i32.load
                                      end
                                      br 1 (;@16;)
                                    end
                                    local.get 18
                                    br_if 6 (;@10;)
                                    local.get 1
                                    i32.const 2
                                    i32.add
                                    local.set 1
                                    i32.const 0
                                    local.get 0
                                    i32.eqz
                                    br_if 0 (;@16;)
                                    drop
                                    local.get 2
                                    local.get 2
                                    i32.load
                                    local.tee 7
                                    i32.const 4
                                    i32.add
                                    i32.store
                                    local.get 7
                                    i32.load
                                  end
                                  local.set 9
                                  local.get 6
                                  local.get 1
                                  i32.store offset=60
                                  local.get 9
                                  i32.const 0
                                  i32.ge_s
                                  br 1 (;@14;)
                                end
                                local.get 6
                                local.get 1
                                i32.const 1
                                i32.add
                                i32.store offset=60
                                local.get 6
                                i32.const 60
                                i32.add
                                call 34
                                local.set 9
                                local.get 6
                                i32.load offset=60
                                local.set 1
                                i32.const 1
                              end
                              local.set 19
                              loop  ;; label = @14
                                local.get 5
                                local.set 7
                                i32.const 28
                                local.set 16
                                local.get 1
                                local.tee 12
                                i32.load8_s
                                local.tee 5
                                i32.const 123
                                i32.sub
                                i32.const -58
                                i32.lt_u
                                br_if 11 (;@3;)
                                local.get 1
                                i32.const 1
                                i32.add
                                local.set 1
                                local.get 5
                                local.get 7
                                i32.const 58
                                i32.mul
                                i32.add
                                i32.const 1551
                                i32.add
                                i32.load8_u
                                local.tee 5
                                i32.const 1
                                i32.sub
                                i32.const 255
                                i32.and
                                i32.const 8
                                i32.lt_u
                                br_if 0 (;@14;)
                              end
                              local.get 6
                              local.get 1
                              i32.store offset=60
                              block  ;; label = @14
                                local.get 5
                                i32.const 27
                                i32.ne
                                if  ;; label = @15
                                  local.get 5
                                  i32.eqz
                                  br_if 12 (;@3;)
                                  local.get 15
                                  i32.const 0
                                  i32.ge_s
                                  if  ;; label = @16
                                    local.get 0
                                    i32.eqz
                                    if  ;; label = @17
                                      local.get 4
                                      local.get 15
                                      i32.const 2
                                      i32.shl
                                      i32.add
                                      local.get 5
                                      i32.store
                                      br 12 (;@5;)
                                    end
                                    local.get 6
                                    local.get 3
                                    local.get 15
                                    i32.const 3
                                    i32.shl
                                    i32.add
                                    i64.load
                                    i64.store offset=48
                                    br 2 (;@14;)
                                  end
                                  local.get 0
                                  i32.eqz
                                  br_if 8 (;@7;)
                                  local.get 6
                                  i32.const 48
                                  i32.add
                                  local.get 5
                                  local.get 2
                                  call 35
                                  br 1 (;@14;)
                                end
                                local.get 15
                                i32.const 0
                                i32.ge_s
                                br_if 11 (;@3;)
                                i32.const 0
                                local.set 5
                                local.get 0
                                i32.eqz
                                br_if 8 (;@6;)
                              end
                              local.get 0
                              i32.load8_u
                              i32.const 32
                              i32.and
                              br_if 11 (;@2;)
                              local.get 8
                              i32.const -65537
                              i32.and
                              local.tee 20
                              local.get 8
                              local.get 8
                              i32.const 8192
                              i32.and
                              select
                              local.set 8
                              i32.const 0
                              local.set 15
                              i32.const 1088
                              local.set 21
                              local.get 17
                              local.set 16
                              block  ;; label = @14
                                block  ;; label = @15
                                  block (result i32)  ;; label = @16
                                    block  ;; label = @17
                                      block  ;; label = @18
                                        block  ;; label = @19
                                          block  ;; label = @20
                                            block  ;; label = @21
                                              block  ;; label = @22
                                                block (result i32)  ;; label = @23
                                                  block  ;; label = @24
                                                    block  ;; label = @25
                                                      block  ;; label = @26
                                                        block  ;; label = @27
                                                          block  ;; label = @28
                                                            block  ;; label = @29
                                                              block  ;; label = @30
                                                                local.get 12
                                                                i32.load8_u
                                                                local.tee 12
                                                                i32.extend8_s
                                                                local.tee 5
                                                                i32.const -45
                                                                i32.and
                                                                local.get 5
                                                                local.get 12
                                                                i32.const 15
                                                                i32.and
                                                                i32.const 3
                                                                i32.eq
                                                                select
                                                                local.get 5
                                                                local.get 7
                                                                select
                                                                local.tee 5
                                                                i32.const 88
                                                                i32.sub
                                                                br_table 4 (;@26;) 22 (;@8;) 22 (;@8;) 22 (;@8;) 22 (;@8;) 22 (;@8;) 22 (;@8;) 22 (;@8;) 22 (;@8;) 16 (;@14;) 22 (;@8;) 9 (;@21;) 6 (;@24;) 16 (;@14;) 16 (;@14;) 16 (;@14;) 22 (;@8;) 6 (;@24;) 22 (;@8;) 22 (;@8;) 22 (;@8;) 22 (;@8;) 2 (;@28;) 5 (;@25;) 3 (;@27;) 22 (;@8;) 22 (;@8;) 10 (;@20;) 22 (;@8;) 1 (;@29;) 22 (;@8;) 22 (;@8;) 4 (;@26;) 0 (;@30;)
                                                              end
                                                              block  ;; label = @30
                                                                local.get 5
                                                                i32.const 65
                                                                i32.sub
                                                                br_table 16 (;@14;) 22 (;@8;) 11 (;@19;) 22 (;@8;) 16 (;@14;) 16 (;@14;) 16 (;@14;) 0 (;@30;)
                                                              end
                                                              local.get 5
                                                              i32.const 83
                                                              i32.eq
                                                              br_if 11 (;@18;)
                                                              br 21 (;@8;)
                                                            end
                                                            local.get 6
                                                            i64.load offset=48
                                                            local.set 25
                                                            i32.const 1088
                                                            br 5 (;@23;)
                                                          end
                                                          i32.const 0
                                                          local.set 5
                                                          block  ;; label = @28
                                                            block  ;; label = @29
                                                              block  ;; label = @30
                                                                block  ;; label = @31
                                                                  block  ;; label = @32
                                                                    block  ;; label = @33
                                                                      block  ;; label = @34
                                                                        local.get 7
                                                                        br_table 0 (;@34;) 1 (;@33;) 2 (;@32;) 3 (;@31;) 4 (;@30;) 28 (;@6;) 5 (;@29;) 6 (;@28;) 28 (;@6;)
                                                                      end
                                                                      local.get 6
                                                                      i32.load offset=48
                                                                      local.get 13
                                                                      i32.store
                                                                      br 27 (;@6;)
                                                                    end
                                                                    local.get 6
                                                                    i32.load offset=48
                                                                    local.get 13
                                                                    i32.store
                                                                    br 26 (;@6;)
                                                                  end
                                                                  local.get 6
                                                                  i32.load offset=48
                                                                  local.get 13
                                                                  i64.extend_i32_s
                                                                  i64.store
                                                                  br 25 (;@6;)
                                                                end
                                                                local.get 6
                                                                i32.load offset=48
                                                                local.get 13
                                                                i32.store16
                                                                br 24 (;@6;)
                                                              end
                                                              local.get 6
                                                              i32.load offset=48
                                                              local.get 13
                                                              i32.store8
                                                              br 23 (;@6;)
                                                            end
                                                            local.get 6
                                                            i32.load offset=48
                                                            local.get 13
                                                            i32.store
                                                            br 22 (;@6;)
                                                          end
                                                          local.get 6
                                                          i32.load offset=48
                                                          local.get 13
                                                          i64.extend_i32_s
                                                          i64.store
                                                          br 21 (;@6;)
                                                        end
                                                        i32.const 8
                                                        local.get 9
                                                        local.get 9
                                                        i32.const 8
                                                        i32.le_u
                                                        select
                                                        local.set 9
                                                        local.get 8
                                                        i32.const 8
                                                        i32.or
                                                        local.set 8
                                                        i32.const 120
                                                        local.set 5
                                                      end
                                                      local.get 17
                                                      local.set 1
                                                      local.get 5
                                                      i32.const 32
                                                      i32.and
                                                      local.set 11
                                                      local.get 6
                                                      i64.load offset=48
                                                      local.tee 25
                                                      local.tee 24
                                                      i64.const 0
                                                      i64.ne
                                                      if  ;; label = @26
                                                        loop  ;; label = @27
                                                          local.get 1
                                                          i32.const 1
                                                          i32.sub
                                                          local.tee 1
                                                          local.get 24
                                                          i32.wrap_i64
                                                          i32.const 15
                                                          i32.and
                                                          i32.load8_u offset=2080
                                                          local.get 11
                                                          i32.or
                                                          i32.store8
                                                          local.get 24
                                                          i64.const 15
                                                          i64.gt_u
                                                          local.set 7
                                                          local.get 24
                                                          i64.const 4
                                                          i64.shr_u
                                                          local.set 24
                                                          local.get 7
                                                          br_if 0 (;@27;)
                                                        end
                                                      end
                                                      local.get 1
                                                      local.set 11
                                                      local.get 25
                                                      i64.eqz
                                                      br_if 3 (;@22;)
                                                      local.get 8
                                                      i32.const 8
                                                      i32.and
                                                      i32.eqz
                                                      br_if 3 (;@22;)
                                                      local.get 5
                                                      i32.const 4
                                                      i32.shr_u
                                                      i32.const 1088
                                                      i32.add
                                                      local.set 21
                                                      i32.const 2
                                                      local.set 15
                                                      br 3 (;@22;)
                                                    end
                                                    local.get 17
                                                    local.set 1
                                                    local.get 6
                                                    i64.load offset=48
                                                    local.tee 25
                                                    local.tee 24
                                                    i64.const 0
                                                    i64.ne
                                                    if  ;; label = @25
                                                      loop  ;; label = @26
                                                        local.get 1
                                                        i32.const 1
                                                        i32.sub
                                                        local.tee 1
                                                        local.get 24
                                                        i32.wrap_i64
                                                        i32.const 7
                                                        i32.and
                                                        i32.const 48
                                                        i32.or
                                                        i32.store8
                                                        local.get 24
                                                        i64.const 7
                                                        i64.gt_u
                                                        local.set 5
                                                        local.get 24
                                                        i64.const 3
                                                        i64.shr_u
                                                        local.set 24
                                                        local.get 5
                                                        br_if 0 (;@26;)
                                                      end
                                                    end
                                                    local.get 1
                                                    local.set 11
                                                    local.get 8
                                                    i32.const 8
                                                    i32.and
                                                    i32.eqz
                                                    br_if 2 (;@22;)
                                                    local.get 9
                                                    local.get 22
                                                    local.get 1
                                                    i32.sub
                                                    local.tee 5
                                                    local.get 5
                                                    local.get 9
                                                    i32.lt_s
                                                    select
                                                    local.set 9
                                                    br 2 (;@22;)
                                                  end
                                                  local.get 6
                                                  i64.load offset=48
                                                  local.tee 25
                                                  i64.const 0
                                                  i64.lt_s
                                                  if  ;; label = @24
                                                    local.get 6
                                                    i64.const 0
                                                    local.get 25
                                                    i64.sub
                                                    local.tee 25
                                                    i64.store offset=48
                                                    i32.const 1
                                                    local.set 15
                                                    i32.const 1088
                                                    br 1 (;@23;)
                                                  end
                                                  local.get 8
                                                  i32.const 2048
                                                  i32.and
                                                  if  ;; label = @24
                                                    i32.const 1
                                                    local.set 15
                                                    i32.const 1089
                                                    br 1 (;@23;)
                                                  end
                                                  i32.const 1090
                                                  i32.const 1088
                                                  local.get 8
                                                  i32.const 1
                                                  i32.and
                                                  local.tee 15
                                                  select
                                                end
                                                local.set 21
                                                local.get 17
                                                local.set 5
                                                block  ;; label = @23
                                                  local.get 25
                                                  local.tee 26
                                                  i64.const 4294967296
                                                  i64.lt_u
                                                  if  ;; label = @24
                                                    local.get 25
                                                    local.set 24
                                                    br 1 (;@23;)
                                                  end
                                                  loop  ;; label = @24
                                                    local.get 5
                                                    i32.const 1
                                                    i32.sub
                                                    local.tee 5
                                                    local.get 26
                                                    local.get 26
                                                    i64.const 10
                                                    i64.div_u
                                                    local.tee 24
                                                    i64.const 10
                                                    i64.mul
                                                    i64.sub
                                                    i32.wrap_i64
                                                    i32.const 48
                                                    i32.or
                                                    i32.store8
                                                    local.get 26
                                                    i64.const 42949672959
                                                    i64.gt_u
                                                    local.set 1
                                                    local.get 24
                                                    local.set 26
                                                    local.get 1
                                                    br_if 0 (;@24;)
                                                  end
                                                end
                                                local.get 24
                                                i64.const 0
                                                i64.ne
                                                if  ;; label = @23
                                                  local.get 24
                                                  i32.wrap_i64
                                                  local.set 1
                                                  loop  ;; label = @24
                                                    local.get 5
                                                    i32.const 1
                                                    i32.sub
                                                    local.tee 5
                                                    local.get 1
                                                    local.get 1
                                                    i32.const 10
                                                    i32.div_u
                                                    local.tee 7
                                                    i32.const 10
                                                    i32.mul
                                                    i32.sub
                                                    i32.const 48
                                                    i32.or
                                                    i32.store8
                                                    local.get 1
                                                    i32.const 9
                                                    i32.gt_u
                                                    local.set 11
                                                    local.get 7
                                                    local.set 1
                                                    local.get 11
                                                    br_if 0 (;@24;)
                                                  end
                                                end
                                                local.get 5
                                                local.set 11
                                              end
                                              local.get 19
                                              local.get 9
                                              i32.const 0
                                              i32.lt_s
                                              i32.and
                                              br_if 17 (;@4;)
                                              local.get 8
                                              i32.const -65537
                                              i32.and
                                              local.get 8
                                              local.get 19
                                              select
                                              local.set 8
                                              block  ;; label = @22
                                                local.get 25
                                                i64.const 0
                                                i64.ne
                                                br_if 0 (;@22;)
                                                local.get 9
                                                br_if 0 (;@22;)
                                                local.get 17
                                                local.set 11
                                                i32.const 0
                                                local.set 9
                                                br 14 (;@8;)
                                              end
                                              local.get 9
                                              local.get 25
                                              i64.eqz
                                              local.get 17
                                              local.get 11
                                              i32.sub
                                              i32.add
                                              local.tee 5
                                              local.get 5
                                              local.get 9
                                              i32.lt_s
                                              select
                                              local.set 9
                                              br 13 (;@8;)
                                            end
                                            local.get 6
                                            i32.load8_u offset=48
                                            local.set 5
                                            br 11 (;@9;)
                                          end
                                          block (result i32)  ;; label = @20
                                            i32.const 2147483647
                                            local.get 9
                                            local.get 9
                                            i32.const 2147483647
                                            i32.ge_u
                                            select
                                            local.tee 7
                                            local.tee 12
                                            i32.const 0
                                            i32.ne
                                            local.set 8
                                            block  ;; label = @21
                                              block  ;; label = @22
                                                block  ;; label = @23
                                                  local.get 6
                                                  i32.load offset=48
                                                  local.tee 5
                                                  i32.const 1393
                                                  local.get 5
                                                  select
                                                  local.tee 11
                                                  local.tee 1
                                                  local.tee 5
                                                  i32.const 3
                                                  i32.and
                                                  i32.eqz
                                                  br_if 0 (;@23;)
                                                  local.get 12
                                                  i32.eqz
                                                  br_if 0 (;@23;)
                                                  loop  ;; label = @24
                                                    local.get 5
                                                    i32.load8_u
                                                    i32.eqz
                                                    br_if 2 (;@22;)
                                                    local.get 12
                                                    i32.const 1
                                                    i32.sub
                                                    local.tee 12
                                                    i32.const 0
                                                    i32.ne
                                                    local.set 8
                                                    local.get 5
                                                    i32.const 1
                                                    i32.add
                                                    local.tee 5
                                                    i32.const 3
                                                    i32.and
                                                    i32.eqz
                                                    br_if 1 (;@23;)
                                                    local.get 12
                                                    br_if 0 (;@24;)
                                                  end
                                                end
                                                local.get 8
                                                i32.eqz
                                                br_if 1 (;@21;)
                                                block  ;; label = @23
                                                  local.get 5
                                                  i32.load8_u
                                                  i32.eqz
                                                  br_if 0 (;@23;)
                                                  local.get 12
                                                  i32.const 4
                                                  i32.lt_u
                                                  br_if 0 (;@23;)
                                                  loop  ;; label = @24
                                                    i32.const 16843008
                                                    local.get 5
                                                    i32.load
                                                    local.tee 8
                                                    i32.sub
                                                    local.get 8
                                                    i32.or
                                                    i32.const -2139062144
                                                    i32.and
                                                    i32.const -2139062144
                                                    i32.ne
                                                    br_if 2 (;@22;)
                                                    local.get 5
                                                    i32.const 4
                                                    i32.add
                                                    local.set 5
                                                    local.get 12
                                                    i32.const 4
                                                    i32.sub
                                                    local.tee 12
                                                    i32.const 3
                                                    i32.gt_u
                                                    br_if 0 (;@24;)
                                                  end
                                                end
                                                local.get 12
                                                i32.eqz
                                                br_if 1 (;@21;)
                                              end
                                              loop  ;; label = @22
                                                local.get 5
                                                local.get 5
                                                i32.load8_u
                                                i32.eqz
                                                br_if 2 (;@20;)
                                                drop
                                                local.get 5
                                                i32.const 1
                                                i32.add
                                                local.set 5
                                                local.get 12
                                                i32.const 1
                                                i32.sub
                                                local.tee 12
                                                br_if 0 (;@22;)
                                              end
                                            end
                                            i32.const 0
                                          end
                                          local.tee 5
                                          local.get 1
                                          i32.sub
                                          local.get 7
                                          local.get 5
                                          select
                                          local.tee 5
                                          local.get 11
                                          i32.add
                                          local.set 16
                                          local.get 9
                                          i32.const 0
                                          i32.ge_s
                                          if  ;; label = @20
                                            local.get 20
                                            local.set 8
                                            local.get 5
                                            local.set 9
                                            br 12 (;@8;)
                                          end
                                          local.get 20
                                          local.set 8
                                          local.get 5
                                          local.set 9
                                          local.get 16
                                          i32.load8_u
                                          br_if 15 (;@4;)
                                          br 11 (;@8;)
                                        end
                                        local.get 6
                                        i64.load offset=48
                                        local.tee 25
                                        i64.const 0
                                        i64.ne
                                        br_if 1 (;@17;)
                                        i32.const 0
                                        local.set 5
                                        br 9 (;@9;)
                                      end
                                      local.get 9
                                      if  ;; label = @18
                                        local.get 6
                                        i32.load offset=48
                                        br 2 (;@16;)
                                      end
                                      i32.const 0
                                      local.set 5
                                      local.get 0
                                      i32.const 32
                                      local.get 14
                                      i32.const 0
                                      local.get 8
                                      call 36
                                      br 2 (;@15;)
                                    end
                                    local.get 6
                                    i32.const 0
                                    i32.store offset=12
                                    local.get 6
                                    local.get 25
                                    i64.store32 offset=8
                                    local.get 6
                                    local.get 6
                                    i32.const 8
                                    i32.add
                                    i32.store offset=48
                                    i32.const -1
                                    local.set 9
                                    local.get 6
                                    i32.const 8
                                    i32.add
                                  end
                                  local.set 10
                                  i32.const 0
                                  local.set 5
                                  loop  ;; label = @16
                                    block  ;; label = @17
                                      local.get 10
                                      i32.load
                                      local.tee 7
                                      i32.eqz
                                      br_if 0 (;@17;)
                                      local.get 6
                                      i32.const 4
                                      i32.add
                                      local.get 7
                                      call 38
                                      local.tee 7
                                      i32.const 0
                                      i32.lt_s
                                      br_if 15 (;@2;)
                                      local.get 7
                                      local.get 9
                                      local.get 5
                                      i32.sub
                                      i32.gt_u
                                      br_if 0 (;@17;)
                                      local.get 10
                                      i32.const 4
                                      i32.add
                                      local.set 10
                                      local.get 5
                                      local.get 7
                                      i32.add
                                      local.tee 5
                                      local.get 9
                                      i32.lt_u
                                      br_if 1 (;@16;)
                                    end
                                  end
                                  i32.const 61
                                  local.set 16
                                  local.get 5
                                  i32.const 0
                                  i32.lt_s
                                  br_if 12 (;@3;)
                                  local.get 0
                                  i32.const 32
                                  local.get 14
                                  local.get 5
                                  local.get 8
                                  call 36
                                  local.get 5
                                  i32.eqz
                                  if  ;; label = @16
                                    i32.const 0
                                    local.set 5
                                    br 1 (;@15;)
                                  end
                                  i32.const 0
                                  local.set 7
                                  local.get 6
                                  i32.load offset=48
                                  local.set 10
                                  loop  ;; label = @16
                                    local.get 10
                                    i32.load
                                    local.tee 11
                                    i32.eqz
                                    br_if 1 (;@15;)
                                    local.get 6
                                    i32.const 4
                                    i32.add
                                    local.get 11
                                    call 38
                                    local.tee 11
                                    local.get 7
                                    i32.add
                                    local.tee 7
                                    local.get 5
                                    i32.gt_u
                                    br_if 1 (;@15;)
                                    local.get 0
                                    local.get 6
                                    i32.const 4
                                    i32.add
                                    local.get 11
                                    call 33
                                    local.get 10
                                    i32.const 4
                                    i32.add
                                    local.set 10
                                    local.get 5
                                    local.get 7
                                    i32.gt_u
                                    br_if 0 (;@16;)
                                  end
                                end
                                local.get 0
                                i32.const 32
                                local.get 14
                                local.get 5
                                local.get 8
                                i32.const 8192
                                i32.xor
                                call 36
                                local.get 14
                                local.get 5
                                local.get 5
                                local.get 14
                                i32.lt_s
                                select
                                local.set 5
                                br 8 (;@6;)
                              end
                              local.get 19
                              local.get 9
                              i32.const 0
                              i32.lt_s
                              i32.and
                              br_if 9 (;@4;)
                              i32.const 61
                              local.set 16
                              local.get 6
                              f64.load offset=48
                              unreachable
                            end
                            local.get 5
                            i32.load8_u offset=1
                            local.set 10
                            local.get 5
                            i32.const 1
                            i32.add
                            local.set 5
                            br 0 (;@12;)
                          end
                          unreachable
                        end
                        local.get 0
                        br_if 9 (;@1;)
                        local.get 18
                        i32.eqz
                        br_if 3 (;@7;)
                        i32.const 1
                        local.set 5
                        loop  ;; label = @11
                          local.get 4
                          local.get 5
                          i32.const 2
                          i32.shl
                          i32.add
                          i32.load
                          local.tee 10
                          if  ;; label = @12
                            local.get 3
                            local.get 5
                            i32.const 3
                            i32.shl
                            i32.add
                            local.get 10
                            local.get 2
                            call 35
                            i32.const 1
                            local.set 13
                            local.get 5
                            i32.const 1
                            i32.add
                            local.tee 5
                            i32.const 10
                            i32.ne
                            br_if 1 (;@11;)
                            br 11 (;@1;)
                          end
                        end
                        local.get 5
                        i32.const 10
                        i32.ge_u
                        if  ;; label = @11
                          i32.const 1
                          local.set 13
                          br 10 (;@1;)
                        end
                        loop  ;; label = @11
                          local.get 4
                          local.get 5
                          i32.const 2
                          i32.shl
                          i32.add
                          i32.load
                          br_if 1 (;@10;)
                          i32.const 1
                          local.set 13
                          local.get 5
                          i32.const 1
                          i32.add
                          local.tee 5
                          i32.const 10
                          i32.ne
                          br_if 0 (;@11;)
                        end
                        br 9 (;@1;)
                      end
                      i32.const 28
                      local.set 16
                      br 6 (;@3;)
                    end
                    local.get 6
                    local.get 5
                    i32.store8 offset=39
                    i32.const 1
                    local.set 9
                    local.get 23
                    local.set 11
                    local.get 20
                    local.set 8
                  end
                  local.get 9
                  local.get 16
                  local.get 11
                  i32.sub
                  local.tee 1
                  local.get 1
                  local.get 9
                  i32.lt_s
                  select
                  local.tee 12
                  local.get 15
                  i32.const 2147483647
                  i32.xor
                  i32.gt_s
                  br_if 3 (;@4;)
                  i32.const 61
                  local.set 16
                  local.get 14
                  local.get 12
                  local.get 15
                  i32.add
                  local.tee 7
                  local.get 7
                  local.get 14
                  i32.lt_s
                  select
                  local.tee 5
                  local.get 10
                  i32.gt_u
                  br_if 4 (;@3;)
                  local.get 0
                  i32.const 32
                  local.get 5
                  local.get 7
                  local.get 8
                  call 36
                  local.get 0
                  local.get 21
                  local.get 15
                  call 33
                  local.get 0
                  i32.const 48
                  local.get 5
                  local.get 7
                  local.get 8
                  i32.const 65536
                  i32.xor
                  call 36
                  local.get 0
                  i32.const 48
                  local.get 12
                  local.get 1
                  i32.const 0
                  call 36
                  local.get 0
                  local.get 11
                  local.get 1
                  call 33
                  local.get 0
                  i32.const 32
                  local.get 5
                  local.get 7
                  local.get 8
                  i32.const 8192
                  i32.xor
                  call 36
                  local.get 6
                  i32.load offset=60
                  local.set 1
                  br 1 (;@6;)
                end
              end
            end
            i32.const 0
            local.set 13
            br 3 (;@1;)
          end
          i32.const 61
          local.set 16
        end
        i32.const 3560
        local.get 16
        i32.store
      end
      i32.const -1
      local.set 13
    end
    local.get 6
    i32.const -64
    i32.sub
    global.set 0
    local.get 13)
  (func (;33;) (type 6) (param i32 i32 i32)
    local.get 0
    i32.load8_u
    i32.const 32
    i32.and
    i32.eqz
    if  ;; label = @1
      local.get 1
      local.get 2
      local.get 0
      call 26
      drop
    end)
  (func (;34;) (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32)
    local.get 0
    i32.load
    local.tee 3
    i32.load8_s
    i32.const 48
    i32.sub
    local.tee 2
    i32.const 9
    i32.gt_u
    if  ;; label = @1
      i32.const 0
      return
    end
    loop  ;; label = @1
      i32.const -1
      local.set 4
      local.get 1
      i32.const 214748364
      i32.le_u
      if  ;; label = @2
        i32.const -1
        local.get 2
        local.get 1
        i32.const 10
        i32.mul
        local.tee 1
        i32.add
        local.get 2
        local.get 1
        i32.const 2147483647
        i32.xor
        i32.gt_u
        select
        local.set 4
      end
      local.get 0
      local.get 3
      i32.const 1
      i32.add
      local.tee 2
      i32.store
      local.get 3
      i32.load8_s offset=1
      local.set 5
      local.get 4
      local.set 1
      local.get 2
      local.set 3
      local.get 5
      i32.const 48
      i32.sub
      local.tee 2
      i32.const 10
      i32.lt_u
      br_if 0 (;@1;)
    end
    local.get 1)
  (func (;35;) (type 6) (param i32 i32 i32)
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                block  ;; label = @7
                  block  ;; label = @8
                    block  ;; label = @9
                      block  ;; label = @10
                        block  ;; label = @11
                          block  ;; label = @12
                            block  ;; label = @13
                              block  ;; label = @14
                                block  ;; label = @15
                                  block  ;; label = @16
                                    block  ;; label = @17
                                      block  ;; label = @18
                                        block  ;; label = @19
                                          local.get 1
                                          i32.const 9
                                          i32.sub
                                          br_table 0 (;@19;) 1 (;@18;) 2 (;@17;) 5 (;@14;) 3 (;@16;) 4 (;@15;) 6 (;@13;) 7 (;@12;) 8 (;@11;) 9 (;@10;) 10 (;@9;) 11 (;@8;) 12 (;@7;) 13 (;@6;) 14 (;@5;) 15 (;@4;) 16 (;@3;) 17 (;@2;) 18 (;@1;)
                                        end
                                        local.get 2
                                        local.get 2
                                        i32.load
                                        local.tee 1
                                        i32.const 4
                                        i32.add
                                        i32.store
                                        local.get 0
                                        local.get 1
                                        i32.load
                                        i32.store
                                        return
                                      end
                                      local.get 2
                                      local.get 2
                                      i32.load
                                      local.tee 1
                                      i32.const 4
                                      i32.add
                                      i32.store
                                      local.get 0
                                      local.get 1
                                      i64.load32_s
                                      i64.store
                                      return
                                    end
                                    local.get 2
                                    local.get 2
                                    i32.load
                                    local.tee 1
                                    i32.const 4
                                    i32.add
                                    i32.store
                                    local.get 0
                                    local.get 1
                                    i64.load32_u
                                    i64.store
                                    return
                                  end
                                  local.get 2
                                  local.get 2
                                  i32.load
                                  local.tee 1
                                  i32.const 4
                                  i32.add
                                  i32.store
                                  local.get 0
                                  local.get 1
                                  i64.load32_s
                                  i64.store
                                  return
                                end
                                local.get 2
                                local.get 2
                                i32.load
                                local.tee 1
                                i32.const 4
                                i32.add
                                i32.store
                                local.get 0
                                local.get 1
                                i64.load32_u
                                i64.store
                                return
                              end
                              local.get 2
                              local.get 2
                              i32.load
                              i32.const 7
                              i32.add
                              i32.const -8
                              i32.and
                              local.tee 1
                              i32.const 8
                              i32.add
                              i32.store
                              local.get 0
                              local.get 1
                              i64.load
                              i64.store
                              return
                            end
                            local.get 2
                            local.get 2
                            i32.load
                            local.tee 1
                            i32.const 4
                            i32.add
                            i32.store
                            local.get 0
                            local.get 1
                            i64.load16_s
                            i64.store
                            return
                          end
                          local.get 2
                          local.get 2
                          i32.load
                          local.tee 1
                          i32.const 4
                          i32.add
                          i32.store
                          local.get 0
                          local.get 1
                          i64.load16_u
                          i64.store
                          return
                        end
                        local.get 2
                        local.get 2
                        i32.load
                        local.tee 1
                        i32.const 4
                        i32.add
                        i32.store
                        local.get 0
                        local.get 1
                        i64.load8_s
                        i64.store
                        return
                      end
                      local.get 2
                      local.get 2
                      i32.load
                      local.tee 1
                      i32.const 4
                      i32.add
                      i32.store
                      local.get 0
                      local.get 1
                      i64.load8_u
                      i64.store
                      return
                    end
                    local.get 2
                    local.get 2
                    i32.load
                    i32.const 7
                    i32.add
                    i32.const -8
                    i32.and
                    local.tee 1
                    i32.const 8
                    i32.add
                    i32.store
                    local.get 0
                    local.get 1
                    i64.load
                    i64.store
                    return
                  end
                  local.get 2
                  local.get 2
                  i32.load
                  local.tee 1
                  i32.const 4
                  i32.add
                  i32.store
                  local.get 0
                  local.get 1
                  i64.load32_u
                  i64.store
                  return
                end
                local.get 2
                local.get 2
                i32.load
                i32.const 7
                i32.add
                i32.const -8
                i32.and
                local.tee 1
                i32.const 8
                i32.add
                i32.store
                local.get 0
                local.get 1
                i64.load
                i64.store
                return
              end
              local.get 2
              local.get 2
              i32.load
              i32.const 7
              i32.add
              i32.const -8
              i32.and
              local.tee 1
              i32.const 8
              i32.add
              i32.store
              local.get 0
              local.get 1
              i64.load
              i64.store
              return
            end
            local.get 2
            local.get 2
            i32.load
            local.tee 1
            i32.const 4
            i32.add
            i32.store
            local.get 0
            local.get 1
            i64.load32_s
            i64.store
            return
          end
          local.get 2
          local.get 2
          i32.load
          local.tee 1
          i32.const 4
          i32.add
          i32.store
          local.get 0
          local.get 1
          i64.load32_u
          i64.store
          return
        end
        local.get 2
        local.get 2
        i32.load
        i32.const 7
        i32.add
        i32.const -8
        i32.and
        local.tee 1
        i32.const 8
        i32.add
        i32.store
        local.get 0
        local.get 1
        f64.load
        f64.store
        return
      end
      unreachable
    end)
  (func (;36;) (type 15) (param i32 i32 i32 i32 i32)
    (local i32)
    global.get 0
    i32.const 256
    i32.sub
    local.tee 5
    global.set 0
    block  ;; label = @1
      local.get 2
      local.get 3
      i32.le_s
      br_if 0 (;@1;)
      local.get 4
      i32.const 73728
      i32.and
      br_if 0 (;@1;)
      local.get 5
      local.get 1
      local.get 2
      local.get 3
      i32.sub
      local.tee 3
      i32.const 256
      local.get 3
      i32.const 256
      i32.lt_u
      local.tee 2
      select
      call 31
      local.get 2
      i32.eqz
      if  ;; label = @2
        loop  ;; label = @3
          local.get 0
          local.get 5
          i32.const 256
          call 33
          local.get 3
          i32.const 256
          i32.sub
          local.tee 3
          i32.const 255
          i32.gt_u
          br_if 0 (;@3;)
        end
      end
      local.get 0
      local.get 5
      local.get 3
      call 33
    end
    local.get 5
    i32.const 256
    i32.add
    global.set 0)
  (func (;37;) (type 0) (param i32) (result i32)
    local.get 0
    i32.eqz
    if  ;; label = @1
      i32.const 0
      return
    end
    i32.const 3560
    local.get 0
    i32.store
    i32.const -1)
  (func (;38;) (type 8) (param i32 i32) (result i32)
    local.get 0
    i32.eqz
    if  ;; label = @1
      i32.const 0
      return
    end
    block (result i32)  ;; label = @1
      block  ;; label = @2
        local.get 0
        if (result i32)  ;; label = @3
          local.get 1
          i32.const 127
          i32.le_u
          br_if 1 (;@2;)
          block  ;; label = @4
            i32.const 3716
            i32.load
            i32.load
            i32.eqz
            if  ;; label = @5
              local.get 1
              i32.const -128
              i32.and
              i32.const 57216
              i32.eq
              br_if 3 (;@2;)
              i32.const 3560
              i32.const 25
              i32.store
              br 1 (;@4;)
            end
            local.get 1
            i32.const 2047
            i32.le_u
            if  ;; label = @5
              local.get 0
              local.get 1
              i32.const 63
              i32.and
              i32.const 128
              i32.or
              i32.store8 offset=1
              local.get 0
              local.get 1
              i32.const 6
              i32.shr_u
              i32.const 192
              i32.or
              i32.store8
              i32.const 2
              br 4 (;@1;)
            end
            local.get 1
            i32.const -8192
            i32.and
            i32.const 57344
            i32.ne
            local.get 1
            i32.const 55296
            i32.ge_u
            i32.and
            i32.eqz
            if  ;; label = @5
              local.get 0
              local.get 1
              i32.const 63
              i32.and
              i32.const 128
              i32.or
              i32.store8 offset=2
              local.get 0
              local.get 1
              i32.const 12
              i32.shr_u
              i32.const 224
              i32.or
              i32.store8
              local.get 0
              local.get 1
              i32.const 6
              i32.shr_u
              i32.const 63
              i32.and
              i32.const 128
              i32.or
              i32.store8 offset=1
              i32.const 3
              br 4 (;@1;)
            end
            local.get 1
            i32.const 65536
            i32.sub
            i32.const 1048575
            i32.le_u
            if  ;; label = @5
              local.get 0
              local.get 1
              i32.const 63
              i32.and
              i32.const 128
              i32.or
              i32.store8 offset=3
              local.get 0
              local.get 1
              i32.const 18
              i32.shr_u
              i32.const 240
              i32.or
              i32.store8
              local.get 0
              local.get 1
              i32.const 6
              i32.shr_u
              i32.const 63
              i32.and
              i32.const 128
              i32.or
              i32.store8 offset=2
              local.get 0
              local.get 1
              i32.const 12
              i32.shr_u
              i32.const 63
              i32.and
              i32.const 128
              i32.or
              i32.store8 offset=1
              i32.const 4
              br 4 (;@1;)
            end
            i32.const 3560
            i32.const 25
            i32.store
          end
          i32.const -1
        else
          i32.const 1
        end
        br 1 (;@1;)
      end
      local.get 0
      local.get 1
      i32.store8
      i32.const 1
    end)
  (func (;39;) (type 1) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 10
    global.set 0
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                block  ;; label = @7
                  block  ;; label = @8
                    i32.const 3756
                    i32.load
                    local.tee 9
                    i32.eqz
                    br_if 0 (;@8;)
                    i32.const -2097160
                    local.set 3
                    block  ;; label = @9
                      block  ;; label = @10
                        i32.const 4160
                        i32.load
                        local.tee 2
                        if  ;; label = @11
                          i32.const 32768
                          local.set 1
                          loop  ;; label = @12
                            block  ;; label = @13
                              local.get 2
                              i32.load offset=4
                              i32.const -8
                              i32.and
                              i32.const 2097160
                              i32.sub
                              local.tee 5
                              local.get 3
                              i32.ge_u
                              br_if 0 (;@13;)
                              local.get 2
                              local.set 4
                              local.get 5
                              local.tee 3
                              br_if 0 (;@13;)
                              i32.const 0
                              local.set 3
                              local.get 4
                              local.set 0
                              br 3 (;@10;)
                            end
                            local.get 0
                            local.get 2
                            i32.load offset=20
                            local.tee 5
                            local.get 5
                            local.get 2
                            local.get 1
                            i32.const 29
                            i32.shr_u
                            i32.const 4
                            i32.and
                            i32.add
                            i32.load offset=16
                            local.tee 6
                            i32.eq
                            select
                            local.get 0
                            local.get 5
                            select
                            local.set 0
                            local.get 1
                            i32.const 1
                            i32.shl
                            local.set 1
                            local.get 6
                            local.tee 2
                            br_if 0 (;@12;)
                          end
                        end
                        local.get 0
                        local.get 4
                        i32.or
                        i32.eqz
                        if  ;; label = @11
                          i32.const 0
                          local.set 4
                          local.get 9
                          i32.const -134217728
                          i32.and
                          local.tee 0
                          i32.eqz
                          br_if 3 (;@8;)
                          local.get 0
                          i32.ctz
                          i32.const 2
                          i32.shl
                          i32.load offset=4056
                          local.set 0
                        end
                        local.get 0
                        i32.eqz
                        br_if 1 (;@9;)
                      end
                      loop  ;; label = @10
                        local.get 0
                        i32.load offset=4
                        i32.const -8
                        i32.and
                        i32.const 2097160
                        i32.sub
                        local.tee 5
                        local.get 3
                        i32.lt_u
                        local.set 1
                        local.get 5
                        local.get 3
                        local.get 1
                        select
                        local.set 3
                        local.get 0
                        local.get 4
                        local.get 1
                        select
                        local.set 4
                        local.get 0
                        i32.load offset=16
                        local.tee 2
                        if (result i32)  ;; label = @11
                          local.get 2
                        else
                          local.get 0
                          i32.load offset=20
                        end
                        local.tee 0
                        br_if 0 (;@10;)
                      end
                    end
                    local.get 4
                    i32.eqz
                    br_if 0 (;@8;)
                    local.get 3
                    i32.const 3760
                    i32.load
                    i32.const 2097160
                    i32.sub
                    i32.ge_u
                    br_if 0 (;@8;)
                    local.get 4
                    i32.load offset=24
                    local.set 6
                    local.get 4
                    local.get 4
                    i32.load offset=12
                    local.tee 0
                    i32.ne
                    if  ;; label = @9
                      local.get 4
                      i32.load offset=8
                      local.tee 2
                      local.get 0
                      i32.store offset=12
                      local.get 0
                      local.get 2
                      i32.store offset=8
                      br 7 (;@2;)
                    end
                    local.get 4
                    i32.load offset=20
                    local.tee 2
                    if (result i32)  ;; label = @9
                      local.get 4
                      i32.const 20
                      i32.add
                    else
                      local.get 4
                      i32.load offset=16
                      local.tee 2
                      i32.eqz
                      br_if 2 (;@7;)
                      local.get 4
                      i32.const 16
                      i32.add
                    end
                    local.set 1
                    loop  ;; label = @9
                      local.get 1
                      local.set 5
                      local.get 2
                      local.tee 0
                      i32.const 20
                      i32.add
                      local.set 1
                      local.get 0
                      i32.load offset=20
                      local.tee 2
                      br_if 0 (;@9;)
                      local.get 0
                      i32.const 16
                      i32.add
                      local.set 1
                      local.get 0
                      i32.load offset=16
                      local.tee 2
                      br_if 0 (;@9;)
                    end
                    local.get 5
                    i32.const 0
                    i32.store
                    br 6 (;@2;)
                  end
                  i32.const 3760
                  i32.load
                  local.tee 0
                  i32.const 2097160
                  i32.ge_u
                  if  ;; label = @8
                    i32.const 3772
                    i32.load
                    local.set 3
                    block  ;; label = @9
                      local.get 0
                      i32.const 2097160
                      i32.sub
                      local.tee 2
                      i32.const 16
                      i32.ge_u
                      if  ;; label = @10
                        local.get 3
                        i32.const 2097160
                        i32.add
                        local.tee 1
                        local.get 2
                        i32.const 1
                        i32.or
                        i32.store offset=4
                        local.get 0
                        local.get 3
                        i32.add
                        local.get 2
                        i32.store
                        local.get 3
                        i32.const 2097163
                        i32.store offset=4
                        br 1 (;@9;)
                      end
                      local.get 3
                      local.get 0
                      i32.const 3
                      i32.or
                      i32.store offset=4
                      local.get 0
                      local.get 3
                      i32.add
                      local.tee 0
                      local.get 0
                      i32.load offset=4
                      i32.const 1
                      i32.or
                      i32.store offset=4
                      i32.const 0
                      local.set 1
                      i32.const 0
                      local.set 2
                    end
                    i32.const 3760
                    local.get 2
                    i32.store
                    i32.const 3772
                    local.get 1
                    i32.store
                    local.get 3
                    i32.const 8
                    i32.add
                    local.set 0
                    br 7 (;@1;)
                  end
                  i32.const 3764
                  i32.load
                  local.tee 1
                  i32.const 2097160
                  i32.gt_u
                  if  ;; label = @8
                    i32.const 3764
                    local.get 1
                    i32.const 2097160
                    i32.sub
                    local.tee 3
                    i32.store
                    i32.const 3776
                    i32.const 3776
                    i32.load
                    local.tee 0
                    i32.const 2097160
                    i32.add
                    local.tee 2
                    i32.store
                    local.get 2
                    local.get 3
                    i32.const 1
                    i32.or
                    i32.store offset=4
                    local.get 0
                    i32.const 2097163
                    i32.store offset=4
                    local.get 0
                    i32.const 8
                    i32.add
                    local.set 0
                    br 7 (;@1;)
                  end
                  i32.const 0
                  local.set 0
                  block (result i32)  ;; label = @8
                    i32.const 4224
                    i32.load
                    if  ;; label = @9
                      i32.const 4232
                      i32.load
                      br 1 (;@8;)
                    end
                    i32.const 4236
                    i64.const -1
                    i64.store align=4
                    i32.const 4228
                    i64.const 17592186048512
                    i64.store align=4
                    i32.const 4224
                    local.get 10
                    i32.const 12
                    i32.add
                    i32.const -16
                    i32.and
                    i32.const 1431655768
                    i32.xor
                    i32.store
                    i32.const 4244
                    i32.const 0
                    i32.store
                    i32.const 4196
                    i32.const 0
                    i32.store
                    i32.const 4096
                  end
                  local.tee 3
                  i32.const 2097207
                  i32.add
                  local.tee 5
                  i32.const 0
                  local.get 3
                  i32.sub
                  local.tee 6
                  i32.and
                  local.tee 4
                  i32.const 2097160
                  i32.le_u
                  br_if 6 (;@1;)
                  i32.const 4192
                  i32.load
                  local.tee 3
                  if  ;; label = @8
                    i32.const 4184
                    i32.load
                    local.tee 2
                    local.get 4
                    i32.add
                    local.tee 9
                    local.get 2
                    i32.le_u
                    br_if 7 (;@1;)
                    local.get 3
                    local.get 9
                    i32.lt_u
                    br_if 7 (;@1;)
                  end
                  block  ;; label = @8
                    i32.const 4196
                    i32.load8_u
                    i32.const 4
                    i32.and
                    i32.eqz
                    if  ;; label = @9
                      block  ;; label = @10
                        block  ;; label = @11
                          block  ;; label = @12
                            block  ;; label = @13
                              i32.const 3776
                              i32.load
                              local.tee 3
                              if  ;; label = @14
                                i32.const 4200
                                local.set 0
                                loop  ;; label = @15
                                  local.get 0
                                  i32.load
                                  local.tee 2
                                  local.get 3
                                  i32.le_u
                                  if  ;; label = @16
                                    local.get 3
                                    local.get 2
                                    local.get 0
                                    i32.load offset=4
                                    i32.add
                                    i32.lt_u
                                    br_if 3 (;@13;)
                                  end
                                  local.get 0
                                  i32.load offset=8
                                  local.tee 0
                                  br_if 0 (;@15;)
                                end
                              end
                              i32.const 0
                              call 41
                              local.tee 1
                              i32.const -1
                              i32.eq
                              br_if 3 (;@10;)
                              local.get 4
                              local.set 5
                              i32.const 4228
                              i32.load
                              local.tee 0
                              i32.const 1
                              i32.sub
                              local.tee 3
                              local.get 1
                              i32.and
                              if  ;; label = @14
                                local.get 4
                                local.get 1
                                i32.sub
                                local.get 1
                                local.get 3
                                i32.add
                                i32.const 0
                                local.get 0
                                i32.sub
                                i32.and
                                i32.add
                                local.set 5
                              end
                              local.get 5
                              i32.const 2097160
                              i32.le_u
                              br_if 3 (;@10;)
                              i32.const 4192
                              i32.load
                              local.tee 0
                              if  ;; label = @14
                                i32.const 4184
                                i32.load
                                local.tee 3
                                local.get 5
                                i32.add
                                local.tee 2
                                local.get 3
                                i32.le_u
                                br_if 4 (;@10;)
                                local.get 0
                                local.get 2
                                i32.lt_u
                                br_if 4 (;@10;)
                              end
                              local.get 5
                              call 41
                              local.tee 0
                              local.get 1
                              i32.ne
                              br_if 1 (;@12;)
                              br 5 (;@8;)
                            end
                            local.get 5
                            local.get 1
                            i32.sub
                            local.get 6
                            i32.and
                            local.tee 5
                            call 41
                            local.tee 1
                            local.get 0
                            i32.load
                            local.get 0
                            i32.load offset=4
                            i32.add
                            i32.eq
                            br_if 1 (;@11;)
                            local.get 1
                            local.set 0
                          end
                          local.get 0
                          i32.const -1
                          i32.eq
                          br_if 1 (;@10;)
                          local.get 5
                          i32.const 2097208
                          i32.ge_u
                          if  ;; label = @12
                            local.get 0
                            local.set 1
                            br 4 (;@8;)
                          end
                          i32.const 4232
                          i32.load
                          local.tee 3
                          i32.const 2097207
                          local.get 5
                          i32.sub
                          i32.add
                          i32.const 0
                          local.get 3
                          i32.sub
                          i32.and
                          local.tee 3
                          call 41
                          i32.const -1
                          i32.eq
                          br_if 1 (;@10;)
                          local.get 3
                          local.get 5
                          i32.add
                          local.set 5
                          local.get 0
                          local.set 1
                          br 3 (;@8;)
                        end
                        local.get 1
                        i32.const -1
                        i32.ne
                        br_if 2 (;@8;)
                      end
                      i32.const 4196
                      i32.const 4196
                      i32.load
                      i32.const 4
                      i32.or
                      i32.store
                    end
                    local.get 4
                    call 41
                    local.set 1
                    i32.const 0
                    call 41
                    local.set 0
                    local.get 1
                    i32.const -1
                    i32.eq
                    br_if 4 (;@4;)
                    local.get 0
                    i32.const -1
                    i32.eq
                    br_if 4 (;@4;)
                    local.get 0
                    local.get 1
                    i32.le_u
                    br_if 4 (;@4;)
                    local.get 0
                    local.get 1
                    i32.sub
                    local.tee 5
                    i32.const 2097200
                    i32.le_u
                    br_if 4 (;@4;)
                  end
                  i32.const 4184
                  i32.const 4184
                  i32.load
                  local.get 5
                  i32.add
                  local.tee 0
                  i32.store
                  i32.const 4188
                  i32.load
                  local.get 0
                  i32.lt_u
                  if  ;; label = @8
                    i32.const 4188
                    local.get 0
                    i32.store
                  end
                  block  ;; label = @8
                    i32.const 3776
                    i32.load
                    local.tee 3
                    if  ;; label = @9
                      i32.const 4200
                      local.set 0
                      loop  ;; label = @10
                        local.get 1
                        local.get 0
                        i32.load
                        local.tee 2
                        local.get 0
                        i32.load offset=4
                        local.tee 4
                        i32.add
                        i32.eq
                        br_if 2 (;@8;)
                        local.get 0
                        i32.load offset=8
                        local.tee 0
                        br_if 0 (;@10;)
                      end
                      br 3 (;@6;)
                    end
                    i32.const 3768
                    i32.load
                    local.tee 0
                    i32.const 0
                    local.get 0
                    local.get 1
                    i32.le_u
                    select
                    i32.eqz
                    if  ;; label = @9
                      i32.const 3768
                      local.get 1
                      i32.store
                    end
                    i32.const 0
                    local.set 0
                    i32.const 4204
                    local.get 5
                    i32.store
                    i32.const 4200
                    local.get 1
                    i32.store
                    i32.const 3784
                    i32.const -1
                    i32.store
                    i32.const 3788
                    i32.const 4224
                    i32.load
                    i32.store
                    i32.const 4212
                    i32.const 0
                    i32.store
                    loop  ;; label = @9
                      local.get 0
                      i32.const 3
                      i32.shl
                      local.tee 3
                      local.get 3
                      i32.const 3792
                      i32.add
                      local.tee 2
                      i32.store offset=3800
                      local.get 3
                      local.get 2
                      i32.store offset=3804
                      local.get 0
                      i32.const 1
                      i32.add
                      local.tee 0
                      i32.const 32
                      i32.ne
                      br_if 0 (;@9;)
                    end
                    i32.const 3764
                    local.get 5
                    i32.const 40
                    i32.sub
                    local.tee 0
                    i32.const -8
                    local.get 1
                    i32.sub
                    i32.const 7
                    i32.and
                    local.tee 3
                    i32.sub
                    local.tee 2
                    i32.store
                    i32.const 3776
                    local.get 1
                    local.get 3
                    i32.add
                    local.tee 3
                    i32.store
                    local.get 3
                    local.get 2
                    i32.const 1
                    i32.or
                    i32.store offset=4
                    local.get 0
                    local.get 1
                    i32.add
                    i32.const 40
                    i32.store offset=4
                    i32.const 3780
                    i32.const 4240
                    i32.load
                    i32.store
                    br 3 (;@5;)
                  end
                  local.get 1
                  local.get 3
                  i32.le_u
                  br_if 1 (;@6;)
                  local.get 2
                  local.get 3
                  i32.gt_u
                  br_if 1 (;@6;)
                  local.get 0
                  i32.load offset=12
                  i32.const 8
                  i32.and
                  br_if 1 (;@6;)
                  local.get 0
                  local.get 4
                  local.get 5
                  i32.add
                  i32.store offset=4
                  i32.const 3776
                  local.get 3
                  i32.const -8
                  local.get 3
                  i32.sub
                  i32.const 7
                  i32.and
                  local.tee 0
                  i32.add
                  local.tee 2
                  i32.store
                  i32.const 3764
                  i32.const 3764
                  i32.load
                  local.get 5
                  i32.add
                  local.tee 1
                  local.get 0
                  i32.sub
                  local.tee 0
                  i32.store
                  local.get 2
                  local.get 0
                  i32.const 1
                  i32.or
                  i32.store offset=4
                  local.get 1
                  local.get 3
                  i32.add
                  i32.const 40
                  i32.store offset=4
                  i32.const 3780
                  i32.const 4240
                  i32.load
                  i32.store
                  br 2 (;@5;)
                end
                i32.const 0
                local.set 0
                br 4 (;@2;)
              end
              i32.const 3768
              i32.load
              local.get 1
              i32.gt_u
              if  ;; label = @6
                i32.const 3768
                local.get 1
                i32.store
              end
              local.get 1
              local.get 5
              i32.add
              local.set 2
              i32.const 4200
              local.set 0
              block  ;; label = @6
                loop  ;; label = @7
                  local.get 2
                  local.get 0
                  i32.load
                  local.tee 4
                  i32.ne
                  if  ;; label = @8
                    local.get 0
                    i32.load offset=8
                    local.tee 0
                    br_if 1 (;@7;)
                    br 2 (;@6;)
                  end
                end
                local.get 0
                i32.load8_u offset=12
                i32.const 8
                i32.and
                i32.eqz
                br_if 3 (;@3;)
              end
              i32.const 4200
              local.set 0
              loop  ;; label = @6
                block  ;; label = @7
                  local.get 0
                  i32.load
                  local.tee 2
                  local.get 3
                  i32.le_u
                  if  ;; label = @8
                    local.get 3
                    local.get 2
                    local.get 0
                    i32.load offset=4
                    i32.add
                    local.tee 2
                    i32.lt_u
                    br_if 1 (;@7;)
                  end
                  local.get 0
                  i32.load offset=8
                  local.set 0
                  br 1 (;@6;)
                end
              end
              i32.const 3764
              local.get 5
              i32.const 40
              i32.sub
              local.tee 0
              i32.const -8
              local.get 1
              i32.sub
              i32.const 7
              i32.and
              local.tee 4
              i32.sub
              local.tee 6
              i32.store
              i32.const 3776
              local.get 1
              local.get 4
              i32.add
              local.tee 4
              i32.store
              local.get 4
              local.get 6
              i32.const 1
              i32.or
              i32.store offset=4
              local.get 0
              local.get 1
              i32.add
              i32.const 40
              i32.store offset=4
              i32.const 3780
              i32.const 4240
              i32.load
              i32.store
              local.get 3
              local.get 2
              i32.const 39
              local.get 2
              i32.sub
              i32.const 7
              i32.and
              i32.add
              i32.const 47
              i32.sub
              local.tee 0
              local.get 0
              local.get 3
              i32.const 16
              i32.add
              i32.lt_u
              select
              local.tee 4
              i32.const 27
              i32.store offset=4
              local.get 4
              i32.const 4208
              i64.load align=4
              i64.store offset=16 align=4
              local.get 4
              i32.const 4200
              i64.load align=4
              i64.store offset=8 align=4
              i32.const 4208
              local.get 4
              i32.const 8
              i32.add
              i32.store
              i32.const 4204
              local.get 5
              i32.store
              i32.const 4200
              local.get 1
              i32.store
              i32.const 4212
              i32.const 0
              i32.store
              local.get 4
              i32.const 24
              i32.add
              local.set 0
              loop  ;; label = @6
                local.get 0
                i32.const 7
                i32.store offset=4
                local.get 0
                i32.const 8
                i32.add
                local.set 1
                local.get 0
                i32.const 4
                i32.add
                local.set 0
                local.get 1
                local.get 2
                i32.lt_u
                br_if 0 (;@6;)
              end
              local.get 3
              local.get 4
              i32.eq
              br_if 0 (;@5;)
              local.get 4
              local.get 4
              i32.load offset=4
              i32.const -2
              i32.and
              i32.store offset=4
              local.get 3
              local.get 4
              local.get 3
              i32.sub
              local.tee 1
              i32.const 1
              i32.or
              i32.store offset=4
              local.get 4
              local.get 1
              i32.store
              block (result i32)  ;; label = @6
                local.get 1
                i32.const 255
                i32.le_u
                if  ;; label = @7
                  local.get 1
                  i32.const -8
                  i32.and
                  i32.const 3792
                  i32.add
                  local.set 0
                  block (result i32)  ;; label = @8
                    i32.const 3752
                    i32.load
                    local.tee 2
                    i32.const 1
                    local.get 1
                    i32.const 3
                    i32.shr_u
                    i32.shl
                    local.tee 1
                    i32.and
                    i32.eqz
                    if  ;; label = @9
                      i32.const 3752
                      local.get 1
                      local.get 2
                      i32.or
                      i32.store
                      local.get 0
                      br 1 (;@8;)
                    end
                    local.get 0
                    i32.load offset=8
                  end
                  local.set 2
                  local.get 0
                  local.get 3
                  i32.store offset=8
                  local.get 2
                  local.get 3
                  i32.store offset=12
                  i32.const 12
                  local.set 1
                  i32.const 8
                  br 1 (;@6;)
                end
                i32.const 31
                local.set 0
                local.get 1
                i32.const 16777215
                i32.le_u
                if  ;; label = @7
                  local.get 1
                  i32.const 38
                  local.get 1
                  i32.const 8
                  i32.shr_u
                  i32.clz
                  local.tee 0
                  i32.sub
                  i32.shr_u
                  i32.const 1
                  i32.and
                  local.get 0
                  i32.const 1
                  i32.shl
                  i32.sub
                  i32.const 62
                  i32.add
                  local.set 0
                end
                local.get 3
                local.get 0
                i32.store offset=28
                local.get 3
                i64.const 0
                i64.store offset=16 align=4
                local.get 0
                i32.const 2
                i32.shl
                i32.const 4056
                i32.add
                local.set 2
                block  ;; label = @7
                  block  ;; label = @8
                    i32.const 3756
                    i32.load
                    local.tee 4
                    i32.const 1
                    local.get 0
                    i32.shl
                    local.tee 5
                    i32.and
                    i32.eqz
                    if  ;; label = @9
                      i32.const 3756
                      local.get 4
                      local.get 5
                      i32.or
                      i32.store
                      local.get 2
                      local.get 3
                      i32.store
                      local.get 3
                      local.get 2
                      i32.store offset=24
                      br 1 (;@8;)
                    end
                    local.get 1
                    i32.const 25
                    local.get 0
                    i32.const 1
                    i32.shr_u
                    i32.sub
                    i32.const 0
                    local.get 0
                    i32.const 31
                    i32.ne
                    select
                    i32.shl
                    local.set 0
                    local.get 2
                    i32.load
                    local.set 4
                    loop  ;; label = @9
                      local.get 4
                      local.tee 2
                      i32.load offset=4
                      i32.const -8
                      i32.and
                      local.get 1
                      i32.eq
                      br_if 2 (;@7;)
                      local.get 0
                      i32.const 29
                      i32.shr_u
                      local.set 4
                      local.get 0
                      i32.const 1
                      i32.shl
                      local.set 0
                      local.get 2
                      local.get 4
                      i32.const 4
                      i32.and
                      i32.add
                      local.tee 5
                      i32.load offset=16
                      local.tee 4
                      br_if 0 (;@9;)
                    end
                    local.get 5
                    local.get 3
                    i32.store offset=16
                    local.get 3
                    local.get 2
                    i32.store offset=24
                  end
                  i32.const 8
                  local.set 1
                  local.get 3
                  local.set 2
                  local.get 3
                  local.set 0
                  i32.const 12
                  br 1 (;@6;)
                end
                local.get 2
                i32.load offset=8
                local.tee 0
                local.get 3
                i32.store offset=12
                local.get 2
                local.get 3
                i32.store offset=8
                local.get 3
                local.get 0
                i32.store offset=8
                i32.const 0
                local.set 0
                i32.const 24
                local.set 1
                i32.const 12
              end
              local.get 3
              i32.add
              local.get 2
              i32.store
              local.get 1
              local.get 3
              i32.add
              local.get 0
              i32.store
            end
            i32.const 3764
            i32.load
            local.tee 0
            i32.const 2097160
            i32.le_u
            br_if 0 (;@4;)
            i32.const 3764
            local.get 0
            i32.const 2097160
            i32.sub
            local.tee 3
            i32.store
            i32.const 3776
            i32.const 3776
            i32.load
            local.tee 0
            i32.const 2097160
            i32.add
            local.tee 2
            i32.store
            local.get 2
            local.get 3
            i32.const 1
            i32.or
            i32.store offset=4
            local.get 0
            i32.const 2097163
            i32.store offset=4
            local.get 0
            i32.const 8
            i32.add
            local.set 0
            br 3 (;@1;)
          end
          i32.const 3560
          i32.const 48
          i32.store
          i32.const 0
          local.set 0
          br 2 (;@1;)
        end
        local.get 0
        local.get 1
        i32.store
        local.get 0
        local.get 0
        i32.load offset=4
        local.get 5
        i32.add
        i32.store offset=4
        local.get 1
        i32.const -8
        local.get 1
        i32.sub
        i32.const 7
        i32.and
        i32.add
        local.tee 3
        i32.const 2097163
        i32.store offset=4
        local.get 4
        i32.const -8
        local.get 4
        i32.sub
        i32.const 7
        i32.and
        i32.add
        local.tee 8
        local.get 3
        i32.const 2097160
        i32.add
        local.tee 7
        i32.sub
        local.set 1
        block  ;; label = @3
          i32.const 3776
          i32.load
          local.get 8
          i32.eq
          if  ;; label = @4
            i32.const 3776
            local.get 7
            i32.store
            i32.const 3764
            i32.const 3764
            i32.load
            local.get 1
            i32.add
            local.tee 5
            i32.store
            local.get 7
            local.get 5
            i32.const 1
            i32.or
            i32.store offset=4
            br 1 (;@3;)
          end
          i32.const 3772
          i32.load
          local.get 8
          i32.eq
          if  ;; label = @4
            i32.const 3772
            local.get 7
            i32.store
            i32.const 3760
            i32.const 3760
            i32.load
            local.get 1
            i32.add
            local.tee 5
            i32.store
            local.get 7
            local.get 5
            i32.const 1
            i32.or
            i32.store offset=4
            local.get 5
            local.get 7
            i32.add
            local.get 5
            i32.store
            br 1 (;@3;)
          end
          local.get 8
          i32.load offset=4
          local.tee 4
          i32.const 3
          i32.and
          i32.const 1
          i32.eq
          if  ;; label = @4
            local.get 4
            i32.const -8
            i32.and
            local.set 6
            local.get 8
            i32.load offset=12
            local.set 5
            block  ;; label = @5
              local.get 4
              i32.const 255
              i32.le_u
              if  ;; label = @6
                local.get 8
                i32.load offset=8
                local.tee 2
                local.get 5
                i32.eq
                if  ;; label = @7
                  i32.const 3752
                  i32.const 3752
                  i32.load
                  i32.const -2
                  local.get 4
                  i32.const 3
                  i32.shr_u
                  i32.rotl
                  i32.and
                  i32.store
                  br 2 (;@5;)
                end
                local.get 2
                local.get 5
                i32.store offset=12
                local.get 5
                local.get 2
                i32.store offset=8
                br 1 (;@5;)
              end
              local.get 8
              i32.load offset=24
              local.set 9
              block  ;; label = @6
                local.get 5
                local.get 8
                i32.ne
                if  ;; label = @7
                  local.get 8
                  i32.load offset=8
                  local.tee 4
                  local.get 5
                  i32.store offset=12
                  local.get 5
                  local.get 4
                  i32.store offset=8
                  br 1 (;@6;)
                end
                block  ;; label = @7
                  local.get 8
                  i32.load offset=20
                  local.tee 4
                  if (result i32)  ;; label = @8
                    local.get 8
                    i32.const 20
                    i32.add
                  else
                    local.get 8
                    i32.load offset=16
                    local.tee 4
                    i32.eqz
                    br_if 1 (;@7;)
                    local.get 8
                    i32.const 16
                    i32.add
                  end
                  local.set 2
                  loop  ;; label = @8
                    local.get 2
                    local.set 0
                    local.get 4
                    local.tee 5
                    i32.const 20
                    i32.add
                    local.set 2
                    local.get 4
                    i32.load offset=20
                    local.tee 4
                    br_if 0 (;@8;)
                    local.get 5
                    i32.const 16
                    i32.add
                    local.set 2
                    local.get 5
                    i32.load offset=16
                    local.tee 4
                    br_if 0 (;@8;)
                  end
                  local.get 0
                  i32.const 0
                  i32.store
                  br 1 (;@6;)
                end
                i32.const 0
                local.set 5
              end
              local.get 9
              i32.eqz
              br_if 0 (;@5;)
              block  ;; label = @6
                local.get 8
                i32.load offset=28
                local.tee 2
                i32.const 2
                i32.shl
                local.tee 4
                i32.load offset=4056
                local.get 8
                i32.eq
                if  ;; label = @7
                  local.get 4
                  i32.const 4056
                  i32.add
                  local.get 5
                  i32.store
                  local.get 5
                  br_if 1 (;@6;)
                  i32.const 3756
                  i32.const 3756
                  i32.load
                  i32.const -2
                  local.get 2
                  i32.rotl
                  i32.and
                  i32.store
                  br 2 (;@5;)
                end
                block  ;; label = @7
                  local.get 8
                  local.get 9
                  i32.load offset=16
                  i32.eq
                  if  ;; label = @8
                    local.get 9
                    local.get 5
                    i32.store offset=16
                    br 1 (;@7;)
                  end
                  local.get 9
                  local.get 5
                  i32.store offset=20
                end
                local.get 5
                i32.eqz
                br_if 1 (;@5;)
              end
              local.get 5
              local.get 9
              i32.store offset=24
              local.get 8
              i32.load offset=16
              local.tee 4
              if  ;; label = @6
                local.get 5
                local.get 4
                i32.store offset=16
                local.get 4
                local.get 5
                i32.store offset=24
              end
              local.get 8
              i32.load offset=20
              local.tee 4
              i32.eqz
              br_if 0 (;@5;)
              local.get 5
              local.get 4
              i32.store offset=20
              local.get 4
              local.get 5
              i32.store offset=24
            end
            local.get 6
            local.get 8
            i32.add
            local.tee 8
            i32.load offset=4
            local.set 4
            local.get 1
            local.get 6
            i32.add
            local.set 1
          end
          local.get 8
          local.get 4
          i32.const -2
          i32.and
          i32.store offset=4
          local.get 7
          local.get 1
          i32.const 1
          i32.or
          i32.store offset=4
          local.get 1
          local.get 7
          i32.add
          local.get 1
          i32.store
          local.get 1
          i32.const 255
          i32.le_u
          if  ;; label = @4
            local.get 1
            i32.const -8
            i32.and
            i32.const 3792
            i32.add
            local.set 5
            block (result i32)  ;; label = @5
              i32.const 3752
              i32.load
              local.tee 4
              i32.const 1
              local.get 1
              i32.const 3
              i32.shr_u
              i32.shl
              local.tee 1
              i32.and
              i32.eqz
              if  ;; label = @6
                i32.const 3752
                local.get 1
                local.get 4
                i32.or
                i32.store
                local.get 5
                br 1 (;@5;)
              end
              local.get 5
              i32.load offset=8
            end
            local.set 1
            local.get 5
            local.get 7
            i32.store offset=8
            local.get 1
            local.get 7
            i32.store offset=12
            local.get 7
            local.get 5
            i32.store offset=12
            local.get 7
            local.get 1
            i32.store offset=8
            br 1 (;@3;)
          end
          i32.const 31
          local.set 5
          local.get 1
          i32.const 16777215
          i32.le_u
          if  ;; label = @4
            local.get 1
            i32.const 38
            local.get 1
            i32.const 8
            i32.shr_u
            i32.clz
            local.tee 5
            i32.sub
            i32.shr_u
            i32.const 1
            i32.and
            local.get 5
            i32.const 1
            i32.shl
            i32.sub
            i32.const 62
            i32.add
            local.set 5
          end
          local.get 7
          local.get 5
          i32.store offset=28
          local.get 7
          i64.const 0
          i64.store offset=16 align=4
          local.get 5
          i32.const 2
          i32.shl
          i32.const 4056
          i32.add
          local.set 4
          block  ;; label = @4
            block  ;; label = @5
              i32.const 3756
              i32.load
              local.tee 2
              i32.const 1
              local.get 5
              i32.shl
              local.tee 8
              i32.and
              i32.eqz
              if  ;; label = @6
                i32.const 3756
                local.get 2
                local.get 8
                i32.or
                i32.store
                local.get 4
                local.get 7
                i32.store
                local.get 7
                local.get 4
                i32.store offset=24
                br 1 (;@5;)
              end
              local.get 1
              i32.const 25
              local.get 5
              i32.const 1
              i32.shr_u
              i32.sub
              i32.const 0
              local.get 5
              i32.const 31
              i32.ne
              select
              i32.shl
              local.set 5
              local.get 4
              i32.load
              local.set 2
              loop  ;; label = @6
                local.get 2
                local.tee 4
                i32.load offset=4
                i32.const -8
                i32.and
                local.get 1
                i32.eq
                br_if 2 (;@4;)
                local.get 5
                i32.const 29
                i32.shr_u
                local.set 2
                local.get 5
                i32.const 1
                i32.shl
                local.set 5
                local.get 4
                local.get 2
                i32.const 4
                i32.and
                i32.add
                local.tee 8
                i32.load offset=16
                local.tee 2
                br_if 0 (;@6;)
              end
              local.get 8
              local.get 7
              i32.store offset=16
              local.get 7
              local.get 4
              i32.store offset=24
            end
            local.get 7
            local.get 7
            i32.store offset=12
            local.get 7
            local.get 7
            i32.store offset=8
            br 1 (;@3;)
          end
          local.get 4
          i32.load offset=8
          local.tee 5
          local.get 7
          i32.store offset=12
          local.get 4
          local.get 7
          i32.store offset=8
          local.get 7
          i32.const 0
          i32.store offset=24
          local.get 7
          local.get 4
          i32.store offset=12
          local.get 7
          local.get 5
          i32.store offset=8
        end
        local.get 3
        i32.const 8
        i32.add
        local.set 0
        br 1 (;@1;)
      end
      block  ;; label = @2
        local.get 6
        i32.eqz
        br_if 0 (;@2;)
        block  ;; label = @3
          local.get 4
          i32.load offset=28
          local.tee 1
          i32.const 2
          i32.shl
          local.tee 2
          i32.load offset=4056
          local.get 4
          i32.eq
          if  ;; label = @4
            local.get 2
            i32.const 4056
            i32.add
            local.get 0
            i32.store
            local.get 0
            br_if 1 (;@3;)
            i32.const 3756
            local.get 9
            i32.const -2
            local.get 1
            i32.rotl
            i32.and
            local.tee 9
            i32.store
            br 2 (;@2;)
          end
          block  ;; label = @4
            local.get 4
            local.get 6
            i32.load offset=16
            i32.eq
            if  ;; label = @5
              local.get 6
              local.get 0
              i32.store offset=16
              br 1 (;@4;)
            end
            local.get 6
            local.get 0
            i32.store offset=20
          end
          local.get 0
          i32.eqz
          br_if 1 (;@2;)
        end
        local.get 0
        local.get 6
        i32.store offset=24
        local.get 4
        i32.load offset=16
        local.tee 2
        if  ;; label = @3
          local.get 0
          local.get 2
          i32.store offset=16
          local.get 2
          local.get 0
          i32.store offset=24
        end
        local.get 4
        i32.load offset=20
        local.tee 2
        i32.eqz
        br_if 0 (;@2;)
        local.get 0
        local.get 2
        i32.store offset=20
        local.get 2
        local.get 0
        i32.store offset=24
      end
      block  ;; label = @2
        local.get 3
        i32.const 15
        i32.le_u
        if  ;; label = @3
          local.get 4
          local.get 3
          i32.const 2097160
          i32.add
          local.tee 0
          i32.const 3
          i32.or
          i32.store offset=4
          local.get 0
          local.get 4
          i32.add
          local.tee 0
          local.get 0
          i32.load offset=4
          i32.const 1
          i32.or
          i32.store offset=4
          br 1 (;@2;)
        end
        local.get 4
        i32.const 2097163
        i32.store offset=4
        local.get 4
        i32.const 2097160
        i32.add
        local.tee 1
        local.get 3
        i32.const 1
        i32.or
        i32.store offset=4
        local.get 1
        local.get 3
        i32.add
        local.get 3
        i32.store
        local.get 3
        i32.const 255
        i32.le_u
        if  ;; label = @3
          local.get 3
          i32.const -8
          i32.and
          i32.const 3792
          i32.add
          local.set 0
          block (result i32)  ;; label = @4
            i32.const 3752
            i32.load
            local.tee 6
            i32.const 1
            local.get 3
            i32.const 3
            i32.shr_u
            i32.shl
            local.tee 3
            i32.and
            i32.eqz
            if  ;; label = @5
              i32.const 3752
              local.get 3
              local.get 6
              i32.or
              i32.store
              local.get 0
              br 1 (;@4;)
            end
            local.get 0
            i32.load offset=8
          end
          local.set 3
          local.get 0
          local.get 1
          i32.store offset=8
          local.get 3
          local.get 1
          i32.store offset=12
          local.get 1
          local.get 0
          i32.store offset=12
          local.get 1
          local.get 3
          i32.store offset=8
          br 1 (;@2;)
        end
        i32.const 31
        local.set 0
        local.get 3
        i32.const 16777215
        i32.le_u
        if  ;; label = @3
          local.get 3
          i32.const 38
          local.get 3
          i32.const 8
          i32.shr_u
          i32.clz
          local.tee 0
          i32.sub
          i32.shr_u
          i32.const 1
          i32.and
          local.get 0
          i32.const 1
          i32.shl
          i32.sub
          i32.const 62
          i32.add
          local.set 0
        end
        local.get 1
        local.get 0
        i32.store offset=28
        local.get 1
        i64.const 0
        i64.store offset=16 align=4
        local.get 0
        i32.const 2
        i32.shl
        i32.const 4056
        i32.add
        local.set 6
        block  ;; label = @3
          block  ;; label = @4
            local.get 9
            i32.const 1
            local.get 0
            i32.shl
            local.tee 2
            i32.and
            i32.eqz
            if  ;; label = @5
              i32.const 3756
              local.get 2
              local.get 9
              i32.or
              i32.store
              local.get 6
              local.get 1
              i32.store
              local.get 1
              local.get 6
              i32.store offset=24
              br 1 (;@4;)
            end
            local.get 3
            i32.const 25
            local.get 0
            i32.const 1
            i32.shr_u
            i32.sub
            i32.const 0
            local.get 0
            i32.const 31
            i32.ne
            select
            i32.shl
            local.set 0
            local.get 6
            i32.load
            local.set 2
            loop  ;; label = @5
              local.get 2
              local.tee 6
              i32.load offset=4
              i32.const -8
              i32.and
              local.get 3
              i32.eq
              br_if 2 (;@3;)
              local.get 0
              i32.const 29
              i32.shr_u
              local.set 2
              local.get 0
              i32.const 1
              i32.shl
              local.set 0
              local.get 6
              local.get 2
              i32.const 4
              i32.and
              i32.add
              local.tee 5
              i32.load offset=16
              local.tee 2
              br_if 0 (;@5;)
            end
            local.get 5
            local.get 1
            i32.store offset=16
            local.get 1
            local.get 6
            i32.store offset=24
          end
          local.get 1
          local.get 1
          i32.store offset=12
          local.get 1
          local.get 1
          i32.store offset=8
          br 1 (;@2;)
        end
        local.get 6
        i32.load offset=8
        local.tee 0
        local.get 1
        i32.store offset=12
        local.get 6
        local.get 1
        i32.store offset=8
        local.get 1
        i32.const 0
        i32.store offset=24
        local.get 1
        local.get 6
        i32.store offset=12
        local.get 1
        local.get 0
        i32.store offset=8
      end
      local.get 4
      i32.const 8
      i32.add
      local.set 0
    end
    local.get 10
    i32.const 16
    i32.add
    global.set 0
    local.get 0)
  (func (;40;) (type 2) (param i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32)
    block  ;; label = @1
      local.get 0
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      i32.const 8
      i32.sub
      local.tee 3
      local.get 0
      i32.const 4
      i32.sub
      i32.load
      local.tee 1
      i32.const -8
      i32.and
      local.tee 0
      i32.add
      local.set 4
      block  ;; label = @2
        local.get 1
        i32.const 1
        i32.and
        br_if 0 (;@2;)
        local.get 1
        i32.const 2
        i32.and
        i32.eqz
        br_if 1 (;@1;)
        local.get 3
        local.get 3
        i32.load
        local.tee 2
        i32.sub
        local.tee 3
        i32.const 3768
        i32.load
        i32.lt_u
        br_if 1 (;@1;)
        local.get 0
        local.get 2
        i32.add
        local.set 0
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              i32.const 3772
              i32.load
              local.get 3
              i32.ne
              if  ;; label = @6
                local.get 3
                i32.load offset=12
                local.set 1
                local.get 2
                i32.const 255
                i32.le_u
                if  ;; label = @7
                  local.get 1
                  local.get 3
                  i32.load offset=8
                  local.tee 5
                  i32.ne
                  br_if 2 (;@5;)
                  i32.const 3752
                  i32.const 3752
                  i32.load
                  i32.const -2
                  local.get 2
                  i32.const 3
                  i32.shr_u
                  i32.rotl
                  i32.and
                  i32.store
                  br 5 (;@2;)
                end
                local.get 3
                i32.load offset=24
                local.set 6
                local.get 1
                local.get 3
                i32.ne
                if  ;; label = @7
                  local.get 3
                  i32.load offset=8
                  local.tee 2
                  local.get 1
                  i32.store offset=12
                  local.get 1
                  local.get 2
                  i32.store offset=8
                  br 4 (;@3;)
                end
                local.get 3
                i32.load offset=20
                local.tee 2
                if (result i32)  ;; label = @7
                  local.get 3
                  i32.const 20
                  i32.add
                else
                  local.get 3
                  i32.load offset=16
                  local.tee 2
                  i32.eqz
                  br_if 3 (;@4;)
                  local.get 3
                  i32.const 16
                  i32.add
                end
                local.set 5
                loop  ;; label = @7
                  local.get 5
                  local.set 8
                  local.get 2
                  local.tee 1
                  i32.const 20
                  i32.add
                  local.set 5
                  local.get 1
                  i32.load offset=20
                  local.tee 2
                  br_if 0 (;@7;)
                  local.get 1
                  i32.const 16
                  i32.add
                  local.set 5
                  local.get 1
                  i32.load offset=16
                  local.tee 2
                  br_if 0 (;@7;)
                end
                local.get 8
                i32.const 0
                i32.store
                br 3 (;@3;)
              end
              local.get 4
              i32.load offset=4
              local.tee 1
              i32.const 3
              i32.and
              i32.const 3
              i32.ne
              br_if 3 (;@2;)
              i32.const 3760
              local.get 0
              i32.store
              local.get 4
              local.get 1
              i32.const -2
              i32.and
              i32.store offset=4
              local.get 3
              local.get 0
              i32.const 1
              i32.or
              i32.store offset=4
              local.get 4
              local.get 0
              i32.store
              return
            end
            local.get 5
            local.get 1
            i32.store offset=12
            local.get 1
            local.get 5
            i32.store offset=8
            br 2 (;@2;)
          end
          i32.const 0
          local.set 1
        end
        local.get 6
        i32.eqz
        br_if 0 (;@2;)
        block  ;; label = @3
          local.get 3
          i32.load offset=28
          local.tee 5
          i32.const 2
          i32.shl
          local.tee 2
          i32.load offset=4056
          local.get 3
          i32.eq
          if  ;; label = @4
            local.get 2
            i32.const 4056
            i32.add
            local.get 1
            i32.store
            local.get 1
            br_if 1 (;@3;)
            i32.const 3756
            i32.const 3756
            i32.load
            i32.const -2
            local.get 5
            i32.rotl
            i32.and
            i32.store
            br 2 (;@2;)
          end
          block  ;; label = @4
            local.get 3
            local.get 6
            i32.load offset=16
            i32.eq
            if  ;; label = @5
              local.get 6
              local.get 1
              i32.store offset=16
              br 1 (;@4;)
            end
            local.get 6
            local.get 1
            i32.store offset=20
          end
          local.get 1
          i32.eqz
          br_if 1 (;@2;)
        end
        local.get 1
        local.get 6
        i32.store offset=24
        local.get 3
        i32.load offset=16
        local.tee 2
        if  ;; label = @3
          local.get 1
          local.get 2
          i32.store offset=16
          local.get 2
          local.get 1
          i32.store offset=24
        end
        local.get 3
        i32.load offset=20
        local.tee 2
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        local.get 2
        i32.store offset=20
        local.get 2
        local.get 1
        i32.store offset=24
      end
      local.get 3
      local.get 4
      i32.ge_u
      br_if 0 (;@1;)
      local.get 4
      i32.load offset=4
      local.tee 2
      i32.const 1
      i32.and
      i32.eqz
      br_if 0 (;@1;)
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              local.get 2
              i32.const 2
              i32.and
              i32.eqz
              if  ;; label = @6
                i32.const 3776
                i32.load
                local.get 4
                i32.eq
                if  ;; label = @7
                  i32.const 3776
                  local.get 3
                  i32.store
                  i32.const 3764
                  i32.const 3764
                  i32.load
                  local.get 0
                  i32.add
                  local.tee 0
                  i32.store
                  local.get 3
                  local.get 0
                  i32.const 1
                  i32.or
                  i32.store offset=4
                  local.get 3
                  i32.const 3772
                  i32.load
                  i32.ne
                  br_if 6 (;@1;)
                  i32.const 3760
                  i32.const 0
                  i32.store
                  i32.const 3772
                  i32.const 0
                  i32.store
                  return
                end
                i32.const 3772
                i32.load
                local.tee 6
                local.get 4
                i32.eq
                if  ;; label = @7
                  i32.const 3772
                  local.get 3
                  i32.store
                  i32.const 3760
                  i32.const 3760
                  i32.load
                  local.get 0
                  i32.add
                  local.tee 0
                  i32.store
                  local.get 3
                  local.get 0
                  i32.const 1
                  i32.or
                  i32.store offset=4
                  local.get 0
                  local.get 3
                  i32.add
                  local.get 0
                  i32.store
                  return
                end
                local.get 2
                i32.const -8
                i32.and
                local.get 0
                i32.add
                local.set 0
                local.get 4
                i32.load offset=12
                local.set 1
                local.get 2
                i32.const 255
                i32.le_u
                if  ;; label = @7
                  local.get 4
                  i32.load offset=8
                  local.tee 5
                  local.get 1
                  i32.eq
                  if  ;; label = @8
                    i32.const 3752
                    i32.const 3752
                    i32.load
                    i32.const -2
                    local.get 2
                    i32.const 3
                    i32.shr_u
                    i32.rotl
                    i32.and
                    i32.store
                    br 5 (;@3;)
                  end
                  local.get 5
                  local.get 1
                  i32.store offset=12
                  local.get 1
                  local.get 5
                  i32.store offset=8
                  br 4 (;@3;)
                end
                local.get 4
                i32.load offset=24
                local.set 7
                local.get 1
                local.get 4
                i32.ne
                if  ;; label = @7
                  local.get 4
                  i32.load offset=8
                  local.tee 2
                  local.get 1
                  i32.store offset=12
                  local.get 1
                  local.get 2
                  i32.store offset=8
                  br 3 (;@4;)
                end
                local.get 4
                i32.load offset=20
                local.tee 2
                if (result i32)  ;; label = @7
                  local.get 4
                  i32.const 20
                  i32.add
                else
                  local.get 4
                  i32.load offset=16
                  local.tee 2
                  i32.eqz
                  br_if 2 (;@5;)
                  local.get 4
                  i32.const 16
                  i32.add
                end
                local.set 5
                loop  ;; label = @7
                  local.get 5
                  local.set 8
                  local.get 2
                  local.tee 1
                  i32.const 20
                  i32.add
                  local.set 5
                  local.get 1
                  i32.load offset=20
                  local.tee 2
                  br_if 0 (;@7;)
                  local.get 1
                  i32.const 16
                  i32.add
                  local.set 5
                  local.get 1
                  i32.load offset=16
                  local.tee 2
                  br_if 0 (;@7;)
                end
                local.get 8
                i32.const 0
                i32.store
                br 2 (;@4;)
              end
              local.get 4
              local.get 2
              i32.const -2
              i32.and
              i32.store offset=4
              local.get 3
              local.get 0
              i32.const 1
              i32.or
              i32.store offset=4
              local.get 0
              local.get 3
              i32.add
              local.get 0
              i32.store
              br 3 (;@2;)
            end
            i32.const 0
            local.set 1
          end
          local.get 7
          i32.eqz
          br_if 0 (;@3;)
          block  ;; label = @4
            local.get 4
            i32.load offset=28
            local.tee 5
            i32.const 2
            i32.shl
            local.tee 2
            i32.load offset=4056
            local.get 4
            i32.eq
            if  ;; label = @5
              local.get 2
              i32.const 4056
              i32.add
              local.get 1
              i32.store
              local.get 1
              br_if 1 (;@4;)
              i32.const 3756
              i32.const 3756
              i32.load
              i32.const -2
              local.get 5
              i32.rotl
              i32.and
              i32.store
              br 2 (;@3;)
            end
            block  ;; label = @5
              local.get 4
              local.get 7
              i32.load offset=16
              i32.eq
              if  ;; label = @6
                local.get 7
                local.get 1
                i32.store offset=16
                br 1 (;@5;)
              end
              local.get 7
              local.get 1
              i32.store offset=20
            end
            local.get 1
            i32.eqz
            br_if 1 (;@3;)
          end
          local.get 1
          local.get 7
          i32.store offset=24
          local.get 4
          i32.load offset=16
          local.tee 2
          if  ;; label = @4
            local.get 1
            local.get 2
            i32.store offset=16
            local.get 2
            local.get 1
            i32.store offset=24
          end
          local.get 4
          i32.load offset=20
          local.tee 2
          i32.eqz
          br_if 0 (;@3;)
          local.get 1
          local.get 2
          i32.store offset=20
          local.get 2
          local.get 1
          i32.store offset=24
        end
        local.get 3
        local.get 0
        i32.const 1
        i32.or
        i32.store offset=4
        local.get 0
        local.get 3
        i32.add
        local.get 0
        i32.store
        local.get 3
        local.get 6
        i32.ne
        br_if 0 (;@2;)
        i32.const 3760
        local.get 0
        i32.store
        return
      end
      local.get 0
      i32.const 255
      i32.le_u
      if  ;; label = @2
        local.get 0
        i32.const -8
        i32.and
        i32.const 3792
        i32.add
        local.set 1
        block (result i32)  ;; label = @3
          i32.const 3752
          i32.load
          local.tee 2
          i32.const 1
          local.get 0
          i32.const 3
          i32.shr_u
          i32.shl
          local.tee 0
          i32.and
          i32.eqz
          if  ;; label = @4
            i32.const 3752
            local.get 0
            local.get 2
            i32.or
            i32.store
            local.get 1
            br 1 (;@3;)
          end
          local.get 1
          i32.load offset=8
        end
        local.set 0
        local.get 1
        local.get 3
        i32.store offset=8
        local.get 0
        local.get 3
        i32.store offset=12
        local.get 3
        local.get 1
        i32.store offset=12
        local.get 3
        local.get 0
        i32.store offset=8
        return
      end
      i32.const 31
      local.set 1
      local.get 0
      i32.const 16777215
      i32.le_u
      if  ;; label = @2
        local.get 0
        i32.const 38
        local.get 0
        i32.const 8
        i32.shr_u
        i32.clz
        local.tee 1
        i32.sub
        i32.shr_u
        i32.const 1
        i32.and
        local.get 1
        i32.const 1
        i32.shl
        i32.sub
        i32.const 62
        i32.add
        local.set 1
      end
      local.get 3
      local.get 1
      i32.store offset=28
      local.get 3
      i64.const 0
      i64.store offset=16 align=4
      local.get 1
      i32.const 2
      i32.shl
      i32.const 4056
      i32.add
      local.set 5
      block (result i32)  ;; label = @2
        block  ;; label = @3
          block (result i32)  ;; label = @4
            i32.const 3756
            i32.load
            local.tee 2
            i32.const 1
            local.get 1
            i32.shl
            local.tee 4
            i32.and
            i32.eqz
            if  ;; label = @5
              i32.const 3756
              local.get 2
              local.get 4
              i32.or
              i32.store
              local.get 5
              local.get 3
              i32.store
              i32.const 24
              local.set 1
              i32.const 8
              br 1 (;@4;)
            end
            local.get 0
            i32.const 25
            local.get 1
            i32.const 1
            i32.shr_u
            i32.sub
            i32.const 0
            local.get 1
            i32.const 31
            i32.ne
            select
            i32.shl
            local.set 1
            local.get 5
            i32.load
            local.set 5
            loop  ;; label = @5
              local.get 5
              local.tee 2
              i32.load offset=4
              i32.const -8
              i32.and
              local.get 0
              i32.eq
              br_if 2 (;@3;)
              local.get 1
              i32.const 29
              i32.shr_u
              local.set 5
              local.get 1
              i32.const 1
              i32.shl
              local.set 1
              local.get 2
              local.get 5
              i32.const 4
              i32.and
              i32.add
              local.tee 4
              i32.load offset=16
              local.tee 5
              br_if 0 (;@5;)
            end
            local.get 4
            local.get 3
            i32.store offset=16
            i32.const 24
            local.set 1
            local.get 2
            local.set 5
            i32.const 8
          end
          local.set 0
          local.get 3
          local.set 2
          local.get 3
          br 1 (;@2;)
        end
        local.get 2
        i32.load offset=8
        local.tee 5
        local.get 3
        i32.store offset=12
        local.get 2
        local.get 3
        i32.store offset=8
        i32.const 24
        local.set 0
        i32.const 8
        local.set 1
        i32.const 0
      end
      local.set 4
      local.get 1
      local.get 3
      i32.add
      local.get 5
      i32.store
      local.get 3
      local.get 2
      i32.store offset=12
      local.get 0
      local.get 3
      i32.add
      local.get 4
      i32.store
      i32.const 3784
      i32.const 3784
      i32.load
      i32.const 1
      i32.sub
      local.tee 3
      i32.const -1
      local.get 3
      select
      i32.store
    end)
  (func (;41;) (type 0) (param i32) (result i32)
    (local i32 i32)
    i32.const 2252
    i32.load
    local.tee 1
    local.get 0
    i32.const 7
    i32.add
    i32.const -8
    i32.and
    local.tee 2
    i32.add
    local.set 0
    block  ;; label = @1
      local.get 2
      i32.const 0
      local.get 0
      local.get 1
      i32.le_u
      select
      i32.eqz
      if  ;; label = @2
        local.get 0
        memory.size
        i32.const 16
        i32.shl
        i32.le_u
        br_if 1 (;@1;)
        local.get 0
        call 1
        br_if 1 (;@1;)
      end
      i32.const 3560
      i32.const 48
      i32.store
      i32.const -1
      return
    end
    i32.const 2252
    local.get 0
    i32.store
    local.get 1)
  (func (;42;) (type 2) (param i32)
    local.get 0
    global.set 0)
  (func (;43;) (type 0) (param i32) (result i32)
    global.get 0
    local.get 0
    i32.sub
    i32.const -16
    i32.and
    local.tee 0
    global.set 0
    local.get 0)
  (func (;44;) (type 1) (result i32)
    global.get 0)
  (table (;0;) 4 4 funcref)
  (memory (;0;) 258 32768)
  (global (;0;) (mut i32) (i32.const 69792))
  (export "memory" (memory 0))
  (export "__wasm_call_ctors" (func 2))
  (export "init_panthera" (func 4))
  (export "start_mining" (func 5))
  (export "stop_mining" (func 6))
  (export "is_mining" (func 7))
  (export "get_hash_count" (func 8))
  (export "reset_hash_count" (func 9))
  (export "get_hash_rate" (func 10))
  (export "set_hash_rate" (func 11))
  (export "set_mining_intensity" (func 12))
  (export "get_mining_intensity" (func 13))
  (export "set_scala_job" (func 14))
  (export "mine_step_background" (func 15))
  (export "set_nonce" (func 16))
  (export "get_nonce" (func 17))
  (export "get_current_hash" (func 18))
  (export "get_current_job_id" (func 19))
  (export "get_current_difficulty" (func 20))
  (export "get_current_height" (func 21))
  (export "enable_background_mining" (func 22))
  (export "main" (func 23))
  (export "__indirect_function_table" (table 0))
  (export "_emscripten_stack_restore" (func 42))
  (export "_emscripten_stack_alloc" (func 43))
  (export "emscripten_stack_get_current" (func 44))
  (elem (;0;) (i32.const 1) func 29 28 30)
  (data (;0;) (i32.const 1024) "\08\c9\bc\f3g\e6\09j;\a7\ca\84\85\aeg\bb+\f8\94\fer\f3n<\f16\1d_:\f5O\a5\d1\82\e6\ad\7fR\0eQ\1fl>+\8ch\05\9bk\bdA\fb\ab\d9\83\1fy!~\13\19\cd\e0[-+   0X0x\00scala_default\00Scala XLA mining started with Panthera algorithm\00Failed to initialize Panthera algorithm\00Ready for Scala XLA mining\00Panthera algorithm support initialized\00Scala XLA mining stopped\00Background mining disabled\00Scala XLA WebAssembly Miner loaded\00Failed to allocate Panthera scratchpad\00(null)\00Background mining enabled (CryptoTab style)\00Found valid Scala share! Nonce: %u, Job: %s\0a\00Panthera algorithm initialized with %d MB scratchpad\0a\00New Scala job set: %s (difficulty: %llu)\0a\00Mining intensity set to %d%%\0a\00\00\19\00\0b\00\19\19\19\00\00\00\00\05\00\00\00\00\00\00\09\00\00\00\00\0b\00\00\00\00\00\00\00\00\19\00\0a\0a\19\19\19\03\0a\07\00\01\00\09\0b\18\00\00\09\06\0b\00\00\0b\00\06\19\00\00\00\19\19\19")
  (data (;1;) (i32.const 1697) "\0e\00\00\00\00\00\00\00\00\19\00\0b\0d\19\19\19\00\0d\00\00\02\00\09\0e\00\00\00\09\00\0e\00\00\0e")
  (data (;2;) (i32.const 1755) "\0c")
  (data (;3;) (i32.const 1767) "\13\00\00\00\00\13\00\00\00\00\09\0c\00\00\00\00\00\0c\00\00\0c")
  (data (;4;) (i32.const 1813) "\10")
  (data (;5;) (i32.const 1825) "\0f\00\00\00\04\0f\00\00\00\00\09\10\00\00\00\00\00\10\00\00\10")
  (data (;6;) (i32.const 1871) "\12")
  (data (;7;) (i32.const 1883) "\11\00\00\00\00\11\00\00\00\00\09\12\00\00\00\00\00\12\00\00\12\00\00\1a\00\00\00\1a\1a\1a")
  (data (;8;) (i32.const 1938) "\1a\00\00\00\1a\1a\1a\00\00\00\00\00\00\09")
  (data (;9;) (i32.const 1987) "\14")
  (data (;10;) (i32.const 1999) "\17\00\00\00\00\17\00\00\00\00\09\14\00\00\00\00\00\14\00\00\14")
  (data (;11;) (i32.const 2045) "\16")
  (data (;12;) (i32.const 2057) "\15\00\00\00\00\15\00\00\00\00\09\16\00\00\00\00\00\16\00\00\16\00\000123456789ABCDEF")
  (data (;13;) (i32.const 2096) "2\00\00\00\00\00\00\00\05")
  (data (;14;) (i32.const 2116) "\01")
  (data (;15;) (i32.const 2140) "\02\00\00\00\03\00\00\00\e8\09\00\00\00\04")
  (data (;16;) (i32.const 2164) "\01")
  (data (;17;) (i32.const 2180) "\ff\ff\ff\ff\0a")
  (data (;18;) (i32.const 2249) " \00\00\a0\10\01"))
