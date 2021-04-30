### This is node test hub
* 这里需要写一些node的脚本
* 如果node要支持es6模式
```
package.json 中要加入 {"type": "module"}
```

---

### regdel
* 删除注册表中键值含有的 关键字
* 里面设计到nodejs的stream和readline
* 因为系统原因，要卸载safari和itunes必须要删除注册表中有关safari和apple相关的
键值属性，手动删除非常耗时且不实用，程序员怎么会被这个难倒，故这个插件诞生了

---

### chrome remote debug
* 下午搭建环境测试webview通讯
* 查看 CPU 占用排名前 5 的程序并间隔 3 秒输出 top -m 5 -t -d 3（-m 最大数；-t 显示进程名；-d刷新间隔）
* 根据进程名查看其 CPU 占用率 `top -d 3| grep com.taobao.trip`
