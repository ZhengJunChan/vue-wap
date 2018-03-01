import registPlugs from './registPlugs';
import registGlobal from './registGlobal';

export default function () {
    // 注册第三方插件
    registPlugs();

    // 注册自定义全局方法
    registGlobal();
};
