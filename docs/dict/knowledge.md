- Akka - Actor Model	
- [export TERM=xterm-color](https://stackoverflow.com/questions/56457685/how-to-fix-the-sbt-crash-java-lang-numberformatexception-for-input-string-0x)
- readlink -f realpath
- .editorconfig
- [Internal Versus External BLOBs in SQLite](https://www.sqlite.org/intern-v-extern-blob.html)
- nodejs 的异步非阻塞io. 与go的协程. 其间的启发
- io 多路复用
- [select, poll, epoll](https://segmentfault.com/a/1190000003063859)
- linux 环境变量 全走https代理
  python3 requests 库 报错
  requests.exceptions.ProxyError: HTTPSConnectionPool(host='hk-cn2.ghelper.net', port=7000): Max retries exceeded with url: http://www.baidu.com/ (Caused by ProxyError('Cannot connect to proxy.', RemoteDisconnected('Remote end closed connection without response'))
- 
    ```
    #sinks.has.enable.idempotence=true
    # 设置了retries参数，可以在Kafka的Partition发生leader切换时，Flink不重启，而是做5次尝试：
    sinks.has.retries=5
    # produce ack =-1 ，保证不丢
    #sinks.has.acks=all
    #sinks.has.compression.type=snappy
    #sinks.has.max.request.size=15728640
    #sinks.has.linger.ms=1000
    ```
- [HIVE_STATS_JDBC_TIMEOUT](https://www.cnblogs.com/fbiswt/p/11798514.html)
- flink如何让非广播流后于广播流初始化后执行？
  	https://segmentfault.com/q/1010000022940925
  - 使用缓冲区暂存`
  - java性能好的 队列
  	- linkedlist 和scala的queue对比 之后, 后者时间花费10倍, 可能和scala不停队列转换有关
  - 存储在内存中queue, 可能存在oom问题
  	- checkpint能做到什么程度, 以及消费kafka能恢复到什么程度
  - 测试 检查点恢复之后, 能够继续消费
  - 测试 没有检查点, 使用kafka source 默认的StartupMode.GROUP_OFFSETS 模式, 
  	- 能够从group-offset继续消费
  	- 但是写入的文件会覆盖(从0开始)
  - 测试 没有检查点, 使用 StartupMode.LATEST, 
  	- 首先 kafka 控制台手动改组offset
  	- 重启之后 offset自动到最新的, 并没有消费之前的数据( 消费丢失 )
  	- 万万不可这么设置
  - 使用缓存区存储测试
  	- [blog] Thread.sleep 延时问题
  	- 测试通过
  - 缓存区否决,使用open初始化
  	- 分发缓存文件
  	- 测试成功
- 系统业务解耦
- client在gate的搜索
- clent->server
- server->client\
- 分层架构
- 架构是演进的, 不是设计的
- 跳表
- 智能指针
- 日志链路
- 大数据安全体系
- pmem
- dram
- cdn: 有限机器的如何数据保证, 业务保证, 调度
- 运维发布无感知
- https://github.com/opencurve/curve
- serverless
- 边缘计算
- 云计算
- muti raft
- 对象存储
- abtest
- doris
- kibana
- push rank
- daojiaping
- doris
- Redis 多租户
- ofc
- lua
- lucene
- service mesh
- lru
- EC 编码
- 多模态
- 认知推荐
- jsu
- 先验知识
- 配置文件 vs dsl
- yarn
- 自发现crd配置
- dts
- 认知图谱
- [为什么不要直接在Object.prototype上定义方法？(JavaScript)](https://www.zhihu.com/question/26924011)
  https://stackoverflow.com/questions/1827458/prototyping-object-in-javascript-breaks-jquery
- [The Unlambda Programming Language](http://www.madore.org/~david/programs/unlambda/)
    
    
    
    